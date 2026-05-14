const langButtons = document.querySelectorAll("[data-language]");

// Función para preparar el saludo según la hora
function prepararLlaveSaludo() {
    const saludoElemento = document.getElementById('saludo-dinamico');
    if (!saludoElemento) return;

    const hora = new Date().getHours();
    let llave = "";

    if (hora < 12) llave = "mañana";
    else if (hora < 18) llave = "tarde";
    else llave = "noche";

    // Asignamos los atributos para que el traductor los reconozca
    saludoElemento.dataset.section = "saludos";
    saludoElemento.dataset.value = llave;
}

// Función principal de traducción
const changeLanguage = (language) => {
    prepararLlaveSaludo(); // Ejecutamos antes de traducir

    fetch(`./lenguaje/${language}.json`)
        .then(res => res.json())
        .then(data => {
            const textsToChange = document.querySelectorAll("[data-section]");
            
            textsToChange.forEach((el) => {
                const section = el.dataset.section;
                const value = el.dataset.value;
                
                // Solo cambia si existe la ruta en el JSON
                if (data[section] && data[section][value]) {
                    el.innerHTML = data[section][value];
                }
            });
            
            localStorage.setItem("selectedLanguage", language);
        })
        .catch(err => console.error("Error cargando el JSON:", err));
};

// Eventos de los botones
langButtons.forEach((button) => {
    button.addEventListener("click", () => {
        changeLanguage(button.dataset.language);
    });
});

// Al cargar la página, recuperar el idioma guardado
document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("selectedLanguage") || "es";
    changeLanguage(savedLang);
});





// 2. Menú Desplegable con mouseover/mouseout
const langSelector = document.querySelector('.lang-selector');
const subMenu = document.createElement('ul');
subMenu.innerHTML = '<li>JP</li><li>FR</li>';
subMenu.className = 'dropdown-content';
subMenu.style.display = 'none';
if (langSelector) {
    langSelector.appendChild(subMenu);
    langSelector.addEventListener('mouseover', () => subMenu.style.display = 'block');
    langSelector.addEventListener('mouseout', () => subMenu.style.display = 'none');
}

// 3. Slider de Imágenes (Lógica básica)
let currentSlide = 0;
const slides = ["./Images/Pagina_principal.webp", "./Images/ceremonia_01.webp", "./Images/ceremonia_02.webp", "./Images/ceremonia_03.webp"];
const sliderElement = document.querySelector('.principal_img');

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    if (sliderElement) {
        sliderElement.style.backgroundImage = `url(${slides[currentSlide]})`;
    }
}

// Intervalo automático cada 5 segundos
let sliderInterval = setInterval(nextSlide, 5000);

// Seleccionamos el botón y la lista de navegación
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

// Escuchamos el clic en el botón hamburguesa
mobileMenu.addEventListener('click', () => {
    // Intercambiamos la clase 'active' en el menú
    navList.classList.toggle('active');
    
    // Opcional: Animación simple para las barras del botón
    mobileMenu.classList.toggle('is-active');
});

// Cerrar el menú automáticamente al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
    });
});


function toggleHistoria(id) {
    const texto = document.getElementById(id);
    
    // Verificamos si ya está visible
    if (texto.style.display === "block") {
        texto.style.display = "none";
    } else {
        // Opcional: Ocultar otros textos abiertos antes de abrir el nuevo
        document.querySelectorAll('.texto-desplegable').forEach(el => {
            el.style.display = 'none';
        });
        
        texto.style.display = "block";
        
        // Desplazamiento suave hacia el texto que apareció
        texto.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}
