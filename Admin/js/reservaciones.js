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
function insertTask(Hora, Pedido, Estado, ID, n,Total) {
    db.ref('Reservaciones/').child("Mesa " + n).set({
        Hora: Hora,
        Pedido: Pedido,
        Estado: Estado,
        ID: ID,
        Total:Total
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
           insertTask("00:00", "Sin Pedido", "Sin Reservar", "0000", a+1,"0");
        });
    
  // 
    alert("saved successfully");

}
// para editar en firebase
function updateTask(Hora, Pedido, Estado, ID,Total, key) {
    db.ref('Reservaciones/' + key).update({
        Hora: Hora,
        Pedido: Pedido,
        Estado: Estado,
        ID: ID,
        Total:Total
    });
}
function onClickUpdate() {
  
    var key = value("key");
   
        inHTML("tabla", "");
        updateTask("00:00", "Sin Pedido", "Sin Reservar", "0000","0",key);
        //   inHTML(viewDataUpdate,'actualizar');
        alert("modify successfully");

   
}

function removeTask(key) {
    if (confirm("¿you want to delete task?")) {
        inHTML("tabla", "");
        db.ref('Reservaciones/' + key).remove();
    }
}

// Crear toda la tabla desde el javascript
function table(Estado, Hora, Id, Pedido,Total, key) {

    return '<tr><td>' + Id + '</td><td>' + Estado  + '</td><td>' + Hora + '</td>'  +
    '<td><a href="#" class="btn btn-primary " data-toggle="modal" data-target="#exampleModalScrollable1" onclick="viewDataUpdate(\''  + Id + '\',\''+ Pedido + '\',\'' + Total + '\',\'' + key +'\')">' +
    '<i class="fas fa-edit blue icon-lg"></i></a>' +
        '<a href="#" class="btn btn-danger " onclick="removeTask(\'' + key + '\')">' +
        '<i class="fas fa-trash-alt red icon-lg"></i></a></td></tr>';
}
function viewDataUpdate(id, Pedido, Total, key) {
    var response = "<input type='hidden' value='" + key + "' id='key'> "
    response += "<label for='exampleFormControlInput1' >Orden: "+id+"</label>"
    response += "</div>"
    response += "<br>"
    response += "<label for='exampleFormControlInput1'>Descripcion</label>"
    response +=  '  <textarea class="form-control" id="dire" rows="5" placeholder="Direccion" required="required" data-validation-required-message="Please enter a message.">'+Pedido+'</textarea>'
    response += "</div>"
    response += "<div class='form-group'>"
    response += " <label for='exampleFormControlTextarea1'>Total</label>"
    response += " <input type='text' class='form-control' value='$" + Total + "'  id='precio1' placeholder='Precio'>"
    response += "</div>"
    response += ""


    /*'<div class="form-group"><input type="hidden" value=' + key + ' id="key">' +
        '<input type="text" id="nameEdit" class="form-control" placeholder="Name" value=' + name + '>' +
        '</div>' +
        '<div class="form-group">' +
        '<textarea placeholder="DescriptionEdit" class="form-control" id="descEdit">' + description + '</textarea>' +
        '</div>';*/
    inHTML('actualizar', response);
    // update.disabled = false;
}
var reference = db.ref('Reservaciones/');
reference.on('value', function (datas) {
    var data = datas.val();
    $.each(data, function (nodo, value) {
        var sendData = table(value.Estado, value.Hora, value.ID, value.Pedido,value.Total, nodo);
        printHTML('tabla', sendData);
    });
});

if (window.addEventListener) {
    window.addEventListener("load", init, false);
}
else if (window.attachEvent) {
    window.attachEvent("onload", init);
}