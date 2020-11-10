var db = firebase.database();


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

// para editar en firebase
function updateTask(Correo, Descripcion, Direccion,numero,key){
    db.ref('Informacion/'+key).update({
        Correo: Correo,
        Descripcion: Descripcion,
        Direccion: Direccion,
        numero:numero
    });
}
function onClickUpdate(){
    var correo = value("email");
    var descripcion = value("des");
    var direccion = value("dire");
    var  numero = value("numer");
    var key = value("key"); 
    if(correo.length == 0 || descripcion.length == 0 || direccion.length == 0){ 
        alert("empty field"); 
    }else{ 
       // inHTML("tabla","");
        updateTask(correo, descripcion, direccion,numero,key); 
    //inHTML("info",'');
        alert("modify successfully");
      
    }
}

function Imprimir(correo,descripcion,direccion,Numero, key) {

    datos = ""
    datos += '  <p class="card-text"> Correo: '+correo+'</p>'
    datos += ' <p class="card-text"> Descripcion: '+descripcion+'</p>'
    datos += '  <p class="card-text"> Numero: '+Numero+'</p>'
    datos += '  <p class="card-text"> Direccion: '+direccion+'</p>'
    datos += '<a href="#" class="btn btn-primary " data-toggle="modal" data-target="#exampleModalScrollable" onclick="viewDataUpdate(\'' + correo + '\',\'' + descripcion + '\',\'' + Numero +  '\',\'' + direccion +  '\',\''+ key +'\')">Editar Informacion</a>'
    // alert(conta)

    return datos;

}

function viewDataUpdate(Correo, description, numero,direccion, key) {
    var response = "<input type='hidden' value=" + key + " id='key'> "
    response += ' <div class="control-group">'
   response += '  <div class="form-group floating-label-form-group ">'
   response += '  <label>Numero</label>'
   response += ' <input class="form-control" id="numer" type="text" placeholder="Ingrese el numero de la empresa"  value="'+numero+'" required="required" data-validation-required-message="Ingrese el numero del negocio." />'
   response += '  <p class="help-block text-danger"></p>'
   response += '  </div>'
   response += '  </div>'

   response += '  <div class="control-group"> <div class="form-group floating-label-form-group  "> <label>Correo</label>'
   response += ' <input class="form-control" id="email" type="email" placeholder="Ingrese el correo de la Empresa" value="'+Correo+'" required="required" data-validation-required-message="Ingrese el correo del negocio" />'
   response += ' <p class="help-block text-danger"></p> </div></div>'

   response += '<div class="control-group"> <div class="form-group floating-label-form-group  "><label>Descripcion</label>'
   response += '  <input class="form-control" id="des" type="text" placeholder="Descripcion de restaurante" value="'+description+'" required="required" data-validation-required-message="Please enter your phone number." />'
   response += '  <p class="help-block text-danger"></p> </div></div>'

   response += ' <div class="control-group"><div class="form-group floating-label-form-group  "><label>Direccion</label>'
   response += '  <textarea class="form-control" id="dire" rows="5" placeholder="Direccion" required="required" data-validation-required-message="Please enter a message.">'+direccion+'</textarea>'
   response += '      <p class="help-block text-danger"></p></div></div>'
  

   response += '     <br />'
   response += "" 
   
    
  
    inHTML('actualizar', response);
   // update.disabled = false;
}

var reference = db.ref('Informacion/');
reference.on('value', function (datas) {
    var data = datas.val();
    $.each(data, function (nodo, value) {
        var sendData = Imprimir(value.Correo, value.Descripcion,value.Direccion,value.numero, nodo);
        inHTML("info",'');
        printHTML('info', sendData);
    });
});

if (window.addEventListener) {
    window.addEventListener("load", init, false);
}
else if (window.attachEvent) {
    window.attachEvent("onload", init);
}