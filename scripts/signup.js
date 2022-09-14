window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
   const form = document.querySelector('form');
   const inputNombre = document.querySelector('#inputNombre');
   const inputApellido = document.querySelector('#inputApellido');
   const inputEmail = document.querySelector('#inputEmail');
   const inputPassword = document.querySelector('#inputPassword');
   const inputPasswordRepetida = document.querySelector('#inputPasswordRepetida');
   const errorContainer = document.querySelector('#errorMsg');


    

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const usuario = {
            nombre: normalizarTexto(inputNombre.value),
            apellido: normalizarTexto(inputApellido.value),
            email: normalizarEmail(inputEmail.value),
            password: inputPassword.value,
            passwordRep: inputPasswordRepetida.value
        }
        const mensajeError = validarRegistro(usuario);
        if(!mensajeError) { 
            const datos = {
                firstName : usuario.nombre,
                lastName : usuario.apellido,
                email : usuario.email,
                password : usuario.password
            }
            const config = {
                method: 'POST',
                headers: {
                    'Content-Type' : "application/json; charset=UTF-8"
                },
                body: JSON.stringify(datos)
            }

            realizarRegister(config)
        } else {
            mostrarErrores(errorContainer,[mensajeError]);
        }     
    });

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(settings) {
        const URL = 'https://ctd-todo-api.herokuapp.com/v1/users'

       fetch(URL, settings).then( res => {
        return res.json();
       }).then (data => {
        const { jwt } = data;
        if(jwt) {
            guardarToken(jwt);
            location.replace('./mis-tareas.html');;
        } else {
            mostrarErrores(errorContainer,[data]);
        }
        
       }) 




    };


});