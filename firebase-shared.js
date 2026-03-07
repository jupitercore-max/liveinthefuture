/**
 * firebase-shared.js — Shared Firebase module for rayhe.net
 *
 * Provides:
 *  - Firebase SDK loading (via CDN, no build step)
 *  - Presence tracking (who's online per page)
 *  - Leaderboard read/write
 *  - User identity via localStorage with editable name badge
 *
 * Usage:
 *   <script src="firebase-shared.js"></script>
 *   Then in your page script:
 *     FirebaseShared.init('trivia');                    // presence only
 *     FirebaseShared.init('trivia', { leaderboard: true }); // presence + leaderboard
 *     FirebaseShared.submitScore('trivia', { score: 120, correct: 10, total: 12 });
 */

const FirebaseShared = (() => {
  // ─── Firebase Config ───────────────────────────────────────────────
  // PASTE YOUR FIREBASE CONFIG HERE after creating a project at
  // https://console.firebase.google.com
  const FIREBASE_CONFIG = {
    apiKey: "AIzaSyBvYn0woOQljwWzXYtbQ4x-xHGYthuanlw",
    authDomain: "rayhenet.firebaseapp.com",
    databaseURL: "https://rayhenet-default-rtdb.firebaseio.com",
    projectId: "rayhenet",
    storageBucket: "rayhenet.firebasestorage.app",
    messagingSenderId: "275180023647",
    appId: "1:275180023647:web:ccd78a4ac15d3f6f2290ea"
  };
  // ──────────────────────────────────────────────────────────────────

  const SDK_VERSION = '10.12.2';
  const SDK_BASE = `https://www.gstatic.com/firebasejs/${SDK_VERSION}`;

  let db = null;
  let visitorId = null;
  let visitorName = null;
  let pageName = null;
  let presenceRef = null;
  let presenceContainerId = null;
  let leaderboardContainerId = null;

  // ─── Identity ─────────────────────────────────────────────────────

  function getVisitorId() {
    let id = localStorage.getItem('rayhe_visitor_id');
    if (!id) {
      id = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem('rayhe_visitor_id', id);
    }
    return id;
  }

  function getVisitorName() {
    return localStorage.getItem('rayhe_visitor_name') || null;
  }

  function setVisitorName(name) {
    name = (name || '').trim();
    if (!name) return;
    localStorage.setItem('rayhe_visitor_name', name);
    visitorName = name;
  }

  function promptForName() {
    const existing = getVisitorName();
    if (existing) {
      visitorName = existing;
      return existing;
    }
    const name = prompt('Enter your display name for leaderboards:');
    if (name && name.trim()) {
      setVisitorName(name.trim());
      return name.trim();
    }
    // Fallback
    const fallback = 'Player_' + Math.random().toString(36).slice(2, 6);
    setVisitorName(fallback);
    return fallback;
  }

  // ─── SDK Loading ──────────────────────────────────────────────────

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  async function loadFirebase() {
    await loadScript(`${SDK_BASE}/firebase-app-compat.js`);
    await loadScript(`${SDK_BASE}/firebase-database-compat.js`);

    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG);
    }
    db = firebase.database();
  }

  // ─── Presence ─────────────────────────────────────────────────────

  function initPresence(page) {
    pageName = page;
    presenceRef = db.ref(`presence/${page}/${visitorId}`);

    // Write presence entry
    presenceRef.set({
      name: visitorName,
      lastSeen: firebase.database.ServerValue.TIMESTAMP
    });

    // Remove on disconnect
    presenceRef.onDisconnect().remove();

    // Update on visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        presenceRef.set({
          name: visitorName,
          lastSeen: firebase.database.ServerValue.TIMESTAMP
        });
        presenceRef.onDisconnect().remove();
      }
    });

    // Listen for presence changes
    const presenceListRef = db.ref(`presence/${page}`);
    presenceListRef.on('value', snap => {
      const data = snap.val() || {};
      const names = Object.values(data).map(v => v.name).filter(Boolean);
      renderPresence(names);
    });
  }

  function renderPresence(names) {
    const el = document.getElementById(presenceContainerId);
    if (!el) return;

    const count = names.length;
    if (count === 0) {
      el.innerHTML = '';
      return;
    }

    const others = names.filter(n => n !== visitorName);
    let text = `${count} online`;
    if (count === 1 && others.length === 0) {
      text = 'just you';
    } else if (others.length <= 3) {
      text = names.join(', ');
    } else {
      text = `${count} people online`;
    }
    el.textContent = text;
  }

  // ─── Leaderboard ──────────────────────────────────────────────────

  function submitScore(game, scoreData) {
    if (!db) return;
    const ref = db.ref(`leaderboards/${game}`);
    ref.push({
      ...scoreData,
      name: visitorName,
      visitorId: visitorId,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    });
  }

  function listenLeaderboard(game, containerId) {
    leaderboardContainerId = containerId;
    const ref = db.ref(`leaderboards/${game}`).orderByChild('score').limitToLast(10);
    ref.on('value', snap => {
      const entries = [];
      snap.forEach(child => {
        entries.push(child.val());
      });
      // Sort descending by score
      entries.sort((a, b) => b.score - a.score);
      renderLeaderboard(entries, containerId);
    });
  }

  function renderLeaderboard(entries, containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    if (entries.length === 0) {
      el.innerHTML = '<div class="lb-empty">No scores yet — be the first!</div>';
      return;
    }

    const rows = entries.map((e, i) => {
      const rank = i + 1;
      const medal = rank === 1 ? '1st' : rank === 2 ? '2nd' : rank === 3 ? '3rd' : `${rank}th`;
      const isYou = e.visitorId === visitorId;
      const date = e.timestamp ? new Date(e.timestamp).toLocaleDateString() : '';
      return `<div class="lb-row${isYou ? ' lb-you' : ''}">
        <span class="lb-rank">${medal}</span>
        <span class="lb-name">${escapeHtml(e.name || 'Anonymous')}</span>
        <span class="lb-score">${e.score}</span>
      </div>`;
    }).join('');

    el.innerHTML = `<div class="lb-title">Leaderboard</div>${rows}`;
  }

  function escapeHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  // ─── Name Badge ───────────────────────────────────────────────────

  function createNameBadge() {
    const badge = document.createElement('button');
    badge.className = 'firebase-name-badge';
    badge.textContent = visitorName;
    badge.title = 'Click to change your display name';
    badge.addEventListener('click', () => {
      const newName = prompt('Change your display name:', visitorName);
      if (newName && newName.trim() && newName.trim() !== visitorName) {
        setVisitorName(newName.trim());
        badge.textContent = visitorName;
        // Update presence
        if (presenceRef) {
          presenceRef.update({ name: visitorName });
        }
        // Update all leaderboard entries for this visitor
        updateLeaderboardNames(visitorName);
      }
    });
    document.body.appendChild(badge);
  }

  function updateLeaderboardNames(newName) {
    if (!db) return;
    const ref = db.ref('leaderboards');
    ref.once('value', snap => {
      const updates = {};
      snap.forEach(gameSnap => {
        gameSnap.forEach(entrySnap => {
          const entry = entrySnap.val();
          if (entry.visitorId === visitorId) {
            updates[`${gameSnap.key}/${entrySnap.key}/name`] = newName;
          }
        });
      });
      if (Object.keys(updates).length > 0) {
        ref.update(updates);
      }
    });
  }

  // ─── Inject Styles ────────────────────────────────────────────────

  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* Firebase Shared — Presence */
      .firebase-presence {
        font-family: var(--font-mono, 'SF Mono', 'Monaco', 'Menlo', monospace);
        font-size: 0.75rem;
        color: var(--text-muted, #666);
        padding: 6px 12px;
        background: var(--card-bg, #fff);
        border: 1px solid var(--border, #ddd);
        border-radius: var(--radius, 6px);
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .firebase-presence::before {
        content: '';
        width: 6px;
        height: 6px;
        background: #22c55e;
        border-radius: 50%;
        flex-shrink: 0;
      }

      /* Firebase Shared — Leaderboard */
      .firebase-leaderboard {
        margin-top: 20px;
        text-align: left;
      }
      .lb-title {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--text-muted, #666);
        margin-bottom: 8px;
      }
      .lb-row {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 6px 10px;
        border-radius: var(--radius, 6px);
        font-size: 0.85rem;
      }
      .lb-row:nth-child(even) {
        background: rgba(0,0,0,0.02);
      }
      html.dark .lb-row:nth-child(even) {
        background: rgba(255,255,255,0.03);
      }
      .lb-row.lb-you {
        background: rgba(30, 144, 255, 0.08);
        font-weight: 600;
      }
      .lb-rank {
        width: 30px;
        color: var(--text-muted, #666);
        font-size: 0.75rem;
        flex-shrink: 0;
      }
      .lb-name {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .lb-score {
        font-weight: 600;
        color: var(--accent, #1E90FF);
        flex-shrink: 0;
      }
      .lb-empty {
        color: var(--text-muted, #666);
        font-size: 0.85rem;
        padding: 10px 0;
      }

      /* Firebase Shared — Name Badge */
      .firebase-name-badge {
        position: fixed;
        bottom: 16px;
        left: 16px;
        padding: 4px 10px;
        font-family: var(--font-mono, 'SF Mono', 'Monaco', 'Menlo', monospace);
        font-size: 0.7rem;
        background: var(--card-bg, #fff);
        color: var(--text-muted, #666);
        border: 1px solid var(--border, #ddd);
        border-radius: var(--radius, 6px);
        cursor: pointer;
        z-index: 9999;
        opacity: 0.5;
        transition: opacity 0.15s;
      }
      .firebase-name-badge:hover {
        opacity: 1;
      }

      /* Presence for dark chronograph */
      .firebase-presence-chrono {
        font-family: var(--font-mono, 'SF Mono', 'Monaco', 'Menlo', monospace);
        font-size: 0.7rem;
        color: #666;
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .firebase-presence-chrono::before {
        content: '';
        width: 5px;
        height: 5px;
        background: #22c55e;
        border-radius: 50%;
        flex-shrink: 0;
      }
    `;
    document.head.appendChild(style);
  }

  // ─── Public Init ──────────────────────────────────────────────────

  async function init(page, opts = {}) {
    const {
      presenceId = 'firebasePresence',
      leaderboard = false,
      leaderboardId = 'firebaseLeaderboard'
    } = opts;

    presenceContainerId = presenceId;
    visitorId = getVisitorId();
    visitorName = promptForName();

    injectStyles();
    createNameBadge();

    if (FIREBASE_CONFIG.apiKey === 'YOUR_API_KEY') {
      console.warn('[firebase-shared] Firebase not configured — using placeholder config. See firebase-shared.js to add your project config.');
      return;
    }

    try {
      await loadFirebase();
      initPresence(page);
      if (leaderboard) {
        listenLeaderboard(page, leaderboardId);
      }
    } catch (err) {
      console.error('[firebase-shared] Failed to initialize Firebase:', err);
    }
  }

  return {
    init,
    submitScore,
    getVisitorName: () => visitorName,
    getVisitorId: () => visitorId
  };
})();
