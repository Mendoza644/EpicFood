var db = firebase.database();
var auth = firebase.auth();
var storageRef = firebase.storage().ref();

function init() {
    var guardar = document.getElementById("guardar");
    //  var editar = document.getElementById("edita");

    if (guardar.addEventListener) {
        guardar.addEventListener("click", onClickInsert, false);
    }
    else if (guardar.attachEvent) {
        guardar.attachEvent("onclick", onClickInsert);
    }

    /*if (editar.addEventListener) {
        editar.addEventListener("click", onClickUpdate, false);
    }
    else if (editar.attachEvent) {
        editar.attachEvent("onclick", onClickUpdate);
    }*/

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

function insertTask(imagen, lin) {
    db.ref('Imagenes/').push({
        nombre: imagen,
        direccion: lin
    });
}
function onClickInsert() {
    var imagen = value("imagen");
    var lin = value("linkb");

    if (imagen.length == 0 || lin.length == 0) {
        alert("Campos Vacios");
    } else {
        inHTML("columna", "");
        insertTask(imagen, lin);
        asignation("imagen", "");
        asignation("file", "");
        asignation("linkbox", "");
        alert("saved successfully");
    }
}


function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var file = evt.target.files[0];

    var metadata = {
        'contentType': file.type
    };

    // Push to child path.
    // [START oncomplete]
    var nom = document.getElementById("imagen").value;

    if (nom.length == 0) {
        alert("Escribe primero el nombre");
    } else {

        document.getElementById('linkbox').innerHTML = "Subiendo..... Espere un momento";
        storageRef.child("imagenes/" + nom).put(file, metadata).then(function (snapshot) {
            console.log('Uploaded', snapshot.totalBytes, 'bytes.');
            console.log('File metadata:', snapshot.metadata);
            // Let's get a download URL for the file.
            snapshot.ref.getDownloadURL().then(function (url) {
                console.log('File available at', url);
                // [START_EXCLUDE]
                document.getElementById('linkbox').innerHTML = 'Subida Completa :D';
                document.getElementById('linkb').value = url;
                // [END_EXCLUDE]
            });
        }).catch(function (error) {

            // [START onfailure]
            console.error('Upload failed:', error);
            // [END onfailure]
        });
        // [END oncomplete]
    }
}
// para guardar la imagen en el Storage de Firebase
window.onload = function () {
    document.getElementById('file').addEventListener('change', handleFileSelect, false);
    document.getElementById('file').disabled = true;

    auth.onAuthStateChanged(function (user) {
        if (user) {
            console.log('Anonymous user signed-in.', user);
            document.getElementById('file').disabled = false;
        } else {
            console.log('There was no anonymous session. Creating a new anonymous user.');
            // Sign the user in anonymously since accessing Storage requires the user to be authorized.
            auth.signInAnonymously().catch(function (error) {
                if (error.code === 'auth/operation-not-allowed') {
                    window.alert('Anonymous Sign-in failed. Please make sure that you have enabled anonymous ' +
                        'sign-in on your Firebase project.');
                }
            });
        }
    });
}
function removeTask(key, nom) {
    if (confirm("¿you want to delete task?")) {
        inHTML("columna", "");
        db.ref('Imagenes/' + key).remove();
        storageRef.child("imagenes/" + nom).delete();
    }
}

function Imprimir(imagen, link, key, conta) {



    datos = ""
    datos += " <div class='card-group'>"
    datos += "<div class='card' style='width: 18rem; margin:10px;'>"
    datos += "<img src='" + link + "'card-img-top' style='width: 100%;'>"
    datos += "<div class='card-body'>"
    datos += "<p class='card-title'>" + imagen + "</p>"
    datos += ' <a href="#" class="btn btn-primary" onclick="removeTask(\'' + key + '\',\'' + imagen + '\')" >Eliminar</a>'
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
if (window.addEventListener) {
    window.addEventListener("load", init, false);
}
else if (window.attachEvent) {
    window.attachEvent("onload", init);
}