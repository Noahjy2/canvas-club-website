// project.js — project detail modal + autoplay video + recently viewed localStorage

const RECENT_KEY = "canvas_project_recent";
const MAX_RECENT = 5;

const projectModalEl = document.getElementById("projectModal");
const projectModal = bootstrap.Modal.getOrCreateInstance(projectModalEl);
const modalImg = document.getElementById("modalImg");
const modalVideo = document.getElementById("modalVideo");

// ---------- project data ----------

function projectFromCard(card) {
  return {
    id: card.dataset.id,
    title: card.dataset.title,
    author: card.dataset.author,
    category: card.dataset.category,
    desc: card.dataset.desc,
    software: card.dataset.software,
    year: card.dataset.year,
    team: card.dataset.team,
    img: card.dataset.img,
    video: card.dataset.video || null,
  };
}

const projectCards = Array.from(document.querySelectorAll(".project-card"));
const currentProjects = new Map(
  projectCards.map((card) => {
    const project = projectFromCard(card);
    return [project.id, project];
  })
);

// ---------- localStorage ----------

function getRecent() {
  try {
    const stored = localStorage.getItem(RECENT_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn("Could not read recently viewed projects. Resetting list.", error);
    return [];
  }
}

function saveRecent(list) {
  localStorage.setItem(RECENT_KEY, JSON.stringify(list));
}

// Add project to the front, remove duplicates, and keep at most five.
function addToRecent(project) {
  let recent = getRecent().filter((item) => item.id !== project.id);
  recent.unshift(project);
  recent = recent.slice(0, MAX_RECENT);

  saveRecent(recent);
  renderRecent();
}

// ---------- recently viewed ----------

function renderRecent() {
  const strip = document.getElementById("recentStrip");
  const emptyMsg = document.getElementById("recentEmpty");

  strip.querySelectorAll(".recent-thumb").forEach((element) => element.remove());

  // Refresh old saved entries from the CURRENT project cards.
  // This automatically replaces obsolete image paths from earlier versions.
  const refreshed = getRecent()
    .map((savedProject) => currentProjects.get(savedProject.id) || savedProject)
    .filter((project) => project && project.id && (project.img || project.video))
    .slice(0, MAX_RECENT);

  saveRecent(refreshed);

  if (refreshed.length === 0) {
    emptyMsg.style.display = "block";
    return;
  }

  emptyMsg.style.display = "none";

  refreshed.forEach((project) => {
    const thumb = document.createElement("button");
    thumb.type = "button";
    thumb.className = "recent-thumb";
    if (project.img) {
      thumb.style.backgroundImage = `url('${project.img}')`;
    } else {
      // Video-only projects can still appear in Recently Viewed without a poster image.
      thumb.style.display = "flex";
      thumb.style.alignItems = "center";
      thumb.style.justifyContent = "center";
      thumb.innerHTML = '<i class="bi bi-play-circle-fill" aria-hidden="true"></i>';
    }

    thumb.title = project.title;
    thumb.setAttribute("aria-label", `Open ${project.title}`);

    thumb.addEventListener("click", () => {
      openProjectModal(currentProjects.get(project.id) || project);
    });

    strip.appendChild(thumb);
  });
}

// ---------- project modal ----------

function openProjectModal(project) {
  document.getElementById("projectModalLabel").textContent =
    project.title || "Project";
  document.getElementById("modalMeta").textContent =
    `by ${project.author || "—"} · ${project.category || "—"}`;
  document.getElementById("modalDesc").textContent =
    project.desc || "";
  document.getElementById("modalTech").textContent =
    `Software: ${project.software || "—"} · Year: ${project.year || "—"} · ${project.team || "—"}`;

  if (project.video) {
    modalImg.style.display = "none";
    modalImg.removeAttribute("src");

    modalVideo.style.display = "block";
    modalVideo.muted = true;
    modalVideo.loop = true;
    modalVideo.playsInline = true;
    if (project.img) {
      modalVideo.poster = project.img;
    } else {
      modalVideo.removeAttribute("poster");
    }

    modalVideo.src = project.video;
    modalVideo.load();
  } else {
    modalVideo.pause();
    modalVideo.removeAttribute("src");
    modalVideo.load();
    modalVideo.style.display = "none";

    modalImg.style.display = "block";
    modalImg.src = project.img || "";
    modalImg.alt = project.title || "Project";
  }

  addToRecent(project);
  projectModal.show();
}

// Start the video only after the Bootstrap modal is fully visible.
projectModalEl.addEventListener("shown.bs.modal", () => {
  if (
    modalVideo.style.display !== "none" &&
    modalVideo.getAttribute("src")
  ) {
    modalVideo.muted = true;
    modalVideo.play().catch(() => {
      // If a browser blocks autoplay, controls remain visible for manual playback.
    });
  }
});

// Stop and reset video when modal closes.
projectModalEl.addEventListener("hidden.bs.modal", () => {
  modalVideo.pause();
  modalVideo.currentTime = 0;
  modalVideo.removeAttribute("src");
  modalVideo.load();
});

// ---------- project card clicks ----------

projectCards.forEach((card) => {
  card.addEventListener("click", () => {
    openProjectModal(projectFromCard(card));
  });
});

renderRecent();
