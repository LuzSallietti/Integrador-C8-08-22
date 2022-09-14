/* ---------------------------------- texto --------------------------------- */
function validarTexto(texto) {
    
}

function normalizarTexto(texto) {
    return texto.trim().toUpperCase();    
}

/* ---------------------------------- email --------------------------------- */
function validarEmail(email) {
    
}

function normalizarEmail(email) {
    return email.trim().toLowerCase();
}

/* -------------------------------- password -------------------------------- */
function validarContrasenia(contrasenia) {
    
}

function compararContrasenias(contrasenia_1, contrasenia_2) {
    
}

function cargarToken() {
    return localStorage.getItem('jwt');
}

function guardarToken(jwt) {
    localStorage.setItem('jwt', jwt)
}

function validarLogin({email, password}) {
    if([email, password].includes('')){
        return 'Todos los campos son obligatorios';
    } else if (!email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )) {
        return 'El formato del email es incorrecto';
    }

    return ''; 
}

function validarRegistro({nombre, apellido, email, password, passwordRep}){
    if([nombre,apellido,email, password].includes('')){
        return 'Todos los campos son obligatorios';
    } else if (!email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )) {
        return 'El formato del email es incorrecto';
    } else if (password !== passwordRep){
        return 'Las contraseñas no coinciden';
    }

    return '';
}