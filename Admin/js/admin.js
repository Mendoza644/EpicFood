var db = firebase.database();

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

// para editar en firebase
function updateTask(rol, key) {
    db.ref('Usuario/' + key).update({
        Rol: rol
    });
}
function onClickUpdate(key, rol) {
    inHTML("tabla", "");
    if (rol == "Administrador") {
        updateTask("Usuario", key);
        alert("Ha sido Degradado a Usuario");
    } else {
        updateTask("Administrador", key);
        alert("Ha sido Ascendido a Administrador");
    }
}

function removeTask(key) {

    if (confirm("¿you want to delete task?")) {
        inHTML("tabla", "");
        db.ref('Usuario/' + key).remove();
    }
}

// Crear toda la tabla desde el javascript
function table(nombre, edad, rol, key) {
 var tabla = '<tr>';
    tabla += '<td>' + nombre + '</td><td>' + edad + '</td><td>' + rol + '</td>';
    tabla += '<td>';
    if (rol == "Usuario") {
        tabla += '<a href="#" class="btn btn-danger " onclick="onClickUpdate(\'' + key + '\',\'' + rol + '\')">Ascender</a>';
    } else if (rol = "Administracion") {
        tabla += '<a href="#" class="btn btn-danger " onclick="onClickUpdate(\'' + key + '\',\'' + rol + '\')">Degradar</a>';
    }
    tabla += '</td>';
    tabla += '</tr>';
    return tabla;
}

var reference = db.ref('Usuario/');
reference.on('value', function (datas) {
    var data = datas.val();
    inHTML("tabla", "");
    $.each(data, function (nodo, value) {
        var sendData = table(value.Nombre, value.Edad, value.Rol, nodo);
        printHTML('tabla', sendData);
    });
});

