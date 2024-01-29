// Define la URL base
const baseURL = "https://aulaglobal.uc3m.es";

// Obtiene la URL actual
const currentUrl = window.location.href;

if (currentUrl == baseURL) {
  // Si estamos en la página de aulaglobal.uc3m.es, obtenemos los cursos y los almacenamos en localStorage
  const selectElement = document.getElementById('id_idCurso');
  const courses = Array.from(selectElement.options).map(option => {
    const courseName = option.text.split(' ').slice(1, -1).join(' ');
    const cuatrimestre = option.text.split(' ').pop();
    return { text: courseName, href: `${baseURL}/course/view.php?id=${option.value}`, cuatrimestre: cuatrimestre };
  });
  localStorage.setItem('courses', JSON.stringify(courses));
}

// Ahora, independientemente de la página en la que estemos, recuperamos los cursos de localStorage
const storedCourses = JSON.parse(localStorage.getItem('courses'));

if (storedCourses && !currentUrl.startsWith(`${baseURL}/pluginfile.php`)) {
  const body = document.body;
  const menu = document.createElement('div');
  menu.className = 'mi-menu-desplegable';
  menu.style.cssText = `
    width: auto;
    height: 55px;
    background-color: white;
    color: white;
    position: fixed;
    left: 64px;
    top: 5px;
    z-index: 9999;
    flex-wrap: nowrap;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  `;

  const currentDate = new Date();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();

  const filteredCourses = storedCourses.filter(course => {
    const cuatrimestre = course.cuatrimestre.split('-')[1];
    if (cuatrimestre === '1C' && (month < 0 || (month === 0 && day < 25) || month > 8)) {
      return true;
    } else if (cuatrimestre === '2C') {
      return true;
    }
    return false;
  });

  const magCourses = filteredCourses.filter(course => course.text.startsWith('MAG'));
  const nonMagCourses = filteredCourses.filter(course => !course.text.startsWith('MAG'));

  // Añade los cursos MAG al menú
  let magCoursesLine = document.createElement('div');
  magCoursesLine.style.cssText = `
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    
  `;

  magCourses.forEach(course => {
    const enlace = createMenuItem(course.text.split(' ').slice(1,).join(' '), course.href);
    magCoursesLine.appendChild(enlace);
  });

  menu.appendChild(magCoursesLine);

  // Añade los cursos no-MAG al menú
  nonMagCourses.forEach(course => {
    const enlace = createMenuItem(course.text, course.href);
    menu.appendChild(enlace);
  });

  function createMenuItem(text, href) {
    const menuItem = document.createElement('div');
    menuItem.style.cssText = `
      display: inline-block;
      margin-left: 20px;
    `;

    const enlace = document.createElement('a');
    enlace.textContent = shortenText(text, 20); // Limita el texto a 20 caracteres
    enlace.href = href;
    menuItem.appendChild(enlace);
    return menuItem;
  }

  function shortenText(text, maxLength) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...'; // Añade puntos suspensivos si el texto es demasiado largo
    } else {
      return text;
    }
  }

  body.appendChild(menu);
}
