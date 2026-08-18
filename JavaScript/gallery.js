// gallery.js — category filter + search + favorites + motion previews + detail modal

const FAV_KEY = "canvas_gallery_favorites";

const filterChips = document.querySelectorAll(".filter-chip");
const galleryItems = document.querySelectorAll(".gallery-item");
const favToggle = document.getElementById("favToggle");
const favCountEl = document.getElementById("favCount");
const clearFavBtn = document.getElementById("clearFavBtn");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");

let favoritesViewActive = false;
let activeCategory = "all";

// ---------- localStorage favorites ----------

function getFavorites() {
  try {
    const stored = localStorage.getItem(FAV_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn("Could not read gallery favorites. Resetting favorites.", error);
    return [];
  }
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
  if (favCountEl) {
    favCountEl.textContent = getFavorites().length;
  }
}

// Restore favorite button states on load
document.querySelectorAll(".fav-btn").forEach((btn) => {
  const id = btn.dataset.id;

  if (isFavorite(id)) {
    btn.classList.add("active");
    btn.querySelector("i").className = "bi bi-heart-fill";
    btn.setAttribute("aria-label", "Remove from favorites");
  }

  btn.addEventListener("click", (event) => {
    event.stopPropagation();

    const nowActive = toggleFavorite(id);
    btn.classList.toggle("active", nowActive);
    btn.querySelector("i").className = nowActive ? "bi bi-heart-fill" : "bi bi-heart";
    btn.setAttribute(
      "aria-label",
      nowActive ? "Remove from favorites" : "Save to favorites"
    );

    updateFavCount();

    if (favoritesViewActive) {
      applyFilters();
    }
  });
});

updateFavCount();

// ---------- clear favorites ----------

if (clearFavBtn) {
  clearFavBtn.addEventListener("click", () => {
    saveFavorites([]);

    document.querySelectorAll(".fav-btn").forEach((btn) => {
      btn.classList.remove("active");
      btn.querySelector("i").className = "bi bi-heart";
      btn.setAttribute("aria-label", "Save to favorites");
    });

    updateFavCount();

    if (favoritesViewActive) {
      applyFilters();
    }
  });
}

// ---------- category filter ----------

filterChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    filterChips.forEach((item) => item.classList.remove("active"));
    chip.classList.add("active");

    activeCategory = chip.dataset.filter;
    favoritesViewActive = false;

    if (favToggle) {
      favToggle.classList.remove("active");
    }

    applyFilters();
  });
});

// ---------- favorites-only view ----------

if (favToggle) {
  favToggle.addEventListener("click", () => {
    favoritesViewActive = !favoritesViewActive;
    favToggle.classList.toggle("active", favoritesViewActive);

    if (favoritesViewActive) {
      filterChips.forEach((chip) => chip.classList.remove("active"));
    } else {
      activeCategory = "all";
      filterChips.forEach((chip) => chip.classList.remove("active"));
      if (filterChips[0]) {
        filterChips[0].classList.add("active");
      }
    }

    applyFilters();
  });
}

// ---------- search ----------

if (searchInput) {
  searchInput.addEventListener("input", applyFilters);
}

// ---------- motion previews ----------

function setPreviewPlayback(item, shouldPlay) {
  const previewVideo = item.querySelector(".gallery-preview-video");
  if (!previewVideo) return;

  previewVideo.muted = true;

  if (shouldPlay) {
    previewVideo.play().catch(() => {
      // Muted autoplay is normally allowed. If the browser still blocks it,
      // the poster frame remains visible instead of breaking the gallery.
    });
  } else {
    previewVideo.pause();
  }
}

function startVisibleMotionPreviews() {
  galleryItems.forEach((item) => {
    const isVisible = !item.classList.contains("hidden");
    setPreviewPlayback(item, isVisible);
  });
}

// ---------- combined filter: category / favorites + search ----------

function applyFilters() {
  const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : "";
  const favorites = getFavorites();
  let anyVisible = false;

  galleryItems.forEach((item) => {
    const matchesCategory = favoritesViewActive
      ? favorites.includes(item.dataset.id)
      : activeCategory === "all" || item.dataset.category === activeCategory;

    const searchable = [
      item.dataset.title || "",
      item.dataset.student || "",
      item.dataset.catLabel || "",
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      searchTerm === "" || searchable.includes(searchTerm);

    const visible = matchesCategory && matchesSearch;

    item.classList.toggle("hidden", !visible);
    setPreviewPlayback(item, visible);

    if (visible) {
      anyVisible = true;
    }
  });

  if (emptyState) {
    emptyState.style.display = anyVisible ? "none" : "block";

    if (!anyVisible && favoritesViewActive && getFavorites().length === 0) {
      emptyState.textContent =
        "No favorite artworks yet. Click the heart icon to save your favorite works.";
    } else if (!anyVisible) {
      emptyState.textContent = "No artwork matches your search or filter.";
    }
  }
}

// ---------- artwork detail modal ----------

const galleryModalEl = document.getElementById("galleryModal");
const galleryModal = bootstrap.Modal.getOrCreateInstance(galleryModalEl);
const galleryModalImg = document.getElementById("galleryModalImg");
const galleryModalVideo = document.getElementById("galleryModalVideo");

function openGalleryModal(item) {
  document.getElementById("galleryModalLabel").textContent =
    item.dataset.title || "Artwork";
  document.getElementById("galleryModalMeta").textContent =
    `by ${item.dataset.student || "—"} · ${item.dataset.catLabel || "—"}`;
  document.getElementById("galleryModalDesc").textContent =
    item.dataset.desc || "";
  document.getElementById("galleryModalTech").textContent =
    `Software: ${item.dataset.software || "—"} · Year: ${item.dataset.year || "—"}`;

  const videoSrc = item.dataset.video;

  if (videoSrc) {
    galleryModalImg.style.display = "none";
    galleryModalImg.removeAttribute("src");

    galleryModalVideo.style.display = "block";
    galleryModalVideo.muted = true;
    galleryModalVideo.loop = true;
    galleryModalVideo.playsInline = true;
    galleryModalVideo.poster = item.dataset.img || "";
    galleryModalVideo.src = videoSrc;
    galleryModalVideo.load();
  } else {
    galleryModalVideo.pause();
    galleryModalVideo.removeAttribute("src");
    galleryModalVideo.load();
    galleryModalVideo.style.display = "none";

    galleryModalImg.style.display = "block";
    galleryModalImg.src = item.dataset.img || "";
    galleryModalImg.alt = item.dataset.title || "Artwork";
  }

  galleryModal.show();
}

// Autoplay the selected motion artwork after Bootstrap finishes opening the modal.
galleryModalEl.addEventListener("shown.bs.modal", () => {
  if (
    galleryModalVideo.style.display !== "none" &&
    galleryModalVideo.getAttribute("src")
  ) {
    galleryModalVideo.muted = true;
    galleryModalVideo.play().catch(() => {
      // Controls remain available if autoplay is blocked by the browser.
    });
  }
});

// Stop and reset modal video after closing.
galleryModalEl.addEventListener("hidden.bs.modal", () => {
  galleryModalVideo.pause();
  galleryModalVideo.currentTime = 0;
  galleryModalVideo.removeAttribute("src");
  galleryModalVideo.load();
});

document.querySelectorAll(".view-details-btn").forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.stopPropagation();
    const parentItem = btn.closest(".gallery-item");

    if (parentItem) {
      openGalleryModal(parentItem);
    }
  });
});

// Start the four motion previews when the page loads.
startVisibleMotionPreviews();
