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

