var db = firebase.database();


function init() {
    var guardar = document.getElementById("guardar");
     var editar = document.getElementById("edita");

    if (guardar.addEventListener) {
        guardar.addEventListener("click", onClickInsert, false);
    }
    else if (guardar.attachEvent) {
        guardar.attachEvent("onclick", onClickInsert);
    }

       if (editar.addEventListener) {
           editar.addEventListener("click", onClickUpdate, false);
       }
       else if (editar.attachEvent) {
           editar.attachEvent("onclick", onClickUpdate);
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
function dateActuality() {
    var fh = new Date();
    return fh.getFullYear() + "-" + (fh.getMonth() + 1) + "-" + fh.getDate() + " " + fh.getHours() + ":" + fh.getMinutes();
}
function insertTask(Hora, Personas, Estado, ID,correo,n,Telefono) {
    db.ref('Reservaciones/').child("Mesa " + n).set({
        Hora: Hora,
        Personas: Personas,
        Estado: Estado,
        ID: ID,
        Correo:correo,
        Telefono:Telefono
    });
}
// Para insertar a firebase
function onClickInsert() {
    //devuelve el numero de hijos
    var numero = db.ref('Reservaciones/');
 var nu =   numero.once("value")
        .then(function (snapshot) {
            var a = snapshot.numChildren();
            //insertamos la mesa
            inHTML("tabla", "");
           insertTask("00:00", "0 Personas", "Sin Reservar", "0000","correo@correo.com", a+1,"0000-0000");
        }); 
    alert("saved successfully");

}
// para editar en firebase
function updateTask(Hora, Personas, Estado, ID,Telefono,correo, key) {
    db.ref('Reservaciones/' + key).update({
        Hora: Hora,
        Personas: Personas,
        Estado: Estado,
        ID: ID,
        Correo:correo,
        Telefono:Telefono
    });
}
function updateHora(key) {
    db.ref('Hora/' + key).update({
        Estado: "Sin Reservar"
    });
}
function onClickUpdate() {

    var key = value("key");
    var keyH = value("keyH");
        inHTML("tabla", "");
        updateTask("00:00", "0 Personas", "Sin Reservar", "0000","0000-0000","correo@correo.com",key);
        updateHora(keyH);
      
        alert("Reservacion terminada");
        asignation("personas","");
        asignation("correo","");
        asignation("telefono","");

   
}

function removeTask(key) {
    if (confirm("¿you want to delete task?")) {
        inHTML("tabla", "");
        db.ref('Reservaciones/' + key).remove();
    }
}

// Crear toda la tabla desde el javascript
function table(Estado, Hora, Personas, Id,Telefono,Correo, key) {

    return '<tr><td>' + Id + '</td><td>' + Estado  + '</td><td>' + Hora + '</td>'  +
    '<td><a href="#" class="btn btn-primary " data-toggle="modal" data-target="#exampleModalScrollable1" onclick="viewDataUpdate(\''  + Id + '\',\''+ Personas + '\',\'' + Telefono + '\',\'' + Correo +'\',\''+ Hora +'\',\'' + key +'\')">' +
    '<i class="fas fa-edit blue icon-lg"></i></a>' +
        '<a href="#" class="btn btn-danger " onclick="removeTask(\'' + key + '\')">' +
        '<i class="fas fa-trash-alt red icon-lg"></i></a></td></tr>';
}
function viewDataUpdate(id, Personas, Telefono,Correo,Hora, key) {
    var response = "<input type='hidden' value='" + key + "' id='key'> "
    response += "<input type='hidden' value='" + Hora + "' id='keyH'> "
    response += "<label for='exampleFormControlInput1' >Orden: "+id+"</label>"
    response += "</div>"
    response += "<br>"
    response += "<label for='exampleFormControlInput1'>Total de Personas</label>"
    response += " <input type='text' class='form-control' value='" + Personas + "'  id='personas' placeholder='Personas'>"
    response += "</div>"
    response += "<div class='form-group'>"
    response += " <label for='exampleFormControlTextarea1'>Correo</label>"
    response += " <input type='text' class='form-control' value='" + Correo + "'  id='correo' placeholder='Correo'>"
    response += "</div>"
    response += "<div class='form-group'>"
    response += " <label for='exampleFormControlTextarea1'>Telefono</label>"
    response += " <input type='text' class='form-control' value='" + Telefono + "'  id='telefono' placeholder='Telefono'>"
    response += "</div>"
    response += ""

    inHTML('actualizar', response);
}
var reference = db.ref('Reservaciones/');
reference.on('value', function (datas) {
    var data = datas.val();
    inHTML("tabla", "");
    $.each(data, function (nodo, value) {
        var sendData = table(value.Estado, value.Hora, value.Personas, value.ID, value.Telefono,value.Correo, nodo);
        printHTML('tabla', sendData);
    });
});

if (window.addEventListener) {
    window.addEventListener("load", init, false);
}
else if (window.attachEvent) {
    window.attachEvent("onload", init);
}