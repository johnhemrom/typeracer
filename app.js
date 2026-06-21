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

const THEMES = ["sepia", "dark", ""];
const THEME_ICONS = { sepia: "🕯️", dark: "🌙", "": "☀️" };

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

function saveState() {
    try {
        localStorage.setItem("tr_streak", streak);
        localStorage.setItem("tr_difficulty", currentDifficulty);
        localStorage.setItem("tr_translation", currentTranslation);
        localStorage.setItem("tr_sound", soundEnabled ? "1" : "0");
        localStorage.setItem("tr_theme", document.documentElement.getAttribute("data-theme") || "");
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
const translationFilterEl = document.getElementById("translationFilter");
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
const customToggleBtnEl = document.getElementById("customToggleBtn");
const customVerseSectionEl = document.getElementById("customVerseSection");
const customVerseInputEl = document.getElementById("customVerseInput");
const fetchRandomBtnEl = document.getElementById("fetchRandomBtn");
const startCustomBtnEl = document.getElementById("startCustomBtn");

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
    fetchRandomBtnEl.disabled = true;
    fetchRandomBtnEl.innerHTML = `<span class="spinner"></span> Fetching...`;

    const ref = BIBLE_REFERENCES[Math.floor(Math.random() * BIBLE_REFERENCES.length)];
    const query = `${ref.book.replace(/ /g, "+")}+${ref.chapter}:${ref.verse}`;

    try {
        const res = await fetch(`https://bible-api.com/${query}?translation=kjv`);
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
    } catch (e) {
        fetchRandomBtnEl.textContent = "📖 Fetch Failed — Try Again";
        setTimeout(() => {
            fetchRandomBtnEl.textContent = "📖 Fetch Random";
        }, 2000);
        setLoading(false);
        loadVerse();
    } finally {
        isFetching = false;
        fetchRandomBtnEl.disabled = false;
    }
}

function getFilteredVerse() {
    let filtered = BIBLE_VERSES.filter(v => v.difficulty === currentDifficulty);

    if (currentTranslation !== "ALL") {
        filtered = filtered.filter(v => v.translation === currentTranslation);
    }

    if (filtered.length === 0) {
        filtered = BIBLE_VERSES.filter(v => v.difficulty === currentDifficulty);
    }

    const randomIndex = Math.floor(Math.random() * filtered.length);
    return filtered[randomIndex];
}

function loadVerse(selectedVerse = null) {
    if (scrollInputContainerEl) {
        scrollInputContainerEl.classList.add("rolled-shut");
        setTimeout(() => {
            scrollInputContainerEl.classList.remove("rolled-shut");
        }, 50);
    }

    if (timerRAF) cancelAnimationFrame(timerRAF);
    timerRAF = null;
    isPlaying = false;
    startTime = null;
    typedIndex = 0;
    errors = 0;
    totalKeystrokes = 0;
    typingInputEl.value = "";

    liveWpmEl.textContent = "0";
    liveAccuracyEl.innerHTML = `100<span class="stat-unit">%</span>`;
    liveTimerEl.textContent = "0:00";

    customVerseSectionEl.classList.remove("visible");

    currentVerse = selectedVerse || getFilteredVerse();
    currentVerseChars = currentVerse.text.split("");

    verseContentEl.innerHTML = "";
    currentVerseChars.forEach((char, idx) => {
        const span = document.createElement("span");
        span.classList.add("char");
        span.textContent = char;
        if (idx === 0) {
            span.classList.add("current");
        }
        verseContentEl.appendChild(span);
    });

    verseReferenceEl.innerHTML = `— ${currentVerse.reference} <span class="translation-badge">[${currentVerse.translation}]</span>`;
}

function startRaceTimer() {
    isPlaying = true;
    startTime = Date.now();
    tick();
}

function tick() {
    if (!isPlaying) return;
    const elapsed = Date.now() - startTime;
    const diffSeconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(diffSeconds / 60);
    const seconds = diffSeconds % 60;
    liveTimerEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    updateLiveStats();
    timerRAF = requestAnimationFrame(tick);
}

function updateLiveStats() {
    if (!startTime) return;
    const elapsedMinutes = (Date.now() - startTime) / 1000 / 60;

    let wpm = 0;
    if (elapsedMinutes > 0) {
        wpm = Math.round((typedIndex / 5) / elapsedMinutes);
    }
    liveWpmEl.textContent = wpm;

    const accuracy = totalKeystrokes > 0 ? Math.round(((totalKeystrokes - errors) / totalKeystrokes) * 100) : 100;
    liveAccuracyEl.innerHTML = `${Math.max(0, accuracy)}<span class="stat-unit">%</span>`;
}

function triggerShakeEffect() {
    parchmentCardEl.classList.add("shake-animation");
    setTimeout(() => {
        parchmentCardEl.classList.remove("shake-animation");
    }, 250);
}

function completeVerse() {
    if (timerRAF) cancelAnimationFrame(timerRAF);
    timerRAF = null;
    isPlaying = false;
    playBellSound();

    const finalTimeSeconds = Math.max(1, Math.floor((Date.now() - startTime) / 1000));
    const finalWpm = Math.round((typedIndex / 5) / (finalTimeSeconds / 60));
    const finalAccuracy = totalKeystrokes > 0 ? Math.round(((totalKeystrokes - errors) / totalKeystrokes) * 100) : 100;

    addHighScore(currentDifficulty, finalWpm, Math.max(0, finalAccuracy), currentVerse?.reference || "Custom" );

    streak++;
    updateStreakDisplay();
    saveState();

    modalWpmEl.textContent = finalWpm;
    modalAccuracyEl.textContent = `${Math.max(0, finalAccuracy)}%`;

    const minutes = Math.floor(finalTimeSeconds / 60);
    const seconds = finalTimeSeconds % 60;
    modalTimeEl.textContent = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

    const encouragement = ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
    blessingTextEl.textContent = `"${encouragement.text}"`;
    blessingRefEl.textContent = `— ${encouragement.ref}`;

    modalOverlayEl.classList.add("active");
    appContainerEl.setAttribute("aria-hidden", "true");
    setTimeout(() => tryAgainBtnEl.focus(), 450);

    setTimeout(() => {
        playStampSound();
    }, 600);
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
            } else {
                completeVerse();
            }
        } else {
            activeSpan.className = "char incorrect current";
            playErrorSound();
            triggerShakeEffect();
            errors++;

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

    updateLiveStats();
});

