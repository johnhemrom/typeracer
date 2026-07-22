/** Basic display-name length + blocklist filter (client-side mirror of server). */

const BLOCK = [
  "admin", "moderator", "nazi", "hitler", "fuck", "shit", "asshole", "bitch",
  "cunt", "nigger", "faggot", "rape", "porn", "slut"
];

export function sanitizeDisplayName(raw) {
  let name = String(raw || "")
    .replace(/[^\w\s\-'.]/g, "")
    .trim()
    .slice(0, 16);
  if (!name) {
    name = `Pilgrim-${Math.floor(1000 + Math.random() * 9000)}`;
  }
  const lower = name.toLowerCase();
  for (const bad of BLOCK) {
    if (lower.includes(bad)) {
      name = `Pilgrim-${Math.floor(1000 + Math.random() * 9000)}`;
      break;
    }
  }
  return name;
}

export function defaultDisplayName() {
  try {
    const saved = localStorage.getItem("tr_display_name");
    if (saved) return sanitizeDisplayName(saved);
  } catch (_) {}
  return `Pilgrim-${Math.floor(1000 + Math.random() * 9000)}`;
}

export function saveDisplayName(name) {
  try {
    localStorage.setItem("tr_display_name", sanitizeDisplayName(name));
  } catch (_) {}
}
