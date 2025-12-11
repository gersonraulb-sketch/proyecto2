//Modal logic

fetch('modal.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('modal-container').innerHTML = html;

    const modal = document.querySelector('.custom-modal');
    const overlay = document.querySelector('.custom-overlay');
    const openmodalbtn = document.querySelector('.btn-open');
    const closemodalbtn = document.querySelector('.custom-btn-close');

    const formRegistro = document.querySelector('.custom-form-registro');
    const formLogin = document.querySelector('.custom-form-login');
    const loginToggle = document.querySelector('.custom-btn-login-toggle');
    const registroToggle = document.querySelector('.custom-btn-registro-toggle');

    const openmodal = () => {
      modal.classList.remove('hidden');
      overlay.classList.remove('hidden');

      const usuarioActivo = sessionStorage.getItem("usuarioActivo");
      if (usuarioActivo) {
        const user = JSON.parse(usuarioActivo);
        mostrarPerfil(user);
      } else {
        formLogin.classList.remove('d-none');
        formRegistro.classList.add('d-none');
        document.querySelector('.custom-perfil').classList.add('d-none');
      }
    };


    const closemodal = () => {
      modal.classList.add('hidden');
      overlay.classList.add('hidden');
    };

    openmodalbtn.addEventListener('click', openmodal);
    closemodalbtn.addEventListener('click', closemodal);
    overlay.addEventListener('click', closemodal);

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closemodal();
      }
    });

    loginToggle.addEventListener('click', () => {
      formRegistro.classList.add('d-none');
      formLogin.classList.remove('d-none');
    });

    registroToggle.addEventListener('click', () => {
      formLogin.classList.add('d-none');
      formRegistro.classList.remove('d-none');
    });

    // Registro
    document.querySelector('.custom-form-registro form').addEventListener('submit', (e) => {
      e.preventDefault();

      const usuario = e.target.querySelector('input[placeholder="Usuario"]').value;
      const nombre = e.target.querySelector('input[placeholder="Nombre completo"]').value;
      const correo = e.target.querySelector('input[placeholder="Correo"]').value;
      const password = e.target.querySelector('input[placeholder="Contraseña"]').value;

      let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

      if (usuarios.some(u => u.correo === correo)) {
        alert("Ese correo ya está registrado");
        return;
      }

      const nuevoUsuario = { usuario, nombre, correo, password };
      usuarios.push(nuevoUsuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      // Iniciar sesión automáticamente
      sessionStorage.setItem("usuarioActivo", JSON.stringify(nuevoUsuario));

      alert("Registro exitoso. Sesión iniciada.");

      mostrarPerfil(nuevoUsuario);
    });


    // Login
    document.querySelector('.custom-form-login form').addEventListener('submit', (e) => {
      e.preventDefault();

      const correo = e.target.querySelector('input[placeholder="Correo"]').value;
      const password = e.target.querySelector('input[placeholder="Contraseña"]').value;

      let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

      const usuario = usuarios.find(u => u.correo === correo && u.password === password);

      if (usuario) {

        sessionStorage.setItem("usuarioActivo", JSON.stringify(usuario));
        alert("Sesión iniciada correctamente");
        mostrarPerfil(usuario);
      } else {
        alert("Algun dato es incorrecto o no estás registrado");
      }
    });

    window.addEventListener("load", () => {
      const usuarioActivo = sessionStorage.getItem("usuarioActivo");
      if (usuarioActivo) {
        const user = JSON.parse(usuarioActivo);
        console.log("Sesión activa:", user);
      }
    });

    function mostrarPerfil(usuario) {
      document.querySelector('.custom-form-login').classList.add('d-none');
      document.querySelector('.custom-form-registro').classList.add('d-none');
      document.querySelector('.custom-perfil').classList.remove('d-none');
      document.querySelector('.custom-nombre-usuario').textContent = `Hola, ${usuario.usuario}`;
    }

    document.querySelector('.custom-btn-logout').addEventListener('click', () => {
      sessionStorage.removeItem("usuarioActivo");
      document.querySelector('.custom-perfil').classList.add('d-none');
      document.querySelector('.custom-modal').classList.add('hidden');
      document.querySelector('.custom-overlay').classList.add('hidden');
    });

    window.addEventListener("load", () => {
      const usuarioActivo = sessionStorage.getItem("usuarioActivo");
      if (usuarioActivo) {
        const user = JSON.parse(usuarioActivo);
        mostrarPerfil(user);
      }
    });
  });

