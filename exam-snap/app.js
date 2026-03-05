(function() {
  'use strict';

  // ==================== CONFIG ====================
  var CONFIG = {
    storageKey: 'hypernova_examsnap',
    minMatchScore: 0.25,
    maxResults: 8,
    searchDebounce: 300,
  };

  // ==================== STATE ====================
  var state = {
    currentScreen: 'home',
    screenHistory: [],
    selectedBank: 'all',
    cameraStream: null,
    ocrWorker: null,
    searchTimer: null,
    lastOcrText: '',
  };

  // ==================== DOM REFS ====================
  var screens = {};

  function collectScreens() {
    document.querySelectorAll('.screen').forEach(function(s) {
      if (s.id) screens[s.id] = s;
    });
  }

  // ==================== NAVIGATION ====================
  function navigateTo(screenId, options) {
    options = options || {};
    var addToHistory = options.addToHistory !== false;

    if (addToHistory && state.currentScreen) {
      state.screenHistory.push(state.currentScreen);
    }

    // Stop camera when leaving camera screen
    if (state.currentScreen === 'camera' && screenId !== 'camera') {
      stopCamera();
    }

    Object.values(screens).forEach(function(s) { s.classList.add('hidden'); });
    if (screens[screenId]) {
      screens[screenId].classList.remove('hidden');
      state.currentScreen = screenId;
      onScreenEnter(screenId);
      focusFirst(screens[screenId]);
    }
  }

  function navigateBack() {
    if (state.screenHistory.length > 0) {
      var prev = state.screenHistory.pop();
      navigateTo(prev, { addToHistory: false });
    }
  }

  // ==================== FOCUS MANAGEMENT ====================
  function focusFirst(container) {
    var el = container.querySelector('.focusable:not([disabled]):not(.hidden)');
    if (el) el.focus();
  }

  function moveFocus(direction) {
    var container = screens[state.currentScreen];
    if (!container) return;

    var focusables = Array.from(
      container.querySelectorAll('.focusable:not([disabled]):not(.hidden)')
    );
    if (focusables.length === 0) return;

    var current = document.activeElement;
    var idx = focusables.indexOf(current);

    if (idx === -1) {
      focusFirst(container);
      return;
    }

    var nextIdx;
    if (direction === 'up' || direction === 'left') {
      nextIdx = idx > 0 ? idx - 1 : focusables.length - 1;
    } else {
      nextIdx = idx < focusables.length - 1 ? idx + 1 : 0;
    }
    focusables[nextIdx].focus();

    var scrollParent = focusables[nextIdx].closest('.content, .list-container');
    if (scrollParent) {
      focusables[nextIdx].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }

  // ==================== QUESTION LOOKUP ====================
  function normalizeText(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Stopwords to skip during matching
  var STOPWORDS = new Set([
    'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
    'should', 'may', 'might', 'shall', 'can', 'to', 'of', 'in', 'for',
    'on', 'with', 'at', 'by', 'from', 'as', 'into', 'about', 'or', 'and',
    'but', 'if', 'not', 'no', 'so', 'up', 'out', 'that', 'this', 'it',
    'its', 'what', 'which', 'who', 'whom', 'how', 'when', 'where', 'why',
    'all', 'each', 'every', 'both', 'few', 'more', 'most', 'other', 'some',
    'such', 'than', 'too', 'very', 'just', 'because', 'one', 'two', 'your'
  ]);

  function extractKeywords(text) {
    return normalizeText(text)
      .split(' ')
      .filter(function(w) { return w.length > 2 && !STOPWORDS.has(w); });
  }

  function scoreMatch(ocrKeywords, questionText) {
    var qKeywords = extractKeywords(questionText);
    if (qKeywords.length === 0) return 0;

    var ocrSet = new Set(ocrKeywords);
    var matches = 0;

    qKeywords.forEach(function(w) {
      if (ocrSet.has(w)) {
        matches++;
      } else {
        // Partial match: check if any OCR word contains this keyword
        for (var ow of ocrSet) {
          if (ow.length > 3 && w.length > 3 && (ow.indexOf(w) !== -1 || w.indexOf(ow) !== -1)) {
            matches += 0.5;
            break;
          }
        }
      }
    });

    return matches / qKeywords.length;
  }

  function findMatches(text) {
    var keywords = extractKeywords(text);
    if (keywords.length === 0) return [];

    var questions = getQuestionsForBank(state.selectedBank);

    var scored = questions.map(function(entry) {
      var score = scoreMatch(keywords, entry.question.q);
      return { entry: entry, score: score };
    }).filter(function(r) {
      return r.score >= CONFIG.minMatchScore;
    }).sort(function(a, b) {
      return b.score - a.score;
    }).slice(0, CONFIG.maxResults);

    return scored;
  }

  function getQuestionsForBank(bankKey) {
    if (bankKey === 'all') {
      return getAllQuestions();
    }
    var bank = EXAM_BANKS[bankKey];
    if (!bank) return [];
    return bank.questions.map(function(q) {
      return { bank: bankKey, bankName: bank.shortName, question: q };
    });
  }

  function getAnswerText(entry) {
    var q = entry.question;
    if (q.a !== undefined && q.c) {
      // Multiple choice
      return q.c[q.a];
    }
    return q.a || '';
  }

  // ==================== CAMERA ====================
  function startCamera() {
    var video = document.getElementById('camera-preview');
    if (!video) return;

    navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
    }).then(function(stream) {
      state.cameraStream = stream;
      video.srcObject = stream;
      video.play();
    }).catch(function(err) {
      console.error('[Camera]', err);
      showToast('Camera access denied: ' + err.message, 'error');
      navigateBack();
    });
  }

  function stopCamera() {
    if (state.cameraStream) {
      state.cameraStream.getTracks().forEach(function(t) { t.stop(); });
      state.cameraStream = null;
    }
    var video = document.getElementById('camera-preview');
    if (video) video.srcObject = null;
  }

  function captureFrame() {
    var video = document.getElementById('camera-preview');
    var canvas = document.getElementById('capture-canvas');
    if (!video || !canvas) return null;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    return canvas;
  }

  // ==================== OCR ====================
  function performOCR(canvas) {
    navigateTo('processing', { addToHistory: true });

    var statusEl = document.getElementById('ocr-status');
    var progressEl = document.getElementById('ocr-progress');

    if (statusEl) statusEl.textContent = 'Loading OCR engine...';
    if (progressEl) progressEl.style.width = '10%';

    Tesseract.recognize(canvas, 'eng', {
      logger: function(info) {
        if (info.status === 'recognizing text' && progressEl) {
          var pct = Math.round(10 + info.progress * 80);
          progressEl.style.width = pct + '%';
        }
        if (statusEl && info.status) {
          var msg = info.status.charAt(0).toUpperCase() + info.status.slice(1);
          statusEl.textContent = msg + '...';
        }
      }
    }).then(function(result) {
      var text = result.data.text;
      console.log('[OCR] Result:', text);
      state.lastOcrText = text;

      if (progressEl) progressEl.style.width = '100%';
      if (statusEl) statusEl.textContent = 'Matching questions...';

      var matches = findMatches(text);
      showResults(matches, text);
    }).catch(function(err) {
      console.error('[OCR]', err);
      showToast('OCR failed: ' + err.message, 'error');
      navigateBack();
    });
  }

  // ==================== RENDER ====================
  function renderExamSelector() {
    var container = document.getElementById('exam-selector');
    if (!container) return;

    var html = '';
    // "All" option
    var allCount = getAllQuestions().length;
    html += '<button class="exam-chip focusable' + (state.selectedBank === 'all' ? ' active' : '') +
            '" data-action="select-bank" data-bank="all">' +
            '<span class="exam-chip-name">All Exams</span>' +
            '<span class="exam-chip-count">' + allCount + ' questions</span></button>';

    Object.keys(EXAM_BANKS).forEach(function(key) {
      var bank = EXAM_BANKS[key];
      html += '<button class="exam-chip focusable' + (state.selectedBank === key ? ' active' : '') +
              '" data-action="select-bank" data-bank="' + key + '">' +
              '<span class="exam-chip-name">' + bank.shortName + '</span>' +
              '<span class="exam-chip-count">' + bank.questions.length + ' questions</span></button>';
    });

    container.innerHTML = html;

    // Update count in header
    var countEl = document.getElementById('question-count');
    if (countEl) {
      var total = state.selectedBank === 'all' ? allCount : EXAM_BANKS[state.selectedBank].questions.length;
      countEl.textContent = total + ' Qs';
    }
  }

  function showResults(matches, ocrText) {
    // Replace processing in history with results
    state.screenHistory = state.screenHistory.filter(function(s) { return s !== 'processing'; });
    navigateTo('results', { addToHistory: true });

    var countEl = document.getElementById('result-count');
    if (countEl) countEl.textContent = matches.length + ' found';

    // Show OCR text if available
    var ocrPreview = document.getElementById('ocr-text-preview');
    var ocrTextEl = document.getElementById('ocr-text');
    if (ocrText && ocrPreview && ocrTextEl) {
      ocrPreview.classList.remove('hidden');
      ocrTextEl.textContent = ocrText.trim().substring(0, 200);
    } else if (ocrPreview) {
      ocrPreview.classList.add('hidden');
    }

    var list = document.getElementById('results-list');
    if (!list) return;

    if (matches.length === 0) {
      list.innerHTML = '<div class="empty-state">No matching questions found.<br>Try scanning again or use text search.</div>';
      return;
    }

    var html = '';
    matches.forEach(function(m, idx) {
      var entry = m.entry;
      var pct = Math.round(m.score * 100);
      var answerPreview = getAnswerText(entry);
      if (answerPreview.length > 60) answerPreview = answerPreview.substring(0, 57) + '...';

      html += '<button class="result-item focusable" data-action="view-detail" data-result-idx="' + idx + '">' +
              '<div class="result-header">' +
              '<span class="result-bank">' + entry.bankName + '</span>' +
              '<span class="result-score">' + pct + '% match</span>' +
              '</div>' +
              '<div class="result-question">' + escapeHtml(entry.question.q) + '</div>' +
              '<div class="result-answer-preview">' + escapeHtml(answerPreview) + '</div>' +
              '</button>';
    });

    list.innerHTML = html;

    // Store matches for detail view
    state.currentMatches = matches;
  }

  function showDetail(entry) {
    navigateTo('detail', { addToHistory: true });

    var q = entry.question;
    var bankLabel = document.getElementById('detail-bank');
    var idEl = document.getElementById('detail-id');
    var questionEl = document.getElementById('detail-question');
    var answerEl = document.getElementById('detail-answer');
    var choicesEl = document.getElementById('detail-choices');

    if (bankLabel) bankLabel.textContent = entry.bankName;
    if (idEl) idEl.textContent = q.id ? 'Question ' + q.id : '';
    if (questionEl) questionEl.textContent = q.q;

    if (q.c && q.a !== undefined) {
      // Multiple choice question
      if (answerEl) answerEl.textContent = q.c[q.a];
      if (choicesEl) {
        var letters = ['A', 'B', 'C', 'D'];
        var html = '<div class="section-label" style="margin-top: 4px;">All Choices</div>';
        q.c.forEach(function(choice, idx) {
          var isCorrect = idx === q.a;
          html += '<div class="choice-item' + (isCorrect ? ' correct' : '') + '">' +
                  '<span class="choice-letter">' + letters[idx] + '</span>' +
                  '<span>' + escapeHtml(choice) + '</span></div>';
        });
        choicesEl.innerHTML = html;
        choicesEl.classList.remove('hidden');
      }
    } else {
      // Simple answer question
      if (answerEl) answerEl.textContent = q.a;
      if (choicesEl) {
        choicesEl.innerHTML = '';
        choicesEl.classList.add('hidden');
      }
    }
  }

  // ==================== SEARCH ====================
  function doSearch(query) {
    if (!query || query.trim().length < 2) {
      var container = document.getElementById('search-results');
      if (container) container.innerHTML = '<div class="empty-state">Type keywords to search the question bank</div>';
      return;
    }

    var matches = findMatches(query);
    var list = document.getElementById('search-results');
    if (!list) return;

    if (matches.length === 0) {
      list.innerHTML = '<div class="empty-state">No matching questions found</div>';
      return;
    }

    var html = '';
    matches.forEach(function(m, idx) {
      var entry = m.entry;
      var answerPreview = getAnswerText(entry);
      if (answerPreview.length > 50) answerPreview = answerPreview.substring(0, 47) + '...';

      html += '<button class="result-item focusable" data-action="view-search-detail" data-result-idx="' + idx + '">' +
              '<div class="result-header">' +
              '<span class="result-bank">' + entry.bankName + '</span>' +
              '</div>' +
              '<div class="result-question">' + escapeHtml(entry.question.q) + '</div>' +
              '<div class="result-answer-preview">' + escapeHtml(answerPreview) + '</div>' +
              '</button>';
    });

    list.innerHTML = html;
    state.searchMatches = matches;
  }

  // ==================== UI HELPERS ====================
  function showToast(message, type) {
    var toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.className = 'toast' + (type ? ' ' + type : '');
    toast.offsetHeight; // reflow
    toast.classList.add('visible');
    setTimeout(function() { toast.classList.remove('visible'); }, 2500);
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ==================== ACTION HANDLING ====================
  function handleAction(action, element) {
    switch (action) {
      case 'back':
        navigateBack();
        break;

      case 'go-home':
        state.screenHistory = [];
        navigateTo('home', { addToHistory: false });
        break;

      case 'select-bank':
        var bank = element.dataset.bank;
        state.selectedBank = bank;
        renderExamSelector();
        break;

      case 'open-camera':
        navigateTo('camera', { addToHistory: true });
        break;

      case 'capture':
        var canvas = captureFrame();
        if (canvas) {
          stopCamera();
          performOCR(canvas);
        } else {
          showToast('Camera not ready', 'error');
        }
        break;

      case 'open-search':
        navigateTo('search', { addToHistory: true });
        break;

      case 'do-search':
        var input = document.getElementById('search-input');
        if (input) doSearch(input.value);
        break;

      case 'view-detail':
        var idx = parseInt(element.dataset.resultIdx, 10);
        if (state.currentMatches && state.currentMatches[idx]) {
          showDetail(state.currentMatches[idx].entry);
        }
        break;

      case 'view-search-detail':
        var sIdx = parseInt(element.dataset.resultIdx, 10);
        if (state.searchMatches && state.searchMatches[sIdx]) {
          showDetail(state.searchMatches[sIdx].entry);
        }
        break;

      default:
        console.log('[Action]', action);
        break;
    }
  }

  function onScreenEnter(screenId) {
    switch (screenId) {
      case 'home':
        renderExamSelector();
        break;

      case 'camera':
        startCamera();
        var bankLabel = document.getElementById('camera-bank-label');
        if (bankLabel) {
          bankLabel.textContent = state.selectedBank === 'all'
            ? 'All'
            : EXAM_BANKS[state.selectedBank].shortName;
        }
        break;

      case 'search':
        var input = document.getElementById('search-input');
        if (input) {
          input.value = '';
          setTimeout(function() { input.focus(); }, 100);
        }
        break;
    }
  }

  // ==================== EVENT LISTENERS ====================
  function setupEvents() {
    // Click/tap
    document.addEventListener('click', function(e) {
      var actionEl = e.target.closest('[data-action]');
      if (actionEl) handleAction(actionEl.dataset.action, actionEl);
    });

    // D-pad keyboard navigation
    document.addEventListener('keydown', function(e) {
      var isInput = document.activeElement &&
        (document.activeElement.tagName === 'INPUT' ||
         document.activeElement.tagName === 'TEXTAREA');

      if (isInput && !['Escape', 'Enter'].includes(e.key)) {
        // Allow typing in input; only handle search debounce
        if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Delete') {
          clearTimeout(state.searchTimer);
          state.searchTimer = setTimeout(function() {
            var input = document.getElementById('search-input');
            if (input && state.currentScreen === 'search') {
              doSearch(input.value);
            }
          }, CONFIG.searchDebounce);
        }
        return;
      }

      switch (e.key) {
        case 'ArrowUp':
          moveFocus('up');
          e.preventDefault();
          break;
        case 'ArrowDown':
          moveFocus('down');
          e.preventDefault();
          break;
        case 'ArrowLeft':
          moveFocus('left');
          e.preventDefault();
          break;
        case 'ArrowRight':
          moveFocus('right');
          e.preventDefault();
          break;
        case 'Enter':
          if (isInput) {
            var submitAction = document.activeElement.dataset.submitAction;
            if (submitAction) handleAction(submitAction, document.activeElement);
          } else if (document.activeElement &&
                     document.activeElement.classList.contains('focusable')) {
            document.activeElement.click();
          }
          e.preventDefault();
          break;
        case 'Escape':
          navigateBack();
          e.preventDefault();
          break;
      }
    });

    // Live search on input
    var searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        clearTimeout(state.searchTimer);
        state.searchTimer = setTimeout(function() {
          doSearch(searchInput.value);
        }, CONFIG.searchDebounce);
      });
    }
  }

  // ==================== INIT ====================
  function init() {
    collectScreens();
    setupEvents();
    navigateTo('home', { addToHistory: false });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
