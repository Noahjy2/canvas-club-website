// =========================================================
// CANVAS STUDENT PROJECTS
//
// Features:
// 1. 27 student projects
// 2. 9 x 2D
// 3. 9 x 3D
// 4. 9 x Motion Graphics
// 5. Curated mixed All view
// 6. Category filter
// 7. Dynamic project count
// 8. Project detail modal
// 9. Motion video autoplay
// 10. LocalStorage recently viewed
// 11. VIEWED badge on latest 5 projects
// =========================================================


// =========================================================
// LOCAL STORAGE
// =========================================================

const RECENT_KEY =
    "canvas_project_recent";

const MAX_RECENT =
    5;


// =========================================================
// PROJECT DATA
// =========================================================

const PROJECTS = [

    // =====================================================
    // 2D — 9
    // =====================================================

    {
        id: "p1",
        title: "Autumn Watch",
        author: "Tan Wei",
        category: "2d",
        categoryLabel: "2D Illustration",
        description:
            "A warm storybook-style illustration exploring character design, soft shading and an autumn-inspired colour palette.",
        software: "Procreate",
        year: "2025",
        team: "Solo Project",
        img: "../images/gallery/g1-owl.png"
    },


    {
        id: "p2",
        title: "Blade of Dawn",
        author: "Lim Jia",
        category: "2d",
        categoryLabel: "2D Illustration",
        description:
            "A stylised armoured character concept combining dramatic lighting, colour contrast and a glowing energy blade.",
        software: "Clip Studio Paint",
        year: "2025",
        team: "Solo Project",
        img: "../images/gallery/g2-warrior-blue.png"
    },


    {
        id: "p3",
        title: "Verdant Reaper",
        author: "Aisha N.",
        category: "2d",
        categoryLabel: "2D Illustration",
        description:
            "A fantasy character concept exploring green lighting, visual contrast and atmospheric character presentation.",
        software: "Clip Studio Paint",
        year: "2024",
        team: "Solo Project",
        img: "../images/gallery/g3-warrior-green.png"
    },


    {
        id: "p4",
        title: "Neon Courier",
        author: "Chen Yi Xuan",
        category: "2d",
        categoryLabel: "Digital Illustration",
        description:
            "A futuristic character artwork combining neon lighting, saturated colour and cyber-inspired visual styling.",
        software: "Adobe Photoshop",
        year: "2025",
        team: "Solo Project",
        img: "../images/gallery/g11-neon-courier.jpg"
    },


    {
        id: "p5",
        title: "Moonlit Kimono",
        author: "Nur Ain",
        category: "2d",
        categoryLabel: "Digital Illustration",
        description:
            "A detailed character illustration inspired by traditional clothing and a soft moonlit colour atmosphere.",
        software: "Procreate",
        year: "2025",
        team: "Solo Project",
        img: "../images/gallery/g12-moonlit-kimono.jpg"
    },


    {
        id: "p6",
        title: "Ancient Roots",
        author: "David Heng",
        category: "2d",
        categoryLabel: "Concept Art",
        description:
            "A fantasy environment concept exploring natural forms, ancient structures and atmospheric visual storytelling.",
        software: "Adobe Photoshop",
        year: "2024",
        team: "Solo Project",
        img: "../images/gallery/g13-ancient-roots.jpg"
    },


    {
        id: "p7",
        title: "Late Night Deadline",
        author: "Farah Iman",
        category: "2d",
        categoryLabel: "Digital Illustration",
        description:
            "A narrative illustration inspired by the atmosphere of a late-night creative workspace and student project life.",
        software: "Adobe Photoshop",
        year: "2024",
        team: "Solo Project",
        img: "../images/gallery/g14-late-night-deadline.jpg"
    },


    {
        id: "p8",
        title: "Coral Companion",
        author: "Nur Ain",
        category: "2d",
        categoryLabel: "Digital Art",
        description:
            "A colourful digital artwork inspired by underwater forms, organic shapes and vibrant environmental colour.",
        software: "Adobe Photoshop",
        year: "2024",
        team: "Solo Project",
        img: "../images/gallery/g15-coral-companion.jpg"
    },


    {
        id: "p9",
        title: "Street Cart Rush",
        author: "Marcus Ooi",
        category: "2d",
        categoryLabel: "Digital Art",
        description:
            "An energetic urban-inspired artwork combining street imagery, movement and colourful visual composition.",
        software: "Adobe Photoshop",
        year: "2025",
        team: "Solo Project",
        img: "../images/gallery/g16-street-cart-rush.jpg"
    },


    // =====================================================
    // 3D — 9
    // =====================================================

    {
        id: "p10",
        title: "Gilded Grid",
        author: "Marcus Ooi",
        category: "3d",
        categoryLabel: "3D Render",
        description:
            "A hard-surface rendering study exploring geometric repetition, metallic materials and a contrasting gold focal point.",
        software: "Blender",
        year: "2025",
        team: "Solo Project",
        img: "../images/gallery/g4-cubes-gold.jpg"
    },


    {
        id: "p11",
        title: "Wooden Horizon",
        author: "Chen Yi Xuan",
        category: "3d",
        categoryLabel: "3D Render",
        description:
            "A tunnel-style 3D composition created from repeating wooden forms and a dramatic central light source.",
        software: "Cinema 4D",
        year: "2024",
        team: "Solo Project",
        img: "../images/gallery/g5-cubes-wood.jpg"
    },


    {
        id: "p13",
        title: "Glass Orchard",
        author: "Jason Lee",
        category: "3d",
        categoryLabel: "3D / Digital Art",
        description:
            "An experimental visual composition exploring transparency, reflective surfaces and layered depth.",
        software: "Blender + Photoshop",
        year: "2025",
        team: "Solo Project",
        img: "../images/gallery/g17-glass-orchard.jpg"
    },


    {
        id: "p14",
        title: "Fractured Tiles",
        author: "Lim Jia",
        category: "3d",
        categoryLabel: "3D Design",
        description:
            "A geometric design study focused on fragmented surfaces, repetition and depth-based composition.",
        software: "Blender",
        year: "2024",
        team: "Solo Project",
        img: "../images/gallery/g18-fractured-tiles.jpg"
    },


    {
        id: "p15",
        title: "Pink Vortex",
        author: "Aina Rahman",
        category: "3d",
        categoryLabel: "Abstract 3D",
        description:
            "An abstract 3D artwork exploring flowing shapes, vivid pink tones and a strong sense of visual movement.",
        software: "Cinema 4D",
        year: "2025",
        team: "Solo Project",
        img: "../images/gallery/g19-pink-vortex.jpg"
    },


    {
        id: "p16",
        title: "Copper Corridor",
        author: "David Heng",
        category: "3d",
        categoryLabel: "3D Render",
        description:
            "A cinematic architectural render experimenting with copper surfaces, perspective and directional lighting.",
        software: "Blender",
        year: "2025",
        team: "Solo Project",
        img: "../images/gallery/g20-copper-corridor.jpg"
    },


    {
        id: "p17",
        title: "Brick Depth",
        author: "Marcus Ooi",
        category: "3d",
        categoryLabel: "3D Design",
        description:
            "A geometric depth study using repeated structural forms, shadows and layered perspective.",
        software: "Blender",
        year: "2024",
        team: "Solo Project",
        img: "../images/gallery/g21-brick-depth.jpg"
    },


    {
        id: "p18",
        title: "Prism Drop",
        author: "Aisha N.",
        category: "3d",
        categoryLabel: "3D / Digital Art",
        description:
            "An abstract geometric composition exploring refraction-inspired colours, reflective surfaces and central balance.",
        software: "Blender",
        year: "2025",
        team: "Solo Project",
        img: "../images/gallery/g22-prism-drop.jpg"
    },


    {
        id: "p19",
        title: "Crimson Folds",
        author: "Farah Iman",
        category: "3d",
        categoryLabel: "Abstract 3D",
        description:
            "A sculptural digital artwork exploring folded forms, strong red tones and dramatic surface lighting.",
        software: "Cinema 4D",
        year: "2025",
        team: "Solo Project",
        img: "../images/gallery/g23-crimson-folds.jpg"
    },


    // =====================================================
    // MOTION — 9
    // =====================================================

    {
        id: "p20",
        title: "Forest Ambience",
        author: "Wong Kar Ling",
        category: "motion",
        categoryLabel: "Motion Graphics",
        description:
            "A peaceful looping forest scene designed as an atmospheric multimedia background.",
        software: "Adobe After Effects",
        year: "2025",
        team: "Solo Project",
        img: "../images/gallery/g7-forest-poster.jpg",
        video: "../videos/motion-forest.mp4"
    },


    {
        id: "p21",
        title: "Backyard Loop",
        author: "Farah Iman",
        category: "motion",
        categoryLabel: "Motion Graphics",
        description:
            "A looping outdoor scene exploring natural lighting, environmental movement and gentle visual rhythm.",
        software: "Adobe After Effects",
        year: "2024",
        team: "Solo Project",
        img: "../images/gallery/g8-backyard-poster.jpg",
        video: "../videos/motion-backyard.mp4"
    },


    {
        id: "p22",
        title: "Nebula Drift",
        author: "Adam Leong",
        category: "motion",
        categoryLabel: "Motion Graphics",
        description:
            "A vibrant animated nebula exploring particles, colour transitions and continuously flowing movement.",
        software: "Adobe After Effects",
        year: "2025",
        team: "Solo Project",
        img: "../images/gallery/g9-nebula-poster.jpg",
        video: "../videos/motion-nebula.mp4"
    },


    {
        id: "p23",
        title: "Golden Corridor",
        author: "Marcus Ooi",
        category: "motion",
        categoryLabel: "Motion Graphics",
        description:
            "A futuristic animated tunnel combining glowing gold light strips, reflective surfaces and continuous camera movement.",
        software: "Adobe After Effects",
        year: "2025",
        team: "Solo Project",
        img: "../images/gallery/g10-tunnel-poster.jpg",
        video: "../videos/motion-tunnel.mp4"
    },


    {
        id: "p24",
        title: "Chromatic Vortex",
        author: "Aina Rahman",
        category: "motion",
        categoryLabel: "Motion Graphics",
        description:
            "An abstract motion experiment combining rotational movement, bright colours and layered distortion effects.",
        software: "Adobe After Effects",
        year: "2025",
        team: "Solo Project",
        img: "../images/gallery/g24-vortex-poster.jpg",
        video: "../videos/motion-vortex.mp4"
    },


    {
        id: "p25",
        title: "Violet Current",
        author: "Jason Lee",
        category: "motion",
        categoryLabel: "Motion Graphics",
        description:
            "A purple abstract animation featuring fluid forms, light trails and rhythmic looping movement.",
        software: "Adobe After Effects",
        year: "2025",
        team: "Solo Project",
        img: "../images/gallery/g25-violet-poster.jpg",
        video: "../videos/motion-violet.mp4"
    },


    {
        id: "p26",
        title: "Neon Pulse",
        author: "Farah Iman",
        category: "motion",
        categoryLabel: "Motion Graphics",
        description:
            "A looping neon animation featuring flowing luminous lines against a dark digital environment.",
        software: "Adobe After Effects",
        year: "2025",
        team: "Solo Project",
        img: "../images/gallery/g26-neonlines-poster.jpg",
        video: "../videos/motion-neonlines.mp4"
    },


    {
        id: "p27",
        title: "Cube Rush",
        author: "Lim Jia",
        category: "motion",
        categoryLabel: "Motion Graphics",
        description:
            "A fast-paced geometric motion experiment combining animated cubes, perspective and colourful transitions.",
        software: "Cinema 4D + After Effects",
        year: "2025",
        team: "Solo Project",
        img: "../images/gallery/g27-cuberush-poster.jpg",
        video: "../videos/motion-cuberush.mp4"
    },


    {
        id: "p28",
        title: "Golden Hour Walk",
        author: "Wong Kar Ling",
        category: "motion",
        categoryLabel: "Video Editing",
        description:
            "A cinematic video editing study focused on pacing, colour grading and atmospheric sunset imagery.",
        software: "Adobe Premiere Pro",
        year: "2025",
        team: "Solo Project",
        img: null,
        video: "../videos/edit-sunset-walk.mp4"
    }

];


