import { RaceClient } from "./src/multiplayer/raceClient.js";
import { sanitizeDisplayName, defaultDisplayName, saveDisplayName } from "./src/multiplayer/nameFilter.js";

const BIBLE_VERSES = [
    {
        text: "Jesus wept.",
        reference: "John 11:35",
        translation: "KJV",
        difficulty: "EASY"
    },
    {
        text: "God is love.",
        reference: "1 John 4:8",
        translation: "NIV",
        difficulty: "EASY"
    },
    {
        text: "Be still, and know that I am God.",
        reference: "Psalm 46:10",
        translation: "ESV",
        difficulty: "EASY"
    },
    {
        text: "Rejoice always.",
        reference: "1 Thessalonians 5:16",
        translation: "NIV",
        difficulty: "EASY"
    },
    {
        text: "In the beginning, God created the heavens and the earth.",
        reference: "Genesis 1:1",
        translation: "ESV",
        difficulty: "EASY"
    },
    {
        text: "The Lord is my light and my salvation.",
        reference: "Psalm 27:1",
        translation: "KJV",
        difficulty: "EASY"
    },
    {
        text: "For I know the plans I have for you.",
        reference: "Jeremiah 29:11",
        translation: "NIV",
        difficulty: "EASY"
    },
    {
        text: "Pray without ceasing.",
        reference: "1 Thessalonians 5:17",
        translation: "KJV",
        difficulty: "EASY"
    },
    {
        text: "Your word is a lamp to my feet.",
        reference: "Psalm 119:105",
        translation: "ESV",
        difficulty: "EASY"
    },
    {
        text: "The Lord is near to the brokenhearted.",
        reference: "Psalm 34:18",
        translation: "ESV",
        difficulty: "EASY"
    },
    {
        text: "I can do all things through Christ.",
        reference: "Philippians 4:13",
        translation: "KJV",
        difficulty: "EASY"
    },
    {
        text: "We walk by faith, not by sight.",
        reference: "2 Corinthians 5:7",
        translation: "ESV",
        difficulty: "EASY"
    },

    {
        text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
        reference: "John 3:16",
        translation: "NIV",
        difficulty: "MEDIUM"
    },
    {
        text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
        reference: "Proverbs 3:5-6",
        translation: "NIV",
        difficulty: "MEDIUM"
    },
    {
        text: "The Lord is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters.",
        reference: "Psalm 23:1-2",
        translation: "KJV",
        difficulty: "MEDIUM"
    },
    {
        text: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",
        reference: "2 Corinthians 5:17",
        translation: "NIV",
        difficulty: "MEDIUM"
    },
    {
        text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",
        reference: "Philippians 4:6",
        translation: "NIV",
        difficulty: "MEDIUM"
    },
    {
        text: "He has shown you, O man, what is good; and what does the Lord require of you but to do justly, to love mercy, and to walk humbly with your God?",
        reference: "Micah 6:8",
        translation: "KJV",
        difficulty: "MEDIUM"
    },
    {
        text: "But seek first the kingdom of God and his righteousness, and all these things will be added to you.",
        reference: "Matthew 6:33",
        translation: "ESV",
        difficulty: "MEDIUM"
    },
    {
        text: "And we know that for those who love God all things work together for good, for those who are called according to his purpose.",
        reference: "Romans 8:28",
        translation: "ESV",
        difficulty: "MEDIUM"
    },
    {
        text: "Have I not commanded you? Be strong and courageous. Do not be frightened, and do not be dismayed, for the Lord your God is with you wherever you go.",
        reference: "Joshua 1:9",
        translation: "ESV",
        difficulty: "MEDIUM"
    },
    {
        text: "Your word is a lamp to my feet and a light to my path. I have sworn an oath and confirmed it, to keep your righteous rules.",
        reference: "Psalm 119:105-106",
        translation: "ESV",
        difficulty: "MEDIUM"
    },
    {
        text: "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee.",
        reference: "Isaiah 41:10",
        translation: "KJV",
        difficulty: "MEDIUM"
    },
    {
        text: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast.",
        reference: "Ephesians 2:8-9",
        translation: "KJV",
        difficulty: "MEDIUM"
    },

    {
        text: "The Lord is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake. Yea, though I walk through the valley of the shadow of death, I will fear no evil.",
        reference: "Psalm 23:1-4",
        translation: "KJV",
        difficulty: "HARD"
    },
    {
        text: "But they that wait upon the Lord shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint. Teach me thy way, O Lord, and lead me in a plain path, because of mine enemies.",
        reference: "Isaiah 40:31 & Psalm 27:11",
        translation: "KJV",
        difficulty: "HARD"
    },
    {
        text: "Therefore, my beloved brothers, be steadfast, immovable, always abounding in the work of the Lord, knowing that in the Lord your labor is not in vain. Be on your guard; stand firm in the faith; be courageous; be strong. Do everything in love.",
        reference: "1 Corinthians 15:58 & 16:13-14",
        translation: "ESV",
        difficulty: "HARD"
    },
    {
        text: "Praise the Lord, my soul; all my inmost being, praise his holy name. Praise the Lord, my soul, and forget not all his benefits—who forgives all your sins and heals all your diseases, who redeems your life from the pit and crowns you with love and compassion.",
        reference: "Psalm 103:1-4",
        translation: "NIV",
        difficulty: "HARD"
    },
    {
        text: "If I speak in the tongues of men or of angels, but do not have love, I am only a resounding gong or a clanging cymbal. If I have the gift of prophecy and can fathom all mysteries and all knowledge, and if I have a faith that can move mountains, but do not have love, I am nothing.",
        reference: "1 Corinthians 13:1-2",
        translation: "NIV",
        difficulty: "HARD"
    },
    {
        text: "Finally, brothers, whatever is true, whatever is honorable, whatever is just, whatever is pure, whatever is lovely, whatever is commendable, if there is any excellence, if there is anything worthy of praise, think about these things. What you have learned and received and heard and seen in me—practice these things, and the God of peace will be with you.",
        reference: "Philippians 4:8-9",
        translation: "ESV",
        difficulty: "HARD"
    },
    {
        text: "For who maketh thee to differ from another? and what hast thou that thou didst not receive? now if thou didst receive it, why dost thou glory, as if thou hadst not received it? Now ye are full, now ye are rich, ye have reigned as kings without us.",
        reference: "1 Corinthians 4:7-8",
        translation: "KJV",
        difficulty: "HARD"
    },
    {
        text: "Put on then, as God's chosen ones, holy and beloved, compassionate hearts, kindness, humility, meekness, and patience, bearing with one another and, if one has a complaint against another, forgiving each other; as the Lord has forgiven you, so you also must forgive.",
        reference: "Colossians 3:12-13",
        translation: "ESV",
        difficulty: "HARD"
    }
];

const ENCOURAGEMENTS = [
    {
        text: "Well done, good and faithful servant; thou hast been faithful over a few things, I will make thee ruler over many things.",
        ref: "Matthew 25:23 [KJV]"
    },
    {
        text: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.",
        ref: "Colossians 3:23 [NIV]"
    },
    {
        text: "I have fought the good fight, I have finished the race, I have kept the faith.",
        ref: "2 Timothy 4:7 [ESV]"
    },
    {
        text: "Let us run with endurance the race that is set before us, looking to Jesus, the founder and perfecter of our faith.",
        ref: "Hebrews 12:1-2 [ESV]"
    },
    {
        text: "Be steadfast, immovable, always abounding in the work of the Lord, knowing that in the Lord your labor is not in vain.",
        ref: "1 Corinthians 15:58 [ESV]"
    }
];

const BIBLE_PASSAGES = [
    { book: "Psalm", chapter: 23, start: 1, end: 6 },
    { book: "Psalm", chapter: 1, start: 1, end: 6 },
    { book: "Psalm", chapter: 19, start: 7, end: 14 },
    { book: "Psalm", chapter: 27, start: 1, end: 6 },
    { book: "Psalm", chapter: 34, start: 1, end: 8 },
    { book: "Psalm", chapter: 91, start: 1, end: 7 },
    { book: "Psalm", chapter: 100, start: 1, end: 5 },
    { book: "Psalm", chapter: 103, start: 1, end: 8 },
    { book: "Psalm", chapter: 119, start: 9, end: 16 },
    { book: "Psalm", chapter: 121, start: 1, end: 8 },
    { book: "Psalm", chapter: 139, start: 1, end: 10 },
    { book: "Psalm", chapter: 150, start: 1, end: 6 },
    { book: "Proverbs", chapter: 3, start: 1, end: 8 },
    { book: "Isaiah", chapter: 40, start: 28, end: 31 },
    { book: "Isaiah", chapter: 55, start: 6, end: 11 },
    { book: "Jeremiah", chapter: 29, start: 11, end: 14 },
    { book: "Matthew", chapter: 5, start: 3, end: 12 },
    { book: "Matthew", chapter: 6, start: 25, end: 34 },
    { book: "Matthew", chapter: 11, start: 28, end: 30 },
    { book: "John", chapter: 1, start: 1, end: 5 },
    { book: "John", chapter: 3, start: 16, end: 21 },
    { book: "John", chapter: 14, start: 1, end: 6 },
    { book: "John", chapter: 15, start: 1, end: 8 },
    { book: "Romans", chapter: 8, start: 28, end: 32 },
    { book: "Romans", chapter: 12, start: 1, end: 5 },
    { book: "1 Corinthians", chapter: 13, start: 1, end: 8 },
    { book: "2 Corinthians", chapter: 5, start: 17, end: 21 },
    { book: "Philippians", chapter: 4, start: 4, end: 9 },
    { book: "Colossians", chapter: 3, start: 12, end: 17 },
    { book: "Hebrews", chapter: 11, start: 1, end: 6 },
    { book: "Hebrews", chapter: 12, start: 1, end: 3 },
    { book: "James", chapter: 1, start: 2, end: 8 },
    { book: "1 Peter", chapter: 5, start: 6, end: 11 },
    { book: "1 John", chapter: 4, start: 7, end: 12 },
    { book: "Revelation", chapter: 21, start: 1, end: 7 },
];

const BIBLE_REFERENCES = [
    { book: "John", chapter: 3, verse: 16 },
    { book: "Psalm", chapter: 23, verse: 1 },
    { book: "Proverbs", chapter: 3, verse: 5 },
    { book: "Philippians", chapter: 4, verse: 13 },
    { book: "Romans", chapter: 8, verse: 28 },
    { book: "Jeremiah", chapter: 29, verse: 11 },
    { book: "Psalm", chapter: 27, verse: 1 },
    { book: "Psalm", chapter: 119, verse: 105 },
    { book: "Isaiah", chapter: 40, verse: 31 },
    { book: "Joshua", chapter: 1, verse: 9 },
    { book: "Psalm", chapter: 34, verse: 18 },
    { book: "2 Corinthians", chapter: 5, verse: 17 },
    { book: "Matthew", chapter: 6, verse: 33 },
    { book: "Psalm", chapter: 46, verse: 10 },
    { book: "Psalm", chapter: 103, verse: 1 },
    { book: "1 Corinthians", chapter: 13, verse: 1 },
    { book: "Colossians", chapter: 3, verse: 12 },
    { book: "Philippians", chapter: 4, verse: 6 },
    { book: "Psalm", chapter: 121, verse: 1 },
    { book: "Genesis", chapter: 1, verse: 1 },
    { book: "Psalm", chapter: 1, verse: 1 },
    { book: "Psalm", chapter: 19, verse: 14 },
    { book: "Psalm", chapter: 51, verse: 10 },
    { book: "Psalm", chapter: 139, verse: 23 },
    { book: "Proverbs", chapter: 16, verse: 3 },
    { book: "Exodus", chapter: 14, verse: 14 },
    { book: "Psalm", chapter: 91, verse: 1 },
    { book: "Psalm", chapter: 100, verse: 1 },
    { book: "Psalm", chapter: 150, verse: 6 },
    { book: "1 John", chapter: 4, verse: 19 },
];

const THEMES = ["sepia", "", "dark", "ocean", "forest"];
const THEME_ICONS = { sepia: "🕯️", dark: "🌙", ocean: "🌊", forest: "🌿", "": "☀️" };

const GAME_MODES = ["classic", "timeTrial", "ghost", "mannaRain", "liveRace"];
const MODE_LABELS = {
    classic: "Classic",
    timeTrial: "Time Trial",
    ghost: "Ghost Race",
    mannaRain: "Manna Rain",
    liveRace: "Live Race"
};

/** Live Room Race session (multiplayer shell) */
const live = {
    client: new RaceClient(),
    active: false,          // in a room
    racing: false,          // countdown or race in progress
    raceMode: "classic",    // classic | timeTrial for engine rules
    room: null,
    peers: [],
    verseChain: null,
    chainIndex: 0,
    finishedLocal: false,
    unsubs: []
};

const MANNA_DIFF = {
    EASY:   { fallSpeed: 40,  maxActive: 2, spawnMs: 1600, lives: 5 },
    MEDIUM: { fallSpeed: 70,  maxActive: 3, spawnMs: 1100, lives: 3 },
    HARD:   { fallSpeed: 110, maxActive: 5, spawnMs: 700,  lives: 2 },
    CUSTOM: { fallSpeed: 70,  maxActive: 3, spawnMs: 1100, lives: 3 }
};