parchmentCardEl.addEventListener("click", () => {
    typingInputEl.focus();
});

document.querySelectorAll('input[name="difficulty"]').forEach(radio => {
    radio.addEventListener("change", (e) => {
        currentDifficulty = e.target.value;
        streak = 0;
        updateStreakDisplay();
        saveState();
        loadVerse();
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

themeBtnEl.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "";
    const idx = THEMES.indexOf(current);
    const next = THEMES[(idx + 1) % THEMES.length];
    document.documentElement.setAttribute("data-theme", next);
    themeBtnEl.textContent = THEME_ICONS[next] || "☀️";
    saveState();
    typingInputEl.focus();
});

customToggleBtnEl.addEventListener("click", () => {
    customVerseSectionEl.classList.toggle("visible");
    if (customVerseSectionEl.classList.contains("visible")) {
        customVerseInputEl.focus();
    } else {
        typingInputEl.focus();
    }
});

fetchRandomBtnEl.addEventListener("click", () => {
    customVerseSectionEl.classList.remove("visible");
    setLoading(true);
    fetchRandomVerse();
});

startCustomBtnEl.addEventListener("click", () => {
    const text = customVerseInputEl.value.trim();
    if (!text) {
        customVerseInputEl.focus();
        customVerseInputEl.style.borderColor = "var(--deep-red)";
        setTimeout(() => {
            customVerseInputEl.style.borderColor = "";
        }, 1000);
        return;
    }
    customVerseSectionEl.classList.remove("visible");
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

function getLeaderboard() {
    try {
        const raw = localStorage.getItem(LB_KEY);
        if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { EASY: [], MEDIUM: [], HARD: [] };
}

function saveLeaderboard(lb) {
    try {
        localStorage.setItem(LB_KEY, JSON.stringify(lb));
    } catch (e) {}
}

function addHighScore(difficulty, wpm, accuracy, ref) {
    const lb = getLeaderboard();
    if (!lb[difficulty]) lb[difficulty] = [];
    lb[difficulty].push({
        wpm,
        accuracy,
        date: new Date().toLocaleDateString(),
        ref: ref || "Unknown"
    });
    lb[difficulty].sort((a, b) => b.wpm - a.wpm);
    lb[difficulty] = lb[difficulty].slice(0, LB_MAX);
    saveLeaderboard(lb);
}

function isHighScore(difficulty, wpm) {
    const lb = getLeaderboard();
    const scores = lb[difficulty] || [];
    if (scores.length < LB_MAX) return true;
    return wpm > scores[scores.length - 1].wpm;
}

function renderLeaderboard(difficulty) {
    const lb = getLeaderboard();
    const scores = lb[difficulty] || [];
    const list = document.getElementById("leaderboardList");
    if (!list) return;

    if (scores.length === 0) {
        list.innerHTML = `<div class="lb-empty">No scores yet. Complete a verse to set a record!</div>`;
        return;
    }

    list.innerHTML = scores
        .map((s, i) => {
            let rankClass = "";
            let rankLabel = `#${i + 1}`;
            if (i === 0) { rankClass = "gold"; rankLabel = "🥇"; }
            else if (i === 1) { rankClass = "silver"; rankLabel = "🥈"; }
            else if (i === 2) { rankClass = "bronze"; rankLabel = "🥉"; }
            return `
                <div class="lb-entry">
                    <span class="lb-rank ${rankClass}">${rankLabel}</span>
                    <span><strong>${s.wpm}</strong> WPM · ${s.accuracy}%</span>
                    <span class="lb-date">${s.ref}<br>${s.date}</span>
                </div>`;
        })
        .join("");
}

function closeModal() {
    modalOverlayEl.classList.remove("active");
    appContainerEl.removeAttribute("aria-hidden");
    typingInputEl.focus();
}

tryAgainBtnEl.addEventListener("click", () => {
    closeModal();
    loadVerse(currentVerse);
});

newVerseBtnEl.addEventListener("click", () => {
    closeModal();
    loadVerse();
});

/* ==========================
   LEADERBOARD
   ========================== */

const leaderboardOverlayEl = document.getElementById("leaderboardOverlay");
const leaderboardBtnEl = document.getElementById("leaderboardBtn");
const lbCloseBtnEl = document.getElementById("lbCloseBtn");

leaderboardBtnEl.addEventListener("click", () => {
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
    const tab = e.target.closest(".lb-tab");
    if (tab) {
        leaderboardOverlayEl.querySelectorAll(".lb-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        renderLeaderboard(tab.dataset.diff);
    }
});

/* ==========================
   SHARE RESULT
   ========================== */

const shareBtnEl = document.getElementById("shareBtn");

shareBtnEl.addEventListener("click", () => {
    const wpm = modalWpmEl.textContent;
    const acc = modalAccuracyEl.textContent;
    const time = modalTimeEl.textContent;
    const ref = currentVerse?.reference || "Scripture";
    const text = `✝️ Scripture Racer\n\n📖 ${ref}\n⚡ ${wpm} WPM\n🎯 ${acc} accuracy\n⏱ ${time}\n\n"Type the Word. Know the Word."`;
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

    if (modalOverlayEl.classList.contains("active")) {
        if (e.key === "Enter") {
            e.preventDefault();
            newVerseBtnEl.click();
        } else if (e.key === "Escape") {
            e.preventDefault();
            closeModal();
            loadVerse();
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
        if (document.activeElement !== typingInputEl && e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
            typingInputEl.focus();
        }
    }
});

window.onload = () => {
    loadState();

    const diffRadio = document.querySelector(`input[name="difficulty"][value="${currentDifficulty}"]`);
    if (diffRadio) diffRadio.checked = true;

    translationFilterEl.value = currentTranslation;

    if (!soundEnabled) {
        soundBtnEl.classList.add("muted");
        soundBtnEl.title = "Unmute clicking sounds";
    }

    const currentTheme = document.documentElement.getAttribute("data-theme") || "";
    themeBtnEl.textContent = THEME_ICONS[currentTheme] || "☀️";

    updateStreakDisplay();

    loadVerse();
    typingInputEl.focus();
};