// =========================================================
// PROJECT PORTFOLIO LABELS
// These labels make Projects read as complete portfolio work
// instead of a second artwork gallery.
// =========================================================

const PROJECT_TYPE_BY_ID = {
    p1: "Character Illustration Project",
    p2: "Character Concept Project",
    p3: "Fantasy Character Design Project",
    p4: "Cyber Character Design Project",
    p5: "Character Illustration Project",
    p6: "Environment Concept Art Project",
    p7: "Narrative Illustration Project",
    p8: "Digital Art Study",
    p9: "Urban Visual Design Project",

    p10: "Hard-Surface 3D Rendering Project",
    p11: "3D Environment Study",
    p13: "Experimental 3D Composition",
    p14: "Geometric 3D Design Project",
    p15: "Abstract 3D Art Project",
    p16: "Architectural 3D Rendering Project",
    p17: "3D Depth Study",
    p18: "Reflective 3D Art Project",
    p19: "Sculptural 3D Art Project",

    p20: "Ambient Motion Graphics Project",
    p21: "Environmental Motion Loop",
    p22: "Particle Motion Graphics Project",
    p23: "Animated Tunnel Project",
    p24: "Abstract Motion Graphics Project",
    p25: "Fluid Motion Graphics Project",
    p26: "Neon Motion Graphics Project",
    p27: "3D Motion Design Project",
    p28: "Cinematic Video Editing Project"
};


