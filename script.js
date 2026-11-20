
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
      carrusel.dispatchEvent(new CustomEvent('cambio', { detail: indice }));
    }

    function siguiente() {
      irA(indice + 1);
    }

    function anterior() {
      irA(indice - 1);
    }

    function iniciarAuto() {
      detenerAuto();
      if (carrusel.dataset.auto === 'false') return;
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

/* ============================
   Pruebas: los comentarios cambian junto con la foto del carrusel
============================ */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.prueba-contenido').forEach(function (fila) {
    var carrusel = fila.querySelector('.carrusel');
    var grupos = Array.from(fila.querySelectorAll('.comentarios-grupo'));
    var panel = fila.querySelector('.comentarios');
    if (!carrusel || !grupos.length) return;

    carrusel.addEventListener('cambio', function (e) {
      grupos.forEach(function (g, gi) {
        g.classList.toggle('activo', gi === e.detail);
      });
      if (panel) panel.scrollTop = 0;
    });
  });
});

/* =====================================================================
   Rediseño · entrega final
===================================================================== */

/* ---------- Menú: marca la sección que se está viendo ---------- */
document.addEventListener('DOMContentLoaded', function () {
  var enlaces = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'))
    .filter(function (a) { return !a.parentElement.classList.contains('nav-jugar'); });
  var secciones = enlaces
    .map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
    .filter(Boolean);
  if (!('IntersectionObserver' in window) || !secciones.length) return;

  var visibles = new Map();
  var obs = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) { visibles.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0); });
    var actual = null, mejor = 0;
    secciones.forEach(function (s) {
      var r = visibles.get(s.id) || 0;
      if (r > mejor) { mejor = r; actual = s.id; }
    });
    enlaces.forEach(function (a) {
      a.classList.toggle('activo', actual !== null && a.getAttribute('href') === '#' + actual);
    });
  }, { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.01, 0.25, 0.5, 1] });
  secciones.forEach(function (s) { obs.observe(s); });
});

/* ---------- Visor: amplía las imágenes marcadas como «ampliable» ---------- */
document.addEventListener('DOMContentLoaded', function () {
  var visor = document.getElementById('visor');
  if (!visor || typeof visor.showModal !== 'function') return;
  var img = visor.querySelector('img');

  document.querySelectorAll('img.ampliable').forEach(function (im) {
    im.setAttribute('tabindex', '0');
    im.setAttribute('role', 'button');
    im.setAttribute('aria-label', 'Ampliar: ' + (im.alt || 'imagen'));
    function abrir() {
      img.src = im.currentSrc || im.src;
      img.alt = im.alt;
      visor.showModal();
    }
    im.addEventListener('click', abrir);
    im.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrir(); }
    });
  });

  visor.querySelector('.visor-cerrar').addEventListener('click', function () { visor.close(); });
  visor.addEventListener('click', function (e) { if (e.target === visor) visor.close(); });
});

/* ---------- Pestañas de los tres tanques ---------- */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-pestanas]').forEach(function (grupo) {
    var tabs = Array.from(grupo.querySelectorAll('[role="tab"]'));
    function elegir(tab, enfocar) {
      tabs.forEach(function (t) {
        var activo = t === tab;
        t.setAttribute('aria-selected', activo ? 'true' : 'false');
        t.tabIndex = activo ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !activo;
      });
      if (enfocar) tab.focus();
    }
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { elegir(tab, false); });
      tab.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
        if (e.key === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (e.key === 'Home') n = tabs[0];
        if (e.key === 'End') n = tabs[tabs.length - 1];
        if (n) { e.preventDefault(); elegir(n, true); }
      });
    });
  });
});

/* ---------- VARADO: el juego se carga solo cuando alguien le da «Jugar» ----------
   Computadora: se abre aquí mismo (16:9) con pantalla completa y pestaña nueva.
   Celular o tableta: abre el juego en toda la pantalla (dentro del blog se vería muy chico). */
document.addEventListener('DOMContentLoaded', function () {
  var ua = navigator.userAgent || '';
  var esMovil = /Android|iPhone|iPad|iPod|Mobile|Silk|Kindle|BlackBerry|Opera Mini|IEMobile/i.test(ua) ||
                (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1);

  document.querySelectorAll('.varado:not([data-listo])').forEach(function (bloque) {
    bloque.setAttribute('data-listo', '');
    var carpeta = bloque.getAttribute('data-juego') || 'varado/';
    if (carpeta.slice(-1) !== '/') carpeta += '/';
    var juego = carpeta + 'index.html';
    var marco = bloque.querySelector('.varado-marco');
    var portada = bloque.querySelector('.varado-portada');
    var barra = bloque.querySelector('.varado-barra');

    portada.style.backgroundImage = "url('" + carpeta + "TemplateData/portada.jpg')";
    bloque.querySelector('.varado-nota').textContent = esMovil
      ? 'Se abre a pantalla completa. Ponlo en horizontal.'
      : 'Se juega con teclado y mouse.';
    bloque.querySelector('[data-accion="pestana"]').href = juego;

    portada.addEventListener('click', function () {
      if (esMovil) { window.location.href = juego; return; }
      var iframe = document.createElement('iframe');
      iframe.src = juego;
      iframe.title = 'VARADO';
      iframe.allow = 'fullscreen; autoplay; gamepad';
      iframe.setAttribute('allowfullscreen', '');
      marco.innerHTML = '';
      marco.appendChild(iframe);
      barra.hidden = false;
      iframe.addEventListener('load', function () { iframe.focus(); });
      bloque.querySelector('[data-accion="completa"]').onclick = function () {
        var pedir = iframe.requestFullscreen || iframe.webkitRequestFullscreen;
        if (pedir) pedir.call(iframe); else window.open(juego, '_blank');
        iframe.focus();
      };
    });
  });
});
