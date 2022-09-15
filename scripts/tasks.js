// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.
const jwt = cargarToken();

if(!jwt) {
  location.replace('./index.html');
} 

/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener('load', function () {

  /* ---------------- variables globales y llamado a funciones ---------------- */
  const btnCerrarSesion = document.querySelector('#closeApp');
  const username = document.querySelector('.user-info p');
  const formCrearTarea = document.querySelector('.nueva-tarea');
  const nuevaTarea = document.querySelector('#nuevaTarea');
  const tareasPendientes = document.querySelector('.tareas-pendientes');
  const tareasTerminadas = document.querySelector('.tareas-terminadas');

  obtenerNombreUsuario();
  consultarTareas();



  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  btnCerrarSesion.addEventListener('click', function () {
    localStorage.removeItem('jwt');
    window.location.replace('./index.html');
  });

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */

  function obtenerNombreUsuario() {
    let jwt = cargarToken();
    const URL = 'https://ctd-todo-api.herokuapp.com/v1/users/getMe'
    const config = {
      method: 'GET',
      headers: {
          'Content-Type' : "application/json; charset=UTF-8",
          'authorization' : jwt
      }
  }
  fetch(URL, config).then( resp => {
    return resp.json()
  }
  ).then (user => {
    console.log(user);
    username.textContent = user.firstName;
    //el usuario está en data.firstName
  })    
  };


  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  function consultarTareas() {
    let jwt = cargarToken();    
    const URL = 'https://ctd-todo-api.herokuapp.com/v1/tasks';
    const config = {
      method: 'GET',
      headers: {
          'Content-Type' : "application/json; charset=UTF-8",
          'authorization' : jwt
      }
  }
  fetch(URL, config).then( resp => {
    return resp.json()
  }
  ).then (tareas => {
    console.log(tareas);
    if(tareas.length > 0){
      renderizarTareas(tareas);
    }    
  })    
    
  };


  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  formCrearTarea.addEventListener('submit', function (event) {
    event.preventDefault();
    let jwt = cargarToken();
    const URL = 'https://ctd-todo-api.herokuapp.com/v1/tasks';
    const tarea = {
      description: nuevaTarea.value,
      completed : false
    }
    //se podría validar que el input no este vacío
    const config = {
      method: 'POST',
      headers: {
        'Content-Type' : "application/json; charset=UTF-8",
        'authorization' : jwt
      },
      body: JSON.stringify(tarea)
  }   
    fetch(URL, config).then( resp => {
      return resp.json()
    }
    ).then (data => {
      //limpio el input del form
      nuevaTarea.value='';
      console.log(data);
      // llamar a la funcion renderizarTareas    
    })           

  });


  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(listado) {
    listado.forEach(tarea => {
      console.log(tarea)
      if(tarea.completed){
        let li = document.createElement('li');
        li.setAttribute('class', 'tarea');        
        li.textContent = tarea.description;        
        //faltan elementos y clases --> icono y btn
        tareasTerminadas.appendChild(li);
      } else {
        let li = document.createElement('li');
        li.setAttribute('class', 'tarea');
        li.textContent = tarea.description;
        tareasPendientes.appendChild(li);
        
      }      
    });    
  };

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstado() {
    
    



  }


  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea() {
   
    

    

  };

});