function getProjectType(project) {

    return (
        PROJECT_TYPE_BY_ID[project.id] ||
        `${project.categoryLabel} Project`
    );

}


function getProjectOutcome(project) {

    if (project.category === "motion") {

        return (
            "A completed motion-based portfolio piece that demonstrates " +
            "timing, movement, visual rhythm and final video presentation."
        );

    }


    if (project.category === "3d") {

        return (
            "A completed 3D portfolio outcome demonstrating form, material, " +
            "lighting, composition and final rendered presentation."
        );

    }


    return (
        "A completed 2D portfolio outcome demonstrating concept development, " +
        "digital illustration, composition and final visual presentation."
    );

}


// =========================================================
// CURATED SHOWCASE ORDER
// =========================================================

const PROJECT_SHOWCASE_ORDER = [

    "p5",
    "p13",
    "p23",

    "p4",
    "p10",
    "p22",

    "p2",
    "p14",
    "p24",

    "p1",
    "p15",
    "p25",

    "p3",
    "p18",
    "p26",

    "p6",
    "p16",
    "p20",

    "p7",
    "p17",
    "p27",

    "p8",
    "p19",
    "p21",

    "p9",
    "p11",
    "p28"

];


// =========================================================
// DOM ELEMENTS
// =========================================================

const projectGrid =
    document.getElementById("projectGrid");

