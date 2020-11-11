var db = firebase.database();

var horas;

function init() {

    var editar = document.getElementById("edita");

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
// para editar en firebase
function updateTask(Hora, Personas, Estado, ID, Telefono, correo, key) {
    db.ref('Reservaciones/' + key).update({
        Hora: Hora,
        Personas: Personas,
        Estado: Estado,
        ID: ID,
        Correo: correo,
        Telefono: Telefono
    });
}

function updateHora(key) {
    db.ref('Hora/' + key).update({
        Estado: "Reservado"
    });
}
function onClickUpdate() {
    var personas = value("Npersonas");
    var correo = value("correo");
    var telefono = value("telefono");
    var key = value("key");
    var keyH = value("Nhoras");
    max = 10000
    min = 1
    var cod = Math.round(Math.random() * (max - min) + min);

    if (personas.length == 0 || correo.length == 0 || telefono.length == 0) {
        alert("Complete todos los campos");
    } else if (phonenumber(telefono)) {
        alert("EL numero no cumple con el formato 0000-0000");
    }
    else {
        inHTML("tabla", "");
        updateTask(keyH, personas, "Reservado", cod, telefono, correo, key);
        updateHora(keyH);
        alert("Reservacion Exitosa");
        asignation("correo", "");
        asignation("telefono", "");

    }
}

function phonenumber(inputtxt) {
    var phoneno = /^\d{4}-\d{4}$/;
    if (phoneno.test(inputtxt)) {
        return false;
    }
    else {
        return true;
    }
}
// Crear toda la tabla desde el javascript
function table(Estado, Hora, Personas, Id, Telefono, Correo, key) {
    var user = firebase.auth().currentUser;
    var nuevo = user.email;

    var tab = '<tr><td>' + Id + '</td><td>' + Estado + '</td><td>' + Hora + '</td>'
    if (nuevo === Correo) {
        tab += '<td>'
        tab += '<a href="#" class="btn btn-primary " data-toggle="modal" data-target="#exampleModalScrollable1" onclick="viewDataUpdate(\'' + Id + '\',\'' + Personas + '\',\'' + Telefono + '\',\'' + Correo + '\',\'' + key + '\')">Editar su reserva</a>'
        tab += '</td></tr>';
    } else if(nuevo !== Correo) {
        tab += '<td>'
        if (Estado === "Sin Reservar") {
            tab += '<a href="#" class="btn btn-primary " data-toggle="modal" data-target="#exampleModalScrollable1" onclick="viewDataUpdate(\'' + Id + '\',\'' + Personas + '\',\'' + Telefono + '\',\'' + Correo + '\',\'' + key + '\')">Reservar</a>'
        } else {
            tab += '<a>Esto ya fue Reservado</a>'       
        }
        tab += '</td></tr>';
    }
    return tab;
}
function SelectHora(estado, key) {
    var selec;
    if (estado === "Sin Reservar") {
        selec += "   <option >" + key + "</option>"
    }
    return selec;
}
function viewDataUpdate(id, Personas, Telefono, Correo, key) {
    var user = firebase.auth().currentUser;
    var nuevo = user.email;

    
    var response = "<input type='hidden' value='" + key + "' id='key'> "
    response += "<label for='exampleFormControlInput1' >Orden: " + id + "</label>"
    response += "</div>"
    response += "<br>"
    response += "<div class='form-group'>"
    response += " <label for= 'exampleFormControlSelect1'>Complete los datos</label>"
    response += '<div class="input-group">'
    response += '<div class="input-group-prepend">'
    response += ' <span class="input-group-text">Personas</span>'
    response += '</div>'
    response += "   <select class='form-control' id='Npersonas'  >"
    response += "   <option>1 Persona</option>"
    response += "  <option>2 Personas</option>"
    response += "   <option>3 Personas</option>"
    response += "  <option>4 Personas</option>"
    response += "  <option>5 Personas</option>"
    response += " </select>"
    response += '</div>'
    response += "</div>"
    response += " <label for= 'exampleFormControlSelect1'>Seleccione la hora</label>"
    response += "<select  class='form-control' size='3'  id='Nhoras'  >"
    response += horas
    response += " </select>"
    response += "<div class='form-group'>"
    response += " <label for='exampleFormControlTextarea1'>Correo</label>"
    response += " <input type='text' class='form-control' value='" + nuevo + "'  id='correo' placeholder='Correo' readonly>"
    response += "</div>"
    response += "<div class='form-group'>"
    response += " <label for='exampleFormControlTextarea1'>Telefono</label>"
    response += " <input type='text' class='form-control' value=''  id='telefono' placeholder='0000-0000'>"
    response += "</div>"
    response += ""

    inHTML('actualizar', response);

}
var reference = db.ref('Reservaciones/');
reference.on('value', function (datas) {
    var data = datas.val();
    inHTML("tabla", "");
    $.each(data, function (nodo, value) {
        var sendData = table(value.Estado, value.Hora, value.Personas, value.ID, value.Telefono, value.Correo, nodo);
        printHTML('tabla', sendData);
    });
});

var reference = db.ref('Hora/');
reference.on('value', function (datas) {
    var data = datas.val();
    $.each(data, function (nodo, value) {
        var sendData = SelectHora(value.Estado, nodo);
        horas += sendData;
    });
});

if (window.addEventListener) {
    window.addEventListener("load", init, false);
}
else if (window.attachEvent) {
    window.attachEvent("onload", init);
}