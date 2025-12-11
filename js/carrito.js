function inicializarCarrito(modoPagina = false) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  function mostrarCarrito() {
    const contenedor = document.querySelector('.custom-carrito-lista, .carrito-lista');
    if (!contenedor) return;

    contenedor.innerHTML = "";

    let total = 0;

    carrito.forEach((item, index) => {
      total += item.precio;
      contenedor.innerHTML += `
        <div class="d-flex justify-content-between mb-2">
          <span>${item.nombre}</span>
          <span>$${item.precio.toLocaleString()}</span>
          <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(${index})">x</button>
        </div>
      `;
    });

    const totalTxt = document.querySelector('.custom-carrito-total, #carrito-total');
    if (totalTxt) totalTxt.textContent = `Total: $${total.toLocaleString()}`;
  }

  window.eliminarDelCarrito = function(index) {
    carrito.splice(index, 1);
    guardarCarrito();
    mostrarCarrito();
  };

  // Nueva función para agregar productos
  function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    guardarCarrito();
    mostrarCarrito();
    alert(`${nombre} agregado al carrito`);
  }

  // Capturar clicks en botones "Agregar al carrito" (solo en top.html)
  document.querySelectorAll(".btn-add-cart").forEach(boton => {
    boton.addEventListener("click", () => {
      const nombre = boton.getAttribute("data-nombre");
      const precio = parseInt(boton.getAttribute("data-precio"), 10);
      agregarAlCarrito(nombre, precio);
    });
  });

  // Si estamos en la página carrito.html, solo mostrar
  if (modoPagina) {
    mostrarCarrito();
    return;
  }
}
