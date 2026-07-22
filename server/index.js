/**
 * Scripture Racer — Live Room Race server
 * Zero deps: HTTP REST + Server-Sent Events
 *
 * Run:  node server/index.js
 * Port: RACE_PORT (default 8787)
 * Dev:  MIN_PLAYERS=1 allows solo host testing
 */

const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");
const crypto = require("crypto");

const PORT = parseInt(process.env.RACE_PORT || "8787", 10);
// Default 1 for easy local testing; set MIN_PLAYERS=2 for real contests
const MIN_PLAYERS = parseInt(process.env.MIN_PLAYERS || "1", 10);
const MAX_PLAYERS = 8;
const ROOM_IDLE_MS = 45 * 60 * 1000;
const ROOM_POST_RACE_MS = 10 * 60 * 1000;
const DISCONNECT_GRACE_MS = 15_000;
const PROGRESS_MIN_MS = 100; // ≤10/sec
const COUNTDOWN_MS = 3000;
const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

const verses = JSON.parse(
  fs.readFileSync(path.join(__dirname, "verses.json"), "utf8")
);

/** @type {Map<string, Room>} */
const rooms = new Map();

const NAME_BLOCK = [
  "admin", "moderator", "nazi", "hitler", "fuck", "shit", "asshole", "bitch",
  "cunt", "nigger", "faggot", "rape", "porn", "slut"
];

function now() {
  return Date.now();
}

function uid(prefix = "p") {
  return `${prefix}_${crypto.randomBytes(6).toString("hex")}`;
}

function genCode() {
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  }
  return rooms.has(code) ? genCode() : code;
}

