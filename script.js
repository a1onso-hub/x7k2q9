const portada = document.getElementById('portada');
const btnEntrar = document.getElementById('btn-entrar');
const album = document.getElementById('album');
const slides = Array.from(document.querySelectorAll('.slide'));
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const contador = document.getElementById('contador');
const musica = document.getElementById('musica');
const btnMute = document.getElementById('btn-mute');

let indiceActual = 0;

function mostrarSlide(nuevoIndice) {
  slides[indiceActual].classList.remove('activa');
  indiceActual = (nuevoIndice + slides.length) % slides.length;
  slides[indiceActual].classList.add('activa');
  contador.textContent = `${indiceActual + 1} / ${slides.length}`;
}

btnNext.addEventListener('click', () => mostrarSlide(indiceActual + 1));
btnPrev.addEventListener('click', () => mostrarSlide(indiceActual - 1));

document.addEventListener('keydown', (e) => {
  if (album.hidden) return;
  if (e.key === 'ArrowRight') mostrarSlide(indiceActual + 1);
  if (e.key === 'ArrowLeft') mostrarSlide(indiceActual - 1);
});

// Deslizar con el dedo en móvil
let xInicio = null;
album.addEventListener('touchstart', (e) => { xInicio = e.touches[0].clientX; });
album.addEventListener('touchend', (e) => {
  if (xInicio === null) return;
  const diferencia = e.changedTouches[0].clientX - xInicio;
  if (Math.abs(diferencia) > 50) {
    diferencia < 0 ? mostrarSlide(indiceActual + 1) : mostrarSlide(indiceActual - 1);
  }
  xInicio = null;
});

// La portada existe sobre todo para conseguir el "gesto del usuario"
// que los navegadores exigen antes de reproducir audio con sonido
btnEntrar.addEventListener('click', () => {
  portada.remove();
  album.hidden = false;
  slides[0].classList.add('activa');
  contador.textContent = `1 / ${slides.length}`;
  musica.play().catch(() => {
    // Si el navegador aún así bloquea el audio, no rompemos nada:
    // la persona puede darle al botón de música manualmente
  });
});

btnMute.addEventListener('click', () => {
  musica.muted = !musica.muted;
  btnMute.dataset.muted = musica.muted;
  btnMute.textContent = musica.muted ? '🔇' : '♪';
});
