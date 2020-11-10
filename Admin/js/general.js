var db = firebase.database();

function init() {
    var salir = document.getElementById("Csesion");  

      if (salir.addEventListener) {
          salir.addEventListener("click", CerrarSesion, false);
      }
      else if (salir.attachEvent) {
          salir.attachEvent("onclick", CerrarSesion);
      }
  
}


function value(request) {
    return document.getElementById(request).value;
}
function asignation(request, response) {
    return document.getElementById(request).value = response;
}
function printHTML(request, response) {
    return document.getElementById(request).innerHTML += response;
}
function inHTML(request, response) {
    return document.getElementById(request).innerHTML = response;
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
   // alert("El usuario Esta Logueado");
      // ...
    } else {
        alert("Debe loguiarse Primero");
        window.location.href = "../Cliente/index.html";
    }
  });

function Imprimi(correo,descripcion,direccion,Numero, key) {

    inHTML('correo', correo);
    inHTML('local', direccion);
    inHTML('contacto', Numero);

}

function CerrarSesion(){
   
    firebase.auth().signOut().then(function () {
        alert("Sesion Cerrada");
        window.location.href = "../Cliente/index.html";
    }).catch(function (error) {
        alert("Error");
    });
}

var reference = db.ref('Informacion/');
reference.on('value', function (datas) {
    var data = datas.val();
    $.each(data, function (nodo, value) {
        var sendData = Imprimi(value.Correo, value.Descripcion,value.Direccion,value.numero, nodo);
     
    });
});

if (window.addEventListener) {
    window.addEventListener("load", init, false);
}
else if (window.attachEvent) {
    window.attachEvent("onload", init);
}