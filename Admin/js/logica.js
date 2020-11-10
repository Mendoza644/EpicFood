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
function insertTask(nombre,plato, dia, precio) {
    db.ref('Menu/').push({
        nombre:nombre,
        plato: plato,
        dia: dia,
        precio: precio
    });
}
// Para insertar a firebase
function onClickInsert() {
    var nombre = value("nombre");
    var plato = value("platillo");
    var dia = value("dia");
    var precio = value("precio");
    if (plato.length == 0 || dia.length == 0 || precio.length == 0 || nombre == 0) {
        alert("Campos Vacios");
    } else {
        inHTML("tabla", "");
        insertTask(nombre,plato, dia, precio);
        asignation("platillo", "");
        asignation("dia", "");
        asignation("precio", "");
        alert("saved successfully");
    }
}
// para editar en firebase
function updateTask(nombre,plato, dia, precio,key){
    db.ref('Menu/'+key).update({
        nombre:nombre,
        plato: plato,
        dia: dia,
        precio: precio,
        date:dateActuality()
    });
}
function onClickUpdate(){
    var nombre1 = value("nombre1");
    var plato = value("platillo1");
    var dia = value("dia1");
    var precio = value("precio1");
    var key = value("key"); 
    if(plato.length == 0 || dia.length == 0 || precio.length == 0 || nombre1 == 0){ 
        alert("empty field"); 
    }else{ 
        inHTML("tabla","");
        updateTask(nombre1,plato, dia, precio,key); 
     //   inHTML(viewDataUpdate,'actualizar');
        alert("modify successfully");
      
    }
}

function removeTask(key){
    if(confirm("¿you want to delete task?")){
        inHTML("tabla","");
        db.ref('Menu/'+key).remove();
    }
}

// Crear toda la tabla desde el javascript
function table(nombre,name, description, date, key) {
    
    return  '<tr><td>' + nombre + '</td><td>' + name + '</td><td>$' + description + '</td><td>' + date + '</td>' +
        '<td><a href="#" class="btn btn-primary " data-toggle="modal" data-target="#exampleModalScrollable1" onclick="viewDataUpdate(\''  + nombre + '\',\''+ name + '\',\'' + description + '\',\'' + date +  '\',\'' + key +'\')">' +
        '<i class="fas fa-edit blue icon-lg"></i></a>' +
        '<a href="#" class="btn btn-danger " onclick="removeTask(\'' + key + '\')">' +
        '<i class="fas fa-trash-alt red icon-lg"></i></a></td></tr>';
}
function viewDataUpdate(nombre,name, description, date, key) {
    var response = "<input type='hidden' value=" + key + " id='key'> "
    response += "<label for='exampleFormControlInput1' >nombre del platillo</label>"
    response += "<input type='text' class='form-control' id='nombre1' value='"+nombre+"' placeholder='nombre del platillo'>"
    response += "</div>"
   response += "<label for='exampleFormControlInput1'>Descripcion del platillo</label>"
   response += "<input type='text' class='form-control' id='platillo1' value='"+name+"' placeholder='Descripcion'>"
   response += "</div>"
   response += "<div class='form-group'>"
   response += " <label for= 'exampleFormControlSelect1'>Selecciones el dia del platillo</label>"
   response += "   <select class='form-control' id='dia1'  >"
   response += "    <option select>"+date+"</option>"
   response += "    <option>Lunes</option>"
   response += "  <option>Martes</option>"
   response += "   <option>Miercoles</option>"
   response += "  <option>Jueves</option>"
   response += "  <option>Viernes</option>"
   response += "  <option>Sabado</option>"
   response += "   <option>Domingo</option>"
   response += "   <option>Todos los dias</option>"
   response += " </select>"
   response += "</div>"
   response += "<div class='form-group'>"
   response += " <label for='exampleFormControlTextarea1'>Ingrese el precio del platillo+</label>"
   response += " <input type='number' class='form-control' value='"+description+"'  id='precio1' placeholder='Precio'>"
   response += "</div>"
   response += "" 
 
    inHTML('actualizar', response);
}

var reference = db.ref('Menu/');
reference.on('value', function (datas) {
    var data = datas.val();
    $.each(data, function (nodo, value) {
        var sendData = table(value.nombre,value.plato, value.precio, value.dia, nodo);
        printHTML('tabla', sendData);
    });
});

if (window.addEventListener) {
    window.addEventListener("load", init, false);
}
else if (window.attachEvent) {
    window.attachEvent("onload", init);
}