const filterButtons =
    document.querySelectorAll(
        ".project-filter-chip"
    );

const projectEmpty =
    document.getElementById(
        "projectEmpty"
    );

const projectCount =
    document.getElementById(
        "projectCount"
    );

const projectModalElement =
    document.getElementById(
        "projectModal"
    );

const projectModal =
    bootstrap.Modal.getOrCreateInstance(
        projectModalElement
    );

const modalImg =
    document.getElementById(
        "modalImg"
    );

const modalVideo =
    document.getElementById(
        "modalVideo"
    );


let activeCategory =
    "all";


// =========================================================
// GET RECENTLY VIEWED
// =========================================================

function getRecentIds() {

    try {

        const stored =
            localStorage.getItem(
                RECENT_KEY
            );


        if (!stored) {
            return [];
        }


        const parsed =
            JSON.parse(stored);


        if (!Array.isArray(parsed)) {
            return [];
        }


        return parsed
            .map(
                (item) => {

                    if (
                        typeof item ===
                        "string"
                    ) {

                        return item;

                    }


                    if (
                        typeof item ===
                        "object" &&
                        item !== null &&
                        item.id
                    ) {

                        return item.id;

                    }


                    return null;

                }
            )
            .filter(Boolean);

    }

    catch (error) {

        console.warn(
            "Unable to read recently viewed projects.",
            error
        );

        return [];

    }

}


// =========================================================
// SAVE RECENTLY VIEWED
// =========================================================

function saveRecentIds(ids) {

    localStorage.setItem(
        RECENT_KEY,
        JSON.stringify(ids)
    );

}


