// =====================
// Registro de usuario
// =====================
document.getElementById('formRegistro')?.addEventListener('submit', function(event) { 
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const password = document.getElementById('password').value;
    const confirmarPassword = document.getElementById('confirmarPassword').value;
    const terminos = document.getElementById('terminos').checked;

    if (!validarFormulario(nombre, email, telefono, password, confirmarPassword, terminos)) return;

    const usuario = { nombre, email, telefono, password, fechaRegistro: new Date().toISOString() };

    let usuarios = JSON.parse(localStorage.getItem('usuariosFixsy')) || [];
    usuarios.push(usuario);
    localStorage.setItem('usuariosFixsy', JSON.stringify(usuarios));

    alert('Cuenta creada exitosamente');
    window.location.href = 'login.html';
});

// =====================
// Validaciones del formulario
// =====================
function validarFormulario(nombre, email, telefono, password, confirmarPassword, terminos) {
    if (nombre.trim().length < 2) { alert('El nombre debe tener al menos 2 caracteres'); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('Ingresa un correo electrónico válido'); return false; }
    if (!/^(\+56\s?9\s?[0-9]{8}|9[0-9]{8})$/.test(telefono.replace(/\s/g, ''))) { alert('Ingresa un teléfono válido'); return false; }
    if (password.length < 6) { alert('La contraseña debe tener al menos 6 caracteres'); return false; }
    if (password !== confirmarPassword) { alert('Las contraseñas no coinciden'); return false; }
    if (!terminos) { alert('Debes aceptar los términos y condiciones'); return false; }
    return true;
}

// =====================
// Usuarios de prueba
// =====================
if (!localStorage.getItem('usuariosFixsy')) {
    const usuariosIniciales = [
        { nombre: 'Santiago', email: 'santiago@email.com', telefono: '+56911111111', password: '123456', fechaRegistro: new Date().toISOString() },
        { nombre: 'Matias', email: 'matias@email.com', telefono: '+56922222222', password: '123456', fechaRegistro: new Date().toISOString() },
        { nombre: 'Sofia', email: 'sofia@email.com', telefono: '+56933333333', password: '123456', fechaRegistro: new Date().toISOString() }
    ];
    localStorage.setItem('usuariosFixsy', JSON.stringify(usuariosIniciales));
}

// =====================
// Login
// =====================
document.getElementById('formLogin').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('emailLogin').value;
    const password = document.getElementById('passwordLogin').value;

    let usuarios = JSON.parse(localStorage.getItem('usuariosFixsy')) || [];
    const usuarioEncontrado = usuarios.find(u => u.email === email && u.password === password);

    if (usuarioEncontrado) {
        localStorage.setItem('usuarioActual', JSON.stringify(usuarioEncontrado));
        alert(`¡Bienvenido ${usuarioEncontrado.nombre}!`);
        window.location.href = 'index.html';
    } else {
        alert('Correo o contraseña incorrectos');
    }
});


// =====================
// Barra dinámica
// =====================
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.navbar-nav');
    const usuario = JSON.parse(localStorage.getItem('usuarioLogeado'));

    if(usuario && nav){
        // Limpiar los enlaces de Registro/Login
        nav.querySelectorAll('a.nav-link').forEach(a => {
            if(a.textContent.trim() === 'Login' || a.textContent.trim() === 'Registro'){
                a.remove();
            }
        });

        // Crear enlaces nuevos
        const liPerfil = document.createElement('a');
        liPerfil.className = 'nav-link';
        liPerfil.href = 'perfil.html';
        liPerfil.textContent = 'Perfil';
        nav.appendChild(liPerfil);

        const liCerrar = document.createElement('a');
        liCerrar.className = 'nav-link';
        liCerrar.href = '#';
        liCerrar.textContent = 'Cerrar Sesión';
        liCerrar.addEventListener('click', function(e){
            e.preventDefault();
            localStorage.removeItem('usuarioLogeado');
            window.location.reload();
        });
        nav.appendChild(liCerrar);
    }
});