let currentVerse = null;
let currentVerseChars = [];
let typedIndex = 0;
let errors = 0;
let totalKeystrokes = 0;
let timerRAF = null;
let startTime = null;
let isPlaying = false;
let streak = 0;
let soundEnabled = true;
let currentDifficulty = "MEDIUM";
let currentTranslation = "ALL";
let isCustomMode = false;
let isFetching = false;
let sectionOpenedAt = 0;

// Mode system
let currentMode = "classic";
let ttDurationSec = 60;
let ttEndAt = null;
let ttWordsCleared = 0;
let ttVersesCleared = 0;
let ttWordBufferStart = 0;
let activeGhost = null;
let ghostHasOpponent = false;
let manna = null;
let lbViewMode = "classic";

function saveState() {
    try {
        localStorage.setItem("tr_streak", streak);
        localStorage.setItem("tr_difficulty", currentDifficulty);
        localStorage.setItem("tr_translation", currentTranslation);
        localStorage.setItem("tr_sound", soundEnabled ? "1" : "0");
        localStorage.setItem("tr_theme", document.documentElement.getAttribute("data-theme") || "");
        localStorage.setItem("tr_mode", currentMode);
        localStorage.setItem("tr_tt_duration", String(ttDurationSec));
    } catch (e) {}
}

function loadState() {
    try {
        const s = localStorage.getItem("tr_streak");
        if (s !== null) streak = parseInt(s, 10) || 0;

        const d = localStorage.getItem("tr_difficulty");
        if (d !== null && ["EASY", "MEDIUM", "HARD"].includes(d)) {
            currentDifficulty = d;
        }

        const t = localStorage.getItem("tr_translation");
        if (t !== null && ["ALL", "KJV", "NIV", "ESV"].includes(t)) {
            currentTranslation = t;
        }

        const so = localStorage.getItem("tr_sound");
        if (so !== null) soundEnabled = so === "1";

        const th = localStorage.getItem("tr_theme");
        if (th) document.documentElement.setAttribute("data-theme", th);

        const m = localStorage.getItem("tr_mode");
        // Don't restore liveRace as default typing mode after reload
        if (m && GAME_MODES.includes(m) && m !== "liveRace") currentMode = m;

        const td = localStorage.getItem("tr_tt_duration");
        if (td && ["30", "60", "90"].includes(td)) ttDurationSec = parseInt(td, 10);
    } catch (e) {}
}

let audioCtx = null;

const verseContentEl = document.getElementById("verseContent");
const verseReferenceEl = document.getElementById("verseReference");
const typingInputEl = document.getElementById("typingInput");
const scrollWrapperEl = document.getElementById("scrollWrapper");
const liveWpmEl = document.getElementById("liveWpm");
const liveAccuracyEl = document.getElementById("liveAccuracy");
const liveTimerEl = document.getElementById("liveTimer");
const streakBadgeEl = document.getElementById("streakBadge");
const streakTextEl = document.getElementById("streakText");
const soundBtnEl = document.getElementById("soundBtn");
const themeBtnEl = document.getElementById("themeBtn");
const themeMenuEl = document.getElementById("themeMenu");
const themeOptionEls = document.querySelectorAll(".theme-option");
const translationFilterEl = document.getElementById("translationFilter");
const translationWrapperEl = document.querySelector(".select-wrapper");
const parchmentCardEl = document.getElementById("parchmentCard");
const scrollInputContainerEl = document.getElementById("scrollInputContainer");

const modalOverlayEl = document.getElementById("modalOverlay");
const modalWpmEl = document.getElementById("modalWpm");
const modalAccuracyEl = document.getElementById("modalAccuracy");
const modalTimeEl = document.getElementById("modalTime");
const blessingTextEl = document.getElementById("blessingText");
const blessingRefEl = document.getElementById("blessingRef");
const tryAgainBtnEl = document.getElementById("tryAgainBtn");
const newVerseBtnEl = document.getElementById("newVerseBtn");
const appContainerEl = document.querySelector(".app-container");
const customInputAreaEl = document.getElementById("customInputArea");
const customActionsBarEl = document.getElementById("customActionsBar");
const customVerseInputEl = document.getElementById("customVerseInput");
const fetchVerseBtnEl = document.getElementById("fetchVerseBtn");
const fetchPassageBtnEl = document.getElementById("fetchPassageBtn");
const startCustomBtnEl = document.getElementById("startCustomBtn");
const nextVerseBtnEl = document.getElementById("nextVerseBtn");
const statLabelLeftEl = document.getElementById("statLabelLeft");
const statLabelMidEl = document.getElementById("statLabelMid");
const statLabelRightEl = document.getElementById("statLabelRight");
const modalLabelLeftEl = document.getElementById("modalLabelLeft");
const modalLabelMidEl = document.getElementById("modalLabelMid");
const modalLabelRightEl = document.getElementById("modalLabelRight");
const ttDurationStripEl = document.getElementById("ttDurationStrip");
const ghostInfoStripEl = document.getElementById("ghostInfoStrip");
const mannaInfoStripEl = document.getElementById("mannaInfoStrip");
const ghostInfoTextEl = document.getElementById("ghostInfoText");
const ghostRaceTrackEl = document.getElementById("ghostRaceTrack");
const youProgressBarEl = document.getElementById("youProgressBar");
const ghostProgressBarEl = document.getElementById("ghostProgressBar");
const youProgressPctEl = document.getElementById("youProgressPct");
const ghostProgressPctEl = document.getElementById("ghostProgressPct");
const mannaPlayfieldEl = document.getElementById("mannaPlayfield");
const mannaWordsLayerEl = document.getElementById("mannaWordsLayer");
const mannaLivesEl = document.getElementById("mannaLives");
const mannaWordsLeftEl = document.getElementById("mannaWordsLeft");
const modeToastEl = document.getElementById("modeToast");

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function playKeySound(isSpace = false) {
    if (!soundEnabled) return;
    try {
        initAudio();
        if (!audioCtx) return;

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.type = 'triangle';
        const now = audioCtx.currentTime;

        if (isSpace) {
            osc.frequency.setValueAtTime(320, now);
            osc.frequency.exponentialRampToValueAtTime(70, now + 0.04);
            gain.gain.setValueAtTime(0.18, now);
            gain.gain.exponentialRampToValueAtTime(0.005, now + 0.04);
            osc.start(now);
            osc.stop(now + 0.04);
        } else {
            osc.frequency.setValueAtTime(1400, now);
            osc.frequency.exponentialRampToValueAtTime(180, now + 0.018);
            gain.gain.setValueAtTime(0.14, now);
            gain.gain.exponentialRampToValueAtTime(0.005, now + 0.018);
            osc.start(now);
            osc.stop(now + 0.018);
        }
    } catch (e) {
        console.warn("Audio Context playback stalled/failed:", e);
    }
}

function playErrorSound() {
    if (!soundEnabled) return;
    try {
        initAudio();
        if (!audioCtx) return;

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.type = 'sawtooth';
        const now = audioCtx.currentTime;

        osc.frequency.setValueAtTime(150, now);
        osc.frequency.linearRampToValueAtTime(100, now + 0.1);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

        osc.start(now);
        osc.stop(now + 0.1);
    } catch (e) {}
}

function playBellSound() {
    if (!soundEnabled) return;
    try {
        initAudio();
        if (!audioCtx) return;
        const now = audioCtx.currentTime;

        const osc1 = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const gain1 = audioCtx.createGain();
        const gain2 = audioCtx.createGain();

        osc1.type = 'sine';
        osc2.type = 'sine';

        osc1.frequency.setValueAtTime(1750, now);
        osc2.frequency.setValueAtTime(2150, now);

        gain1.gain.setValueAtTime(0.12, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        gain2.gain.setValueAtTime(0.08, now);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc1.connect(gain1);
        osc2.connect(gain2);

        gain1.connect(audioCtx.destination);
        gain2.connect(audioCtx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.4);
        osc2.stop(now + 0.4);
    } catch(e) {}
}

function playStampSound() {
    if (!soundEnabled) return;
    try {
        initAudio();
        if (!audioCtx) return;
        const now = audioCtx.currentTime;

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(90, now);
        osc.frequency.linearRampToValueAtTime(30, now + 0.25);

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now);
        osc.stop(now + 0.25);
    } catch(e) {}
}

function scrollToCurrentChar(el) {
    if (!el) return;
    const container = document.querySelector(".parchment-body") || parchmentCardEl;
    const cRect = container.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();
    if (eRect.bottom > cRect.bottom || eRect.top < cRect.top) {
        el.scrollIntoView({ block: "center", behavior: "smooth" });
    }
}

function setLoading(isLoading) {
    if (isLoading) {
        verseContentEl.className = "verse-content loading";
        verseContentEl.innerHTML = `
            <div class="skeleton-line"></div>
            <div class="skeleton-line"></div>
            <div class="skeleton-line"></div>`;
        verseReferenceEl.innerHTML = `<span>— Loading</span>`;
    } else {
        verseContentEl.classList.remove("loading");
    }
}

async function fetchRandomVerse() {
    if (isFetching) return;
    isFetching = true;
    fetchVerseBtnEl.disabled = true;
    fetchVerseBtnEl.innerHTML = `<span class="spinner"></span> Fetching...`;

    const ref = BIBLE_REFERENCES[Math.floor(Math.random() * BIBLE_REFERENCES.length)];
    const query = `${ref.book.replace(/ /g, "+")}+${ref.chapter}:${ref.verse}`;

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);
        const res = await fetch(`https://bible-api.com/${query}?translation=kjv`, { signal: controller.signal });
        clearTimeout(timeout);
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        const text = data.text.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
        const verse = {
            text,
            reference: data.reference || `${ref.book} ${ref.chapter}:${ref.verse}`,
            translation: "KJV",
            difficulty: text.length < 100 ? "EASY" : text.length < 300 ? "MEDIUM" : "HARD"
        };
        BIBLE_VERSES.push(verse);
        setLoading(false);
        loadVerse(verse);
        fetchVerseBtnEl.textContent = "📖 Fetch Verse";
    } catch (e) {
        fetchVerseBtnEl.textContent = "📖 Fetch Failed — Try Again";
        setTimeout(() => {
            fetchVerseBtnEl.textContent = "📖 Fetch Verse";
        }, 2000);
        setLoading(false);
        loadVerse();
    } finally {
        isFetching = false;
        fetchVerseBtnEl.disabled = false;
    }
}

async function fetchRandomPassage() {
    if (isFetching) return;
    isFetching = true;
    fetchPassageBtnEl.disabled = true;
    fetchPassageBtnEl.innerHTML = `<span class="spinner"></span> Fetching...`;

    const passage = BIBLE_PASSAGES[Math.floor(Math.random() * BIBLE_PASSAGES.length)];
    const query = `${passage.book.replace(/ /g, "+")}+${passage.chapter}:${passage.start}-${passage.end}`;

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);
        const res = await fetch(`https://bible-api.com/${query}?translation=kjv`, { signal: controller.signal });
        clearTimeout(timeout);
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        const text = data.text.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
        const refStr = data.reference || `${passage.book} ${passage.chapter}:${passage.start}-${passage.end}`;
        const verse = {
            text,
            reference: refStr,
            translation: "KJV",
            difficulty: "HARD"
        };
        BIBLE_VERSES.push(verse);
        setLoading(false);
        loadVerse(verse);
        fetchPassageBtnEl.textContent = "📜 Fetch Passage";
    } catch (e) {
        fetchPassageBtnEl.textContent = "📜 Fetch Failed — Try Again";
        setTimeout(() => {
            fetchPassageBtnEl.textContent = "📜 Fetch Passage";
        }, 2000);
        setLoading(false);
        loadVerse();
    } finally {
        isFetching = false;
        fetchPassageBtnEl.disabled = false;
    }
}

function getFilteredVerse() {
    let filtered = BIBLE_VERSES.filter(v => v.difficulty === currentDifficulty);

    if (currentTranslation !== "ALL") {
        filtered = filtered.filter(v => v.translation === currentTranslation);
    }

    if (filtered.length === 0) {
        filtered = [...BIBLE_VERSES];
    }

    const randomIndex = Math.floor(Math.random() * filtered.length);
    return filtered[randomIndex] || BIBLE_VERSES[0];
}

function showModeToast(msg) {
    if (!modeToastEl) return;
    modeToastEl.textContent = msg;
    modeToastEl.classList.add("show");
    setTimeout(() => modeToastEl.classList.remove("show"), 1400);
}

function countWordsInText(text) {
    return (text || "").trim().split(/\s+/).filter(Boolean).length;
}

function resetSharedRunState() {
    if (timerRAF) cancelAnimationFrame(timerRAF);
    timerRAF = null;
    isPlaying = false;
    startTime = null;
    typedIndex = 0;
    errors = 0;
    totalKeystrokes = 0;
    ttEndAt = null;
    ttWordBufferStart = 0;
    typingInputEl.value = "";
    typingInputEl.disabled = false;
    liveTimerEl.classList.remove("urgent");
    if (youProgressBarEl) youProgressBarEl.style.width = "0%";
    if (ghostProgressBarEl) ghostProgressBarEl.style.width = "0%";
    if (youProgressPctEl) youProgressPctEl.textContent = "0%";
    if (ghostProgressPctEl) ghostProgressPctEl.textContent = "0%";
}

