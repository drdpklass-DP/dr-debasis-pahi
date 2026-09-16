// Shared header, footer and navigation for multi-page app
// Dr. Debasis Pahi — Ind-AS & IFRS Professor

const NAV_LINKS = [
  { href: 'index.html', label: 'Home' },
  { href: 'about.html', label: 'About' },
  { href: 'services.html', label: 'Services' },
  { href: 'notes.html', label: 'Notes' },
  { href: 'ask.html', label: 'Ask the Professor' },
  { href: 'contact.html', label: 'Contact', cta: true }
];

function getCurrentPage() {
  const path = window.location.pathname;
  const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  return page;
}

function renderHeader() {
  const current = getCurrentPage();
  const linksHtml = NAV_LINKS.map(link => {
    const isActive = current === link.href || (current === '' && link.href === 'index.html');
    if (link.cta) {
      return `<a href="${link.href}" class="px-5 py-2.5 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-navy-900 font-semibold hover:shadow-lg hover:shadow-teal-500/30 transition text-sm">${link.label}</a>`;
    }
    return `<a href="${link.href}" class="nav-link text-sm font-medium ${isActive ? 'text-teal-400' : ''}">${link.label}</a>`;
  }).join('\n');

  return `
  <nav id="navbar" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-navy-900/90 backdrop-blur-md border-b border-white/5">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <a href="index.html" class="flex items-center gap-3 group">
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-gold-500 flex items-center justify-center font-serif font-bold text-navy-900 text-lg">DP</div>
        <div>
          <div class="font-serif font-bold text-lg leading-tight group-hover:text-teal-400 transition">Dr. Debasis Pahi</div>
          <div class="text-[10px] tracking-widest text-teal-400/80 uppercase">Ind-AS & IFRS Authority</div>
        </div>
      </a>
      <div class="hidden md:flex items-center gap-7">
        ${linksHtml}
      </div>
      <button id="mobile-menu-btn" class="md:hidden text-white text-2xl" aria-label="Menu">☰</button>
    </div>
    <div id="mobile-menu" class="hidden md:hidden bg-navy-800 border-t border-white/5 px-6 py-4 space-y-3">
      ${NAV_LINKS.map(l => `<a href="${l.href}" class="block py-2 ${l.cta ? 'text-teal-400 font-semibold' : ''}">${l.label}</a>`).join('')}
    </div>
  </nav>`;
}

function renderFooter() {
  return `
  <footer class="border-t border-white/5 py-12 mt-auto">
    <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-gold-500 flex items-center justify-center font-serif font-bold text-navy-900 text-sm">DP</div>
        <div>
          <div class="font-serif font-bold">Dr. Debasis Pahi</div>
          <div class="text-xs text-white/40">Ph.D, IIT Kharagpur · Ind-AS & IFRS</div>
        </div>
      </div>
      <div class="text-sm text-white/40 text-center md:text-right">
        © 2026 Dr. Debasis Pahi. All rights reserved.<br>
        Branding the highest standard of Accounting Education & Advisory.
      </div>
    </div>
  </footer>`;
}

document.addEventListener('DOMContentLoaded', () => {
  const headerPlaceholder = document.getElementById('site-header');
  if (headerPlaceholder) {
    headerPlaceholder.innerHTML = renderHeader();
  }
  const footerPlaceholder = document.getElementById('site-footer');
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = renderFooter();
  }
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.add('hidden')));
  }
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    });
  }
});
