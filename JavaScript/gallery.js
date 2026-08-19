// =========================================================
// CANVAS GALLERY
//
// Features:
// 1. Search
// 2. Category filtering
// 3. Favorites
// 4. LocalStorage
// 5. Favorite counter
// 6. Favorites-only view
// 7. Artwork detail modal
// 8. Motion Graphics preview
// 9. Curated mixed showcase layout
// 10. Dynamic artwork count
// =========================================================


// =========================================================
// LOCAL STORAGE
// =========================================================

const FAV_KEY = "canvas_gallery_favorites";


// =========================================================
// DOM ELEMENTS
// =========================================================

const filterButtons =
    document.querySelectorAll(".filter-chip");

const favoriteButtons =
    document.querySelectorAll(".fav-btn");

const favoriteToggle =
    document.getElementById("favToggle");

const favoriteToggleText =
    document.getElementById("favToggleText");

const favoriteToggleIcon =
    document.getElementById("favToggleIcon");

const clearFavoriteButton =
    document.getElementById("clearFavBtn");

const searchInput =
    document.getElementById("searchInput");

const emptyState =
    document.getElementById("emptyState");

const galleryGrid =
    document.getElementById("galleryGrid");

const galleryCount =
    document.getElementById("galleryCount");


// =========================================================
// MODAL
// =========================================================

const galleryModalElement =
    document.getElementById("galleryModal");

const galleryModal =
    bootstrap.Modal.getOrCreateInstance(
        galleryModalElement
    );

const galleryModalImg =
    document.getElementById("galleryModalImg");

const galleryModalVideo =
    document.getElementById("galleryModalVideo");


// =========================================================
// CURRENT STATE
// =========================================================

let activeFilter = "all";
let favoritesOnly = false;


// =========================================================
// CURATED SHOWCASE ORDER
//
// Desktop rows:
//
// Neon Courier | Gilded Grid | Nebula Drift
// Moonlit Kimono | Glass Orchard | Golden Corridor
// Blade of Dawn | Fractured Tiles | Chromatic Vortex
// etc.
// =========================================================

const GALLERY_SHOWCASE_ORDER = [

    "g11",
    "g4",
    "g9",

    "g12",
    "g17",
    "g10",

    "g2",
    "g18",
    "g24",

    "g1",
    "g5",
    "g25",

    "g3",
    "g22",
    "g26",

    "g14",
    "g6",
    "g7"

];


// =========================================================
// GET FAVORITES
// =========================================================

function getFavorites() {

    try {

        const saved =
            localStorage.getItem(FAV_KEY);

        if (!saved) {
            return [];
        }

        const parsed =
            JSON.parse(saved);

        return Array.isArray(parsed)
            ? parsed
            : [];

    }

    catch (error) {

        console.warn(
            "Unable to read favorites.",
            error
        );

        return [];

    }

}


// =========================================================
// SAVE FAVORITES
// =========================================================

function saveFavorites(favorites) {

    localStorage.setItem(
        FAV_KEY,
        JSON.stringify(favorites)
    );

}


// =========================================================
// ARRANGE SHOWCASE
// =========================================================

function arrangeGalleryShowcase() {

    if (!galleryGrid) {
        return;
    }


    const itemMap =
        new Map();


    document
        .querySelectorAll(".gallery-item")
        .forEach(
            (item) => {

                itemMap.set(
                    item.dataset.id,
                    item
                );

            }
        );


    GALLERY_SHOWCASE_ORDER.forEach(
        (id) => {

            const item =
                itemMap.get(id);

            if (item) {

                galleryGrid.appendChild(
                    item
                );

            }

        }
    );

}


// =========================================================
// UPDATE FAVORITE UI
// =========================================================

