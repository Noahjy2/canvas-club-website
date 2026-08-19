/* ============================================================
   about.js — About page behaviour for the Animation & Multimedia
   Club site.

   Storage technologies used on this page:
   - Cookie          : remembers which team tab (Leadership,
                        Design, Video & Motion, Events) was open
                        last, for 30 days.
   - localStorage    : keeps the visitor's starred/favourite team
                        members saved permanently on this device.
   - sessionStorage   : counts how many times the team tabs have
                        been switched during the current browser
                        session, and is cleared once the tab
                        closes.
   ============================================================ */

$(function () {

    /* ---------- cookie helpers ---------- */
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

    /* ---------- team data ---------- */
    const TEAM = {
        leadership: [
            { id: 'l1', name: 'Dylan Ho', role: 'President', initials: 'DH' },
            { id: 'l2', name: 'Sarah Tan', role: 'Vice President', initials: 'ST' },
            { id: 'l3', name: 'Kai Wong', role: 'Secretary', initials: 'KW' }
        ],
        design: [
            { id: 'd1', name: 'Priya Nair', role: 'Design Lead', initials: 'PN' },
            { id: 'd2', name: 'Wei Jian', role: 'Storyboard Artist', initials: 'WJ' },
            { id: 'd3', name: 'Alicia Goh', role: 'Illustrator', initials: 'AG' }
        ],
        video: [
            { id: 'v1', name: 'Marcus Lim', role: 'Video Lead', initials: 'ML' },
            { id: 'v2', name: 'Nur Aisyah', role: 'Motion Designer', initials: 'NA' },
            { id: 'v3', name: 'Ravi Kumar', role: 'Editor', initials: 'RK' }
        ],
        events: [
            { id: 'e1', name: 'Chloe Lee', role: 'Events Lead', initials: 'CL' },
            { id: 'e2', name: 'Farhan Idris', role: 'Logistics', initials: 'FI' },
            { id: 'e3', name: 'Bella Sim', role: 'Outreach', initials: 'BS' }
        ]
    };

    /* ---------- localStorage: favourite members ---------- */
    function getFavourites() {
        try {
            const stored = JSON.parse(localStorage.getItem('amc_fav_members') || '[]');
            return Array.isArray(stored) ? stored : [];
        } catch (error) {
            console.warn('Could not read saved favourite members. Resetting them.', error);
            localStorage.removeItem('amc_fav_members');
            return [];
        }
    }
    function toggleFavourite(id) {
        let favs = getFavourites();
        if (favs.includes(id)) {
            favs = favs.filter(f => f !== id);
        } else {
            favs.push(id);
        }
        localStorage.setItem('amc_fav_members', JSON.stringify(favs));
        return favs;
    }

    /* ---------- render a team's member cards ---------- */
    function renderTeam(teamKey) {
        const favs = getFavourites();
        const $grid = $('#teamGrid').empty();
        TEAM[teamKey].forEach(member => {
            const isFav = favs.includes(member.id);
            const $card = $(`
        <div class="member-card">
          <button class="fav-btn ${isFav ? 'active' : ''}" data-id="${member.id}" aria-label="Save ${member.name} as favourite">
            ${isFav ? '&#9733;' : '&#9734;'}
          </button>
          <div class="member-photo">${member.initials}</div>
          <h4>${member.name}</h4>
          <p class="member-role">${member.role}</p>
        </div>
      `);
            $grid.append($card);
        });
    }

    /* ---------- team tab switching ---------- */
    function activateTab(teamKey, { persist = true } = {}) {
        $('.team-tabs .nav-link').removeClass('active');
        $(`.team-tabs .nav-link[data-team="${teamKey}"]`).addClass('active');
        renderTeam(teamKey);
        if (persist) {
            setCookie('amc_last_team_tab', teamKey, 30);

            // sessionStorage: count tab switches within this browser session
            const switches = parseInt(sessionStorage.getItem('amc_tab_switches') || '0', 10) + 1;
            sessionStorage.setItem('amc_tab_switches', switches);
            if (switches >= 3) {
                showToast(`You've browsed ${switches} team tabs this session — favourites are saved for next time.`);
            }
        }
    }

    $('.team-tabs .nav-link').on('click', function () {
        activateTab($(this).data('team'));
    });

    // favourite star clicks (event delegation, since cards are re-rendered)
    $('#teamGrid').on('click', '.fav-btn', function () {
        const id = $(this).data('id');
        const favs = toggleFavourite(id);
        $(this)
            .toggleClass('active', favs.includes(id))
            .html(favs.includes(id) ? '&#9733;' : '&#9734;');
    });

    // COOKIE: restore last-viewed team tab on load (defaults to leadership)
    const savedTab = getCookie('amc_last_team_tab');
    const lastTab = savedTab && TEAM[savedTab] ? savedTab : 'leadership';
    activateTab(lastTab, { persist: false });

    /* ---------- timeline scroll reveal ---------- */
    const timelineItems = document.querySelectorAll('.timeline-item');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        timelineItems.forEach(item => observer.observe(item));
    } else {
        timelineItems.forEach(item => item.classList.add('in-view'));
    }

    /* ---------- toast helper ---------- */
    function showToast(message) {
        const $toast = $('#toast').text(message).addClass('show');
        setTimeout(() => $toast.removeClass('show'), 3000);
    }

});