// Define la URL base
const baseURL = "https://aulaglobal.uc3m.es";

// Obtiene la URL actual
const currentUrl = window.location.href;

if (currentUrl.startsWith(baseURL) && !currentUrl.startsWith(`${baseURL}/pluginfile.php`)) {
  // Captura el cuerpo del documento
  const body = document.body;

  // Crea un elemento de menú desplegable izquierdo
  const menu = document.createElement('div');
  menu.className = 'mi-menu-desplegable';

  // Estilo de ejemplo para el menú
  menu.style.cssText = `
    width: 771px;
    height: 55px;
    background-color: white;
    color: white;
    position: fixed;
    left: 154px;
    top: 5px;
    z-index: 9999;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  `;

  // Agrega enlaces de ejemplo al menú
  const magistral = [
    { text: 'HyO', href: `${baseURL}/course/view.php?id=171215` },
    { text: 'Criptografía', href: `${baseURL}/course/view.php?id=171208` },
    { text: 'Arquitectura de Computadores', href: `${baseURL}/course/view.php?id=172346` },
    { text: 'Interfaces de Usuario', href: `${baseURL}/course/view.php?id=171182` },
  ];

  magistral.forEach(course => {
    const enlace = createMenuItem(course.text, course.href);
    menu.appendChild(enlace);
  });

  // Agrega un salto de línea (<br>) entre las dos líneas de enlaces
  menu.appendChild(document.createElement('br'));

  // Crea la segunda línea de enlaces con diferentes URL
  const reducido = [
    { text: 'HyO', href: `${baseURL}/course/view.php?id=165469` },
    { text: 'Criptografía', href: `${baseURL}/course/view.php?id=165455` },
    { text: 'Arquitectura de Computadores', href: `${baseURL}/course/view.php?id=165401` },
    { text: 'Interfaces de Usuario', href: `${baseURL}/course/view.php?id=165387` },
  ];

  reducido.forEach(course => {
    const enlace = createMenuItem(course.text, course.href);
    menu.appendChild(enlace);
  });

  // Función para crear un elemento de menú con un enlace
  function createMenuItem(text, href) {
    const menuItem = document.createElement('div');
    menuItem.style.cssText = `
      display: inline-block;
      margin-left: 30px;
    `;

    const enlace = document.createElement('a');
    enlace.textContent = text;
    enlace.href = href;
    menuItem.appendChild(enlace);
    return menuItem;
  }

  // Agrega el menú a la página
  body.appendChild(menu);
}
