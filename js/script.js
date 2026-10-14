/*--------- TYPING ANIMATION -----------*/
if (window.Typed) new Typed(".typing", {
  strings: ["Competitive Programmer", "Full-Stack Developer", "CSE Student at BIT Mesra"],
  typeSpeed: 100, backSpeed: 60, loop: true
});

/*--------- ASIDE / SECTION SWITCHING -----------*/
const navLinks = [...document.querySelectorAll(".nav a")],
  sections = [...document.querySelectorAll(".section")],
  aside = document.querySelector(".aside"),
  toggler = document.querySelector(".nav-toggler");

function toggleAside() {
  aside.classList.toggle("open");
  toggler.classList.toggle("open");
  sections.forEach(s => s.classList.toggle("open"));
}
function showSection(id) {
  const prev = sections.findIndex(s => s.classList.contains("active"));
  sections.forEach(s => s.classList.remove("active", "back-section"));
  if (prev >= 0) sections[prev].classList.add("back-section");
  document.getElementById(id).classList.add("active");
  navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + id));
}
[...navLinks, document.querySelector(".hire-me"), document.querySelector(".logo a")].forEach(a =>
  a.addEventListener("click", e => {
    e.preventDefault();
    showSection(a.getAttribute("href").slice(1));
    if (a.closest(".nav") && window.innerWidth < 1200) toggleAside();
  })
);
toggler.addEventListener("click", toggleAside);

/*--------- CODEFORCES STATS -----------*/
const $ = id => document.getElementById(id);
const rankColors = {
  "newbie": "grey", "pupil": "green", "specialist": "darkcyan", "expert": "blue",
  "candidate master": "purple", "master": "orange", "international master": "orange",
  "grandmaster": "red", "international grandmaster": "red", "legendary grandmaster": "rgb(150,0,0)"
};
function paint(cur, max, link) {
  document.querySelectorAll(".cf-stats-cur").forEach(e => e.style.color = cur);
  document.querySelectorAll(".cf-stats-max").forEach(e => e.style.color = max);
  $("profile-link").style.backgroundColor = link;
}
function updateCPSection(handle) {
  fetch("https://codeforces.com/api/user.info?handles=" + encodeURIComponent(handle))
    .then(r => r.json())
    .then(data => {
      if (data.status !== "OK") throw new Error("not found");
      const u = data.result[0], rated = u.rank !== undefined;
      $("rating").textContent = "Current Rating : " + (rated ? u.rating : "Unrated");
      $("max-rating").textContent = "Max Rating : " + (rated ? u.maxRating : "Unrated");
      $("rank").textContent = "Current Rank : " + (rated ? u.rank : "-");
      $("max-rank").textContent = "Max Rank : " + (rated ? u.maxRank : "-");
      $("profile-link").textContent = u.handle;
      $("profile-link").href = "https://codeforces.com/profile/" + u.handle;
      paint(rated ? rankColors[u.rank] : "black", rated ? rankColors[u.maxRank] : "black", rated ? rankColors[u.rank] : "black");
    })
    .catch(() => alert("User Not Found!"));
}
$("cp-input-field").addEventListener("keypress", e => { if (e.key === "Enter") updateCPSection(e.target.value); });
$("cp-btn").addEventListener("click", () => updateCPSection($("cp-input-field").value));
updateCPSection("eka404");

/*--------- HOME PHOTO: tries common file names, falls back to initials -----------*/
const photo = document.querySelector(".home-img img");
const photoNames = ["ekakshar.jpg", "ekakshar.png", "ekakshar.webp", "Ekakshar.jpeg", "Ekakshar.jpg", "Ekakshar.png"];
let photoTry = 0;
photo.addEventListener("error", () => {
  if (photoTry < photoNames.length) photo.src = "images/" + photoNames[photoTry++];
  else photo.replaceWith(Object.assign(document.createElement("div"), { className: "avatar", textContent: "ES" }));
});
