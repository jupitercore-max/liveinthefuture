// Shared navigation utilities for Live in the Future
function toggleTheme() {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
}

function toggleDrawer() {
  var hamburger = document.querySelector('.hamburger');
  var drawer = document.querySelector('.mobile-drawer');
  var backdrop = document.querySelector('.drawer-backdrop');
  if (hamburger) hamburger.classList.toggle('active');
  if (drawer) drawer.classList.toggle('open');
  if (backdrop) backdrop.classList.toggle('open');
}
