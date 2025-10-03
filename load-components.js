// Función para cargar componentes HTML
async function loadComponents() {
    try {
        const response = await fetch('components.html');
        const html = await response.text();
        
        // Crear un contenedor temporal para el HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        // Insertar el HTML en el body
        document.body.insertAdjacentHTML('afterbegin', tempDiv.innerHTML);
        
        // Configurar los eventos después de insertar el HTML
        setupEventListeners();
        
    } catch (error) {
        console.error('Error loading components:', error);
    }
}

function setupEventListeners() {
    // Configurar el botón de tema
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Aplicar tema guardado
    applySavedTheme();
}

// Funciones del tema
function applySavedTheme() {
    const root = document.documentElement;
    const btn = document.getElementById('themeToggle');
    const LS_KEY = 'theme-preference';
    
    const saved = localStorage.getItem(LS_KEY) || 'light';
    
    if (saved === 'dark') {
        root.setAttribute('data-theme', 'dark');
        if (btn) btn.textContent = '☀️ Claro';
    } else {
        root.setAttribute('data-theme', 'light');
        if (btn) btn.textContent = '🌙 Oscuro';
    }
}

function toggleTheme() {
    const root = document.documentElement;
    const btn = document.getElementById('themeToggle');
    const LS_KEY = 'theme-preference';
    
    const current = localStorage.getItem(LS_KEY) || 'light';
    
    if (current === 'dark') {
        localStorage.setItem(LS_KEY, 'light');
        root.setAttribute('data-theme', 'light');
        btn.textContent = '🌙 Oscuro';
    } else {
        localStorage.setItem(LS_KEY, 'dark');
        root.setAttribute('data-theme', 'dark');
        btn.textContent = '☀️ Claro';
    }
}

// Funciones del menú (deben ser globales para los onclick)
function openNav() {
    const sidepanel = document.getElementById("mySidepanel");
    if (sidepanel) {
        sidepanel.style.width = "200px";
    }
}

function closeNav() {
    const sidepanel = document.getElementById("mySidepanel");
    if (sidepanel) {
        sidepanel.style.width = "0";
    }
}

// Hacer las funciones globales
window.openNav = openNav;
window.closeNav = closeNav;
window.initMap = function() {
    var macc = {lat: 42.1382114, lng: -71.5212585};
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 15, center: macc});
    var marker = new google.maps.Marker({position: macc, map: map});
};

// Cargar componentes cuando la página esté lista
document.addEventListener('DOMContentLoaded', loadComponents);