function renderVerseChars(text) {
    currentVerseChars = text.split("");
    verseContentEl.innerHTML = "";
    currentVerseChars.forEach((char, idx) => {
        const span = document.createElement("span");
        span.classList.add("char");
        span.textContent = char;
        if (idx === 0) span.classList.add("current");
        verseContentEl.appendChild(span);
    });
}

function loadVerse(selectedVerse = null) {
    if (scrollInputContainerEl) {
        scrollInputContainerEl.classList.add("rolled-shut");
        setTimeout(() => {
            scrollInputContainerEl.classList.remove("rolled-shut");
        }, 50);
    }

    stopMannaRain(false);
    resetSharedRunState();

    if (currentMode !== "mannaRain") {
        parchmentCardEl.classList.remove("manna-mode");
        mannaPlayfieldEl?.classList.add("hidden");
        verseContentEl.style.display = "";
        typingInputEl.placeholder = "Click here and begin typing the verse above...";
    }

    if (engineMode() === "timeTrial") {
        liveWpmEl.textContent = String(ttWordsCleared);
        liveAccuracyEl.innerHTML = `100<span class="stat-unit">%</span>`;
        liveTimerEl.textContent = formatCountdown(ttDurationSec * 1000);
    } else if (currentMode === "mannaRain") {
        liveWpmEl.textContent = "0";
        liveAccuracyEl.innerHTML = `0`;
        liveTimerEl.textContent = String(getMannaLives());
    } else {
        liveWpmEl.textContent = "0";
        liveAccuracyEl.innerHTML = `100<span class="stat-unit">%</span>`;
        liveTimerEl.textContent = "0:00";
    }

    customInputAreaEl.classList.remove("visible");

    currentVerse = selectedVerse || getFilteredVerse();
    renderVerseChars(currentVerse.text);
    verseReferenceEl.innerHTML = `— ${currentVerse.reference} <span class="translation-badge">[${currentVerse.translation}]</span>`;

    if (currentMode === "ghost") {
        activeGhost = getGhost(currentDifficulty);
        ghostHasOpponent = !!activeGhost;
        updateGhostInfoStrip();
        resetGhostBars();
    }

    if (currentMode === "mannaRain") {
        startMannaRain(currentVerse);
    }
}

function startRaceTimer() {
    isPlaying = true;
    startTime = Date.now();
    if (engineMode() === "timeTrial") {
        ttEndAt = startTime + ttDurationSec * 1000;
    }
    tick();
}

