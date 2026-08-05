/* Site-wide behaviour shared by every page: the liturgical season the palette
   follows, and the persistent quiet-mode switch. Both guard on the elements
   they touch, since not every page carries them. */
// ── LITURGICAL SEASON ──────────────────────────────────────────────────────
// Same Western calendar Rubric and Iskra compute from: Advent Sunday is the
// fourth Sunday before Christmas, everything in the spring hangs off Easter
// (anonymous Gregorian algorithm). Only the season is needed here, not propers.
(function () {
  const day = 86400000;
  const utc = (y, m, d) => Date.UTC(y, m - 1, d);

  function easter(year) {
    const a = year % 19, b = Math.floor(year / 100), c = year % 100;
    const d = Math.floor(b / 4), e = b % 4;
    const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4), k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    return utc(year, month, ((h + l - 7 * m + 114) % 31) + 1);
  }
  function adventSunday(year) {
    const xmas = utc(year, 12, 25);
    return xmas - new Date(xmas).getUTCDay() * day - 21 * day;
  }
  // Lectionary year A/B/C, keyed to Advent, as in Iskra's calendar.rs
  function lectionaryYear(t) {
    const y = new Date(t).getUTCFullYear();
    const base = t >= adventSunday(y) ? y + 1 : y;
    return ['A', 'B', 'C'][(((base - 2023) % 3) + 3) % 3];
  }

  function season(t) {
    const y = new Date(t).getUTCFullYear();
    const advent = adventSunday(y);
    if (t >= advent && t < utc(y, 12, 25)) return ['advent', 'Advent'];
    if (t >= utc(y, 12, 25)) return ['christmas', 'Christmastide'];

    const e = easter(y);
    if (t < utc(y, 1, 6)) return ['christmas', 'Christmastide'];
    const ash = e - 46 * day, palm = e - 7 * day, pentecost = e + 49 * day;
    if (t < ash) return ['epiphany', 'After Epiphany'];
    if (t >= palm && t < e) return ['holyweek', 'Holy Week'];
    if (t < e) return ['lent', 'Lent'];
    if (t < pentecost) return ['easter', 'Eastertide'];
    if (t < pentecost + 7 * day) return ['pentecost', 'Pentecost'];
    if (t >= advent - 7 * day) return ['ordinary', 'Reign of Christ'];
    return ['ordinary', 'Ordinary Time'];
  }

  const now = new Date();
  const today = utc(now.getFullYear(), now.getMonth() + 1, now.getDate());
  const [key, name] = season(today);
  document.documentElement.setAttribute('data-season', key);
  const line = document.getElementById('seasonLine');
  if (line) {
    line.querySelector('.season-name').textContent = name;
    line.querySelector('.season-year').textContent = 'Year ' + lectionaryYear(today);
    line.hidden = false;
  }
})();

// ── QUIET MODE ─────────────────────────────────────────────────────────────
// A persistent off switch for motion and ornament that does not require
// changing an OS-level setting. Defaults to on if the OS already asks for
// reduced motion.
(function () {
  const btn = document.getElementById('quietToggle');
  if (!btn) return;
  const setQuiet = on => {
    document.documentElement.setAttribute('data-motion', on ? 'quiet' : 'full');
    btn.setAttribute('aria-pressed', String(on));
    btn.innerHTML = on ? '<span>❦</span> Quiet' : '<span>❧</span> Motion';
    btn.title = on ? 'Motion and ornament are off — click to restore' : 'Turn off motion and ornament';
    localStorage.setItem('quiet', on ? '1' : '0');
  };
  const stored = localStorage.getItem('quiet');
  setQuiet(stored === null
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : stored === '1');
  btn.addEventListener('click', () => {
    setQuiet(document.documentElement.getAttribute('data-motion') !== 'quiet');
  });
})();


// ── THEME ──────────────────────────────────────────────────────────────────
// Three palettes on one button, cycling light → dark → fond.
//
// The first two are the warm ones the site has always had. The third is Fond,
// the interface language the desktop apps and the Plasma theme share: four
// stacked surfaces, a hairline between them, and the red kept only as a mark.
//
// Fond differs from the other two in one way that matters here — it follows
// the operating system's light/dark setting rather than fixing one, exactly as
// every app in the suite does (System is their honoured default). So the
// button offers three palettes and the third has two faces.
//
// This used to be copied inline into every page. It lives here now because a
// third state is three times the thing to keep in step, and the copies had
// already drifted (some set aria-pressed, some did not).
(function () {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  const ORDER = ['light', 'dark', 'fond'];
  const FACE = { light: ['☀️', 'Light'], dark: ['🌙', 'Dark'], fond: ['❖', 'Fond'] };
  // The address-bar colour, per theme. Fond's pair is its ground in each scheme.
  const BAR = { light: '#e8d5b0', dark: '#6a1710', fondLight: '#f3f3f5', fondDark: '#28282c' };

  const root = document.documentElement;
  const meta = document.getElementById('themeColorMeta');
  const osDark = window.matchMedia('(prefers-color-scheme: dark)');

  // What light/dark actually resolves to — the warm themes say so themselves,
  // Fond asks the OS. Anything keyed to brightness rather than to palette
  // (the screenshots, most obviously) has to follow this and not the theme.
  const scheme = t => (t === 'fond' ? (osDark.matches ? 'dark' : 'light') : t);

  const setTheme = t => {
    if (!ORDER.includes(t)) t = 'light';
    root.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
    const [glyph, name] = FACE[t];
    btn.innerHTML = '<span>' + glyph + '</span> ' + name;
    btn.title = 'Theme: ' + name + ' — click for ' + FACE[ORDER[(ORDER.indexOf(t) + 1) % 3]][1];
    // aria-pressed is a two-state contract, so a three-state control must not
    // claim it; the label names the current theme instead.
    btn.removeAttribute('aria-pressed');
    if (meta) meta.content = t === 'fond' ? BAR['fond' + (osDark.matches ? 'Dark' : 'Light')] : BAR[t];
    // Page-specific work — swapping the light/dark screenshots on the home
    // page — hangs off this rather than off the button, so it stays correct
    // when the OS flips underneath Fond.
    root.dispatchEvent(new CustomEvent('themechange', {
      detail: { theme: t, scheme: scheme(t) }
    }));
  };

  const saved = localStorage.getItem('theme');
  setTheme(saved || (osDark.matches ? 'dark' : 'light'));
  btn.addEventListener('click', () => {
    setTheme(ORDER[(ORDER.indexOf(root.getAttribute('data-theme')) + 1) % 3]);
  });
  // Under Fond the OS owns the scheme, so a change there is a change here.
  osDark.addEventListener('change', () => {
    if (root.getAttribute('data-theme') === 'fond') setTheme('fond');
  });
})();