function sanitizeName(raw) {
  let name = String(raw || "")
    .replace(/[^\w\s\-'.]/g, "")
    .trim()
    .slice(0, 16);
  if (!name) name = `Pilgrim-${Math.floor(1000 + Math.random() * 9000)}`;
  const lower = name.toLowerCase();
  for (const bad of NAME_BLOCK) {
    if (lower.includes(bad)) {
      name = `Pilgrim-${Math.floor(1000 + Math.random() * 9000)}`;
      break;
    }
  }
  return name;
}

function pickVerse(difficulty) {
  const diff = ["EASY", "MEDIUM", "HARD"].includes(difficulty) ? difficulty : "MEDIUM";
  const pool = verses.filter((v) => v.difficulty === diff);
  const list = pool.length ? pool : verses;
  return list[Math.floor(Math.random() * list.length)];
}

function pickVerseChain(difficulty, count = 12) {
  const diff = ["EASY", "MEDIUM", "HARD"].includes(difficulty) ? difficulty : "MEDIUM";
  const pool = verses.filter((v) => v.difficulty === diff);
  const list = pool.length ? pool : verses;
  const chain = [];
  for (let i = 0; i < count; i++) {
    chain.push(list[Math.floor(Math.random() * list.length)]);
  }
  return chain;
}

function publicPlayer(p) {
  return {
    id: p.id,
    name: p.name,
    ready: p.ready,
    connected: p.connected,
    progress: p.progress,
    wpm: p.wpm,
    finished: p.finished,
    result: p.result,
    isHost: false // filled by publicRoom
  };
}

function publicRoom(room) {
  const players = Object.values(room.players).map((p) => ({
    ...publicPlayer(p),
    isHost: p.id === room.hostId
  }));
  return {
    code: room.code,
    hostId: room.hostId,
    status: room.status,
    mode: room.mode,
    difficulty: room.difficulty,
    durationSec: room.durationSec,
    seed: room.seed,
    versePayload: room.versePayload,
    verseChain: room.verseChain,
    startAt: room.startAt,
    players,
    results: room.results,
    minPlayers: MIN_PLAYERS,
    maxPlayers: MAX_PLAYERS
  };
}

function createRoom({ mode, difficulty, durationSec, displayName }) {
  const code = genCode();
  const playerId = uid("p");
  const name = sanitizeName(displayName);
  const room = {
    code,
    hostId: playerId,
    status: "lobby",
    mode: mode === "timeTrial" ? "timeTrial" : "classic",
    difficulty: ["EASY", "MEDIUM", "HARD"].includes(difficulty) ? difficulty : "MEDIUM",
    durationSec: [30, 60, 90].includes(durationSec) ? durationSec : 60,
    seed: null,
    versePayload: null,
    verseChain: null,
    startAt: null,
    createdAt: now(),
    expiresAt: now() + ROOM_IDLE_MS,
    results: null,
    players: {
      [playerId]: {
        id: playerId,
        name,
        ready: true,
        connected: true,
        progress: 0,
        wpm: 0,
        finished: false,
        result: null,
        lastProgressAt: 0,
        lastSeen: now(),
        sse: new Set()
      }
    },
    countdownTimer: null,
    raceTimeout: null
  };
  rooms.set(code, room);
  return { room, playerId };
}

function getRoom(code) {
  if (!code) return null;
  return rooms.get(String(code).toUpperCase()) || null;
}

function touchRoom(room) {
  if (room.status === "results") {
    room.expiresAt = now() + ROOM_POST_RACE_MS;
  } else {
    room.expiresAt = now() + ROOM_IDLE_MS;
  }
}

function broadcast(room, event, data) {
  const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const p of Object.values(room.players)) {
    for (const res of p.sse) {
      try {
        res.write(payload);
      } catch (_) {}
    }
  }
}

function broadcastRoom(room, event = "room") {
  broadcast(room, event, publicRoom(room));
}

function removePlayer(room, playerId) {
  const p = room.players[playerId];
  if (!p) return;
  for (const res of p.sse) {
    try {
      res.end();
    } catch (_) {}
  }
  delete room.players[playerId];

  if (Object.keys(room.players).length === 0) {
    cleanupRoom(room.code);
    return;
  }

  if (room.hostId === playerId) {
    const next = Object.values(room.players).sort((a, b) => a.lastSeen - b.lastSeen)[0];
    room.hostId = next.id;
  }

  if (room.status === "racing" || room.status === "countdown") {
    maybeFinishRace(room);
  }
  touchRoom(room);
  broadcastRoom(room, "roster_update");
}

function cleanupRoom(code) {
  const room = rooms.get(code);
  if (!room) return;
  if (room.countdownTimer) clearTimeout(room.countdownTimer);
  if (room.raceTimeout) clearTimeout(room.raceTimeout);
  for (const p of Object.values(room.players)) {
    for (const res of p.sse) {
      try {
        res.end();
      } catch (_) {}
    }
  }
  rooms.delete(code);
}

function startRace(room) {
  const connected = Object.values(room.players).filter((p) => p.connected);
  if (connected.length < MIN_PLAYERS) {
    return { error: `Need at least ${MIN_PLAYERS} connected player(s)`, status: 400 };
  }

  room.seed = crypto.randomBytes(8).toString("hex");
  if (room.mode === "timeTrial") {
    room.verseChain = pickVerseChain(room.difficulty, 16);
    room.versePayload = room.verseChain[0];
  } else {
    room.versePayload = pickVerse(room.difficulty);
    room.verseChain = null;
  }

  for (const p of Object.values(room.players)) {
    p.progress = 0;
    p.wpm = 0;
    p.finished = false;
    p.result = null;
  }
  room.results = null;
  room.status = "countdown";
  room.startAt = now() + COUNTDOWN_MS;
  touchRoom(room);

  broadcast(room, "race_start", {
    room: publicRoom(room),
    startAt: room.startAt,
    versePayload: room.versePayload,
    verseChain: room.verseChain,
    mode: room.mode,
    durationSec: room.durationSec,
    difficulty: room.difficulty
  });
  broadcastRoom(room);

  if (room.countdownTimer) clearTimeout(room.countdownTimer);
  room.countdownTimer = setTimeout(() => {
    if (room.status !== "countdown") return;
    room.status = "racing";
    touchRoom(room);
    broadcastRoom(room, "racing");

    // Safety timeout: classic max 10 min; timeTrial duration + buffer
    const limit =
      room.mode === "timeTrial"
        ? room.durationSec * 1000 + 5000
        : 10 * 60 * 1000;
    if (room.raceTimeout) clearTimeout(room.raceTimeout);
    room.raceTimeout = setTimeout(() => {
      if (room.status === "racing") forceFinishRace(room);
    }, limit);
  }, COUNTDOWN_MS);

  return { ok: true };
}

function rankResults(room) {
  const finishers = Object.values(room.players)
    .filter((p) => p.finished && p.result)
    .map((p) => ({
      id: p.id,
      name: p.name,
      ...p.result
    }));

  if (room.mode === "timeTrial") {
    finishers.sort(
      (a, b) =>
        (b.score || 0) - (a.score || 0) ||
        (a.timeMs || 0) - (b.timeMs || 0)
    );
  } else {
    finishers.sort(
      (a, b) =>
        (a.timeMs || Infinity) - (b.timeMs || Infinity) ||
        (b.accuracy || 0) - (a.accuracy || 0)
    );
  }

  // DNFs last
  const dnfs = Object.values(room.players)
    .filter((p) => !p.finished)
    .map((p) => ({
      id: p.id,
      name: p.name,
      timeMs: null,
      wpm: p.wpm || 0,
      accuracy: 0,
      score: p.progress || 0,
      dnf: true
    }));

  return [...finishers, ...dnfs].map((r, i) => ({ ...r, place: i + 1 }));
}

function maybeFinishRace(room) {
  if (room.status !== "racing") return;
  const active = Object.values(room.players).filter((p) => p.connected);
  if (active.length === 0) {
    forceFinishRace(room);
    return;
  }
  if (active.every((p) => p.finished)) {
    forceFinishRace(room);
  }
}

function forceFinishRace(room) {
  if (room.status !== "racing" && room.status !== "countdown") return;
  if (room.raceTimeout) clearTimeout(room.raceTimeout);
  room.raceTimeout = null;
  room.status = "results";
  room.results = rankResults(room);
  touchRoom(room);
  broadcast(room, "race_results", { results: room.results, room: publicRoom(room) });
  broadcastRoom(room);
}

function rematch(room) {
  room.status = "lobby";
  room.seed = null;
  room.versePayload = null;
  room.verseChain = null;
  room.startAt = null;
  room.results = null;
  for (const p of Object.values(room.players)) {
    p.ready = p.id === room.hostId;
    p.progress = 0;
    p.wpm = 0;
    p.finished = false;
    p.result = null;
  }
  touchRoom(room);
  broadcastRoom(room, "rematch");
}

// ---- HTTP helpers ----

function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function sendJson(res, status, body) {
  cors(res);
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (c) => {
      size += c.length;
      if (size > 32_000) {
        reject(new Error("body too large"));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error("invalid json"));
      }
    });
    req.on("error", reject);
  });
}