function formatCountdown(ms) {
    const total = Math.max(0, Math.ceil(ms / 1000));
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function tick() {
    if (!isPlaying) return;
    const now = Date.now();
    const mode = engineMode();

    if (mode === "timeTrial") {
        const remaining = (ttEndAt || now) - now;
        liveTimerEl.textContent = formatCountdown(remaining);
        if (remaining <= 10000) liveTimerEl.classList.add("urgent");
        else liveTimerEl.classList.remove("urgent");
        updateLiveStats();
        pushLiveProgress();
        if (remaining <= 0) {
            endTimeTrial();
            return;
        }
    } else if (currentMode === "mannaRain") {
        tickMannaRain(now);
        updateLiveStats();
    } else {
        const elapsed = now - startTime;
        const diffSeconds = Math.floor(elapsed / 1000);
        const minutes = Math.floor(diffSeconds / 60);
        const seconds = diffSeconds % 60;
        liveTimerEl.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
        if (currentMode === "ghost") updateGhostProgress(now);
        updateLiveStats();
        pushLiveProgress();
    }

    timerRAF = requestAnimationFrame(tick);
}

function updateLiveStats() {
    if (currentMode === "mannaRain") {
        if (!manna) return;
        liveWpmEl.textContent = String(manna.score);
        liveAccuracyEl.textContent = String(manna.combo);
        liveTimerEl.textContent = String(manna.lives);
        return;
    }

    if (!startTime) return;
    const elapsedMinutes = (Date.now() - startTime) / 1000 / 60;
    const accuracy = totalKeystrokes > 0 ? Math.round(((totalKeystrokes - errors) / totalKeystrokes) * 100) : 100;
    const mode = engineMode();

    if (mode === "timeTrial") {
        liveWpmEl.textContent = String(ttWordsCleared);
        liveAccuracyEl.innerHTML = `${Math.max(0, accuracy)}<span class="stat-unit">%</span>`;
        return;
    }

    let wpm = 0;
    if (elapsedMinutes > 0) {
        wpm = Math.round((typedIndex / 5) / elapsedMinutes);
    }
    liveWpmEl.textContent = wpm;
    liveAccuracyEl.innerHTML = `${Math.max(0, accuracy)}<span class="stat-unit">%</span>`;

    if (currentMode === "ghost" && ghostHasOpponent && activeGhost) {
        const userPct = currentVerseChars.length ? typedIndex / currentVerseChars.length : 0;
        const ghostPct = Math.min(1, (Date.now() - startTime) / activeGhost.durationMs);
        const deltaSec = ((userPct - ghostPct) * activeGhost.durationMs) / 1000;
        if (youProgressPctEl) {
            const sign = deltaSec >= 0 ? "−" : "+";
            youProgressPctEl.title = `Δ ${sign}${Math.abs(deltaSec).toFixed(1)}s vs ghost`;
        }
    }
}

function currentLivePct() {
    if (engineMode() === "timeTrial") {
        // Approximate progress by time elapsed for peer bar (score shown via wpm field)
        if (!startTime || !ttDurationSec) return 0;
        return Math.min(1, (Date.now() - startTime) / (ttDurationSec * 1000));
    }
    if (!currentVerseChars.length) return 0;
    return typedIndex / currentVerseChars.length;
}

function currentLiveWpm() {
    if (engineMode() === "timeTrial") return ttWordsCleared;
    if (!startTime) return 0;
    const elapsedMinutes = (Date.now() - startTime) / 1000 / 60;
    if (elapsedMinutes <= 0) return 0;
    return Math.round((typedIndex / 5) / elapsedMinutes);
}

function pushLiveProgress() {
    if (!live.racing || live.finishedLocal || !live.client.playerId) return;
    live.client.sendProgress({ pct: currentLivePct(), wpm: currentLiveWpm() });
}

function triggerShakeEffect() {
    parchmentCardEl.classList.add("shake-animation");
    setTimeout(() => {
        parchmentCardEl.classList.remove("shake-animation");
    }, 250);
}

function openResultModal({ title, subtitle, left, mid, right, leftLabel, midLabel, rightLabel }) {
    const titleEl = document.getElementById("modalTitle");
    const subEl = document.querySelector(".modal-subtitle");
    if (titleEl) titleEl.textContent = title;
    if (subEl) subEl.textContent = subtitle;
    if (modalLabelLeftEl) modalLabelLeftEl.textContent = leftLabel || "Final WPM";
    if (modalLabelMidEl) modalLabelMidEl.textContent = midLabel || "Accuracy";
    if (modalLabelRightEl) modalLabelRightEl.textContent = rightLabel || "Time Taken";
    modalWpmEl.textContent = left;
    modalAccuracyEl.textContent = mid;
    modalTimeEl.textContent = right;

    const encouragement = ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
    blessingTextEl.textContent = `"${encouragement.text}"`;
    blessingRefEl.textContent = `— ${encouragement.ref}`;

    modalOverlayEl.classList.add("active");
    appContainerEl.setAttribute("aria-hidden", "true");
    setTimeout(() => tryAgainBtnEl.focus(), 450);
    setTimeout(() => playStampSound(), 600);
}

function completeVerse() {
    if (engineMode() === "timeTrial") {
        onTimeTrialVerseComplete();
        return;
    }

    if (timerRAF) cancelAnimationFrame(timerRAF);
    timerRAF = null;
    isPlaying = false;
    playBellSound();

    const finalTimeMs = Math.max(1, Date.now() - startTime);
    const finalTimeSeconds = Math.max(1, Math.floor(finalTimeMs / 1000));
    const finalWpm = Math.round((typedIndex / 5) / (finalTimeSeconds / 60));
    const finalAccuracy = totalKeystrokes > 0 ? Math.round(((totalKeystrokes - errors) / totalKeystrokes) * 100) : 100;
    const ref = currentVerse?.reference || "Custom";

    // Live Race classic finish — submit to room, wait for podium
    if (currentMode === "liveRace" && live.racing) {
        live.finishedLocal = true;
        typingInputEl.disabled = true;
        live.client.sendProgress({ pct: 1, wpm: finalWpm });
        live.client.finish({
            timeMs: finalTimeMs,
            wpm: finalWpm,
            accuracy: Math.max(0, finalAccuracy),
            score: finalWpm
        }).catch(() => {});
        addHistoryEntry("liveRace", finalWpm, Math.max(0, finalAccuracy), currentDifficulty, ref, {
            durationMs: finalTimeMs,
            live: true
        });
        addHighScore("liveRace", currentDifficulty, finalWpm, Math.max(0, finalAccuracy), ref, {
            timeMs: finalTimeMs
        });
        showModeToast("Finished — waiting for others…");
        return;
    }

    if (currentMode === "ghost") {
        const won = !ghostHasOpponent || finalTimeMs <= activeGhost.durationMs;
        maybeSaveGhost({
            durationMs: finalTimeMs,
            charCount: typedIndex,
            wpm: finalWpm,
            accuracy: Math.max(0, finalAccuracy),
            ref
        });
        addHighScore(currentMode, currentDifficulty, finalWpm, Math.max(0, finalAccuracy), ref, { won });
        addHistoryEntry(currentMode, finalWpm, Math.max(0, finalAccuracy), currentDifficulty, ref, { won, durationMs: finalTimeMs });
        streak++;
        updateStreakDisplay();
        saveState();

        const delta = activeGhost ? ((finalTimeMs - activeGhost.durationMs) / 1000) : 0;
        const deltaStr = won ? `−${Math.abs(delta).toFixed(1)}s` : `+${Math.abs(delta).toFixed(1)}s`;
        const timeStr = finalTimeSeconds >= 60
            ? `${Math.floor(finalTimeSeconds / 60)}m ${finalTimeSeconds % 60}s`
            : `${finalTimeSeconds}s`;

        openResultModal({
            title: !ghostHasOpponent ? "Shadow Set" : (won ? "Shadow Defeated" : "Shadow Prevails"),
            subtitle: !ghostHasOpponent ? "Your first mark is recorded" : (won ? "You outpaced your former self" : "Your former self was faster"),
            left: finalWpm,
            mid: `${Math.max(0, finalAccuracy)}%`,
            right: ghostHasOpponent ? deltaStr : timeStr,
            leftLabel: "Final WPM",
            midLabel: "Accuracy",
            rightLabel: ghostHasOpponent ? "Δ vs Ghost" : "Time Taken"
        });
        return;
    }

    // Classic
    addHighScore(currentMode, currentDifficulty, finalWpm, Math.max(0, finalAccuracy), ref);
    addHistoryEntry(currentMode, finalWpm, Math.max(0, finalAccuracy), currentDifficulty, ref);
    streak++;
    updateStreakDisplay();
    saveState();

    const minutes = Math.floor(finalTimeSeconds / 60);
    const seconds = finalTimeSeconds % 60;
    openResultModal({
        title: "Scripture Completed",
        subtitle: "Your labor in the Lord is not in vain",
        left: finalWpm,
        mid: `${Math.max(0, finalAccuracy)}%`,
        right: minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`,
        leftLabel: "Final WPM",
        midLabel: "Accuracy",
        rightLabel: "Time Taken"
    });
}

/* ==========================
   TIME TRIAL
   ========================== */

function beginTimeTrialSession() {
    ttWordsCleared = 0;
    ttVersesCleared = 0;
    ttEndAt = null;
    loadVerse();
}

function onTimeTrialVerseComplete() {
    const words = countWordsInText(currentVerse?.text || "");
    ttWordsCleared += words;
    ttVersesCleared += 1;
    showModeToast(`Verse cleared · ${ttVersesCleared}`);
    playBellSound();
    liveWpmEl.textContent = String(ttWordsCleared);
    // Keep timer running; load next verse without resetting session score
    const keepEnd = ttEndAt;
    const keepStart = startTime;
    const keepErrors = errors;
    const keepKeys = totalKeystrokes;
    const keepWords = ttWordsCleared;
    const keepVerses = ttVersesCleared;

    if (scrollInputContainerEl) {
        scrollInputContainerEl.classList.add("rolled-shut");
        setTimeout(() => scrollInputContainerEl.classList.remove("rolled-shut"), 50);
    }

    typedIndex = 0;
    ttWordBufferStart = 0;
    typingInputEl.value = "";

    // Live Race: advance shared chain; solo: random filtered verse
    if (currentMode === "liveRace" && live.verseChain?.length) {
        live.chainIndex = (live.chainIndex + 1) % live.verseChain.length;
        currentVerse = live.verseChain[live.chainIndex];
    } else {
        currentVerse = getFilteredVerse();
    }
    renderVerseChars(currentVerse.text);
    verseReferenceEl.innerHTML = `— ${currentVerse.reference} <span class="translation-badge">[${currentVerse.translation}]</span>`;

    ttEndAt = keepEnd;
    startTime = keepStart;
    errors = keepErrors;
    totalKeystrokes = keepKeys;
    ttWordsCleared = keepWords;
    ttVersesCleared = keepVerses;
    isPlaying = true;
    liveWpmEl.textContent = String(ttWordsCleared);
    pushLiveProgress();
}

function endTimeTrial() {
    if (timerRAF) cancelAnimationFrame(timerRAF);
    timerRAF = null;
    isPlaying = false;
    typingInputEl.disabled = true;
    playBellSound();

    const finalAccuracy = totalKeystrokes > 0 ? Math.round(((totalKeystrokes - errors) / totalKeystrokes) * 100) : 100;
    const peakWpm = startTime
        ? Math.round((typedIndex / 5) / Math.max(0.01, (Date.now() - startTime) / 1000 / 60))
        : 0;
    const finalTimeMs = startTime ? Math.max(1, Date.now() - startTime) : ttDurationSec * 1000;

    if (currentMode === "liveRace" && live.racing) {
        live.finishedLocal = true;
        live.client.sendProgress({ pct: 1, wpm: ttWordsCleared });
        live.client.finish({
            timeMs: finalTimeMs,
            wpm: peakWpm,
            accuracy: Math.max(0, finalAccuracy),
            score: ttWordsCleared
        }).catch(() => {});
        addHistoryEntry("liveRace", ttWordsCleared, Math.max(0, finalAccuracy), currentDifficulty, "Live Time Trial", {
            score: ttWordsCleared,
            verses: ttVersesCleared,
            duration: ttDurationSec,
            live: true
        });
        addHighScore("liveRace", currentDifficulty, ttWordsCleared, Math.max(0, finalAccuracy), "Live Time Trial", {
            score: ttWordsCleared,
            verses: ttVersesCleared,
            duration: ttDurationSec
        });
        showModeToast("Time's up — waiting for results…");
        return;
    }

    addHighScore(currentMode, currentDifficulty, ttWordsCleared, Math.max(0, finalAccuracy), "multi", {
        score: ttWordsCleared,
        verses: ttVersesCleared,
        duration: ttDurationSec
    });
    addHistoryEntry(currentMode, ttWordsCleared, Math.max(0, finalAccuracy), currentDifficulty, "Time Trial", {
        score: ttWordsCleared,
        verses: ttVersesCleared,
        duration: ttDurationSec,
        peakWpm
    });

    streak += ttVersesCleared > 0 ? 1 : 0;
    updateStreakDisplay();
    saveState();

    openResultModal({
        title: "Time's Up",
        subtitle: "Trial complete — well fought",
        left: ttWordsCleared,
        mid: `${Math.max(0, finalAccuracy)}%`,
        right: String(ttVersesCleared),
        leftLabel: "Words",
        midLabel: "Accuracy",
        rightLabel: "Verses"
    });
    typingInputEl.disabled = false;
}

/* ==========================
   GHOST RACE
   ========================== */

const GHOST_KEY = "tr_ghosts";

function getGhosts() {
    try {
        const raw = localStorage.getItem(GHOST_KEY);
        if (raw) return JSON.parse(raw);
    } catch (e) {}
    return {};
}

function getGhost(difficulty) {
    const all = getGhosts();
    return all[difficulty] || null;
}

function maybeSaveGhost(ghost) {
    const all = getGhosts();
    const prev = all[currentDifficulty];
    if (!prev || ghost.wpm > prev.wpm || (ghost.wpm === prev.wpm && ghost.durationMs < prev.durationMs)) {
        all[currentDifficulty] = { ...ghost, recordedAt: Date.now() };
        try { localStorage.setItem(GHOST_KEY, JSON.stringify(all)); } catch (e) {}
    }
}

function updateGhostInfoStrip() {
    if (!ghostInfoTextEl) return;
    const g = getGhost(currentDifficulty);
    if (!g) {
        ghostInfoTextEl.textContent = "No shadow yet — finish a run to set your mark.";
    } else {
        ghostInfoTextEl.textContent = `Shadow: ${g.wpm} WPM · ${(g.durationMs / 1000).toFixed(1)}s · ${g.ref}`;
    }
}

function resetGhostBars() {
    if (youProgressBarEl) youProgressBarEl.style.width = "0%";
    if (ghostProgressBarEl) ghostProgressBarEl.style.width = ghostHasOpponent ? "0%" : "0%";
    if (youProgressPctEl) youProgressPctEl.textContent = "0%";
    if (ghostProgressPctEl) ghostProgressPctEl.textContent = ghostHasOpponent ? "0%" : "—";
}

function updateGhostProgress(now) {
    if (!currentVerseChars.length) return;
    const youPct = Math.min(100, (typedIndex / currentVerseChars.length) * 100);
    if (youProgressBarEl) youProgressBarEl.style.width = `${youPct}%`;
    if (youProgressPctEl) youProgressPctEl.textContent = `${Math.round(youPct)}%`;

    if (ghostHasOpponent && activeGhost) {
        const gPct = Math.min(100, ((now - startTime) / activeGhost.durationMs) * 100);
        if (ghostProgressBarEl) ghostProgressBarEl.style.width = `${gPct}%`;
        if (ghostProgressPctEl) ghostProgressPctEl.textContent = `${Math.round(gPct)}%`;
    }
}

/* ==========================
   MANNA RAIN
   ========================== */

function getMannaLives() {
    return (MANNA_DIFF[currentDifficulty] || MANNA_DIFF.MEDIUM).lives;
}

function splitVerseWords(text) {
    return (text || "")
        .split(/\s+/)
        .map(w => w.replace(/^[“"'(]+|[”"'.,;:!?)]+$/g, ""))
        .filter(w => w.length > 0);
}

function stopMannaRain(clearDom = true) {
    if (manna && manna.raf) cancelAnimationFrame(manna.raf);
    manna = null;
    if (clearDom && mannaWordsLayerEl) mannaWordsLayerEl.innerHTML = "";
    // Clean up dynamic manna overlays
    if (mannaPlayfieldEl) {
        mannaPlayfieldEl.querySelectorAll(".manna-danger-zone, .manna-particles, .manna-combo-display").forEach(el => el.remove());
        mannaPlayfieldEl.classList.remove("life-lost");
    }
}

function createMannaOverlays() {
    if (!mannaPlayfieldEl) return;
    // Danger zone
    if (!mannaPlayfieldEl.querySelector(".manna-danger-zone")) {
        const dz = document.createElement("div");
        dz.className = "manna-danger-zone";
        mannaPlayfieldEl.appendChild(dz);
    }
    // Background particle rain
    let particleContainer = mannaPlayfieldEl.querySelector(".manna-particles");
    if (!particleContainer) {
        particleContainer = document.createElement("div");
        particleContainer.className = "manna-particles";
        mannaPlayfieldEl.appendChild(particleContainer);
        for (let i = 0; i < 18; i++) {
            const p = document.createElement("div");
            p.className = "manna-particle";
            p.style.left = `${Math.random() * 100}%`;
            p.style.animationDuration = `${3 + Math.random() * 4}s`;
            p.style.animationDelay = `${Math.random() * 4}s`;
            p.style.width = p.style.height = `${2 + Math.random() * 3}px`;
            p.style.opacity = `${0.1 + Math.random() * 0.15}`;
            particleContainer.appendChild(p);
        }
    }
    // Combo display
    if (!mannaPlayfieldEl.querySelector(".manna-combo-display")) {
        const combo = document.createElement("div");
        combo.className = "manna-combo-display";
        combo.id = "mannaComboDisplay";
        mannaPlayfieldEl.appendChild(combo);
    }
}

function spawnMannaBurst(x, y) {
    if (!mannaPlayfieldEl) return;
    const colors = ["#BFA15F", "#6B7C3A", "#D4A853", "#8B6B4A"];
    for (let i = 0; i < 8; i++) {
        const dot = document.createElement("div");
        dot.className = "manna-burst";
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
        dot.style.background = colors[i % colors.length];
        const angle = (Math.PI * 2 / 8) * i + (Math.random() - 0.5) * 0.5;
        const dist = 25 + Math.random() * 30;
        dot.style.setProperty("--tx", `${Math.cos(angle) * dist}px`);
        dot.style.setProperty("--ty", `${Math.sin(angle) * dist}px`);
        dot.animate([
            { transform: "translate(0,0) scale(1)", opacity: 1 },
            { transform: `translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist}px) scale(0.2)`, opacity: 0 }
        ], { duration: 400 + Math.random() * 200, easing: "ease-out", fill: "forwards" });
        mannaPlayfieldEl.appendChild(dot);
        setTimeout(() => dot.remove(), 700);
    }
}

function showMannaCombo(combo) {
    const el = document.getElementById("mannaComboDisplay");
    if (!el) return;
    if (combo < 2) {
        el.classList.remove("visible");
        return;
    }
    const mult = 1 + Math.floor(combo / 5) * 0.25;
    el.textContent = `${combo}× Combo` + (mult > 1 ? ` · ${mult.toFixed(2)}x` : "");
    el.classList.remove("visible");
    void el.offsetWidth; // reflow to retrigger animation
    el.classList.add("visible");
}

function updateLockedWordHighlight(word, buffer) {
    if (!word || !word.el || buffer.length === 0) return;
    const typed = buffer.length;
    const text = word.text;
    word.el.innerHTML = `<span class="typed-part">${text.substring(0, typed)}</span>${text.substring(typed)}`;
}

function startMannaRain(verse) {
    stopMannaRain(true);
    const cfg = MANNA_DIFF[currentDifficulty] || MANNA_DIFF.MEDIUM;
    const words = splitVerseWords(verse.text);
    const now = performance.now();
    manna = {
        queue: [...words],
        active: [],
        score: 0,
        combo: 0,
        lives: cfg.lives,
        cfg,
        baseFallSpeed: cfg.fallSpeed,
        lastSpawn: now,
        lastTs: now,
        buffer: "",
        lockedId: null,
        running: true,
        finished: false,
        totalWords: words.length,
        cleared: 0,
        errors: 0,
        keystrokes: 0
    };
    updateMannaHud();
    parchmentCardEl.classList.add("manna-mode");
    mannaPlayfieldEl?.classList.remove("hidden");
    verseContentEl.style.display = "none";
    typingInputEl.placeholder = "Type a falling word…";
    liveWpmEl.textContent = "0";
    liveAccuracyEl.textContent = "0";
    liveTimerEl.textContent = String(cfg.lives);

    // Create visual overlays (danger zone, particles, combo counter)
    createMannaOverlays();

    // Auto-start: spawn initial word(s) and begin the animation loop
    spawnMannaWord();
    isPlaying = true;
    startTime = Date.now();
    tick();
    typingInputEl.focus();
}

function updateMannaHud() {
    if (!manna) return;
    if (mannaLivesEl) mannaLivesEl.textContent = "❤".repeat(Math.max(0, manna.lives)) || "✕";
    if (mannaWordsLeftEl) {
        const left = manna.queue.length + manna.active.length;
        mannaWordsLeftEl.textContent = `${left} word${left === 1 ? "" : "s"} left`;
    }
}

function spawnMannaWord() {
    if (!manna || !mannaWordsLayerEl) return;
    if (manna.queue.length === 0) return;
    if (manna.active.length >= manna.cfg.maxActive) return;

    const text = manna.queue.shift();
    const el = document.createElement("div");
    el.className = "falling-word";
    el.textContent = text;
    mannaWordsLayerEl.appendChild(el);

    // Measure element width to keep it within bounds
    const elW = el.offsetWidth || 60;
    const fieldW = mannaPlayfieldEl.clientWidth || 300;
    const maxX = Math.max(10, fieldW - elW - 10);
    const x = 10 + Math.random() * maxX;
    const startY = 30; // below HUD
    el.style.transform = `translate(${x}px, ${startY}px)`;

    const id = `w_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    manna.active.push({ id, text, x, y: startY, el });
    updateMannaHud();
}

function tickMannaRain(now) {
    if (!manna || manna.finished) return;
    if (!manna.running) return;

    const ts = performance.now();
    const dt = Math.min(0.05, (ts - manna.lastTs) / 1000);
    manna.lastTs = ts;

    if (ts - manna.lastSpawn >= manna.cfg.spawnMs) {
        spawnMannaWord();
        manna.lastSpawn = ts;
    }

    // Speed-up progression: +8% fall speed per 10 words cleared
    const speedMult = 1 + Math.floor(manna.cleared / 10) * 0.08;
    const currentFallSpeed = manna.baseFallSpeed * speedMult;

    const fieldH = mannaPlayfieldEl?.clientHeight || 420;
    const groundY = fieldH - 28;
    const dangerY = fieldH - 80; // danger zone threshold
    const remaining = [];
    for (const w of manna.active) {
        w.y += currentFallSpeed * dt;
        w.el.style.transform = `translate(${w.x}px, ${w.y}px)`;

        // Danger zone visual feedback
        if (w.y >= dangerY && !w.el.classList.contains("in-danger")) {
            w.el.classList.add("in-danger");
        } else if (w.y < dangerY && w.el.classList.contains("in-danger")) {
            w.el.classList.remove("in-danger");
        }

        if (w.y >= groundY) {
            w.el.remove();
            manna.lives -= 1;
            manna.combo = 0;
            manna.lockedId = null;
            manna.buffer = "";
            typingInputEl.value = "";
            playErrorSound();
            triggerShakeEffect();
            // Life-lost red flash on playfield
            mannaPlayfieldEl?.classList.remove("life-lost");
            void mannaPlayfieldEl?.offsetWidth;
            mannaPlayfieldEl?.classList.add("life-lost");
            showMannaCombo(0);
            updateMannaHud();
            updateLiveStats();
            if (manna.lives <= 0) {
                endMannaRain(false);
                return;
            }
        } else {
            remaining.push(w);
        }
    }
    manna.active = remaining;

    if (manna.queue.length === 0 && manna.active.length === 0) {
        endMannaRain(true);
    }
}

function handleMannaInput() {
    if (!manna || manna.finished) return;

    const buffer = typingInputEl.value;
    manna.buffer = buffer;
    manna.keystrokes = (manna.keystrokes || 0) + 1;

    const candidates = manna.active.filter(w => w.text.startsWith(buffer));
    // Reset all words to plain text (remove highlighting)
    manna.active.forEach(w => {
        w.el.classList.remove("locked");
        if (w.el.querySelector(".typed-part")) {
            w.el.textContent = w.text;
        }
    });

    if (buffer.length === 0) {
        manna.lockedId = null;
        return;
    }

    if (candidates.length === 0) {
        playErrorSound();
        manna.errors = (manna.errors || 0) + 1;
        manna.combo = 0;
        showMannaCombo(0);
        typingInputEl.value = "";
        manna.buffer = "";
        manna.lockedId = null;
        updateLiveStats();
        return;
    }

    let target;
    if (candidates.length === 1) {
        target = candidates[0];
    } else {
        target = candidates.reduce((a, b) => (a.y >= b.y ? a : b));
    }
    manna.lockedId = target.id;
    target.el.classList.add("locked");
    // Partial-match highlighting: show typed letters in green
    updateLockedWordHighlight(target, buffer);

    if (buffer === target.text) {
        // Burst particle effect at word position
        spawnMannaBurst(target.x + 30, target.y + 10);

        // Clear word
        target.el.classList.add("cleared");
        setTimeout(() => target.el.remove(), 250);
        manna.active = manna.active.filter(w => w.id !== target.id);
        manna.combo += 1;
        manna.cleared += 1;
        const mult = 1 + Math.floor(manna.combo / 5) * 0.25;
        manna.score += Math.round(target.text.length * mult);
        typingInputEl.value = "";
        manna.buffer = "";
        manna.lockedId = null;
        playKeySound(false);

        // Show combo counter
        showMannaCombo(manna.combo);

        updateMannaHud();
        updateLiveStats();

        if (manna.queue.length === 0 && manna.active.length === 0) {
            endMannaRain(true);
        }
    }
}

function endMannaRain(won) {
    if (!manna || manna.finished) return;
    manna.finished = true;
    manna.running = false;
    if (timerRAF) cancelAnimationFrame(timerRAF);
    timerRAF = null;
    isPlaying = false;
    playBellSound();

    const acc = manna.keystrokes > 0
        ? Math.round(((manna.keystrokes - (manna.errors || 0)) / manna.keystrokes) * 100)
        : 100;
    const ref = currentVerse?.reference || "Custom";

    addHighScore(currentMode, currentDifficulty, manna.score, Math.max(0, acc), ref, {
        score: manna.score,
        combo: manna.combo,
        won
    });
    addHistoryEntry(currentMode, manna.score, Math.max(0, acc), currentDifficulty, ref, {
        score: manna.score,
        combo: manna.combo,
        won,
        livesLeft: manna.lives
    });

    if (won) {
        streak++;
        updateStreakDisplay();
    }
    saveState();

    openResultModal({
        title: won ? "Word Gathered" : "Fell on Rocky Ground",
        subtitle: won ? "Every word collected" : "The rain overcame you",
        left: manna.score,
        mid: String(manna.combo),
        right: String(manna.lives),
        leftLabel: "Score",
        midLabel: "Max Combo",
        rightLabel: "Lives Left"
    });
}

/* ==========================
   MODE UI / SWITCHING
   ========================== */

function applyModeChrome() {
    document.querySelectorAll('input[name="gameMode"]').forEach(r => {
        r.checked = r.value === currentMode;
    });

    const liveInfoStripEl = document.getElementById("liveInfoStrip");
    const livePeerTrackEl = document.getElementById("livePeerTrack");

    ttDurationStripEl?.classList.toggle("hidden", currentMode !== "timeTrial");
    ghostInfoStripEl?.classList.toggle("hidden", currentMode !== "ghost");
    mannaInfoStripEl?.classList.toggle("hidden", currentMode !== "mannaRain");
    liveInfoStripEl?.classList.toggle("hidden", currentMode !== "liveRace");
    ghostRaceTrackEl?.classList.toggle("hidden", currentMode !== "ghost");
    if (ghostRaceTrackEl) ghostRaceTrackEl.setAttribute("aria-hidden", currentMode !== "ghost" ? "true" : "false");
    if (livePeerTrackEl && !live.racing) {
        livePeerTrackEl.classList.add("hidden");
        livePeerTrackEl.setAttribute("aria-hidden", "true");
    }

    document.querySelectorAll("#ttDurationStrip .duration-chip").forEach(btn => {
        btn.classList.toggle("active", parseInt(btn.dataset.duration, 10) === ttDurationSec);
    });

    // Toggle manna-active body class for immersive layout
    document.body.classList.toggle("manna-active", currentMode === "mannaRain");

    // Reset manna chrome when leaving
    if (currentMode !== "mannaRain") {
        parchmentCardEl.classList.remove("manna-mode");
        mannaPlayfieldEl?.classList.add("hidden");
        verseContentEl.style.display = "";
        typingInputEl.placeholder = "Click here and begin typing the verse above...";
    }

    if (statLabelLeftEl && statLabelMidEl && statLabelRightEl) {
        const engineMode = (currentMode === "liveRace" && live.racing) ? live.raceMode : currentMode;
        if (engineMode === "timeTrial") {
            statLabelLeftEl.textContent = "Score";
            statLabelMidEl.textContent = "Accuracy";
            statLabelRightEl.textContent = "Countdown";
        } else if (currentMode === "mannaRain") {
            statLabelLeftEl.textContent = "Score";
            statLabelMidEl.textContent = "Combo";
            statLabelRightEl.textContent = "Lives";
        } else {
            statLabelLeftEl.textContent = "WPM";
            statLabelMidEl.textContent = "Accuracy";
            statLabelRightEl.textContent = "Timer";
        }
    }

    if (currentMode === "ghost") updateGhostInfoStrip();
    if (currentMode === "timeTrial" || (currentMode === "liveRace" && live.raceMode === "timeTrial" && live.racing)) {
        liveWpmEl.textContent = "0";
        liveTimerEl.textContent = formatCountdown(ttDurationSec * 1000);
    }
}

function engineMode() {
    if (currentMode === "liveRace" && live.racing) return live.raceMode;
    return currentMode;
}

function switchMode(nextMode, { force = false } = {}) {
    if (!GAME_MODES.includes(nextMode)) return;
    if (nextMode === currentMode && !force && nextMode !== "liveRace") return;

    if ((isPlaying || live.racing) && !force) {
        const ok = confirm("Leave this race? Progress will be lost.");
        if (!ok) {
            document.querySelectorAll('input[name="gameMode"]').forEach(r => {
                r.checked = r.value === currentMode;
            });
            return;
        }
    }

    if (live.active && nextMode !== "liveRace") {
        leaveLiveRoom({ silent: true });
    }

    stopMannaRain(true);
    resetSharedRunState();
    currentMode = nextMode;
    lbViewMode = nextMode === "mannaRain" ? "mannaRain" : (nextMode === "liveRace" ? "classic" : nextMode);
    applyModeChrome();
    if (nextMode !== "liveRace") saveState();

    if (currentMode === "liveRace") {
        verseContentEl.textContent = "Open the lobby to create or join a Live Race.";
        verseReferenceEl.innerHTML = `— Live Room Race <span class="translation-badge">[CONTEST]</span>`;
        typingInputEl.value = "";
        typingInputEl.disabled = true;
        typingInputEl.placeholder = "Join a room to race…";
        openLiveLobby();
        return;
    }

    typingInputEl.disabled = false;
    typingInputEl.placeholder = "Click here and begin typing the verse above...";

    if (currentMode === "timeTrial") {
        beginTimeTrialSession();
    } else {
        ttWordsCleared = 0;
        ttVersesCleared = 0;
        loadVerse();
    }
    typingInputEl.focus();
}

function updateStreakDisplay() {
    if (streak > 0) {
        streakTextEl.textContent = `${streak} Verse Streak!`;
        streakBadgeEl.style.visibility = "visible";
        streakBadgeEl.classList.add("updated");
        setTimeout(() => {
            streakBadgeEl.classList.remove("updated");
        }, 400);
    } else {
        streakBadgeEl.style.visibility = "hidden";
    }
}

typingInputEl.addEventListener("input", (e) => {
    if (currentMode === "mannaRain") {
        handleMannaInput();
        return;
    }

    const inputVal = typingInputEl.value;

    if (!currentVerseChars || currentVerseChars.length === 0) {
        typingInputEl.value = "";
        return;
    }

    if (!isPlaying && inputVal.length > 0) {
        startRaceTimer();
    }

    const targetChar = currentVerseChars[typedIndex];

    if (inputVal.length > typedIndex) {
        const typedChar = inputVal[inputVal.length - 1];
        totalKeystrokes++;

        const charSpans = verseContentEl.querySelectorAll(".char");
        const activeSpan = charSpans[typedIndex];

        if (typedChar === targetChar) {
            activeSpan.className = "char correct";
            playKeySound(typedChar === " ");
            typedIndex++;

            if (typedIndex < currentVerseChars.length) {
                charSpans[typedIndex].classList.add("current");
                scrollToCurrentChar(charSpans[typedIndex]);
            } else {
                completeVerse();
            }
        } else {
            activeSpan.className = "char incorrect current";
            playErrorSound();
            triggerShakeEffect();
            errors++;
            scrollToCurrentChar(activeSpan);

            typingInputEl.value = inputVal.substring(0, typedIndex);
        }
    } else if (inputVal.length < typedIndex) {
        const charSpans = verseContentEl.querySelectorAll(".char");

        for (let i = inputVal.length; i <= typedIndex; i++) {
            if (i < currentVerseChars.length) {
                charSpans[i].className = "char";
            }
        }

        typedIndex = inputVal.length;

        charSpans[typedIndex].className = "char current";
        playKeySound(false);
    }

    if (currentMode === "ghost" && isPlaying) {
        updateGhostProgress(Date.now());
    }
    updateLiveStats();
});

parchmentCardEl.addEventListener("click", () => {
    typingInputEl.focus();
});

document.querySelectorAll('input[name="difficulty"]').forEach(radio => {
    radio.addEventListener("change", (e) => {
        const val = e.target.value;
        if (val === "CUSTOM") {
            currentDifficulty = "CUSTOM";
            customActionsBarEl.classList.add("visible");
            if (translationWrapperEl) translationWrapperEl.style.display = "none";
            nextVerseBtnEl.classList.add("hidden");
            customVerseInputEl.focus();
            sectionOpenedAt = Date.now();
            saveState();
            return;
        }
        if (translationWrapperEl) translationWrapperEl.style.display = "";
        nextVerseBtnEl.classList.remove("hidden");
        customActionsBarEl.classList.remove("visible");
        customInputAreaEl.classList.remove("visible");
        currentDifficulty = val;
        streak = 0;
        updateStreakDisplay();
        saveState();
        if (currentMode === "ghost") updateGhostInfoStrip();
        if (currentMode === "timeTrial") beginTimeTrialSession();
        else loadVerse();
        typingInputEl.focus();
    });
});

translationFilterEl.addEventListener("change", (e) => {
    currentTranslation = e.target.value;
    streak = 0;
    updateStreakDisplay();
    saveState();
    loadVerse();
    typingInputEl.focus();
});

nextVerseBtnEl.addEventListener("click", () => {
    loadVerse();
    typingInputEl.focus();
});

soundBtnEl.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    if (soundEnabled) {
        soundBtnEl.classList.remove("muted");
        soundBtnEl.title = "Mute clicking sounds";
        playKeySound();
    } else {
        soundBtnEl.classList.add("muted");
        soundBtnEl.title = "Unmute clicking sounds";
    }
    saveState();
    typingInputEl.focus();
});

