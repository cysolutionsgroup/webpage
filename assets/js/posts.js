/* =========================================================
   LISTA DE ARTÍCULOS DEL BLOG
   ---------------------------------------------------------
   Para publicar un artículo nuevo:
   1. Copie blog/articulos/_plantilla.html con un nombre nuevo,
      por ejemplo: blog/articulos/lab-bgp-fortigate.html
   2. Escriba el contenido dentro de esa copia.
   3. Agregue una entrada AL PRINCIPIO de esta lista.
   Categorías sugeridas: "Laboratorios", "Topologías", "Proyectos", "Noticias"
   La fecha va en formato AAAA-MM-DD.
   ========================================================= */
window.CY_POSTS = [
  {
    titulo: "Laboratorio: segmentación con VLAN entre un switch core y FortiGate",
    resumen: "Paso a paso para separar usuarios, servidores y WiFi de invitados en VLAN independientes, con un FortiGate controlando el tráfico entre ellas.",
    categoria: "Laboratorios",
    fecha: "2026-10-20",
    lectura: "8 min",
    url: "blog/articulos/lab-vlan-fortigate.html"
  },
  {
    titulo: "Topología de referencia para una red empresarial mediana",
    resumen: "La arquitectura que usamos como punto de partida: firewall perimetral, core switch, segmentación y WiFi empresarial, y por qué cada pieza está donde está.",
    categoria: "Topologías",
    fecha: "2026-10-12",
    lectura: "5 min",
    url: "blog/articulos/topologia-referencia.html"
  }
];