function updateFavoriteUI() {

    const favorites =
        getFavorites();


    document
        .querySelectorAll(".fav-btn")
        .forEach(
            (button) => {

                const id =
                    button.dataset.id;

                const icon =
                    button.querySelector("i");


                if (favorites.includes(id)) {

                    button.classList.add(
                        "active"
                    );

                    icon.classList.remove(
                        "bi-heart"
                    );

                    icon.classList.add(
                        "bi-heart-fill"
                    );

                    button.setAttribute(
                        "aria-label",
                        "Remove artwork from favorites"
                    );

                }

                else {

                    button.classList.remove(
                        "active"
                    );

                    icon.classList.remove(
                        "bi-heart-fill"
                    );

                    icon.classList.add(
                        "bi-heart"
                    );

                    button.setAttribute(
                        "aria-label",
                        "Save artwork to favorites"
                    );

                }

            }
        );


    const favCount =
        document.getElementById("favCount");


    if (favCount) {

        favCount.textContent =
            favorites.length;

    }

}


// =========================================================
// FAVORITE BUTTONS
// =========================================================

favoriteButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();


                const id =
                    button.dataset.id;


                let favorites =
                    getFavorites();


                if (favorites.includes(id)) {

                    favorites =
                        favorites.filter(
                            (favoriteId) =>
                                favoriteId !== id
                        );

                }

                else {

                    favorites.push(id);

                }


                saveFavorites(
                    favorites
                );


                updateFavoriteUI();

                applyFilters();

            }
        );

    }
);


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


                activeFilter =
                    button.dataset.filter;


                applyFilters();

            }
        );

    }
);


// =========================================================
// FAVORITES VIEW
// =========================================================

if (favoriteToggle) {

    favoriteToggle.addEventListener(
        "click",
        () => {

            favoritesOnly =
                !favoritesOnly;


            favoriteToggle.classList.toggle(
                "active",
                favoritesOnly
            );


            if (favoriteToggleText) {

                favoriteToggleText.textContent =
                    favoritesOnly
                        ? "Show All"
                        : "View Favorites";

            }


            if (favoriteToggleIcon) {

                favoriteToggleIcon.className =
                    favoritesOnly
                        ? "bi bi-grid me-1"
                        : "bi bi-heart-fill me-1";

            }


            applyFilters();

        }
    );

}


// =========================================================
// CLEAR FAVORITES
// =========================================================

if (clearFavoriteButton) {

    clearFavoriteButton.addEventListener(
        "click",
        () => {

            localStorage.removeItem(
                FAV_KEY
            );


            favoritesOnly =
                false;


            favoriteToggle?.classList.remove(
                "active"
            );


            if (favoriteToggleText) {

                favoriteToggleText.textContent =
                    "View Favorites";

            }


            if (favoriteToggleIcon) {

                favoriteToggleIcon.className =
                    "bi bi-heart-fill me-1";

            }


            updateFavoriteUI();

            applyFilters();

        }
    );

}


// =========================================================
// SEARCH
// =========================================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        applyFilters
    );

}


// =========================================================
// UPDATE ARTWORK COUNT
// =========================================================

function updateGalleryCount(
    visibleCount
) {

    if (!galleryCount) {
        return;
    }


    if (favoritesOnly) {

        galleryCount.textContent =
            visibleCount === 1
                ? "1 Favorite Artwork"
                : `${visibleCount} Favorite Artworks`;

        return;

    }


    if (activeFilter === "2d") {

        galleryCount.textContent =
            `${visibleCount} 2D Artworks`;

    }

    else if (
        activeFilter === "3d"
    ) {

        galleryCount.textContent =
            `${visibleCount} 3D Artworks`;

    }

    else if (
        activeFilter === "motion"
    ) {

        galleryCount.textContent =
            `${visibleCount} Motion Graphics Artworks`;

    }

    else {

        galleryCount.textContent =
            visibleCount === 1
                ? "1 Artwork"
                : `${visibleCount} Artworks`;

    }

}


// =========================================================
// APPLY SEARCH + FILTER + FAVORITES
// =========================================================

