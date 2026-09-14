
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  });
});


document.getElementById('year').textContent = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.caja-header').forEach(function (boton) {
    boton.addEventListener('click', function () {
      var contenido = boton.nextElementSibling;
      if (contenido.style.maxHeight) {
        contenido.style.maxHeight = null;
      } else {
        contenido.style.maxHeight = contenido.scrollHeight + 'px';
      }
    });
  });
});

/* ============================
   1er Prototipo: Carruseles
============================ */
document.addEventListener('DOMContentLoaded', function () {
  var AUTO_ROTATE_MS = 3000;

  document.querySelectorAll('.carrusel').forEach(function (carrusel) {
    var track = carrusel.querySelector('.carrusel-track');
    var slides = Array.from(carrusel.querySelectorAll('.carrusel-slide'));
    var dots = Array.from(carrusel.querySelectorAll('.carrusel-dot'));
    var btnPrev = carrusel.querySelector('.carrusel-prev');
    var btnNext = carrusel.querySelector('.carrusel-next');
    var indice = 0;
    var timer = null;

    function irA(i) {
      indice = (i + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + (indice * 100) + '%)';
      dots.forEach(function (dot, di) {
        dot.classList.toggle('activo', di === indice);
      });
    }

    function siguiente() {
      irA(indice + 1);
    }

    function anterior() {
      irA(indice - 1);
    }

    function iniciarAuto() {
      detenerAuto();
      timer = setInterval(siguiente, AUTO_ROTATE_MS);
    }

    function detenerAuto() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    if (btnNext) {
      btnNext.addEventListener('click', function () {
        siguiente();
        iniciarAuto();
      });
    }

    if (btnPrev) {
      btnPrev.addEventListener('click', function () {
        anterior();
        iniciarAuto();
      });
    }

    dots.forEach(function (dot, di) {
      dot.addEventListener('click', function () {
        irA(di);
        iniciarAuto();
      });
    });

    carrusel.addEventListener('mouseenter', detenerAuto);
    carrusel.addEventListener('mouseleave', iniciarAuto);

    irA(0);
    iniciarAuto();
  });
});

/* ============================
   1er Prototipo: Los 3 tanques
============================ */
document.addEventListener('DOMContentLoaded', function () {
  var contenedor = document.getElementById('tanques');
  if (!contenedor) return;

  contenedor.querySelectorAll('.tanque-ver-mas').forEach(function (boton) {
    boton.addEventListener('click', function () {
      var tanque = boton.closest('.tanque');
      var yaActivo = tanque.classList.contains('activo');

      contenedor.querySelectorAll('.tanque').forEach(function (t) {
        t.classList.remove('activo');
      });
      contenedor.querySelectorAll('.tanque-ver-mas').forEach(function (b) {
        b.textContent = 'Ver más';
      });

      if (!yaActivo) {
        tanque.classList.add('activo');
        boton.textContent = 'Ver menos';
        contenedor.classList.add('expandido');
      } else {
        contenedor.classList.remove('expandido');
      }
    });
  });
});

/* ============================
   1er Prototipo: Insights
   El color del borde se define en el HTML con el atributo
   data-borde="azul | rosa | verde | morado | rojo" en .insight-caja
   Los puntos de color son solo una referencia visual.
============================ */

/* ============================
   1er Prototipo: Mapa de conexiones (acordeón)
============================ */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.mapa-nodo').forEach(function (nodo) {
    var encabezado = nodo.querySelector('h4');
    var panel = nodo.querySelector('.mapa-texto');
    if (!encabezado || !panel) return;

    function alternar() {
      var expandido = nodo.classList.toggle('expandido');
      panel.style.maxHeight = expandido ? panel.scrollHeight + 'px' : null;
    }

    encabezado.addEventListener('click', alternar);

    var boton = nodo.querySelector('.mapa-ver-mas');
    if (boton) {
      boton.addEventListener('click', function (e) {
        e.stopPropagation();
        alternar();
      });
    }
  });
});