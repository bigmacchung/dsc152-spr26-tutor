// ===== STATE =====
// Top-level mutable game state and constants. Globals are intentional —
// the build script concatenates files in order, and downstream modules
// read/write these directly.
let xp = 0;
let streak = 0;
let currentLevel = 1;
let completedLevels = new Set();
let totalQuizzes = 0;
let correctQuizzes = 0;
const XP_PER_LEVEL = 100;
const TOTAL_LEVELS = 59;
