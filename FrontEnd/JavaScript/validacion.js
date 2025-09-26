document.getElementById('formRegistro').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const password = document.getElementById('password').value;
    const confirmarPassword = document.getElementById('confirmarPassword').value;
    const terminos = document.getElementById('terminos').checked;

    if (!validarFormulario(nombre, email, telefono, password, confirmarPassword, terminos)) {
        return;
    }

    const usuario = {
        nombre: nombre,
        email: email,
        telefono: telefono,
        password: password,
        fechaRegistro: new Date().toISOString()
    };

    let usuarios = JSON.parse(localStorage.getItem('usuariosFixsy')) || [];
    usuarios.push(usuario);
    localStorage.setItem('usuariosFixsy', JSON.stringify(usuarios));
    
    alert('Cuenta creada exitosamente');
    window.location.href = 'login.html';
});

function validarFormulario(nombre, email, telefono, password, confirmarPassword, terminos) {
    if (nombre.trim().length < 2) {
        alert('El nombre debe tener al menos 2 caracteres');
        return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Ingresa un correo electrónico válido');
        return false;
    }

    if (!/^(\+56\s?9\s?[0-9]{8}|9[0-9]{8})$/.test(telefono.replace(/\s/g, ''))) {
        alert('Ingresa un teléfono válido');
        return false;
    }

    if (password.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres');
        return false;
    }

    if (password !== confirmarPassword) {
        alert('Las contraseñas no coinciden');
        return false;
    }

    if (!terminos) {
        alert('Debes aceptar los términos y condiciones');
        return false;
    }

    return true;
}