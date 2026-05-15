function mostrarDetalle(nombre, descripcion) {
    const contenedor = document.getElementById('detalle-utensilio');

    
    // Cambiamos el contenido del cuadro de abajo dinámicamente
    contenedor.innerHTML = `
        <div class="info-card">
            <div class="info-img-box">
                <img src="../Images/${nombre.toLowerCase()}.webp" alt="${nombre}">
            </div>
            <div class="info-text-box">
                <h3>${nombre}</h3>
                <p>${descripcion}</p>
            </div>
        </div>
    `;
    
    // Efecto visual: hace que la página se mueva suavemente hacia la descripción
    contenedor.scrollIntoView({ behavior: 'smooth' });
}

