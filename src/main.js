// Entry point — imports, dependency injection, window bindings

import { initEditor, renderEditor, highlightLine, handleFileUpload, getOriginalCodeText } from './modules/editor.js';
import { initHistoria, addToHistoria, saveHistoria, refreshHistoriaIfVisible, showHistoria, showHistoriaDetail, loadKodFromHistoria } from './modules/historia.js';
import { initTranslator, openTranslator, closeTranslator, toggleWand, openTranslatorFromHistoria } from './modules/translator.js';
import { initVivisekcja, openVivisekcja, closeVivisekcja } from './modules/vivisekcja.js';
import { initDeadCode, toggleDeadCode, resetDeadCode, applyDeadCodeResults, clearDeadCodeHighlights, highlightDeadLines } from './modules/dead-code.js';
import { initBadPatterns, toggleBadPatterns, resetBadPatterns, applyBadPatternResults, clearBadPatternHighlights, highlightBadPatternLines } from './modules/bad-patterns.js';
import { selectMode, deactivateMode, switchEditorTab, handleAnalizuj } from './modules/programming-mode.js';
import { initTabs, switchTab, setActive, sendAI } from './modules/tabs.js';
import { renderujArchiwum, pokazModal, zamknijModal } from './modules/archiwum.js';
import { initPrefetch, prefetchAll } from './modules/prefetch.js';
import { initFramework, showApp, onFwSearch, clearFwSearch } from './modules/framework.js';
import { openFramework, closeDetailPage, switchDetailTab, onFwDetailEscape } from './modules/fw-detail.js';
import { openCmdModal, closeCmdModal, copyCmdText } from './modules/fw-detail-modal.js';
import './modules/tooltips.js';

// ── Dependency injection (breaks circular imports) ──

initEditor({
  addToHistoria,
  resetDeadCode,
  resetBadPatterns,
  prefetchAll,
});

initHistoria({
  highlightLine,
  renderEditor,
  getOriginalCodeText,
  resetDeadCode,
  resetBadPatterns,
  applyDeadCodeResults,
  applyBadPatternResults,
});

initTranslator({ getOriginalCodeText, addToHistoria });

initVivisekcja({ getOriginalCodeText, saveHistoria });

initDeadCode({ getOriginalCodeText, saveHistoria, refreshHistoriaIfVisible });

initBadPatterns({ getOriginalCodeText, saveHistoria, refreshHistoriaIfVisible });

initTabs({ renderujArchiwum, clearDeadCodeHighlights, clearBadPatternHighlights });

initPrefetch({ saveHistoria, refreshHistoriaIfVisible });

initFramework({ openFramework });

// ── Expose to window (used by HTML onclick attributes) ──

Object.assign(window, {
  // App navigation
  showApp,

  // Framework
  onFwSearch, clearFwSearch, openFramework, closeDetailPage, switchDetailTab, onFwDetailEscape,

  // Command modal
  openCmdModal, closeCmdModal, copyCmdText,

  // AI features
  openTranslator, closeTranslator, toggleWand, openTranslatorFromHistoria,
  openVivisekcja, closeVivisekcja,
  toggleDeadCode, highlightDeadLines,
  toggleBadPatterns, highlightBadPatternLines,

  // Editor & upload
  handleFileUpload, switchEditorTab, handleAnalizuj,

  // Sidebar & modes
  selectMode, setActive, switchTab, sendAI,

  // Historia
  showHistoria, showHistoriaDetail, loadKodFromHistoria,

  // Archiwum modal
  pokazModal, zamknijModal,
});
