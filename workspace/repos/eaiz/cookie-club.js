/* Cookie Club — Age Switcher & Interactions */
(function() {
  'use strict';

  const LEVELS = ['preschool', 'kindergarten', 'elementary', 'middle', 'high', 'adult'];
  const LABELS = {
    preschool: '🧒 Preschool',
    kindergarten: '🎨 Kindergarten',
    elementary: '📚 Elementary',
    middle: '🔬 Middle School',
    high: '🎓 High School',
    adult: '☕ Adult'
  };
  const STORAGE_KEY = 'cookieclub-level';

  function getLevel() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return LEVELS.includes(saved) ? saved : 'elementary';
  }

  function setLevel(level) {
    if (!LEVELS.includes(level)) return;
    localStorage.setItem(STORAGE_KEY, level);
    applyLevel(level);
  }

  function applyLevel(level) {
    // Update all content blocks
    document.querySelectorAll('.level-content').forEach(el => {
      el.classList.remove('active');
    });
    document.querySelectorAll('.level-' + level).forEach(el => {
      el.classList.add('active');
    });

    // Update all switcher buttons (header + inline)
    document.querySelectorAll('.age-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.level === level) {
        btn.classList.add('active');
      }
    });

    // Update card descriptions if on homepage
    document.querySelectorAll('.article-card').forEach(card => {
      card.querySelectorAll('.card-desc').forEach(desc => {
        desc.style.display = 'none';
        if (desc.dataset.level === level) {
          desc.style.display = '';
        }
      });
      // Update reading level badge
      const badge = card.querySelector('.card-reading-level');
      if (badge) {
        badge.textContent = LABELS[level] || level;
      }
    });

    // Swap hero images — prefer per-level (data-img-{level}), fall back to 3-tier
    const IMAGE_TIER = {
      preschool: 'young', kindergarten: 'young',
      elementary: 'middle', middle: 'middle',
      high: 'older', adult: 'older'
    };
    const tier = IMAGE_TIER[level] || 'middle';
    document.querySelectorAll('.hero-image').forEach(img => {
      // Try per-level image first (data-img-preschool, data-img-adult, etc.)
      var src = img.dataset['img' + level.charAt(0).toUpperCase() + level.slice(1)];
      // Fall back to 3-tier (data-src-young, data-src-middle, data-src-older)
      if (!src) src = img.dataset['src' + tier.charAt(0).toUpperCase() + tier.slice(1)];
      if (src && img.src !== src) {
        img.style.opacity = '0';
        img.onload = function() { img.style.opacity = '1'; };
        img.src = src;
      }
    });

    // Update body class for level-specific global styles
    document.body.className = document.body.className.replace(/\bcurrent-level-\w+/g, '');
    document.body.classList.add('current-level-' + level);
  }

  function init() {
    // Bind all switcher buttons
    document.querySelectorAll('.age-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const level = this.dataset.level;
        setLevel(level);

        // Fun little bounce animation
        this.style.transform = 'scale(1.15)';
        setTimeout(() => { this.style.transform = ''; }, 200);
      });
    });

    // Helium balloon easter egg
    const balloon = document.querySelector('.he-balloon');
    if (balloon) {
      let clicks = 0;
      balloon.addEventListener('click', function() {
        clicks++;
        if (clicks >= 3) {
          balloon.style.animation = 'none';
          balloon.style.transition = 'all 2s cubic-bezier(0.4, 0, 0, 1)';
          balloon.style.transform = 'translateY(-200vh) rotate(720deg)';
          balloon.style.opacity = '0';
          setTimeout(() => {
            balloon.style.transition = 'none';
            balloon.style.transform = '';
            balloon.style.opacity = '1';
            balloon.style.animation = 'balloon-float 4s ease-in-out infinite';
            clicks = 0;
          }, 2500);
        } else {
          balloon.style.transform = 'scale(1.2) rotate(' + (clicks * 15) + 'deg)';
          setTimeout(() => { balloon.style.transform = ''; }, 300);
        }
      });
    }

    // Apply saved level
    applyLevel(getLevel());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for external use
  window.CookieClub = { setLevel, getLevel, LEVELS, LABELS };
})();
