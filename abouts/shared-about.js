/* Shared JS for all about/project-reflection pages */

// Service worker registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(() => {});
}

// Related projects strip
(function () {
  const PROJECTS = [
    { slug: 'about-rubric',        title: 'Rubric',            sub: 'Worship Planning' },
    { slug: 'about-zerkalo',       title: 'Зеркало',           sub: 'Typst Editor',        lang: 'ru' },
    { slug: 'about-spasibo',       title: 'Spasibo',           sub: 'Narrative Engine' },
    { slug: 'about-gost',          title: 'ГОСТ',              sub: 'Essay Templater',     lang: 'ru' },
    { slug: 'about-severed-hours', title: 'The Severed Hours',  sub: 'Interactive Fiction' },
  ];
  const current = location.pathname.split('/').pop().replace('.html', '');
  const others = PROJECTS.filter(p => p.slug !== current);
  if (!others.length) return;

  const strip = document.createElement('nav');
  strip.setAttribute('aria-label', 'Other project reflections');
  strip.style.cssText = 'border-top:1px dashed var(--border-hi);padding:2rem 0 1rem;margin-top:1rem';
  strip.innerHTML = `<p style="font-family:'Spectral',serif;font-size:.7rem;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--olive);margin-bottom:1rem">More Reflections</p>
<div style="display:flex;flex-wrap:wrap;gap:.6rem">${others.map(p => `<a href="/abouts/${p.slug}.html" style="display:inline-flex;flex-direction:column;padding:.55rem .9rem;border:1px solid var(--border-hi);font-family:'IM Fell English',serif;text-decoration:none;transition:border-color .15s,color .15s" onmouseover="this.style.borderColor='var(--coral)'" onmouseout="this.style.borderColor='var(--border-hi)'"><span style="font-size:.88rem;color:var(--text)"${p.lang ? ` lang="${p.lang}"` : ''}>${p.title}</span><span style="font-size:.65rem;letter-spacing:.1em;text-transform:uppercase;color:var(--text-3);font-family:'Spectral',serif;font-weight:600;margin-top:.15rem">${p.sub}</span></a>`).join('')}</div>`;

  const article = document.querySelector('.article-body') || document.querySelector('main');
  if (article) article.appendChild(strip);
})();

// Load SVG symbol defs from the cacheable /defs.svg file
(function () {
  fetch('/defs.svg')
    .then(r => r.text())
    .then(text => {
      const tmp = document.createElement('div');
      tmp.innerHTML = text;
      const svgEl = tmp.querySelector('svg');
      if (svgEl) {
        svgEl.style.cssText = 'position:absolute;pointer-events:none';
        document.body.insertBefore(svgEl, document.body.firstChild);
      }
    })
    .catch(() => {
      // Inline fallback if fetch fails (e.g. local file:// usage)
      const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgEl.setAttribute('width', '0');
      svgEl.setAttribute('height', '0');
      svgEl.setAttribute('aria-hidden', 'true');
      svgEl.style.cssText = 'position:absolute;pointer-events:none';
      svgEl.innerHTML = `<defs>
  <g id="sf">
    <g fill="#e06030">
      <path d="M0,-16 C8,-24 8,-38 0,-46 C-8,-38 -8,-24 0,-16Z" transform="rotate(0)"/>
      <path d="M0,-16 C8,-24 8,-38 0,-46 C-8,-38 -8,-24 0,-16Z" transform="rotate(51.4)"/>
      <path d="M0,-16 C8,-24 8,-38 0,-46 C-8,-38 -8,-24 0,-16Z" transform="rotate(102.8)"/>
      <path d="M0,-16 C8,-24 8,-38 0,-46 C-8,-38 -8,-24 0,-16Z" transform="rotate(154.2)"/>
      <path d="M0,-16 C8,-24 8,-38 0,-46 C-8,-38 -8,-24 0,-16Z" transform="rotate(205.7)"/>
      <path d="M0,-16 C8,-24 8,-38 0,-46 C-8,-38 -8,-24 0,-16Z" transform="rotate(257.1)"/>
      <path d="M0,-16 C8,-24 8,-38 0,-46 C-8,-38 -8,-24 0,-16Z" transform="rotate(308.5)"/>
    </g>
    <circle r="16" fill="#5a2c10"/>
    <circle r="11" fill="#3e1a08"/>
  </g>
  <g id="lf-v">
    <path d="M0,0 C10,-8 18,-6 20,2 C18,12 8,18 0,16 C-8,18 -18,12 -20,2 C-18,-6 -10,-8 0,0Z" fill="#7a8840"/>
    <path d="M0,0 L0,16" stroke="#5a6428" stroke-width="1" fill="none"/>
  </g>
  <path id="lf-b" d="M0,0 C12,-10 22,-8 26,-2 C30,6 24,20 10,24 C-4,28 -16,18 -14,8 C-12,0 -6,-2 0,0Z" fill="#7a8840"/>
</defs>`;
      document.body.insertBefore(svgEl, document.body.firstChild);
    });
})();

// Scroll progress bar
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  document.documentElement.style.setProperty('--scroll-progress', pct.toFixed(4));
}, { passive: true });

// Theme toggle with aria-pressed + theme-color meta
const themeBtn = document.getElementById('themeToggle');
const _tc = document.getElementById('themeColorMeta');
const setTheme = t => {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('theme', t);
  themeBtn.setAttribute('aria-pressed', t === 'dark' ? 'true' : 'false');
  themeBtn.innerHTML = t === 'dark' ? '<span>🌙</span> Dark' : '<span>☀️</span> Light';
  if (_tc) _tc.content = t === 'dark' ? '#6a1710' : '#e8d5b0';
};
const saved = localStorage.getItem('theme');
setTheme(saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
themeBtn.addEventListener('click', () => {
  setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});