function setTheme(theme) {
    const selectedTheme = THEMES.includes(theme) ? theme : "sepia";
    document.documentElement.setAttribute("data-theme", selectedTheme);
    themeBtnEl.textContent = THEME_ICONS[selectedTheme] || "☀️";
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", {
        sepia: "#F3E5C8", dark: "#16100C", ocean: "#95C9D0", forest: "#AAB891", "": "#F3E5C8"
    }[selectedTheme]);
    themeOptionEls.forEach((option) => {
        option.setAttribute("aria-checked", option.dataset.theme === selectedTheme ? "true" : "false");
    });
    saveState();
}

function closeThemeMenu() {
    themeMenuEl.classList.add("hidden");
    themeBtnEl.setAttribute("aria-expanded", "false");
}

themeBtnEl.addEventListener("click", () => {
    const isOpen = !themeMenuEl.classList.contains("hidden");
    themeMenuEl.classList.toggle("hidden", isOpen);
    themeBtnEl.setAttribute("aria-expanded", String(!isOpen));
});

themeOptionEls.forEach((option) => {
    option.addEventListener("click", () => {
        setTheme(option.dataset.theme || "");
        closeThemeMenu();
        typingInputEl.focus();
    });
});

document.addEventListener("click", (event) => {
    if (!event.target.closest(".theme-picker")) closeThemeMenu();
});

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !themeMenuEl.classList.contains("hidden")) {
        closeThemeMenu();
        themeBtnEl.focus();
    }
});

