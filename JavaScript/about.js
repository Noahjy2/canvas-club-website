/* ============================================================
   about.js — About page behaviour for the Animation & Multimedia
   Club site.
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
