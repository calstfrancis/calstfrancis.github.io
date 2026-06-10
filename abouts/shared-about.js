/* Shared JS for all about/project-reflection pages */

// Inject SVG symbol defs (sunflower + leaves) used by nav brand and vine dividers
(function () {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('width', '0');
  svg.setAttribute('height', '0');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.cssText = 'position:absolute;pointer-events:none';
  svg.innerHTML = `<defs>
  <g id="sf">
    <g fill="#e06030">
      <path d="M0,-16 C8,-24 8,-38 0,-46 C-8,-38 -8,-24 0,-16Z" transform="rotate(0)"/>
      <path d="M0,-16 C8,-24 8,-38 0,-46 C-8,-38 -8,-24 0,-16Z" transform="rotate(25.7)"/>
      <path d="M0,-16 C8,-24 8,-38 0,-46 C-8,-38 -8,-24 0,-16Z" transform="rotate(51.4)"/>
      <path d="M0,-16 C8,-24 8,-38 0,-46 C-8,-38 -8,-24 0,-16Z" transform="rotate(77.1)"/>
      <path d="M0,-16 C8,-24 8,-38 0,-46 C-8,-38 -8,-24 0,-16Z" transform="rotate(102.8)"/>
      <path d="M0,-16 C8,-24 8,-38 0,-46 C-8,-38 -8,-24 0,-16Z" transform="rotate(128.5)"/>
      <path d="M0,-16 C8,-24 8,-38 0,-46 C-8,-38 -8,-24 0,-16Z" transform="rotate(154.2)"/>
      <path d="M0,-16 C8,-24 8,-38 0,-46 C-8,-38 -8,-24 0,-16Z" transform="rotate(180)"/>
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
  document.body.insertBefore(svg, document.body.firstChild);
})();

// Scroll progress bar
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  document.documentElement.style.setProperty('--scroll-progress', pct.toFixed(4));
}, { passive: true });

// Theme toggle with aria-pressed
const themeBtn = document.getElementById('themeToggle');
const setTheme = t => {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('theme', t);
  themeBtn.setAttribute('aria-pressed', t === 'dark' ? 'true' : 'false');
  themeBtn.innerHTML = t === 'dark' ? '<span>🌙</span> Dark' : '<span>☀️</span> Light';
};
const saved = localStorage.getItem('theme');
setTheme(saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
themeBtn.addEventListener('click', () => {
  setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});
