// gallery.js — category filtering + favorites using localStorage

const FAV_KEY = "canvas_gallery_favorites";

function getFavorites() {
    const stored = localStorage.getItem(FAV_KEY);
    return stored ? JSON.parse(stored) : [];
}

function saveFavorites(favorites) {
    localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
}

function isFavorite(id) {
    return getFavorites().includes(id);
}

function toggleFavorite(id) {
    let favorites = getFavorites();
    if (favorites.includes(id)) {
        favorites = favorites.filter((item) => item !== id);
    } else {
        favorites.push(id);
    }
    saveFavorites(favorites);
    return favorites.includes(id);
}

// Restore favorite button states on load
document.querySelectorAll(".fav-btn").forEach((btn) => {
    const id = btn.dataset.id;
    if (isFavorite(id)) {
        btn.classList.add("active");
        btn.querySelector("i").className = "bi bi-heart-fill";
    }

    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const nowActive = toggleFavorite(id);
        btn.classList.toggle("active", nowActive);
        btn.querySelector("i").className = nowActive ? "bi bi-heart-fill" : "bi bi-heart";

        // If we're currently in "favorites only" view, re-apply the filter
        if (favToggle.classList.contains("active")) {
            applyFavoritesView();
        }
    });
});

// Category filter chips
const filterChips = document.querySelectorAll(".filter-chip");
const galleryItems = document.querySelectorAll(".gallery-item");

filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
        filterChips.forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        favToggle.classList.remove("active");

        const category = chip.dataset.filter;
        galleryItems.forEach((item) => {
            const matches = category === "all" || item.dataset.category === category;
            item.classList.toggle("hidden", !matches);
        });
        document.getElementById("emptyState").style.display = "none";
    });
});

// View favorites toggle
const favToggle = document.getElementById("favToggle");

function applyFavoritesView() {
    const favorites = getFavorites();
    let anyVisible = false;
    galleryItems.forEach((item) => {
        const isFav = favorites.includes(item.dataset.id);
        item.classList.toggle("hidden", !isFav);
        if (isFav) anyVisible = true;
    });
    document.getElementById("emptyState").style.display = anyVisible ? "none" : "block";
}

favToggle.addEventListener("click", () => {
    const nowActive = !favToggle.classList.contains("active");
    favToggle.classList.toggle("active", nowActive);

    if (nowActive) {
        filterChips.forEach((c) => c.classList.remove("active"));
        applyFavoritesView();
    } else {
        filterChips[0].classList.add("active");
        galleryItems.forEach((item) => item.classList.remove("hidden"));
        document.getElementById("emptyState").style.display = "none";
    }
});