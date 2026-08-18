// project.js — project detail modal + "recently viewed" using localStorage

const RECENT_KEY = "canvas_project_recent";
const MAX_RECENT = 5;

function getRecent() {
  const stored = localStorage.getItem(RECENT_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveRecent(list) {
  localStorage.setItem(RECENT_KEY, JSON.stringify(list));
}

// Add a project to the front of the recently-viewed list, capped at MAX_RECENT
function addToRecent(project) {
  let recent = getRecent().filter((p) => p.id !== project.id);
  recent.unshift(project);
  recent = recent.slice(0, MAX_RECENT);
  saveRecent(recent);
  renderRecent();
}

function renderRecent() {
  const recent = getRecent();
  const strip = document.getElementById("recentStrip");
  const emptyMsg = document.getElementById("recentEmpty");

  strip.querySelectorAll(".recent-thumb").forEach((el) => el.remove());

  if (recent.length === 0) {
    emptyMsg.style.display = "block";
    return;
  }
  emptyMsg.style.display = "none";

  recent.forEach((p) => {
    const thumb = document.createElement("div");
    thumb.className = "recent-thumb";
    thumb.style.backgroundImage = `url('${p.img}')`;
    thumb.title = p.title;
    thumb.addEventListener("click", () => openProjectModal(p));
    strip.appendChild(thumb);
  });
}

function openProjectModal(p) {
  document.getElementById("projectModalLabel").textContent = p.title;
  document.getElementById("modalMeta").textContent = `by ${p.author} \u00B7 ${p.category}`;
  document.getElementById("modalDesc").textContent = p.desc;
  document.getElementById("modalTech").textContent =
    `Software: ${p.software} \u00B7 Year: ${p.year} \u00B7 ${p.team}`;

  const modalImg = document.getElementById("modalImg");
  const modalVideo = document.getElementById("modalVideo");

  if (p.video) {
    // Video project: show the <video> player, hide the <img>
    modalImg.style.display = "none";
    modalVideo.style.display = "block";
    modalVideo.src = p.video;
  } else {
    // Image project: show the <img>, hide the <video>
    modalVideo.pause();
    modalVideo.removeAttribute("src");
    modalVideo.style.display = "none";
    modalImg.style.display = "block";
    modalImg.src = p.img;
    modalImg.alt = p.title;
  }

  const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById("projectModal"));
  modal.show();

  addToRecent(p);
}

// Stop video playback when the modal is closed
document.getElementById("projectModal").addEventListener("hidden.bs.modal", () => {
  document.getElementById("modalVideo").pause();
});

// Wire up project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => {
    const project = {
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
    openProjectModal(project);
  });
});

renderRecent();
