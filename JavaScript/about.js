/* ============================================================
   about.js — About page behaviour for the Animation & Multimedia
   Club site.

   Edit TEAM_MEMBERS below with your group's real names, roles,
   contributions and skills.
   ============================================================ */

$(function () {

    /* ---------- mobile navigation ---------- */
    $('#navToggle').on('click', function () {
        const $links = $('#navLinks');
        const isOpen = !$links.hasClass('open');
        $links.toggleClass('open', isOpen);
        $(this).attr('aria-expanded', String(isOpen));
    });

    $('#navLinks a').on('click', function () {
        $('#navLinks').removeClass('open');
        $('#navToggle').attr('aria-expanded', 'false');
    });

    $(document).on('keydown', function (event) {
        if (event.key === 'Escape') {
            $('#navLinks').removeClass('open');
            $('#navToggle').attr('aria-expanded', 'false');
        }
    });

    /* =========================================================
       FOUR ASSIGNMENT TEAM MEMBERS
       ---------------------------------------------------------
       Replace the placeholder names/details below with the real
       information for your four group members.
       The avatar URLs use DiceBear-generated user icons.
       ========================================================= */

    const TEAM_MEMBERS = [
        {
            id: 'member1',
            name: 'YOUR NAME',
            role: 'Project Lead / Web Developer',
            course: 'Computer Science',
            avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=CanvasMemberOne&backgroundColor=1b1b25',
            bio: 'Responsible for coordinating the project, planning the website structure and helping ensure that the CANVAS pages work together consistently.',
            contribution: 'Project Planning, Home Page & About Page',
            skills: ['HTML', 'CSS', 'JavaScript']
        },
        {
            id: 'member2',
            name: 'MEMBER 2 NAME',
            role: 'UI / UX Designer',
            course: 'Computer Science',
            avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=CanvasMemberTwo&backgroundColor=1b1b25',
            bio: 'Focused on the visual design of the website, including page layout, typography, styling and maintaining a consistent user experience.',
            contribution: 'Gallery Page & Visual Design',
            skills: ['UI Design', 'CSS', 'Responsive Design']
        },
        {
            id: 'member3',
            name: 'MEMBER 3 NAME',
            role: 'Front-End Developer',
            course: 'Computer Science',
            avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=CanvasMemberThree&backgroundColor=1b1b25',
            bio: 'Developed interactive website components and helped connect HTML, CSS and JavaScript features across the project.',
            contribution: 'Events Page & Workshops Page',
            skills: ['JavaScript', 'Bootstrap', 'HTML']
        },
        {
            id: 'member4',
            name: 'MEMBER 4 NAME',
            role: 'Content & Web Developer',
            course: 'Computer Science',
            avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=CanvasMemberFour&backgroundColor=1b1b25',
            bio: 'Worked on website content, page organisation and supporting features while helping test and improve the overall CANVAS website.',
            contribution: 'Projects, Join & Contact Pages',
            skills: ['Content', 'Web Design', 'Testing']
        }
    ];

    let activeMember = 0;

    function escapeHtml(value) {
        return String(value)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;');
    }

    /* ---------- display the selected large profile ---------- */
    function showMember(index) {
        const member = TEAM_MEMBERS[index];
        if (!member) return;

        const skills = member.skills
            .map(skill => `<span class="featured-skill">${escapeHtml(skill)}</span>`)
            .join('');

        $('#featuredMember').html(`
            <article class="featured-profile">
                <div class="featured-image-side">
                    <div class="featured-image-frame">
                        <img
                            src="${member.avatar}"
                            alt="Generated avatar for ${escapeHtml(member.name)}"
                            class="featured-photo"
                        >
                        <div class="photo-overlay">
                            <span>MEMBER</span>
                            <strong>${String(index + 1).padStart(2, '0')}</strong>
                        </div>
                    </div>
                </div>

                <div class="featured-info">
                    <div class="featured-label">
                        TEAM MEMBER // ${String(index + 1).padStart(2, '0')}
                    </div>

                    <h3 class="featured-name">${escapeHtml(member.name)}</h3>
                    <p class="featured-role">${escapeHtml(member.role)}</p>
                    <div class="member-course">${escapeHtml(member.course)}</div>

                    <div class="featured-divider"></div>

                    <p class="featured-bio">${escapeHtml(member.bio)}</p>

                    <div class="contribution-block">
                        <span>PROJECT CONTRIBUTION</span>
                        <strong>${escapeHtml(member.contribution)}</strong>
                    </div>

                    <div class="featured-skills">${skills}</div>

                    <div class="member-progress" aria-label="Member ${index + 1} of ${TEAM_MEMBERS.length}">
                        <span>${String(index + 1).padStart(2, '0')}</span>
                        <div class="progress-line" aria-hidden="true">
                            <div class="progress-fill" style="width:${((index + 1) / TEAM_MEMBERS.length) * 100}%"></div>
                        </div>
                        <span>${String(TEAM_MEMBERS.length).padStart(2, '0')}</span>
                    </div>
                </div>
            </article>
        `);
    }

    /* ---------- render the four small profile selectors ---------- */
    function renderMemberSelector() {
        const $selector = $('#memberSelector').empty();

        TEAM_MEMBERS.forEach((member, index) => {
            const isActive = index === activeMember;

            $selector.append(`
                <button
                    type="button"
                    class="member-selector-card ${isActive ? 'active' : ''}"
                    data-index="${index}"
                    aria-pressed="${isActive}"
                    aria-label="Show profile for ${escapeHtml(member.name)}"
                >
                    <div class="selector-photo-wrap">
                        <img src="${member.avatar}" alt="" class="selector-photo">
                        <span class="selector-number">${String(index + 1).padStart(2, '0')}</span>
                    </div>

                    <div class="selector-content">
                        <strong>${escapeHtml(member.name)}</strong>
                        <span>${escapeHtml(member.role)}</span>
                    </div>

                    <span class="selector-arrow" aria-hidden="true">→</span>
                </button>
            `);
        });
    }

    $('#memberSelector').on('click', '.member-selector-card', function () {
        activeMember = Number($(this).data('index'));
        showMember(activeMember);
        renderMemberSelector();
    });

    /* Keyboard support for the four selectors. */
    $('#memberSelector').on('keydown', '.member-selector-card', function (event) {
        if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;

        event.preventDefault();
        const change = (event.key === 'ArrowRight' || event.key === 'ArrowDown') ? 1 : -1;
        activeMember = (activeMember + change + TEAM_MEMBERS.length) % TEAM_MEMBERS.length;
        showMember(activeMember);
        renderMemberSelector();
        $('#memberSelector .member-selector-card').eq(activeMember).trigger('focus');
    });

    showMember(activeMember);
    renderMemberSelector();

    /* ---------- optional reveal animation for growth cards ---------- */
    const growthCards = document.querySelectorAll('.growth-card');
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        growthCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(18px)';
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transition = 'opacity .55s ease, transform .55s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        growthCards.forEach(card => observer.observe(card));
    }

});