async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const parts = url.pathname.replace(/\/+$/, "").split("/").filter(Boolean);

  // GET /health
  if (req.method === "GET" && parts[0] === "health") {
    return sendJson(res, 200, { ok: true, rooms: rooms.size, minPlayers: MIN_PLAYERS });
  }

  // POST /rooms
  if (req.method === "POST" && parts.length === 1 && parts[0] === "rooms") {
    try {
      const body = await readBody(req);
      const { room, playerId } = createRoom(body);
      return sendJson(res, 201, {
        roomCode: room.code,
        playerId,
        room: publicRoom(room)
      });
    } catch (e) {
      return sendJson(res, 400, { error: e.message || "bad request" });
    }
  }

  // /rooms/:code/...
  if (parts[0] === "rooms" && parts[1]) {
    const code = parts[1].toUpperCase();
    const room = getRoom(code);
    const action = parts[2] || "";

    // GET /rooms/:code  (snapshot)
    if (req.method === "GET" && !action) {
      if (!room) return sendJson(res, 404, { error: "Room not found" });
      return sendJson(res, 200, { room: publicRoom(room) });
    }

    // GET /rooms/:code/events?playerId=  (SSE)
    if (req.method === "GET" && action === "events") {
      if (!room) return sendJson(res, 404, { error: "Room not found" });
      const playerId = url.searchParams.get("playerId");
      const player = room.players[playerId];
      if (!player) return sendJson(res, 403, { error: "Unknown player" });

      cors(res);
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive"
      });
      res.write(`event: connected\ndata: ${JSON.stringify({ ok: true })}\n\n`);
      res.write(`event: room\ndata: ${JSON.stringify(publicRoom(room))}\n\n`);

      player.sse.add(res);
      player.connected = true;
      player.lastSeen = now();
      touchRoom(room);
      broadcastRoom(room, "roster_update");

      const heartbeat = setInterval(() => {
        try {
          res.write(`: ping\n\n`);
        } catch (_) {}
      }, 15000);

      req.on("close", () => {
        clearInterval(heartbeat);
        player.sse.delete(res);
        player.connected = player.sse.size > 0;
        player.lastSeen = now();
        if (!player.connected) {
          setTimeout(() => {
            const r = getRoom(code);
            if (!r) return;
            const p = r.players[playerId];
            if (!p || p.connected) return;
            if (now() - p.lastSeen >= DISCONNECT_GRACE_MS) {
              removePlayer(r, playerId);
            }
          }, DISCONNECT_GRACE_MS + 50);
        }
        broadcastRoom(room, "roster_update");
      });
      return;
    }

    if (!room && action) {
      return sendJson(res, 404, { error: "Room not found" });
    }

    if (req.method === "POST") {
      let body;
      try {
        body = await readBody(req);
      } catch (e) {
        return sendJson(res, 400, { error: e.message || "bad request" });
      }

      // POST join
      if (action === "join") {
        if (room.status !== "lobby") {
          return sendJson(res, 409, { error: "Race already started" });
        }
        if (Object.keys(room.players).length >= MAX_PLAYERS) {
          return sendJson(res, 409, { error: "Room is full" });
        }
        const playerId = uid("p");
        const name = sanitizeName(body.displayName);
        room.players[playerId] = {
          id: playerId,
          name,
          ready: false,
          connected: true,
          progress: 0,
          wpm: 0,
          finished: false,
          result: null,
          lastProgressAt: 0,
          lastSeen: now(),
          sse: new Set()
        };
        touchRoom(room);
        broadcastRoom(room, "roster_update");
        return sendJson(res, 200, { playerId, room: publicRoom(room) });
      }

      const playerId = body.playerId;
      const player = room.players[playerId];
      if (!player && action !== "join") {
        return sendJson(res, 403, { error: "Unknown player" });
      }

      if (action === "leave") {
        removePlayer(room, playerId);
        return sendJson(res, 200, { ok: true });
      }

      if (action === "ready") {
        if (room.status !== "lobby") {
          return sendJson(res, 409, { error: "Not in lobby" });
        }
        player.ready = body.ready !== false ? !player.ready : false;
        if (typeof body.ready === "boolean") player.ready = body.ready;
        player.lastSeen = now();
        touchRoom(room);
        broadcastRoom(room, "roster_update");
        return sendJson(res, 200, { room: publicRoom(room) });
      }

      if (action === "settings") {
        if (playerId !== room.hostId) {
          return sendJson(res, 403, { error: "Host only" });
        }
        if (room.status !== "lobby") {
          return sendJson(res, 409, { error: "Not in lobby" });
        }
        if (body.mode === "classic" || body.mode === "timeTrial") room.mode = body.mode;
        if (["EASY", "MEDIUM", "HARD"].includes(body.difficulty)) room.difficulty = body.difficulty;
        if ([30, 60, 90].includes(body.durationSec)) room.durationSec = body.durationSec;
        touchRoom(room);
        broadcastRoom(room, "roster_update");
        return sendJson(res, 200, { room: publicRoom(room) });
      }

      if (action === "start") {
        if (playerId !== room.hostId) {
          return sendJson(res, 403, { error: "Host only" });
        }
        if (room.status !== "lobby") {
          return sendJson(res, 409, { error: "Not in lobby" });
        }
        const result = startRace(room);
        if (result.error) return sendJson(res, result.status || 400, { error: result.error });
        return sendJson(res, 200, { room: publicRoom(room) });
      }

      if (action === "progress") {
        if (room.status !== "racing" && room.status !== "countdown") {
          return sendJson(res, 409, { error: "Not racing" });
        }
        const t = now();
        if (t - player.lastProgressAt < PROGRESS_MIN_MS) {
          return sendJson(res, 200, { ok: true, throttled: true });
        }
        player.lastProgressAt = t;
        player.lastSeen = t;
        let pct = Number(body.pct);
        if (!Number.isFinite(pct)) pct = 0;
        pct = Math.max(0, Math.min(1, pct));
        // ignore decreases except small reconnect recovery
        if (pct + 0.02 >= player.progress) player.progress = pct;
        let wpm = Number(body.wpm);
        if (Number.isFinite(wpm)) player.wpm = Math.max(0, Math.min(400, Math.round(wpm)));
        broadcast(room, "peers", {
          peers: Object.values(room.players).map((p) => ({
            id: p.id,
            name: p.name,
            progress: p.progress,
            wpm: p.wpm,
            finished: p.finished
          }))
        });
        return sendJson(res, 200, { ok: true });
      }

      if (action === "finish") {
        if (room.status !== "racing") {
          return sendJson(res, 409, { error: "Not racing" });
        }
        if (player.finished) {
          return sendJson(res, 200, { room: publicRoom(room) });
        }
        player.finished = true;
        player.progress = 1;
        player.result = {
          timeMs: Math.max(0, Math.round(Number(body.timeMs) || 0)),
          wpm: Math.max(0, Math.round(Number(body.wpm) || 0)),
          accuracy: Math.max(0, Math.min(100, Math.round(Number(body.accuracy) || 0))),
          score: Math.max(0, Math.round(Number(body.score) || 0))
        };
        player.wpm = player.result.wpm;
        player.lastSeen = now();
        touchRoom(room);
        broadcastRoom(room, "player_finished");
        maybeFinishRace(room);
        return sendJson(res, 200, { room: publicRoom(room) });
      }

      if (action === "rematch") {
        if (playerId !== room.hostId) {
          return sendJson(res, 403, { error: "Host only" });
        }
        if (room.status !== "results" && room.status !== "lobby") {
          return sendJson(res, 409, { error: "Cannot rematch now" });
        }
        rematch(room);
        return sendJson(res, 200, { room: publicRoom(room) });
      }
    }
  }

  sendJson(res, 404, { error: "Not found" });
}

// Room TTL sweeper
setInterval(() => {
  const t = now();
  for (const [code, room] of rooms) {
    if (t > room.expiresAt) cleanupRoom(code);
  }
}, 30_000);

const server = http.createServer((req, res) => {
  handler(req, res).catch((err) => {
    console.error(err);
    sendJson(res, 500, { error: "Internal error" });
  });
});

server.listen(PORT, () => {
  console.log(`Live Race server on http://localhost:${PORT}`);
  console.log(`MIN_PLAYERS=${MIN_PLAYERS}  (set MIN_PLAYERS=1 for solo host tests)`);
});