fetchVerseBtnEl.addEventListener("click", (e) => {
    if (!e.isTrusted) return;
    if (Date.now() - sectionOpenedAt < 300) return;
    customInputAreaEl.classList.remove("visible");
    setLoading(true);
    fetchRandomVerse();
});

fetchPassageBtnEl.addEventListener("click", (e) => {
    if (!e.isTrusted) return;
    if (Date.now() - sectionOpenedAt < 300) return;
    customInputAreaEl.classList.remove("visible");
    setLoading(true);
    fetchRandomPassage();
});

startCustomBtnEl.addEventListener("click", () => {
    const isVisible = customInputAreaEl.classList.contains("visible");
    const text = customVerseInputEl.value.trim();

    if (!isVisible) {
        customInputAreaEl.classList.add("visible");
        customVerseInputEl.focus();
        return;
    }

    if (!text) {
        customVerseInputEl.focus();
        customVerseInputEl.style.borderColor = "var(--deep-red)";
        setTimeout(() => {
            customVerseInputEl.style.borderColor = "";
        }, 1000);
        return;
    }

    customInputAreaEl.classList.remove("visible");
    const customVerse = {
        text,
        reference: "Custom Verse",
        translation: "CUSTOM",
        difficulty: text.length < 100 ? "EASY" : text.length < 300 ? "MEDIUM" : "HARD"
    };
    loadVerse(customVerse);
    typingInputEl.focus();
});

/* ==========================
   HIGH SCORES (Leaderboard)
   ========================== */

const LB_KEY = "tr_leaderboard";
const LB_MAX = 10;
const EMPTY_DIFF_BUCKETS = () => ({ EASY: [], MEDIUM: [], HARD: [] });

function emptyLeaderboard() {
    return {
        classic: EMPTY_DIFF_BUCKETS(),
        timeTrial: EMPTY_DIFF_BUCKETS(),
        ghost: EMPTY_DIFF_BUCKETS(),
        mannaRain: EMPTY_DIFF_BUCKETS(),
        liveRace: EMPTY_DIFF_BUCKETS()
    };
}

function migrateLeaderboard(raw) {
    if (!raw || typeof raw !== "object") return emptyLeaderboard();
    // Old flat shape: { EASY: [], MEDIUM: [], HARD: [] }
    if (Array.isArray(raw.EASY) || Array.isArray(raw.MEDIUM) || Array.isArray(raw.HARD)) {
        const next = emptyLeaderboard();
        next.classic = {
            EASY: raw.EASY || [],
            MEDIUM: raw.MEDIUM || [],
            HARD: raw.HARD || []
        };
        return next;
    }
    const next = emptyLeaderboard();
    for (const mode of GAME_MODES) {
        if (raw[mode]) {
            next[mode] = {
                EASY: raw[mode].EASY || [],
                MEDIUM: raw[mode].MEDIUM || [],
                HARD: raw[mode].HARD || []
            };
        }
    }
    return next;
}

function getLeaderboard() {
    try {
        const raw = localStorage.getItem(LB_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            const migrated = migrateLeaderboard(parsed);
            // Persist migration if old shape detected
            if (Array.isArray(parsed.EASY) || Array.isArray(parsed.MEDIUM) || Array.isArray(parsed.HARD)) {
                saveLeaderboard(migrated);
            }
            return migrated;
        }
    } catch (e) {}
    return emptyLeaderboard();
}

function saveLeaderboard(lb) {
    try {
        localStorage.setItem(LB_KEY, JSON.stringify(lb));
    } catch (e) {}
}

function scoreSortKey(entry) {
    // timeTrial / mannaRain use score; others use wpm
    if (typeof entry.score === "number") return entry.score;
    return entry.wpm || 0;
}

function addHighScore(mode, difficulty, primary, accuracy, ref, extra = {}) {
    const lb = getLeaderboard();
    const m = mode || "classic";
    const d = ["EASY", "MEDIUM", "HARD"].includes(difficulty) ? difficulty : "MEDIUM";
    if (!lb[m]) lb[m] = EMPTY_DIFF_BUCKETS();
    if (!lb[m][d]) lb[m][d] = [];

    const entry = {
        wpm: primary,
        score: extra.score != null ? extra.score : (m === "timeTrial" || m === "mannaRain" ? primary : undefined),
        accuracy,
        date: new Date().toLocaleDateString(),
        ref: ref || "Unknown",
        mode: m,
        ...extra
    };
    lb[m][d].push(entry);
    lb[m][d].sort((a, b) => scoreSortKey(b) - scoreSortKey(a) || (b.accuracy || 0) - (a.accuracy || 0));
    lb[m][d] = lb[m][d].slice(0, LB_MAX);
    saveLeaderboard(lb);
}

function renderLeaderboard(difficulty) {
    const lb = getLeaderboard();
    const mode = lbViewMode || "classic";
    const scores = (lb[mode] && lb[mode][difficulty]) || [];
    const list = document.getElementById("leaderboardList");
    if (!list) return;

    if (scores.length === 0) {
        list.innerHTML = `<div class="lb-empty">No scores yet for ${MODE_LABELS[mode] || mode}. Play to set a record!</div>`;
        return;
    }

    const unit = (mode === "timeTrial" || mode === "mannaRain") ? "pts" : "WPM";
    list.innerHTML = scores
        .map((s, i) => {
            let rankClass = "";
            let rankLabel = `#${i + 1}`;
            if (i === 0) { rankClass = "gold"; rankLabel = "🥇"; }
            else if (i === 1) { rankClass = "silver"; rankLabel = "🥈"; }
            else if (i === 2) { rankClass = "bronze"; rankLabel = "🥉"; }
            const primary = scoreSortKey(s);
            return `
                <div class="lb-entry">
                    <span class="lb-rank ${rankClass}">${rankLabel}</span>
                    <span><strong>${primary}</strong> ${unit} · ${s.accuracy}%</span>
                    <span class="lb-date">${s.ref}<br>${s.date}</span>
                </div>`;
        })
        .join("");
}

/* ==========================
   PROGRESS HISTORY
   ========================== */

const HIST_KEY = "tr_history";

function getHistory() {
    try {
        const raw = localStorage.getItem(HIST_KEY);
        if (raw) return JSON.parse(raw);
    } catch (e) {}
    return [];
}

function saveHistory(h) {
    try {
        localStorage.setItem(HIST_KEY, JSON.stringify(h));
    } catch (e) {}
}

function addHistoryEntry(mode, wpm, accuracy, difficulty, ref, extra = {}) {
    const h = getHistory();
    h.push({
        mode: mode || "classic",
        wpm,
        accuracy,
        difficulty,
        ref: ref || "Unknown",
        ts: Date.now(),
        ...extra
    });
    saveHistory(h);
}

function renderProgress() {
    const h = getHistory();
    const totalEl = document.getElementById("progTotal");
    const bestEl = document.getElementById("progBestWpm");
    const avgEl = document.getElementById("progAvgAcc");
    const streakEl = document.getElementById("progStreak");
    const listEl = document.getElementById("progressHistoryList");
    const canvas = document.getElementById("progressChart");

    if (!totalEl) return;

    totalEl.textContent = h.length;
    streakEl.textContent = streak;

    if (h.length === 0) {
        bestEl.textContent = "0";
        avgEl.textContent = "0%";
        if (listEl) listEl.innerHTML = `<div class="lb-empty">No history yet.</div>`;
        drawChart(canvas, []);
        return;
    }

    const best = Math.max(...h.map(e => e.wpm));
    bestEl.textContent = best;

    const avgAcc = Math.round(h.reduce((s, e) => s + e.accuracy, 0) / h.length);
    avgEl.textContent = `${avgAcc}%`;

    if (listEl) {
        const recent = [...h].reverse().slice(0, 20);
        listEl.innerHTML = recent
            .map(e => {
                const d = new Date(e.ts);
                const dateStr = d.toLocaleDateString();
                return `
                    <div class="ph-entry">
                        <span>⚡${e.wpm} · 🎯${e.accuracy}%</span>
                        <span class="ph-ref">${e.ref}</span>
                        <span style="font-size:0.65rem;color:var(--ink-light)">${dateStr}</span>
                    </div>`;
            })
            .join("");
    }

    drawChart(canvas, h);
}

function drawChart(canvas, history) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const hCanvas = canvas.height;
    const pad = { top: 20, bottom: 28, left: 38, right: 16 };
    const chartW = w - pad.left - pad.right;
    const chartH = hCanvas - pad.top - pad.bottom;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = hCanvas * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = hCanvas + "px";
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, w, hCanvas);

    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const textColor = isDark ? "#D4C5A9" : "#3E2916";
    const gridColor = isDark ? "rgba(212,197,169,0.15)" : "rgba(62,41,22,0.12)";
    const lineColor = isDark ? "#BFA15F" : "#7B4F2E";
    const fillColor = isDark ? "rgba(191,161,95,0.08)" : "rgba(123,79,46,0.08)";

    if (history.length < 2) {
        ctx.fillStyle = textColor;
        ctx.font = "13px Lora, serif";
        ctx.textAlign = "center";
        ctx.fillText(history.length === 1 ? "Complete more verses to see your trend" : "No data yet", w / 2, hCanvas / 2);
        return;
    }

    const recent = history.slice(-30);
    const maxWpm = Math.max(...recent.map(e => e.wpm), 50);
    const minWpm = Math.max(0, Math.min(...recent.map(e => e.wpm)) - 10);

    function x(i) { return pad.left + (i / (recent.length - 1)) * chartW; }
    function y(v) { return pad.top + chartH - ((v - minWpm) / (maxWpm - minWpm)) * chartH; }

    // Grid lines
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 4; i++) {
        const gy = pad.top + (i / 4) * chartH;
        ctx.beginPath();
        ctx.moveTo(pad.left, gy);
        ctx.lineTo(w - pad.right, gy);
        ctx.stroke();
        ctx.fillStyle = textColor;
        ctx.font = "10px Lora, serif";
        ctx.textAlign = "right";
        const label = Math.round(maxWpm - (i / 4) * (maxWpm - minWpm));
        ctx.fillText(label, pad.left - 4, gy + 3);
    }

    // Area fill
    ctx.beginPath();
    ctx.moveTo(x(0), hCanvas - pad.bottom);
    recent.forEach((e, i) => ctx.lineTo(x(i), y(e.wpm)));
    ctx.lineTo(x(recent.length - 1), hCanvas - pad.bottom);
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();

    // Line
    ctx.beginPath();
    recent.forEach((e, i) => {
        if (i === 0) ctx.moveTo(x(i), y(e.wpm));
        else ctx.lineTo(x(i), y(e.wpm));
    });
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Dots
    recent.forEach((e, i) => {
        ctx.beginPath();
        ctx.arc(x(i), y(e.wpm), 3, 0, Math.PI * 2);
        ctx.fillStyle = lineColor;
        ctx.fill();
    });

    // X-axis labels
    ctx.fillStyle = textColor;
    ctx.font = "9px Lora, serif";
    ctx.textAlign = "center";
    const step = Math.max(1, Math.floor(recent.length / 6));
    for (let i = 0; i < recent.length; i += step) {
        const d = new Date(recent[i].ts);
        ctx.fillText(`${d.getMonth() + 1}/${d.getDate()}`, x(i), hCanvas - 6);
    }
}

function closeModal() {
    modalOverlayEl.classList.remove("active");
    appContainerEl.removeAttribute("aria-hidden");
    typingInputEl.focus();
}

function restartAfterModal(sameVerse) {
    closeModal();
    if (currentMode === "liveRace") {
        typingInputEl.disabled = true;
        openLiveLobby();
        return;
    }
    if (currentMode === "timeTrial") {
        beginTimeTrialSession();
    } else if (sameVerse && currentVerse) {
        loadVerse(currentVerse);
    } else {
        loadVerse();
    }
    typingInputEl.focus();
}

tryAgainBtnEl.addEventListener("click", () => {
    restartAfterModal(true);
});

newVerseBtnEl.addEventListener("click", () => {
    restartAfterModal(false);
});

/* ==========================
   LEADERBOARD
   ========================== */

