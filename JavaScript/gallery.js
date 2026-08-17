// gallery.js — category filter + search + favorites (localStorage) + detail modal

const FAV_KEY = "canvas_gallery_favorites";

const filterChips = document.querySelectorAll(".filter-chip");
const galleryItems = document.querySelectorAll(".gallery-item");
const favToggle = document.getElementById("favToggle");
const favCountEl = document.getElementById("favCount");
const clearFavBtn = document.getElementById("clearFavBtn");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");

let favoritesViewActive = false;

// ---------- localStorage favorites (unchanged logic, kept as-is) ----------

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

// ---------- favorite counter ----------

function updateFavCount() {
  favCountEl.textContent = getFavorites().length;
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
    updateFavCount();

    // If currently viewing favorites only, re-apply so unfavorited items disappear
    if (favoritesViewActive) {
      applyFilters();
    }
  });
});

updateFavCount();

// ---------- clear favorites ----------

clearFavBtn.addEventListener("click", () => {
  saveFavorites([]);
  document.querySelectorAll(".fav-btn").forEach((btn) => {
    btn.classList.remove("active");
    btn.querySelector("i").className = "bi bi-heart";
  });
  updateFavCount();
  if (favoritesViewActive) {
    applyFilters();
  }
});

// ---------- category filter ----------

let activeCategory = "all";

filterChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    filterChips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    activeCategory = chip.dataset.filter;

    favoritesViewActive = false;
    favToggle.classList.remove("active");

    applyFilters();
  });
});

// ---------- favorites-only view ----------

favToggle.addEventListener("click", () => {
  favoritesViewActive = !favoritesViewActive;
  favToggle.classList.toggle("active", favoritesViewActive);

  if (favoritesViewActive) {
    filterChips.forEach((c) => c.classList.remove("active"));
  } else {
    filterChips[0].classList.add("active");
    activeCategory = "all";
  }

  applyFilters();
});

// ---------- search ----------

searchInput.addEventListener("input", applyFilters);

// ---------- combined filter: category / favorites AND search, applied together ----------

function applyFilters() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const favorites = getFavorites();
  let anyVisible = false;

  galleryItems.forEach((item) => {
    const matchesCategory = favoritesViewActive
      ? favorites.includes(item.dataset.id)
      : (activeCategory === "all" || item.dataset.category === activeCategory);

    const searchable = [
      item.dataset.title,
      item.dataset.student,
      item.dataset.catLabel,
    ].join(" ").toLowerCase();

    const matchesSearch = searchTerm === "" || searchable.includes(searchTerm);

    const visible = matchesCategory && matchesSearch;
    item.classList.toggle("hidden", !visible);
    if (visible) anyVisible = true;
  });

  emptyState.style.display = anyVisible ? "none" : "block";
}

// ---------- artwork detail modal ----------

const galleryModalEl = document.getElementById("galleryModal");
const galleryModal = new bootstrap.Modal(galleryModalEl);

function openGalleryModal(item) {
  document.getElementById("galleryModalLabel").textContent = item.dataset.title;
  document.getElementById("galleryModalMeta").textContent =
    `by ${item.dataset.student} \u00B7 ${item.dataset.catLabel}`;
  document.getElementById("galleryModalDesc").textContent = item.dataset.desc;
  document.getElementById("galleryModalTech").textContent =
    `Software: ${item.dataset.software} \u00B7 Year: ${item.dataset.year}`;
  document.getElementById("galleryModalImg").src = item.dataset.img;
  document.getElementById("galleryModalImg").alt = item.dataset.title;

  galleryModal.show();
}

document.querySelectorAll(".view-details-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const parentItem = btn.closest(".gallery-item");
    openGalleryModal(parentItem);
  });
});