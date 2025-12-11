document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        if (!nombre || !correo || !mensaje) {
            alert("Por favor complete todos los campos.");
            return;
        }

        const dato = {
            nombre,
            correo,
            mensaje,
            fecha: new Date().toLocaleString(),
        };

        let mensajes = JSON.parse(localStorage.getItem("mensajes")) || [];
        mensajes.push(dato);

        localStorage.setItem("mensajes", JSON.stringify(mensajes));

        alert("Mensaje guardado correctamente!");

        form.reset();
    });
});