// =========================================================
// ADD TO RECENTLY VIEWED
// =========================================================

function addToRecent(projectId) {

    let recent =
        getRecentIds();


    recent =
        recent.filter(
            (id) =>
                id !== projectId
        );


    recent.unshift(
        projectId
    );


    recent =
        recent.slice(
            0,
            MAX_RECENT
        );


    saveRecentIds(
        recent
    );


    updateViewedBadges();

}


// =========================================================
// CREATE PROJECT CARD
// =========================================================

function createProjectCard(project) {

    const wrapper =
        document.createElement(
            "div"
        );


    wrapper.className =
        "col-md-6 col-lg-4 project-item";


    wrapper.dataset.category =
        project.category;


    let thumbnailHTML;


    // =====================================================
    // IMAGE / POSTER
    // =====================================================

    if (project.img) {

        thumbnailHTML = `

            <div
                class="project-thumb"
                style="background-image:url('${project.img}')">


                <span
                    class="viewed-badge"
                    data-viewed-id="${project.id}"
                    style="display:none;">

                    VIEWED

                    <i class="bi bi-eye"></i>

                </span>


                <i
                    class="bi ${
                        project.video
                            ? "bi-play-circle-fill"
                            : "bi-eye-fill"
                    } play-icon"
                    aria-hidden="true">
                </i>

            </div>

        `;

    }


    // =====================================================
    // VIDEO WITHOUT POSTER
    // =====================================================

    else {

        thumbnailHTML = `

            <div class="project-thumb">

                <video
                    class="project-thumb-video"
                    muted
                    playsinline
                    preload="metadata"
                    src="${project.video}#t=0.1">
                </video>


                <span
                    class="viewed-badge"
                    data-viewed-id="${project.id}"
                    style="display:none;">

                    VIEWED

                    <i class="bi bi-eye"></i>

                </span>


                <i
                    class="bi bi-play-circle-fill play-icon"
                    aria-hidden="true">
                </i>

            </div>

        `;

    }


    wrapper.innerHTML = `

        <div
            class="project-card"
            data-project-id="${project.id}"
            role="button"
            tabindex="0"
            aria-label="View project ${project.title}">

            ${thumbnailHTML}

            <div class="project-info">

                <div class="project-title">
                    ${project.title}
                </div>

                <div class="project-type">
                    ${getProjectType(project)}
                </div>

                <div class="project-meta">
                    ${project.author}
                    &middot;
                    ${project.year}
                </div>

            </div>

        </div>

    `;


    const card =
        wrapper.querySelector(
            ".project-card"
        );


    card.addEventListener(
        "click",
        () => {

            openProjectModal(
                project
            );

        }
    );


    card.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                openProjectModal(
                    project
                );

            }

        }
    );


    return wrapper;

}


// =========================================================
// GET CURATED SHOWCASE ORDER
// =========================================================

function getShowcaseOrder() {

    const projectMap =
        new Map(
            PROJECTS.map(
                (project) => [
                    project.id,
                    project
                ]
            )
        );


    return PROJECT_SHOWCASE_ORDER
        .map(
            (id) =>
                projectMap.get(id)
        )
        .filter(Boolean);

}


// =========================================================
// RENDER PROJECTS
// =========================================================

function renderProjects() {

    projectGrid.innerHTML =
        "";


    const showcaseProjects =
        getShowcaseOrder();


    showcaseProjects.forEach(
        (project) => {

            projectGrid.appendChild(
                createProjectCard(
                    project
                )
            );

        }
    );


    updateViewedBadges();

    applyProjectFilter();

}


// =========================================================
// FILTER BUTTONS
// =========================================================

filterButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                filterButtons.forEach(
                    (item) => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                activeCategory =
                    button.dataset.filter;


                applyProjectFilter();

            }
        );

    }
);


// =========================================================
// APPLY FILTER + UPDATE COUNT
// =========================================================

