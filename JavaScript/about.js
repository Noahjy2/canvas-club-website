/* =========================================================
   Animation & Multimedia Club — about.js
   Shares the same storage behaviour as index.js so state
   (theme, visitor name, session count) is consistent across
   the site:
     - Cookies        -> remembers the visitor's name (7 days)
     - localStorage   -> remembers the chosen theme + last visit
     - sessionStorage -> counts pages viewed in this browser tab
   ========================================================= */

$(function () {

  /* ---------- Cookie helper (read-only here; written on index.html) ---------- */
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

  /* ---------- Timeline reveal on scroll ---------- */
  const beats = document.querySelectorAll('.crew-timeline .beat');
  if ('IntersectionObserver' in window && beats.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    beats.forEach((beat) => observer.observe(beat));
  } else {
    beats.forEach((beat) => beat.classList.add('in'));
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
