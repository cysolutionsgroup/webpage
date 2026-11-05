# Sitio web de CY Solutions Group S.A.S

Sitio estático (HTML, CSS y JavaScript, sin servidor ni base de datos). Se puede alojar gratis en GitHub Pages, Cloudflare Pages o Netlify con el dominio **cysolutionsgroup.com**.

## Estructura

```
index.html                     Página principal
blog/index.html                Listado del blog (con filtro por categoría)
blog/articulos/                Un archivo .html por artículo
blog/articulos/_plantilla.html Plantilla para nuevos artículos
assets/css/style.css           Estilos
assets/js/posts.js             LISTA DE ARTÍCULOS (se edita al publicar)
assets/js/main.js              Menú, pestañas, blog y formulario
assets/img/                    Logo, fotos del equipo y logos de clientes
CNAME                          Dominio para GitHub Pages
```

## 1. Publicar gratis en GitHub Pages (recomendado)

1. Cree una cuenta en https://github.com y un repositorio público, por ejemplo `cysolutionsgroup-web`.
2. Suba todo el contenido de esta carpeta a la raíz del repositorio (botón **Add file > Upload files**).
3. En el repositorio vaya a **Settings > Pages**. En *Source* elija **Deploy from a branch**, rama `main`, carpeta `/ (root)`.
4. En *Custom domain* escriba `cysolutionsgroup.com` y guarde.
5. En el panel DNS de su proveedor de dominio cree estos registros:

| Tipo  | Nombre | Valor                    |
|-------|--------|--------------------------|
| A     | @      | 185.199.108.153          |
| A     | @      | 185.199.109.153          |
| A     | @      | 185.199.110.153          |
| A     | @      | 185.199.111.153          |
| CNAME | www    | SU-USUARIO.github.io     |

6. Cuando GitHub verifique el dominio (de minutos a unas horas), active **Enforce HTTPS**.

> **Importante:** sus correos @cysolutionsgroup.com dependen de los registros **MX** (y TXT de SPF/DKIM) del dominio. No los borre ni modifique; solo agregue o cambie los registros A y CNAME de la tabla.

**Alternativa:** en https://pages.cloudflare.com o https://app.netlify.com puede arrastrar la carpeta completa y luego conectar el dominio desde su panel.

## 2. Activar el formulario de contacto (gratis, sin cuenta)

El formulario usa FormSubmit (https://formsubmit.co). Cada mensaje llega a **cquiroz@cysolutionsgroup.com** con copia a **yternera@cysolutionsgroup.com**.

1. Con el sitio ya publicado, envíe un mensaje de prueba desde el formulario.
2. FormSubmit enviará un correo de activación a cquiroz@cysolutionsgroup.com. Ábralo y haga clic en **Activate Form**. Revise también la carpeta de spam.
3. Desde ese momento todos los mensajes llegan a los dos correos. El visitante queda como "responder a", así que puede contestarle directamente.
4. (Opcional) En el correo de activación FormSubmit entrega un código aleatorio. Si reemplaza `cquiroz@cysolutionsgroup.com` por ese código en el `action` del formulario de `index.html`, su correo deja de aparecer en el código de la página.

Para cambiar los destinatarios: el principal está en el `action` del formulario y la copia en el campo oculto `_cc` (varios correos separados por coma).

## 3. Publicar un artículo en el blog

1. Copie `blog/articulos/_plantilla.html` con un nombre nuevo, sin espacios ni tildes: `lab-bgp-fortigate.html`.
2. Cambie el título, la categoría, la fecha y escriba el contenido (las instrucciones están dentro del archivo).
3. Las imágenes de topologías van en `assets/img/blog/` y se enlazan como `../../assets/img/blog/nombre.png`.
4. Abra `assets/js/posts.js` y agregue una entrada al principio de la lista:

```js
{
  titulo: "Laboratorio: BGP entre dos FortiGate",
  resumen: "Una o dos frases que resuman el artículo.",
  categoria: "Laboratorios",
  fecha: "2026-11-05",
  lectura: "6 min",
  url: "blog/articulos/lab-bgp-fortigate.html"
},
```

5. Suba los archivos a GitHub. El artículo aparece en el inicio (los 3 más recientes) y en la página del blog.

## Datos a revisar

- El botón de WhatsApp usa el número **317 332 9337**. Para cambiarlo, busque `573173329337` en los archivos.
- Los dos artículos del blog son ejemplos completos. Puede editarlos, mantenerlos o borrarlos (y quitar su entrada en `posts.js`).
