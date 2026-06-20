// Shared newsletter subscription handler for Live in the Future
var Newsletter = {
  init: function(site, opts) {
    var form = document.getElementById(opts.formId);
    var email = document.getElementById(opts.emailId);
    var success = document.getElementById(opts.successId);
    if (!form || !email) return;

    // Find or create the subscribe button
    var btn = form.querySelector('button');
    if (btn) {
      btn.onclick = function(e) {
        e.preventDefault();
        Newsletter.subscribe(site, email, success);
      };
    }
  },

  subscribe: function(site, emailEl, successEl) {
    var addr = emailEl.value.trim();
    if (!addr || !addr.includes('@')) {
      emailEl.style.borderColor = '#e74c3c';
      return;
    }
    emailEl.style.borderColor = 'var(--border)';

    // Store locally for now
    var subs = JSON.parse(localStorage.getItem('litf_subscribers') || '[]');
    if (subs.indexOf(addr) === -1) subs.push(addr);
    localStorage.setItem('litf_subscribers', JSON.stringify(subs));

    emailEl.value = '';
    if (successEl) {
      successEl.style.display = 'block';
      successEl.textContent = '✓ You\'re in. Dispatches from tomorrow, incoming.';
    }
  }
};

// Legacy function name support
function subscribeNewsletter() {
  var email = document.getElementById('newsletterEmail');
  var success = document.getElementById('newsletterSuccess');
  if (email) Newsletter.subscribe('liveinthefuture', email, success);
}
