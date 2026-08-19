/* ============================================================
   index.js — Home page behaviour for the Animation & Multimedia
   Club site.

   Storage technologies used on this page:
   - Cookie          : remembers that the visitor accepted the
                        cookie notice, for 180 days.
   - localStorage    : keeps a running visit counter and the
                        newsletter subscriber's email, both of
                        which should persist forever on this
                        device.
   - sessionStorage   : shows a "welcome back" banner only when
                        the visitor already opened the site
                        earlier in the *same browser tab
                        session* (not across days).
   ============================================================ */

$(function () {

    /* ---------- small cookie helpers (no library needed) ---------- */
    function setCookie(name, value, days) {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
    }
    function getCookie(name) {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? decodeURIComponent(match[2]) : null;
    }

    /* ---------- mobile navigation ---------- */
    $('#navToggle').on('click', function () {
        const $links = $('#navLinks');
        $links.toggleClass('open');
        $(this).attr('aria-expanded', $links.hasClass('open'));
    });

    $('#navLinks a').on('click', function () {
        $('#navLinks').removeClass('open');
        $('#navToggle').attr('aria-expanded', 'false');
    });

    /* ---------- COOKIE: consent banner ---------- */
    if (!getCookie('amc_cookie_consent')) {
        $('#cookieBanner').addClass('show');
    }
    $('#cookieAccept').on('click', function () {
        setCookie('amc_cookie_consent', 'accepted', 180);
        $('#cookieBanner').removeClass('show');
    });

    /* ---------- localStorage: persistent visit counter ---------- */
    let visits = parseInt(localStorage.getItem('amc_visit_count') || '0', 10);
    visits += 1;
    localStorage.setItem('amc_visit_count', visits);
    $('#visitCounter').text(
        visits === 1
            ? "You're on your first visit — welcome!"
            : `This is visit #${visits} on this device. Thanks for coming back.`
    );

    /* ---------- sessionStorage: within-session welcome-back note ---------- */
    if (sessionStorage.getItem('amc_session_seen')) {
        $('#welcomeBanner')
            .text('Welcome back — jump straight to Workshops or Events using the menu above.')
            .fadeIn(200);
    } else {
        sessionStorage.setItem('amc_session_seen', 'true');
    }

    /* ---------- animated stat counters, triggered once on scroll ---------- */
    let statsAnimated = false;
    function animateStats() {
        if (statsAnimated) return;
        const section = document.querySelector('.stats-band');
        if (!section) return;
        const top = section.getBoundingClientRect().top;
        if (top > window.innerHeight * 0.85) return;

        statsAnimated = true;
        $('.stat').each(function () {
            const $stat = $(this);
            const target = parseInt($stat.data('target'), 10);
            const $num = $stat.find('.stat-num');
            $({ val: 0 }).animate({ val: target }, {
                duration: 900,
                easing: 'swing',
                step: function (now) { $num.text(Math.floor(now)); },
                complete: function () { $num.text(target); }
            });
        });
    }
    $(window).on('scroll', animateStats);
    animateStats(); // in case the stats band is already in view on load

    /* ---------- newsletter signup -> localStorage ---------- */
    $('#newsletterForm').on('submit', function (e) {
        e.preventDefault();
        const email = $('#newsletterEmail').val().trim();
        if (!email) return;

        let list = [];
        try {
            const stored = JSON.parse(localStorage.getItem('amc_newsletter_list') || '[]');
            list = Array.isArray(stored) ? stored : [];
        } catch (error) {
            console.warn('Could not read the saved newsletter list. Resetting it.', error);
            localStorage.removeItem('amc_newsletter_list');
        }
        if (list.includes(email)) {
            $('#newsletterStatus').text(`${email} is already on the reminder list.`);
        } else {
            list.push(email);
            localStorage.setItem('amc_newsletter_list', JSON.stringify(list));
            $('#newsletterStatus').text(`Saved! We'll remind ${email} before the next workshop.`);
            showToast('Subscribed for workshop reminders.');
        }
        $('#newsletterEmail').val('');
    });

    /* ---------- toast helper ---------- */
    function showToast(message) {
        const $toast = $('#toast').text(message).addClass('show');
        setTimeout(() => $toast.removeClass('show'), 2600);
    }

});