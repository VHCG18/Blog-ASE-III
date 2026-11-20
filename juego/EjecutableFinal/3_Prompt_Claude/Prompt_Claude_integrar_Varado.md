# Prompt para Claude · integrar Varado al blog

Úsalo con **Claude Code** abierto en la carpeta del repositorio del blog, o en **claude.ai** con el repositorio de GitHub conectado.
Antes de pegarlo:

1. Copia la carpeta `1_Juego_Web/varado` (completa, sin cambiar nada) a la raíz del repositorio del blog, o ten a la mano dónde está para dársela a Claude.
2. Cambia lo que está entre [CORCHETES] en el prompt.
3. Copia todo lo que está dentro del recuadro de abajo y pégalo como mensaje.

---

```text
Quiero publicar mi videojuego VARADO (Unity, versión web/WebGL) dentro de mi blog, que está en GitHub y se publica con GitHub Pages.

DATOS
- Repositorio del blog: [usuario/repositorio]
- Dirección del blog: [https://usuario.github.io/ o https://usuario.github.io/repositorio/]
- La carpeta del juego se llama «varado» y [ya la copié a la raíz del repositorio / está en: RUTA]. Contiene index.html, Build/ y TemplateData/.
- Dónde lo quiero: [una página nueva «Varado» en el menú / una entrada del blog / en la portada].

LO QUE NECESITO
1. Revisa el repositorio antes de tocar nada: con qué está hecho el blog (Jekyll, Hugo, Astro, Next.js, Eleventy, HTML puro…), cuál es su baseurl/ruta base y cómo se publica en GitHub Pages (rama o GitHub Actions). Dime en dos líneas qué encontraste.
2. Deja la carpeta «varado» donde el generador la publique tal cual en <sitio>/varado/:
   - Jekyll o HTML puro: en la raíz del repositorio.
   - Hugo: static/varado/
   - Astro, Vite, Next.js, SvelteKit: public/varado/
   - Eleventy: en la raíz y agrégala a addPassthroughCopy.
   No modifiques NINGÚN archivo dentro de «varado» (nada de minificar, formatear ni renombrar) y excluye esa carpeta de minificadores, Prettier, linters o procesadores de imágenes si el proyecto los usa.
3. Crea la página o entrada que te pedí con el bloque HTML de abajo, siguiendo el estilo y el layout del tema (que se vea como el resto del blog). Agrégala al menú si el tema tiene menú.
   - Ajusta data-juego a la ruta real de la carpeta, terminada en «/», tomando en cuenta el baseurl (en Jekyll usa {{ '/varado/' | relative_url }}).
   - Hugo: si el Markdown no deja HTML (goldmark sin unsafe), crea un shortcode «varado» con el bloque o activa markup.goldmark.renderer.unsafe.
   - Astro/MDX/React: pon el bloque como HTML crudo (set:html, un componente .astro o dangerouslySetInnerHTML) y asegúrate de que el <script> se ejecute en el navegador.
   - La imagen de portada ya viene dentro de la carpeta: varado/TemplateData/portada.jpg. Puedes usarla también como imagen de la entrada (og:image / image del front matter).
4. Revisa los tamaños: ningún archivo puede pasar de 100 MB (límite de GitHub). NO uses Git LFS para el juego: GitHub Pages no sirve archivos de LFS. NO agregues .nojekyll en la raíz si el sitio es Jekyll (apaga la construcción del blog).
5. Pruébalo en local con el servidor del propio generador (o «python -m http.server» si es HTML puro; abrir el index.html con doble clic NO funciona). Abre la página, dale «Jugar» y confirma en la consola del navegador que no hay errores 404 de Build/*.unityweb. Si puedes, prueba también con la vista de celular de las herramientas del navegador.
6. Haz un commit claro («Agrega Varado jugable en el navegador») y súbelo. Antes de hacer push muéstrame qué archivos cambian y espera mi confirmación.
7. Cuando GitHub Pages termine de publicar, dame la dirección final de la página del juego y la de la carpeta (…/varado/index.html).

NO hagas: borrar o mover entradas existentes, cambiar el tema, tocar la configuración de dominio, ni editar los archivos del juego. Si algo no cuadra, pregúntame.

BLOQUE PARA INSERTAR (no cambies nada salvo data-juego):

<div class="varado" data-juego="/varado/">
  <div class="varado-marco">
    <button type="button" class="varado-portada" aria-label="Jugar Varado">
      <span class="varado-jugar">▶&nbsp;&nbsp;Jugar</span>
      <span class="varado-nota"></span>
    </button>
  </div>
  <div class="varado-barra" hidden>
    <button type="button" class="varado-boton" data-accion="completa">⛶ Pantalla completa</button>
    <a class="varado-boton" data-accion="pestana" target="_blank" rel="noopener">↗ Abrir en otra pestaña</a>
  </div>
</div>

<style>
  .varado { max-width: 1280px; margin: 1.5rem auto; font-family: system-ui, -apple-system, "Segoe UI", sans-serif; }
  .varado [hidden] { display: none !important; }
  .varado-marco { position: relative; width: 100%; aspect-ratio: 16 / 9; background: #2b2a55; overflow: hidden; border-radius: 6px; }
  .varado-marco iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; display: block; }
  .varado-portada {
    position: absolute; inset: 0; width: 100%; height: 100%; border: 0; padding: 0; margin: 0; cursor: pointer;
    background: #2b2a55 center / cover no-repeat; display: flex; flex-direction: column;
    align-items: flex-start; justify-content: flex-end; gap: 10px; padding: 0 0 7% 6%; box-sizing: border-box; color: #fff;
  }
  .varado-jugar {
    font-size: clamp(16px, 2.6vw, 30px); letter-spacing: 0.06em; text-transform: uppercase;
    background: rgba(0, 0, 0, 0.9); border: 3px solid #fff; padding: 0.55em 1.4em; transition: border-color 0.15s, background 0.15s;
  }
  .varado-portada:hover .varado-jugar, .varado-portada:focus-visible .varado-jugar { border-color: #FF7CCA; background: #D3006A; }
  .varado-portada:focus-visible { outline: 3px solid #FF7CCA; outline-offset: -3px; }
  .varado-nota { font-size: clamp(11px, 1.2vw, 14px); opacity: 0.85; text-shadow: 0 1px 3px rgba(0,0,0,0.6); }
  .varado-barra { display: flex; flex-wrap: wrap; gap: 8px; justify-content: flex-end; margin-top: 8px; }
  .varado-boton {
    font: inherit; font-size: 14px; color: #fff; background: #111; border: 2px solid #111; padding: 7px 14px;
    cursor: pointer; text-decoration: none; border-radius: 4px;
  }
  .varado-boton:hover { background: #D3006A; border-color: #D3006A; color: #fff; }
</style>

<script>
  (function () {
    var bloques = document.querySelectorAll(".varado:not([data-listo])");
    var esMovil = /Android|iPhone|iPad|iPod|Mobile|Silk|Kindle|BlackBerry|Opera Mini|IEMobile/i.test(navigator.userAgent || "") ||
                  (/Macintosh/i.test(navigator.userAgent || "") && navigator.maxTouchPoints > 1);
    Array.prototype.forEach.call(bloques, function (bloque) {
      bloque.setAttribute("data-listo", "");
      var carpeta = bloque.getAttribute("data-juego") || "/varado/";
      if (carpeta.slice(-1) !== "/") carpeta += "/";
      var juego = carpeta + "index.html";
      var marco = bloque.querySelector(".varado-marco");
      var portada = bloque.querySelector(".varado-portada");
      var barra = bloque.querySelector(".varado-barra");
      portada.style.backgroundImage = "url('" + carpeta + "TemplateData/portada.jpg')";
      bloque.querySelector(".varado-nota").textContent = esMovil
        ? "Se abre a pantalla completa · ponlo en horizontal"
        : "Se juega con teclado y mouse";
      bloque.querySelector('[data-accion="pestana"]').href = juego;
      portada.addEventListener("click", function () {
        if (esMovil) { window.location.href = juego; return; }   // celular: el juego ocupa toda la pantalla
        var iframe = document.createElement("iframe");
        iframe.src = juego;
        iframe.title = "Varado";
        iframe.allow = "fullscreen; autoplay; gamepad";
        iframe.setAttribute("allowfullscreen", "");
        marco.innerHTML = "";
        marco.appendChild(iframe);
        barra.hidden = false;
        iframe.addEventListener("load", function () { iframe.focus(); });
        bloque.querySelector('[data-accion="completa"]').onclick = function () {
          var pedir = iframe.requestFullscreen || iframe.webkitRequestFullscreen;
          if (pedir) pedir.call(iframe); else window.open(juego, "_blank");
          iframe.focus();
        };
      });
    });
  })();
</script>
```

---

## Si Claude te pregunta algo

- **Qué hace el bloque:** muestra la portada con «Jugar» y no descarga el juego hasta el clic. En computadora el juego se abre dentro de la página en 16:9, con botones de pantalla completa y de pestaña nueva. En celular abre el juego a pantalla completa.
- **Por qué no se ve si abro index.html con doble clic:** los navegadores bloquean los archivos locales; necesita un servidor (GitHub Pages lo es).
- **Para probar cómo se ve en celular desde la computadora:** agrega `?modo=movil` a la dirección del juego (`…/varado/index.html?modo=movil`); `?modo=pc` fuerza la versión de computadora.
