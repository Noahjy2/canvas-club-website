// =========================================================
// CANVAS STUDENT PROJECTS
//
// Features:
// 1. Dynamic project cards
// 2. All / 2D / 3D / Motion Graphics filter
// 3. Project detail modal
// 4. Motion Graphics video autoplay
// 5. LocalStorage recently viewed system
// 6. VIEWED badge on the latest 5 viewed projects
// =========================================================


// =========================================================
// LOCAL STORAGE
// =========================================================

const RECENT_KEY = "canvas_project_recent";

const MAX_RECENT = 5;


// =========================================================
// PROJECT DATA
//
// All uploaded gallery images are used.
// All uploaded videos are also used.
// =========================================================

const PROJECTS = [

    // =====================================================
    // 2D / ILLUSTRATION
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

        author: "Adam Leong",

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

        year: "2025",

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
    // 3D / DIGITAL DESIGN
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
        id: "p12",

        title: "Sweet Slice",

        author: "Nur Ain",

        category: "3d",

        categoryLabel: "3D Render",

        description:
            "A playful stylised render exploring colourful fruit forms, simple geometry and a bright pastel environment.",

        software: "Blender",

        year: "2025",

        team: "Solo Project",

        img: "../images/gallery/g6-watermelon.jpg"
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
    // MOTION GRAPHICS / VIDEO
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
// ELEMENTS
// =========================================================

const projectGrid =
    document.getElementById("projectGrid");


const filterButtons =
    document.querySelectorAll(".project-filter-chip");


const projectEmpty =
    document.getElementById("projectEmpty");


const projectModalElement =
    document.getElementById("projectModal");


const projectModal =
    bootstrap.Modal.getOrCreateInstance(projectModalElement);


const modalImg =
    document.getElementById("modalImg");


const modalVideo =
    document.getElementById("modalVideo");


let activeCategory = "all";


// =========================================================
// LOCAL STORAGE
// =========================================================

function getRecentIds() {

    try {

        const stored =
            localStorage.getItem(RECENT_KEY);


        if (!stored) {

            return [];

        }


        const parsed =
            JSON.parse(stored);


        if (!Array.isArray(parsed)) {

            return [];

        }


        /*
            Backward compatible:

            Old version stored full project objects.
            New version stores only project IDs.

            This allows old LocalStorage data to continue working.
        */

        return parsed
            .map((item) => {

                if (typeof item === "string") {

                    return item;

                }


                if (
                    typeof item === "object" &&
                    item !== null &&
                    item.id
                ) {

                    return item.id;

                }


                return null;

            })
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


    /*
        Remove duplicate if project already exists.
    */

    recent =
        recent.filter(
            (id) => id !== projectId
        );


    /*
        Put newest project at the beginning.
    */

    recent.unshift(projectId);


    /*
        Keep only the latest 5.
    */

    recent =
        recent.slice(
            0,
            MAX_RECENT
        );


    saveRecentIds(recent);


    updateViewedBadges();

}


// =========================================================
// PROJECT CARD HTML
// =========================================================

function createProjectCard(project) {

    const wrapper =
        document.createElement("div");


    wrapper.className =
        "col-md-6 col-lg-4 project-item";


    wrapper.dataset.category =
        project.category;


    /*
        If a project has a normal poster image,
        use background-image.

        Golden Hour Walk does not have a separate poster,
        so its video itself is used as the thumbnail.
    */

    let thumbnailHTML;


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
            data-project-id="${project.id}">


            ${thumbnailHTML}


            <div class="project-info">


                <div class="project-title">

                    ${project.title}

                </div>


                <div class="project-meta">

                    ${project.author}
                    &middot;
                    ${project.categoryLabel}

                </div>


            </div>


        </div>

    `;


    const card =
        wrapper.querySelector(".project-card");


    card.addEventListener(
        "click",
        () => {

            openProjectModal(project);

        }
    );


    return wrapper;

}


// =========================================================
// RENDER ALL PROJECTS
// =========================================================

function renderProjects() {

    projectGrid.innerHTML = "";


    PROJECTS.forEach(
        (project) => {

            const projectCard =
                createProjectCard(project);


            projectGrid.appendChild(
                projectCard
            );

        }
    );


    updateViewedBadges();

    applyProjectFilter();

}


// =========================================================
// CATEGORY FILTER
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
// APPLY FILTER
// =========================================================

function applyProjectFilter() {

    const items =
        document.querySelectorAll(
            ".project-item"
        );


    let visibleCount = 0;


    items.forEach(
        (item) => {


            const matches =
                activeCategory === "all" ||
                item.dataset.category === activeCategory;


            item.style.display =
                matches
                    ? ""
                    : "none";


            if (matches) {

                visibleCount++;

            }

        }
    );


    projectEmpty.style.display =
        visibleCount === 0
            ? "block"
            : "none";

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


                if (
                    recent.includes(projectId)
                ) {

                    badge.style.display =
                        "inline-flex";

                }

                else {

                    badge.style.display =
                        "none";

                }

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


    document.getElementById(
        "modalMeta"
    ).textContent =
        `by ${project.author} · ${project.categoryLabel}`;


    document.getElementById(
        "modalDesc"
    ).textContent =
        project.description;


    document.getElementById(
        "modalTech"
    ).textContent =
        `Software: ${project.software} · Year: ${project.year} · ${project.team}`;


    // =====================================================
    // VIDEO PROJECT
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
    // STATIC IMAGE PROJECT
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


    /*
        Save as recently viewed.

        The card will immediately show VIEWED.
    */

    addToRecent(
        project.id
    );


    /*
        Open Bootstrap modal.
    */

    projectModal.show();

}


// =========================================================
// VIDEO AUTOPLAY
//
// Wait until Bootstrap finishes showing the modal.
// =========================================================

projectModalElement.addEventListener(
    "shown.bs.modal",
    () => {


        if (
            modalVideo.style.display !== "none" &&
            modalVideo.getAttribute("src")
        ) {


            /*
                Muted autoplay is required because
                browsers usually block autoplay with sound.
            */

            modalVideo.muted =
                true;


            modalVideo.play()
                .catch(
                    () => {

                        /*
                            Controls remain visible if
                            the browser blocks autoplay.
                        */

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

            // Ignore if video metadata has not loaded.

        }


        modalVideo.removeAttribute(
            "src"
        );


        modalVideo.load();

    }
);


// =========================================================
// INITIALISE PAGE
// =========================================================

renderProjects();