const leaderboardOverlayEl = document.getElementById("leaderboardOverlay");
const leaderboardBtnEl = document.getElementById("leaderboardBtn");
const lbCloseBtnEl = document.getElementById("lbCloseBtn");

leaderboardBtnEl.addEventListener("click", () => {
    lbViewMode = currentMode;
    document.querySelectorAll(".lb-mode-tab").forEach(t => {
        t.classList.toggle("active", t.dataset.mode === lbViewMode);
    });
    const activeTab = leaderboardOverlayEl.querySelector(".lb-tab.active");
    renderLeaderboard(activeTab ? activeTab.dataset.diff : currentDifficulty);
    leaderboardOverlayEl.classList.add("active");
});

lbCloseBtnEl.addEventListener("click", () => {
    leaderboardOverlayEl.classList.remove("active");
});

leaderboardOverlayEl.addEventListener("click", (e) => {
    if (e.target === leaderboardOverlayEl) {
        leaderboardOverlayEl.classList.remove("active");
    }
});

leaderboardOverlayEl.addEventListener("click", (e) => {
    const modeTab = e.target.closest(".lb-mode-tab");
    if (modeTab) {
        document.querySelectorAll(".lb-mode-tab").forEach(t => t.classList.remove("active"));
        modeTab.classList.add("active");
        lbViewMode = modeTab.dataset.mode;
        const activeTab = leaderboardOverlayEl.querySelector(".lb-tab.active");
        renderLeaderboard(activeTab ? activeTab.dataset.diff : "MEDIUM");
        return;
    }
    const tab = e.target.closest(".lb-tab");
    if (tab) {
        leaderboardOverlayEl.querySelectorAll(".lb-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        renderLeaderboard(tab.dataset.diff);
    }
});

/* ==========================
   PROGRESS
   ========================== */

const progressOverlayEl = document.getElementById("progressOverlay");
const progressBtnEl = document.getElementById("progressBtn");
const progCloseBtnEl = document.getElementById("progCloseBtn");

progressBtnEl.addEventListener("click", () => {
    renderProgress();
    progressOverlayEl.classList.add("active");
});

progCloseBtnEl.addEventListener("click", () => {
    progressOverlayEl.classList.remove("active");
});

progressOverlayEl.addEventListener("click", (e) => {
    if (e.target === progressOverlayEl) {
        progressOverlayEl.classList.remove("active");
    }
});

/* ==========================
   SHARE RESULT
   ========================== */

const shareBtnEl = document.getElementById("shareBtn");

shareBtnEl.addEventListener("click", () => {
    const left = modalWpmEl.textContent;
    const mid = modalAccuracyEl.textContent;
    const right = modalTimeEl.textContent;
    const ref = currentVerse?.reference || "Scripture";
    const modeName = MODE_LABELS[currentMode] || "Classic";
    const leftL = modalLabelLeftEl?.textContent || "WPM";
    const midL = modalLabelMidEl?.textContent || "Accuracy";
    const rightL = modalLabelRightEl?.textContent || "Time";
    const text = `✝️ Scripture Racer — ${modeName}\n\n📖 ${ref}\n⚡ ${leftL}: ${left}\n🎯 ${midL}: ${mid}\n⏱ ${rightL}: ${right}\n\n"Type the Word. Know the Word."`;
    navigator.clipboard.writeText(text).then(() => {
        shareBtnEl.classList.add("copied");
        setTimeout(() => shareBtnEl.classList.remove("copied"), 2000);
    }).catch(() => {
        shareBtnEl.textContent = "❌ Copy failed";
        setTimeout(() => shareBtnEl.textContent = "📋 Share", 1500);
    });
});

window.addEventListener("keydown", (e) => {
    if (leaderboardOverlayEl?.classList.contains("active")) {
        if (e.key === "Escape") {
            leaderboardOverlayEl.classList.remove("active");
            e.preventDefault();
        }
        return;
    }

    if (progressOverlayEl?.classList.contains("active")) {
        if (e.key === "Escape") {
            progressOverlayEl.classList.remove("active");
            e.preventDefault();
        }
        return;
    }

    if (modalOverlayEl.classList.contains("active")) {
        if (e.key === "Enter") {
            e.preventDefault();
            newVerseBtnEl.click();
        } else if (e.key === "Escape") {
            e.preventDefault();
            restartAfterModal(false);
        } else if (e.key === "Tab") {
            const focusable = modalOverlayEl.querySelectorAll('button:not([disabled])');
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    } else {
        const tag = document.activeElement?.tagName || "";
        if (tag !== "INPUT" && tag !== "TEXTAREA" && document.activeElement !== typingInputEl && e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
            typingInputEl.focus();
        }
    }
});

// Mode selector
document.querySelectorAll('input[name="gameMode"]').forEach(radio => {
    radio.addEventListener("change", (e) => {
        if (e.target.checked) switchMode(e.target.value);
    });
});

document.querySelectorAll("#ttDurationStrip .duration-chip").forEach(btn => {
    btn.addEventListener("click", () => {
        ttDurationSec = parseInt(btn.dataset.duration, 10) || 60;
        document.querySelectorAll("#ttDurationStrip .duration-chip").forEach(b => {
            b.classList.toggle("active", b === btn);
        });
        saveState();
        if (currentMode === "timeTrial" && !isPlaying) {
            beginTimeTrialSession();
            typingInputEl.focus();
        }
    });
});

/* ==========================
   LIVE ROOM RACE
   ========================== */

const liveLobbyOverlayEl = document.getElementById("liveLobbyOverlay");
const liveNameInputEl = document.getElementById("liveNameInput");
const liveCodeInputEl = document.getElementById("liveCodeInput");
const liveCreateBtnEl = document.getElementById("liveCreateBtn");
const liveJoinBtnEl = document.getElementById("liveJoinBtn");
const liveLobbyStatusEl = document.getElementById("liveLobbyStatus");
const liveLobbyGateEl = document.getElementById("liveLobbyGate");
const liveLobbyRoomEl = document.getElementById("liveLobbyRoom");
const liveResultsSectionEl = document.getElementById("liveResultsSection");
const liveRoomCodeEl = document.getElementById("liveRoomCode");
const liveRosterListEl = document.getElementById("liveRosterList");
const liveReadyBtnEl = document.getElementById("liveReadyBtn");
const liveStartBtnEl = document.getElementById("liveStartBtn");
const liveLeaveBtnEl = document.getElementById("liveLeaveBtn");
const liveRoomHintEl = document.getElementById("liveRoomHint");
const liveModeSelectEl = document.getElementById("liveModeSelect");
const liveDiffSelectEl = document.getElementById("liveDiffSelect");
const liveDurationSelectEl = document.getElementById("liveDurationSelect");
const liveDurationFieldEl = document.getElementById("liveDurationField");
const liveHostSettingsEl = document.getElementById("liveHostSettings");
const liveCopyCodeBtnEl = document.getElementById("liveCopyCodeBtn");
const liveCopyLinkBtnEl = document.getElementById("liveCopyLinkBtn");
const liveLobbyCloseBtnEl = document.getElementById("liveLobbyCloseBtn");
const liveOpenLobbyBtnEl = document.getElementById("liveOpenLobbyBtn");
const liveResultsListEl = document.getElementById("liveResultsList");
const liveRematchBtnEl = document.getElementById("liveRematchBtn");
const liveResultsLeaveBtnEl = document.getElementById("liveResultsLeaveBtn");
const livePeerTrackEl = document.getElementById("livePeerTrack");
const countdownOverlayEl = document.getElementById("countdownOverlay");
const countdownNumberEl = document.getElementById("countdownNumber");

function setLiveStatus(msg, isError = false) {
    if (!liveLobbyStatusEl) return;
    liveLobbyStatusEl.textContent = msg || "";
    liveLobbyStatusEl.classList.toggle("error", !!isError);
}

function openLiveLobby() {
    if (!liveLobbyOverlayEl) return;
    if (liveNameInputEl && !liveNameInputEl.value) {
        liveNameInputEl.value = defaultDisplayName();
    }
    if (live.active && live.room) {
        showLiveRoomView(live.room);
    } else {
        liveLobbyGateEl?.classList.remove("hidden");
        liveLobbyRoomEl?.classList.add("hidden");
        liveResultsSectionEl?.classList.add("hidden");
        setLiveStatus("");
        // Probe server
        live.client.health()
            .then(() => setLiveStatus("Race server online."))
            .catch(() => setLiveStatus("Contests unavailable — start the race server (npm run race-server).", true));
    }
    liveLobbyOverlayEl.classList.add("active");
}

function closeLiveLobby() {
    liveLobbyOverlayEl?.classList.remove("active");
}

function isHost(room) {
    return room && live.client.playerId && room.hostId === live.client.playerId;
}

function showLiveRoomView(room) {
    live.room = room;
    liveLobbyGateEl?.classList.add("hidden");
    if (room.status === "results" && room.results) {
        liveLobbyRoomEl?.classList.add("hidden");
        liveResultsSectionEl?.classList.remove("hidden");
        renderLiveResults(room.results, isHost(room));
        return;
    }
    liveResultsSectionEl?.classList.add("hidden");
    liveLobbyRoomEl?.classList.remove("hidden");
    if (liveRoomCodeEl) liveRoomCodeEl.textContent = room.code;
    renderLiveRoster(room);
    const host = isHost(room);
    if (liveHostSettingsEl) {
        liveHostSettingsEl.style.opacity = host ? "1" : "0.7";
        liveHostSettingsEl.querySelectorAll("select").forEach((el) => {
            el.disabled = !host;
        });
    }
    if (liveModeSelectEl) liveModeSelectEl.value = room.mode || "classic";
    if (liveDiffSelectEl) liveDiffSelectEl.value = room.difficulty || "MEDIUM";
    if (liveDurationSelectEl) liveDurationSelectEl.value = String(room.durationSec || 60);
    if (liveDurationFieldEl) {
        liveDurationFieldEl.style.display = room.mode === "timeTrial" ? "" : "none";
    }
    if (liveStartBtnEl) liveStartBtnEl.classList.toggle("hidden", !host);
    const me = room.players?.find((p) => p.id === live.client.playerId);
    if (liveReadyBtnEl) {
        liveReadyBtnEl.textContent = me?.ready ? "Unready" : "Ready";
    }
    const connected = (room.players || []).filter((p) => p.connected).length;
    const minP = room.minPlayers || 1;
    if (liveRoomHintEl) {
        if (host) {
            liveRoomHintEl.textContent =
                connected >= minP
                    ? "Ready when you are — Start Race."
                    : `Need ${minP}+ connected player(s) to start (${connected} now).`;
        } else {
            liveRoomHintEl.textContent = "Waiting for host to start…";
        }
    }
}

function renderLiveRoster(room) {
    if (!liveRosterListEl) return;
    const players = room.players || [];
    liveRosterListEl.innerHTML = players
        .map((p) => {
            const star = p.isHost || p.id === room.hostId ? `<span class="host-star" title="Host">★</span>` : "";
            const you = p.id === live.client.playerId ? " (You)" : "";
            const disc = p.connected ? "" : " · offline";
            return `<li>
                <span>${star}${escapeHtml(p.name)}${you}${disc}</span>
                <span class="ready-dot ${p.ready ? "on" : ""}" title="${p.ready ? "Ready" : "Not ready"}"></span>
            </li>`;
        })
        .join("");
}

function escapeHtml(s) {
    return String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function renderLiveResults(results, host) {
    if (!liveResultsListEl) return;
    liveResultsListEl.innerHTML = (results || [])
        .map((r) => {
            const placeClass = r.place <= 3 ? `place-${r.place}` : "";
            const medal = r.place === 1 ? "🥇" : r.place === 2 ? "🥈" : r.place === 3 ? "🥉" : `#${r.place}`;
            const stats =
                r.dnf
                    ? "DNF"
                    : live.raceMode === "timeTrial" || (typeof r.score === "number" && live.room?.mode === "timeTrial")
                      ? `${r.score ?? 0} words · ${r.accuracy ?? 0}%`
                      : `${r.wpm ?? 0} WPM · ${r.accuracy ?? 0}% · ${r.timeMs != null ? (r.timeMs / 1000).toFixed(1) + "s" : "—"}`;
            return `<li class="${placeClass}">
                <span class="place">${medal}</span>
                <span>${escapeHtml(r.name)}</span>
                <span class="res-stats">${stats}</span>
            </li>`;
        })
        .join("");
    if (liveRematchBtnEl) liveRematchBtnEl.classList.toggle("hidden", !host);
}

function bindLiveClientEvents() {
    live.unsubs.forEach((u) => u());
    live.unsubs = [];
    const c = live.client;
    const on = (ev, fn) => live.unsubs.push(c.on(ev, fn));

    on("room", (room) => {
        if (room?.code) showLiveRoomView(room);
        else if (room && room.players) showLiveRoomView(room);
    });
    on("roster_update", (room) => showLiveRoomView(room));
    on("rematch", (room) => {
        live.racing = false;
        live.finishedLocal = false;
        hideCountdown();
        hideLivePeerTrack();
        showLiveRoomView(room);
        openLiveLobby();
    });
    on("race_start", (payload) => {
        handleLiveRaceStart(payload);
    });
    on("peers", (data) => {
        live.peers = data.peers || [];
        renderLivePeerBars(live.peers);
    });
    on("race_results", (data) => {
        handleLiveRaceResults(data);
    });
    on("disconnect", () => {
        if (live.active) setLiveStatus("Connection lost — reconnecting…", true);
    });
}

async function createLiveRoom() {
    const name = sanitizeDisplayName(liveNameInputEl?.value);
    saveDisplayName(name);
    if (liveNameInputEl) liveNameInputEl.value = name;
    setLiveStatus("Creating room…");
    try {
        const mode = liveModeSelectEl?.value || "classic";
        const difficulty = liveDiffSelectEl?.value || "MEDIUM";
        const durationSec = parseInt(liveDurationSelectEl?.value || "60", 10);
        // Bind SSE handlers before connect so race_start is never missed
        bindLiveClientEvents();
        const data = await live.client.createRoom({ mode, difficulty, durationSec, displayName: name });
        live.active = true;
        showLiveRoomView(data.room);
        setLiveStatus("");
    } catch (e) {
        setLiveStatus(e.message || "Could not create room", true);
    }
}

async function joinLiveRoom(code) {
    const name = sanitizeDisplayName(liveNameInputEl?.value);
    saveDisplayName(name);
    if (liveNameInputEl) liveNameInputEl.value = name;
    const roomCode = String(code || liveCodeInputEl?.value || "").trim().toUpperCase();
    if (!roomCode) {
        setLiveStatus("Enter a room code.", true);
        return;
    }
    setLiveStatus("Joining…");
    try {
        bindLiveClientEvents();
        const data = await live.client.joinRoom(roomCode, name);
        live.active = true;
        showLiveRoomView(data.room);
        setLiveStatus("");
    } catch (e) {
        setLiveStatus(e.message || "Could not join room", true);
    }
}

function leaveLiveRoom({ silent = false } = {}) {
    if (live.active) live.client.leave();
    live.active = false;
    live.racing = false;
    live.finishedLocal = false;
    live.room = null;
    live.peers = [];
    live.verseChain = null;
    live.chainIndex = 0;
    hideCountdown();
    hideLivePeerTrack();
    if (!silent) {
        liveLobbyGateEl?.classList.remove("hidden");
        liveLobbyRoomEl?.classList.add("hidden");
        liveResultsSectionEl?.classList.add("hidden");
        setLiveStatus("Left the room.");
    }
}

async function pushLiveSettings() {
    if (!live.active || !isHost(live.room)) return;
    try {
        const data = await live.client.updateSettings({
            mode: liveModeSelectEl?.value || "classic",
            difficulty: liveDiffSelectEl?.value || "MEDIUM",
            durationSec: parseInt(liveDurationSelectEl?.value || "60", 10)
        });
        if (data.room) showLiveRoomView(data.room);
    } catch (e) {
        if (liveRoomHintEl) liveRoomHintEl.textContent = e.message || "Settings failed";
    }
}

function handleLiveRaceStart(payload) {
    const room = payload.room || payload;
    const startKey = room?.seed || payload.startAt || room?.startAt;
    // Idempotent: HTTP start fallback + SSE race_start must not double-start
    if (live.racing && live._startKey === startKey) return;
    live._startKey = startKey;
    live.room = room;
    live.racing = true;
    live.finishedLocal = false;
    live.raceMode = payload.mode || room.mode || "classic";
    live.verseChain = payload.verseChain || room.verseChain || null;
    live.chainIndex = 0;
    currentDifficulty = payload.difficulty || room.difficulty || "MEDIUM";
    ttDurationSec = payload.durationSec || room.durationSec || 60;
    ttWordsCleared = 0;
    ttVersesCleared = 0;

    closeLiveLobby();
    closeModal();
    applyModeChrome();

    const verse = payload.versePayload || room.versePayload;
    if (!verse) {
        showModeToast("No verse from server");
        return;
    }

    const startAt = payload.startAt || room.startAt || Date.now() + 3000;
    runLiveCountdown(startAt, () => {
        typingInputEl.disabled = false;
        typingInputEl.placeholder = "Type the verse…";
        if (live.raceMode === "timeTrial") {
            // Session-style start with shared first verse
            resetSharedRunState();
            currentVerse = verse;
            renderVerseChars(verse.text);
            verseReferenceEl.innerHTML = `— ${verse.reference} <span class="translation-badge">[${verse.translation}]</span>`;
            liveWpmEl.textContent = "0";
            liveAccuracyEl.innerHTML = `100<span class="stat-unit">%</span>`;
            liveTimerEl.textContent = formatCountdown(ttDurationSec * 1000);
            // Auto-start timer for fairness (same startAt)
            startRaceTimer();
        } else {
            loadVerse(verse);
            // Auto-start so everyone begins together
            startRaceTimer();
        }
        typingInputEl.focus();
        showLivePeerTrack();
        renderLivePeerBars(room.players || []);
    });
}

function runLiveCountdown(startAt, onGo) {
    hideCountdown();
    if (!countdownOverlayEl || !countdownNumberEl) {
        const wait = Math.max(0, startAt - Date.now());
        setTimeout(onGo, wait);
        return;
    }
    countdownOverlayEl.classList.remove("hidden");
    typingInputEl.disabled = true;

    const tickCd = () => {
        const left = startAt - Date.now();
        if (left <= 0) {
            countdownNumberEl.textContent = "GO!";
            setTimeout(() => {
                hideCountdown();
                onGo();
            }, 350);
            return;
        }
        const n = Math.ceil(left / 1000);
        const label = String(n);
        if (countdownNumberEl.textContent !== label) {
            countdownNumberEl.textContent = label;
            countdownNumberEl.style.animation = "none";
            void countdownNumberEl.offsetWidth;
            countdownNumberEl.style.animation = "";
        }
        requestAnimationFrame(tickCd);
    };
    tickCd();
}

function hideCountdown() {
    countdownOverlayEl?.classList.add("hidden");
}

function showLivePeerTrack() {
    if (!livePeerTrackEl) return;
    livePeerTrackEl.classList.remove("hidden");
    livePeerTrackEl.setAttribute("aria-hidden", "false");
}

function hideLivePeerTrack() {
    if (!livePeerTrackEl) return;
    livePeerTrackEl.classList.add("hidden");
    livePeerTrackEl.setAttribute("aria-hidden", "true");
    livePeerTrackEl.innerHTML = "";
}

function renderLivePeerBars(peers) {
    if (!livePeerTrackEl || !live.racing) return;
    const list = [...(peers || [])].sort((a, b) => (b.progress || 0) - (a.progress || 0));
    livePeerTrackEl.innerHTML = list
        .map((p) => {
            const isYou = p.id === live.client.playerId;
            const pct = Math.round(Math.max(0, Math.min(1, p.progress || 0)) * 100);
            const label = isYou ? "You" : escapeHtml(p.name || "Peer");
            const wpmBit = p.wpm != null ? ` · ${p.wpm}` : "";
            return `<div class="race-row">
                <span class="race-label ${isYou ? "you" : "peer"}">${label}</span>
                <div class="race-bar-track"><div class="race-bar peer-bar ${isYou ? "you-bar" : ""}" style="width:${pct}%"></div></div>
                <span class="race-pct">${pct}%${wpmBit}</span>
            </div>`;
        })
        .join("");
}

function handleLiveRaceResults(data) {
    live.racing = false;
    isPlaying = false;
    if (timerRAF) cancelAnimationFrame(timerRAF);
    timerRAF = null;
    typingInputEl.disabled = true;
    hideCountdown();

    const results = data.results || [];
    const room = data.room || live.room;
    if (room) {
        room.results = results;
        room.status = "results";
        live.room = room;
    }

    // Personal podium toast in completion modal
    const me = results.find((r) => r.id === live.client.playerId);
    if (me && !me.dnf) {
        const place = me.place;
        const placeLabel = place === 1 ? "1st Place!" : place === 2 ? "2nd Place" : place === 3 ? "3rd Place" : `#${place}`;
        openResultModal({
            title: placeLabel,
            subtitle: "Live Room Race complete",
            left: live.raceMode === "timeTrial" ? (me.score ?? 0) : (me.wpm ?? 0),
            mid: `${me.accuracy ?? 0}%`,
            right: me.timeMs != null ? `${(me.timeMs / 1000).toFixed(1)}s` : "—",
            leftLabel: live.raceMode === "timeTrial" ? "Words" : "WPM",
            midLabel: "Accuracy",
            rightLabel: "Time"
        });
    }

    showLiveRoomView(live.room || { status: "results", results, hostId: null, players: [] });
    // Keep peer track briefly then show lobby results
    setTimeout(() => {
        openLiveLobby();
    }, 800);
}

// Lobby button handlers
liveCreateBtnEl?.addEventListener("click", () => createLiveRoom());
liveJoinBtnEl?.addEventListener("click", () => joinLiveRoom());
liveCodeInputEl?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") joinLiveRoom();
});
liveReadyBtnEl?.addEventListener("click", async () => {
    try {
        const data = await live.client.setReady();
        if (data.room) showLiveRoomView(data.room);
    } catch (e) {
        if (liveRoomHintEl) liveRoomHintEl.textContent = e.message;
    }
});
liveStartBtnEl?.addEventListener("click", async () => {
    try {
        await pushLiveSettings();
        const data = await live.client.start();
        // Fallback if SSE race_start is delayed/missed
        if (data?.room?.versePayload && !live.racing) {
            handleLiveRaceStart({
                room: data.room,
                startAt: data.room.startAt,
                versePayload: data.room.versePayload,
                verseChain: data.room.verseChain,
                mode: data.room.mode,
                durationSec: data.room.durationSec,
                difficulty: data.room.difficulty
            });
        }
    } catch (e) {
        if (liveRoomHintEl) liveRoomHintEl.textContent = e.message || "Start failed";
    }
});
liveLeaveBtnEl?.addEventListener("click", () => {
    leaveLiveRoom();
});
liveResultsLeaveBtnEl?.addEventListener("click", () => {
    leaveLiveRoom();
});
liveRematchBtnEl?.addEventListener("click", async () => {
    try {
        const data = await live.client.rematch();
        if (data.room) showLiveRoomView(data.room);
    } catch (e) {
        if (liveRoomHintEl) liveRoomHintEl.textContent = e.message;
    }
});
liveLobbyCloseBtnEl?.addEventListener("click", () => {
    closeLiveLobby();
    if (!live.active && currentMode === "liveRace") {
        // Stay on live race chrome; user can reopen
    }
});
liveOpenLobbyBtnEl?.addEventListener("click", () => openLiveLobby());
liveCopyCodeBtnEl?.addEventListener("click", () => {
    const code = live.room?.code || liveRoomCodeEl?.textContent;
    if (code) navigator.clipboard.writeText(code).then(() => showModeToast("Code copied"));
});
liveCopyLinkBtnEl?.addEventListener("click", () => {
    const code = live.room?.code;
    if (!code) return;
    const url = `${location.origin}${location.pathname}?room=${code}`;
    navigator.clipboard.writeText(url).then(() => showModeToast("Invite link copied"));
});
liveModeSelectEl?.addEventListener("change", () => {
    if (liveDurationFieldEl) {
        liveDurationFieldEl.style.display = liveModeSelectEl.value === "timeTrial" ? "" : "none";
    }
    pushLiveSettings();
});
liveDiffSelectEl?.addEventListener("change", () => pushLiveSettings());
liveDurationSelectEl?.addEventListener("change", () => pushLiveSettings());
liveLobbyOverlayEl?.addEventListener("click", (e) => {
    if (e.target === liveLobbyOverlayEl) closeLiveLobby();
});

// Escape closes live lobby
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && liveLobbyOverlayEl?.classList.contains("active")) {
        closeLiveLobby();
        e.preventDefault();
    }
}, true);

