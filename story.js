/* story.js — Reading progress, dark mode toggle, smooth scroll for LITF articles */
(function() {
  'use strict';

  /* ── Reading Progress Bar ── */
  var progressBar = document.getElementById('readingProgress');
  if (progressBar) {
    var ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(function() {
          var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          var docHeight = document.documentElement.scrollHeight - window.innerHeight;
          var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
          progressBar.style.width = Math.min(progress, 100) + '%';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ── Dark Mode Toggle ── */
  var toggle = document.querySelector('.theme-toggle');
  if (!toggle) {
    // Create one if not in HTML
    var backLink = document.querySelector('.back-link');
    if (backLink) {
      toggle = document.createElement('button');
      toggle.className = 'theme-toggle';
      toggle.setAttribute('aria-label', 'Toggle dark mode');
      toggle.textContent = '🌓';
      backLink.parentNode.insertBefore(toggle, backLink.nextSibling);
    }
  }
  if (toggle) {
    toggle.addEventListener('click', function() {
      document.documentElement.classList.toggle('dark');
      var isDark = document.documentElement.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  /* ── Smooth Scroll for Anchor Links ── */
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Table Wrapper for Mobile Scroll ── */
  document.querySelectorAll('.story-body table').forEach(function(table) {
    if (!table.parentElement.classList.contains('table-scroll-wrapper')) {
      var wrapper = document.createElement('div');
      wrapper.className = 'table-scroll-wrapper';
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    }
  });

})();
