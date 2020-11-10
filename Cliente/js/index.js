var db = firebase.database();
var autor = firebase.auth();
var storageRef = firebase.storage().ref();

function init() {
    var guardar = document.getElementById("iniciar");
    var editar = document.getElementById("registro");
    var editar2 = document.getElementById("informacion");
    var salir = document.getElementById("Csesion");  

      if (guardar && guardar.addEventListener) {
          guardar.addEventListener("click", inicioSesion, false);
      }
      else if (  guardar &&guardar.attachEvent) {
          guardar.attachEvent("onclick", inicioSesion);
      }
  
    if ( editar &&  editar.addEventListener) {
        editar.addEventListener("click", Registrar, false);
    }
    else if ( editar && editar.attachEvent) {
        editar.attachEvent("onclick", Registrar);
    }

    if ( editar  && editar2.addEventListener) {
        editar2.addEventListener("click", registro, false);
    }
    else if ( editar2  && editar2.attachEvent) {
        editar2.attachEvent("onclick", registro);
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

function table(nombre, name, description, date) {

    return '<tr><td>' + nombre + '</td><td>' + name + '</td><td>$' + description + '</td><td>' + date + '</td></tr>';
}

function Imprimir(imagen, link, key, conta) {

    datos = ""
    datos += " <div class='card-group'>"
    datos += "<div class='card' style='width: 18rem; margin:10px;'>"
    datos += "<img src='" + link + "'card-img-top' style='width: 100%;'>"
    datos += "<div class='card-body'>"
    datos += "<p class='card-title'>" + imagen + "</p>"

    datos += "</div>"
    datos += "</div>"

    if ((conta % 2) == 0) {
        datos += " <div class='card-group'>"
    }
    // alert(conta)
    datos += ""

    return datos;

}

var reference = db.ref('Imagenes/');
reference.on('value', function (datas) {
    var data = datas.val();
    $.each(data, function (nodo, value) {
        conta = 1;
        conta++;
        var sendData = Imprimir(value.nombre, value.direccion, nodo, conta);
        printHTML('columna', sendData);
    });
});

var reference = db.ref('Menu/');
reference.on('value', function (datas) {
    var data = datas.val();
    $.each(data, function (nodo, value) {
        var sendData = table(value.nombre, value.plato, value.precio, value.dia, nodo);
        printHTML('tabla', sendData);
    });
});

function Registrar() {

    var email = value("correoR");
    var password = value("contraR");

    if (email.length == 0 || password.length == 0) {
        alert("llene todo los campos Porfavor");
    } else {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorCode);
            alert(errorMessage);
        });
        $('#myTab a[href="#profile"]').tab('show');
    }
}

function sesiones(email,password){
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode);
        alert(errorMessage);
    });
}

function registro() {

    var email = value("correoR");
    var password = value("contraR");
    var nombre = value("nombreR");
    var edad = value("edadR");
    sesiones(email,password);
    var user = firebase.auth().currentUser;
    var nuevo = user.uid
    insertTask(nombre, edad, "Usuario", nuevo);
    asignation("correoR", "");
    asignation("contraR", "");
    asignation("nombreR", "");
    asignation("edadR", "");
    $('#exampleModalScrollable1').modal('hide');
    alert("Registrado con exito");
    window.location.href = "indexUser.html";
}

function inicioSesion() {
 

    var email = value("correoL");
    var password = value("contraL");
   sesiones(email,password);
    var user = firebase.auth().currentUser;
    var nuevo = user.uid

    var ref = firebase.database().ref("Usuario/");
    ref.once("value")
        .then(function (snapshot) {
            var rol = snapshot.child(nuevo+"/Rol").val(); 
            if (rol == "Administrador") {
                alert("Soy un admin " + rol);
                window.location.href = "../Admin/index.html";
            }else{
                alert("Soy un usuario");
                window.location.href = "indexUser.html";
            }   
        });

}



function insertTask(nombre, edad, rol, ID) {
    db.ref('Usuario/').child(ID).set({
        Nombre: nombre,
        Edad: edad,
        Rol: rol
    });
}

if (window.addEventListener) {
    window.addEventListener("load", init, false);
}
else if (window.attachEvent) {
    window.attachEvent("onload", init);
}

