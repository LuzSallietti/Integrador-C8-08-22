/* Evaluar si hay un token */

const jwt = cargarToken();

// esto puede ser la funcion validarToken(jwt)
if(jwt){
    location.replace('./mis-tareas.html');
}

window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
   const form = document.querySelector('form');
   const inputEmail = document.getElementById('inputEmail');
   const inputPassword = document.getElementById('inputPassword');
   
   const errorContainer = document.querySelector('#errorMsg');
   console.log(errorContainer);


    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const usuario = {
            email: normalizarEmail(inputEmail.value),
            password: inputPassword.value,
        }
        const mensajeError = validarLogin(usuario);
        if(!mensajeError) { 
            console.log(usuario);
            const config = {
                method: 'POST',
                headers: {
                    'Content-Type' : "application/json; charset=UTF-8"
                },
                body: JSON.stringify(usuario)
            }

            realizarLogin(config)
        } else {
            mostrarErrores(errorContainer, mensajeError);
        }
    });


    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarLogin(settings) {
       const URL = 'https://ctd-todo-api.herokuapp.com/v1/users/login'

       fetch(URL, settings).then( res => {
        return res.json();
       }).then (data => {
        const { jwt } = data;
        if(jwt) {
            guardarToken(jwt);
            location.replace('./mis-tareas.html');;
        } else {
            mostrarErrores(errorContainer,data);
        }
        
       }) 
    };


});