function applyFilters() {

    const searchTerm =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const favorites =
        getFavorites();


    let visibleCount = 0;


    document
        .querySelectorAll(".gallery-item")
        .forEach(
            (item) => {

                const category =
                    item.dataset.category;

                const id =
                    item.dataset.id;

                const title =
                    (
                        item.dataset.title ||
                        ""
                    ).toLowerCase();

                const student =
                    (
                        item.dataset.student ||
                        ""
                    ).toLowerCase();

                const categoryLabel =
                    (
                        item.dataset.catLabel ||
                        ""
                    ).toLowerCase();


                const matchesCategory =
                    activeFilter === "all" ||
                    category === activeFilter;


                const matchesFavorites =
                    !favoritesOnly ||
                    favorites.includes(id);


                const matchesSearch =
                    !searchTerm ||
                    title.includes(searchTerm) ||
                    student.includes(searchTerm) ||
                    categoryLabel.includes(searchTerm);


                const shouldShow =
                    matchesCategory &&
                    matchesFavorites &&
                    matchesSearch;


                item.style.display =
                    shouldShow
                        ? ""
                        : "none";


                if (shouldShow) {

                    visibleCount++;

                }


                const previewVideo =
                    item.querySelector(
                        ".gallery-preview-video"
                    );


                if (previewVideo) {

                    if (shouldShow) {

                        previewVideo
                            .play()
                            .catch(
                                () => {
                                    // Browser may block autoplay.
                                }
                            );

                    }

                    else {

                        previewVideo.pause();

                    }

                }

            }
        );


    if (emptyState) {

        emptyState.style.display =
            visibleCount === 0
                ? "block"
                : "none";

    }


    updateGalleryCount(
        visibleCount
    );

}


// =========================================================
// VIEW DETAILS
// =========================================================

document
    .querySelectorAll(
        ".view-details-btn"
    )
    .forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    const item =
                        button.closest(
                            ".gallery-item"
                        );


                    if (!item) {
                        return;
                    }


                    openGalleryModal(
                        item
                    );

                }
            );

        }
    );


// =========================================================
// OPEN GALLERY MODAL
// =========================================================

function openGalleryModal(item) {

    const title =
        item.dataset.title;

    const student =
        item.dataset.student;

    const category =
        item.dataset.catLabel;

    const description =
        item.dataset.desc;

    const software =
        item.dataset.software;

    const year =
        item.dataset.year;

    const image =
        item.dataset.img;

    const video =
        item.dataset.video;


    document.getElementById(
        "galleryModalLabel"
    ).textContent =
        title;


    document.getElementById(
        "galleryModalMeta"
    ).textContent =
        `by ${student} · ${category}`;


    document.getElementById(
        "galleryModalDesc"
    ).textContent =
        description;


    document.getElementById(
        "galleryModalTech"
    ).textContent =
        `Software: ${software} · Year: ${year}`;


    // =====================================================
    // VIDEO
    // =====================================================

    if (video) {

        galleryModalImg.style.display =
            "none";


        galleryModalImg.removeAttribute(
            "src"
        );


        galleryModalVideo.style.display =
            "block";


        galleryModalVideo.muted =
            true;


        galleryModalVideo.loop =
            true;


        galleryModalVideo.playsInline =
            true;


        if (image) {

            galleryModalVideo.poster =
                image;

        }

        else {

            galleryModalVideo.removeAttribute(
                "poster"
            );

        }


        galleryModalVideo.src =
            video;


        galleryModalVideo.load();

    }


    // =====================================================
    // IMAGE
    // =====================================================

    else {

        galleryModalVideo.pause();


        galleryModalVideo.removeAttribute(
            "src"
        );


        galleryModalVideo.load();


        galleryModalVideo.style.display =
            "none";


        galleryModalImg.style.display =
            "block";


        galleryModalImg.src =
            image;


        galleryModalImg.alt =
            title;

    }


    galleryModal.show();

}


// =========================================================
// MODAL VIDEO AUTOPLAY
// =========================================================

galleryModalElement.addEventListener(
    "shown.bs.modal",
    () => {

        if (
            galleryModalVideo.style.display !== "none" &&
            galleryModalVideo.getAttribute("src")
        ) {

            galleryModalVideo.muted =
                true;


            galleryModalVideo
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

galleryModalElement.addEventListener(
    "hidden.bs.modal",
    () => {

        galleryModalVideo.pause();


        try {

            galleryModalVideo.currentTime =
                0;

        }

        catch (error) {

            // Ignore before metadata loads.

        }


        galleryModalVideo.removeAttribute(
            "src"
        );


        galleryModalVideo.load();

    }
);


// =========================================================
// INITIALISE
// =========================================================

arrangeGalleryShowcase();

updateFavoriteUI();

applyFilters();