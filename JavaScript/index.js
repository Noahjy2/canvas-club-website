/* =========================================================
   Animation & Multimedia Club — index.js
   Demonstrates the storage technologies required by the
   assignment brief (Part F.B):
     - Cookies        -> remembers the visitor's name (7 days)
     - localStorage   -> remembers the chosen theme + last visit
     - sessionStorage -> counts pages viewed in this browser tab
   ========================================================= */

$(function () {

  /* ---------- Cookie helpers ---------- */
  function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
  }
  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }

  /* ---------- 1) THEME (localStorage) ---------- */
  const savedTheme = localStorage.getItem('amc-theme') || 'light';
  document.body.setAttribute('data-theme', savedTheme);
  $('#themeToggle').text(savedTheme === 'dark' ? '☾' : '☀');

  $('#themeToggle').on('click', function () {
    const current = document.body.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', next);
    localStorage.setItem('amc-theme', next);
    $(this).text(next === 'dark' ? '☾' : '☀');
  });

  /* ---------- 2) SESSION VIEW COUNTER (sessionStorage) ---------- */
  let views = parseInt(sessionStorage.getItem('amc-page-views') || '0', 10);
  views += 1;
  sessionStorage.setItem('amc-page-views', String(views));
  $('#pageViewCount').text(`Pages viewed this session: ${views}`);

  /* ---------- 3) LAST VISIT (localStorage) ---------- */
  const lastVisit = localStorage.getItem('amc-last-visit');
  if (lastVisit) {
    $('#lastVisit').text(`Last visit: ${new Date(lastVisit).toLocaleString()}`);
  } else {
    $('#lastVisit').text('Welcome — first visit recorded.');
  }
  localStorage.setItem('amc-last-visit', new Date().toISOString());

  /* ---------- 4) RETURNING VISITOR BANNER (cookie) ---------- */
  const visitorName = getCookie('amc-visitor-name');
  if (visitorName) {
    $('#visitorBanner')
      .text(`● WELCOME BACK, ${visitorName.toUpperCase()} — the Reel Room remembers you.`)
      .css('display', 'inline-block');
  }

  /* ---------- Join / newsletter form -> writes cookie ---------- */
  $('#joinForm').on('submit', function (e) {
    e.preventDefault();
    const name = $('#joinName').val().trim();
    const email = $('#joinEmail').val().trim();
    if (!name || !email) return;

    setCookie('amc-visitor-name', name, 7);
    $('#joinMessage').text(`Signed on as ${name}. We saved your name in a cookie for 7 days — come back and the club will greet you by name.`);
    $('#visitorBanner')
      .text(`● WELCOME BACK, ${name.toUpperCase()} — the Reel Room remembers you.`)
      .css('display', 'inline-block');
    this.reset();
  });

  /* ---------- Showreel timecode readout ---------- */
  const video = document.getElementById('showreelVideo');
  const timecodeEl = document.getElementById('videoTimecode');
  function fmt(t) {
    if (!isFinite(t)) return '00:00';
    const m = Math.floor(t / 60).toString().padStart(2, '0');
    const s = Math.floor(t % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }
  if (video) {
    video.addEventListener('timeupdate', () => {
      timecodeEl.textContent = `${fmt(video.currentTime)} / ${fmt(video.duration)}`;
    });
    video.addEventListener('loadedmetadata', () => {
      timecodeEl.textContent = `${fmt(video.currentTime)} / ${fmt(video.duration)}`;
    });
  }

  /* ---------- Smooth scroll offset fix for fixed navbar ---------- */
  $('a[href^="#"]').on('click', function (e) {
    const target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: target.offset().top - 80 }, 400);
    }
  });

});