function applyProjectFilter() {

    const items =
        document.querySelectorAll(
            ".project-item"
        );


    let visibleCount =
        0;


    items.forEach(
        (item) => {

            const matches =
                activeCategory === "all" ||
                item.dataset.category ===
                activeCategory;


            item.style.display =
                matches
                    ? ""
                    : "none";


            if (matches) {

                visibleCount++;

            }

        }
    );


    // =====================================================
    // EMPTY STATE
    // =====================================================

    if (projectEmpty) {

        projectEmpty.style.display =
            visibleCount === 0
                ? "block"
                : "none";

    }


    // =====================================================
    // PROJECT COUNT
    // =====================================================

    if (projectCount) {

        if (
            activeCategory === "2d"
        ) {

            projectCount.textContent =
                `${visibleCount} 2D Projects`;

        }

        else if (
            activeCategory === "3d"
        ) {

            projectCount.textContent =
                `${visibleCount} 3D Projects`;

        }

        else if (
            activeCategory ===
            "motion"
        ) {

            projectCount.textContent =
                `${visibleCount} Motion Graphics Projects`;

        }

        else {

            projectCount.textContent =
                `${visibleCount} Student Projects`;

        }

    }

}


// =========================================================
// VIEWED BADGES
// =========================================================

function updateViewedBadges() {

    const recent =
        getRecentIds();


    document
        .querySelectorAll(
            ".viewed-badge"
        )
        .forEach(
            (badge) => {

                const projectId =
                    badge.dataset.viewedId;


                badge.style.display =
                    recent.includes(
                        projectId
                    )
                        ? "inline-flex"
                        : "none";

            }
        );

}


// =========================================================
// OPEN PROJECT MODAL
// =========================================================

function openProjectModal(project) {

    document.getElementById(
        "projectModalLabel"
    ).textContent =
        project.title;


    const projectType =
        getProjectType(project);


    document.getElementById(
        "modalMeta"
    ).textContent =
        `by ${project.author} · ${project.categoryLabel}`;


    document.getElementById(
        "modalDesc"
    ).textContent =
        project.description;


    document.getElementById(
        "modalTools"
    ).textContent =
        project.software;


    document.getElementById(
        "modalYear"
    ).textContent =
        project.year;


    document.getElementById(
        "modalType"
    ).textContent =
        projectType;


    document.getElementById(
        "modalTeam"
    ).textContent =
        project.team;


    document.getElementById(
        "modalOutcome"
    ).textContent =
        getProjectOutcome(project);


    // =====================================================
    // VIDEO
    // =====================================================

    if (project.video) {

        modalImg.style.display =
            "none";


        modalImg.removeAttribute(
            "src"
        );


        modalVideo.style.display =
            "block";


        modalVideo.muted =
            true;


        modalVideo.loop =
            true;


        modalVideo.playsInline =
            true;


        if (project.img) {

            modalVideo.poster =
                project.img;

        }

        else {

            modalVideo.removeAttribute(
                "poster"
            );

        }


        modalVideo.src =
            project.video;


        modalVideo.load();

    }


    // =====================================================
    // STATIC IMAGE
    // =====================================================

    else {

        modalVideo.pause();


        modalVideo.removeAttribute(
            "src"
        );


        modalVideo.load();


        modalVideo.style.display =
            "none";


        modalImg.style.display =
            "block";


        modalImg.src =
            project.img;


        modalImg.alt =
            project.title;

    }


    addToRecent(
        project.id
    );


    projectModal.show();

}


// =========================================================
// MODAL VIDEO AUTOPLAY
// =========================================================

projectModalElement.addEventListener(
    "shown.bs.modal",
    () => {

        if (
            modalVideo.style.display !==
                "none" &&
            modalVideo.getAttribute(
                "src"
            )
        ) {

            modalVideo.muted =
                true;


            modalVideo
                .play()
                .catch(
                    () => {
                        // Controls remain available.
                    }
                );

        }

    }
);


// =========================================================
// STOP VIDEO WHEN MODAL CLOSES
// =========================================================

projectModalElement.addEventListener(
    "hidden.bs.modal",
    () => {

        modalVideo.pause();


        try {

            modalVideo.currentTime =
                0;

        }

        catch (error) {

            // Ignore before metadata loads.

        }


        modalVideo.removeAttribute(
            "src"
        );


        modalVideo.load();

    }
);


// =========================================================
// INITIALISE
// =========================================================

renderProjects();