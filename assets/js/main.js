/* CY Solutions Group S.A.S — comportamiento del sitio */
(function () {
  "use strict";
  var root = document.body.getAttribute("data-root") || "";

  /* ---- Menú móvil ---- */
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
    });
  }

  /* ---- Pestañas de servicios (cada grupo funciona por separado) ---- */
  Array.prototype.forEach.call(document.querySelectorAll(".svc-tabs"), function (list) {
    var tabs = Array.prototype.slice.call(list.querySelectorAll(".svc-tab"));
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
      if (focus) tab.focus();
    }
    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { select(tab, false); });
      tab.addEventListener("keydown", function (e) {
        var k = e.key, n = null;
        if (k === "ArrowDown" || k === "ArrowRight") n = tabs[(i + 1) % tabs.length];
        if (k === "ArrowUp" || k === "ArrowLeft") n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (k === "Home") n = tabs[0];
        if (k === "End") n = tabs[tabs.length - 1];
        if (n) { e.preventDefault(); select(n, true); }
      });
    });
  });

  /* ---- Artículos del blog ---- */
  var meses = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  function fecha(s) { var p = s.split("-"); return parseInt(p[2], 10) + " " + meses[parseInt(p[1], 10) - 1] + " " + p[0]; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function card(p) {
    var href = root + p.url;
    return '<article class="post-item">' +
      '<div class="meta"><span class="cat">' + esc(p.categoria) + '</span><time datetime="' + esc(p.fecha) + '">' + fecha(p.fecha) + '</time>' +
      (p.lectura ? '<span>' + esc(p.lectura) + ' de lectura</span>' : '') + '</div>' +
      '<h3><a href="' + esc(href) + '">' + esc(p.titulo) + '</a></h3>' +
      '<p>' + esc(p.resumen) + '</p>' +
      '<a class="more" href="' + esc(href) + '">Leer artículo</a></article>';
  }
  var posts = (window.CY_POSTS || []).slice().sort(function (a, b) { return a.fecha < b.fecha ? 1 : -1; });
  var list = document.getElementById("posts");
  if (list) {
    var limit = parseInt(list.getAttribute("data-limit") || "0", 10);
    var render = function (cat) {
      var items = posts.filter(function (p) { return !cat || p.categoria === cat; });
      if (limit) items = items.slice(0, limit);
      list.innerHTML = items.length ? items.map(card).join("") :
        '<p class="posts-empty">Todavía no hay artículos en esta categoría.</p>';
    };
    render("");
    var filters = document.getElementById("filters");
    if (filters) {
      var cats = [];
      posts.forEach(function (p) { if (cats.indexOf(p.categoria) < 0) cats.push(p.categoria); });
      filters.innerHTML = '<button type="button" aria-pressed="true" data-cat="">Todos</button>' +
        cats.map(function (c) { return '<button type="button" aria-pressed="false" data-cat="' + esc(c) + '">' + esc(c) + '</button>'; }).join("");
      filters.addEventListener("click", function (e) {
        var b = e.target.closest("button"); if (!b) return;
        Array.prototype.forEach.call(filters.querySelectorAll("button"), function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        render(b.getAttribute("data-cat"));
      });
    }
  }

  /* ---- Formulario de contacto ----
     Se envía con Formspree (formspree.io/f/mvkkywen) como envío normal del navegador,
     porque el formulario tiene captcha activado: el visitante resuelve el captcha en
     Formspree y luego ve la página de confirmación. El destinatario se configura en
     el panel de Formspree, no en este código. El campo "email" queda como "responder a". */
  var form = document.getElementById("contact-form");
  if (form) {
    var status = document.getElementById("form-status");
    form.addEventListener("submit", function (e) {
      if (!form.reportValidity()) { e.preventDefault(); return; }
      var servicio = form.querySelector('[name="servicio"]');
      form.querySelector('[name="_subject"]').value =
        "Nueva solicitud desde cysolutionsgroup.com: " + (servicio ? servicio.value : "");
      var btn = form.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;
      status.className = "form-status"; status.textContent = "Enviando…";
    });
    /* Si el visitante vuelve con el botón "Atrás", reactivar el botón. */
    window.addEventListener("pageshow", function () {
      var btn = form.querySelector('button[type="submit"]');
      if (btn) btn.disabled = false;
      status.className = "form-status"; status.textContent = "";
    });
  }

  /* ---- Botones "Solicitar este servicio": preseleccionan el servicio en el formulario ---- */
  Array.prototype.forEach.call(document.querySelectorAll("[data-servicio]"), function (a) {
    a.addEventListener("click", function () {
      var sel = document.getElementById("servicio");
      if (sel) sel.value = a.getAttribute("data-servicio");
    });
  });

  /* ---- Flujo del equipo: recorre las etapas cuando la sección está a la vista ---- */
  var flow = document.getElementById("team-flow");
  if (flow && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var nodes = flow.querySelectorAll(".flow-node"), step = 0, timer = null;
    var paint = function () {
      Array.prototype.forEach.call(nodes, function (n, i) {
        n.classList.toggle("is-active", i === step);
        n.classList.toggle("is-passed", i < step);
      });
    };
    var start = function () { if (!timer) timer = setInterval(function () { step = (step + 1) % nodes.length; paint(); }, 1800); };
    var stop = function () { clearInterval(timer); timer = null; };
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (e) { e[0].isIntersecting ? start() : stop(); }, { threshold: 0.3 }).observe(flow);
    } else { start(); }
  }

  /* ---- Año del pie de página ---- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
