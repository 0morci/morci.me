// Páginas de vídeo: el vídeo sólo se carga al pulsar (más rápido y sin cookies de YouTube hasta entonces).
const pantalla = document.getElementById("pantalla");
function ver(t) {
  const src = "https://www.youtube-nocookie.com/embed/" + pantalla.dataset.video + "?autoplay=1&rel=0&start=" + (t || 0);
  let marco = pantalla.querySelector("iframe");
  if (!marco) {
    marco = document.createElement("iframe");
    marco.title = pantalla.dataset.titulo;
    marco.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    marco.allowFullscreen = true;
    pantalla.replaceChildren(marco);
  }
  marco.src = src;
}
document.getElementById("play").addEventListener("click", () => ver(0));
for (const a of document.querySelectorAll(".capitulos a")) a.addEventListener("click", e => {
  e.preventDefault();
  ver(Number(a.dataset.t));
  if (window.matchMedia("(max-width: 900px)").matches) pantalla.scrollIntoView({ behavior: "smooth", block: "start" });
});
