/**
 * Live Room Race client — HTTP + SSE wrapper.
 * Base URL from VITE_RACE_URL or same-origin /race proxy.
 */

function resolveBaseUrl() {
  try {
    const env = import.meta.env?.VITE_RACE_URL;
    if (env) return String(env).replace(/\/+$/, "");
  } catch (_) {}
  // Dev: hit race server directly (avoids SSE proxy issues). Prod: same-origin /race reverse-proxy.
  try {
    if (import.meta.env?.DEV) return "http://localhost:8787";
  } catch (_) {}
  if (typeof location !== "undefined") {
    return `${location.origin}/race`;
  }
  return "http://localhost:8787";
}

export class RaceClient {
  constructor() {
    this.baseUrl = resolveBaseUrl();
    this.roomCode = null;
    this.playerId = null;
    this.es = null;
    this.handlers = {};
    this.connected = false;
    this.lastProgressSent = 0;
  }

  on(event, fn) {
    if (!this.handlers[event]) this.handlers[event] = [];
    this.handlers[event].push(fn);
    return () => {
      this.handlers[event] = (this.handlers[event] || []).filter((h) => h !== fn);
    };
  }

  emit(event, data) {
    for (const fn of this.handlers[event] || []) {
      try {
        fn(data);
      } catch (e) {
        console.error("[raceClient]", event, e);
      }
    }
  }

  async health() {
    const res = await fetch(`${this.baseUrl}/health`, { method: "GET" });
    if (!res.ok) throw new Error("Race server unavailable");
    return res.json();
  }

  async createRoom({ mode, difficulty, durationSec, displayName }) {
    const res = await fetch(`${this.baseUrl}/rooms`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode, difficulty, durationSec, displayName })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Create failed");
    this.roomCode = data.roomCode;
    this.playerId = data.playerId;
    this._persistSession();
    this.connectEvents();
    return data;
  }

  async joinRoom(code, displayName) {
    const res = await fetch(`${this.baseUrl}/rooms/${encodeURIComponent(code)}/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ displayName })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Join failed");
    this.roomCode = String(code).toUpperCase();
    this.playerId = data.playerId;
    this._persistSession();
    this.connectEvents();
    return data;
  }

  connectEvents() {
    if (!this.roomCode || !this.playerId) return;
    this.disconnectEvents();
    const url = `${this.baseUrl}/rooms/${this.roomCode}/events?playerId=${encodeURIComponent(this.playerId)}`;
    this.es = new EventSource(url);

    this.es.addEventListener("connected", () => {
      this.connected = true;
      this.emit("connected", {});
    });

    const forward = (name) => {
      this.es.addEventListener(name, (ev) => {
        try {
          const data = JSON.parse(ev.data);
          this.emit(name, data);
        } catch (_) {}
      });
    };

    ["room", "roster_update", "race_start", "racing", "peers", "player_finished", "race_results", "rematch"].forEach(forward);

    this.es.onerror = () => {
      this.connected = false;
      this.emit("disconnect", {});
    };
  }

  disconnectEvents() {
    if (this.es) {
      this.es.close();
      this.es = null;
    }
    this.connected = false;
  }

  async _post(action, body = {}) {
    if (!this.roomCode || !this.playerId) throw new Error("Not in a room");
    const res = await fetch(
      `${this.baseUrl}/rooms/${this.roomCode}/${action}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerId: this.playerId, ...body })
      }
    );
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || `${action} failed`);
    return data;
  }

  leave() {
    const p = this._post("leave").catch(() => {});
    this.disconnectEvents();
    this.roomCode = null;
    this.playerId = null;
    this._clearSession();
    return p;
  }

  setReady(ready) {
    return this._post("ready", { ready });
  }

  updateSettings(settings) {
    return this._post("settings", settings);
  }

  start() {
    return this._post("start");
  }

  sendProgress({ pct, wpm }) {
    const t = Date.now();
    if (t - this.lastProgressSent < 100) return Promise.resolve({ throttled: true });
    this.lastProgressSent = t;
    return this._post("progress", { pct, wpm }).catch(() => {});
  }

  finish(result) {
    return this._post("finish", result);
  }

  rematch() {
    return this._post("rematch");
  }

  _persistSession() {
    try {
      sessionStorage.setItem(
        "tr_live_session",
        JSON.stringify({ roomCode: this.roomCode, playerId: this.playerId })
      );
    } catch (_) {}
  }

  _clearSession() {
    try {
      sessionStorage.removeItem("tr_live_session");
    } catch (_) {}
  }

  getSession() {
    try {
      const raw = sessionStorage.getItem("tr_live_session");
      if (raw) return JSON.parse(raw);
    } catch (_) {}
    return null;
  }
}

export function getRaceBaseUrl() {
  return resolveBaseUrl();
}