window.onload = () => {
    loadState();

    const diffRadio = document.querySelector(`input[name="difficulty"][value="${currentDifficulty}"]`);
    if (diffRadio) diffRadio.checked = true;

    translationFilterEl.value = currentTranslation;

    if (!soundEnabled) {
        soundBtnEl.classList.add("muted");
        soundBtnEl.title = "Unmute clicking sounds";
    }

    const currentTheme = document.documentElement.getAttribute("data-theme") || "sepia";
    setTheme(currentTheme);

    updateStreakDisplay();
    applyModeChrome();

    // Deep link ?room=CODE
    const params = new URLSearchParams(location.search);
    const roomParam = params.get("room");
    if (roomParam) {
        currentMode = "liveRace";
        applyModeChrome();
        document.querySelectorAll('input[name="gameMode"]').forEach(r => {
            r.checked = r.value === "liveRace";
        });
        verseContentEl.textContent = "Joining Live Race…";
        verseReferenceEl.innerHTML = `— Live Room Race <span class="translation-badge">[CONTEST]</span>`;
        typingInputEl.disabled = true;
        openLiveLobby();
        if (liveCodeInputEl) liveCodeInputEl.value = roomParam.toUpperCase();
        // Auto-join after brief paint
        setTimeout(() => joinLiveRoom(roomParam), 200);
        return;
    }

    if (currentMode === "timeTrial") {
        beginTimeTrialSession();
    } else {
        loadVerse();
    }
    typingInputEl.focus();
};
