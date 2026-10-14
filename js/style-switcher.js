/*------ TOGGLE STYLE SWITCHER -----*/
const switcher = document.querySelector(".style-switcher");
document.querySelector(".style-switcher-toggler").addEventListener("click", () => switcher.classList.toggle("open"));
window.addEventListener("scroll", () => switcher.classList.remove("open"));

/*------ THEME COLORS (sets one CSS variable, works in every browser) -----*/
const skins = { "color-1": "#ec1839", "color-2": "#fa5b0f", "color-3": "#37b182", "color-4": "#1854b4", "color-5": "#f021b2" };
function setActiveStyle(color) {
  document.documentElement.style.setProperty("--skin-color", skins[color]);
  try { localStorage.setItem("skin", color); } catch (e) {}
}
try { const saved = localStorage.getItem("skin"); if (skins[saved]) setActiveStyle(saved); } catch (e) {}

/*------ LIGHT AND DARK MODE -----*/
const dayNight = document.querySelector(".day-night");
dayNight.addEventListener("click", () => {
  dayNight.querySelector("i").classList.toggle("fa-sun");
  dayNight.querySelector("i").classList.toggle("fa-moon");
  document.body.classList.toggle("dark");
});
window.addEventListener("load", () => {
  dayNight.querySelector("i").classList.add(document.body.classList.contains("dark") ? "fa-sun" : "fa-moon");
});
