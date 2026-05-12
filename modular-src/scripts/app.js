// ===== APP INIT =====
// Final boot sequence — runs after all other modules are concatenated.
// Initializes the UI display, opens Level 1, and renders every interactive viz.

// ===== INIT =====
updateDisplay();
document.getElementById('level-body-1').classList.add('open');

// Initialize interactive viz on first render of their phase
permRender();
regGenerate(); regUpdate();
confGenerate(); confUpdate();
pengGenerate(); pengUpdate();
fwUpdate();
diagInit();

// Close buttons on every level + global search index + sticky sidebar + left sidebar
addCloseButtons();
buildSearchIndex();
buildSidebar();
buildLeftSidebar();
