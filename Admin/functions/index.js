const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) =>{
    if(context.auth.token.admin !== true){
        return {error:'♥ Solo los administradores pueden agregar otros Administradores'};
    }
   
    return admin.auth().getUserByEmail(data.email).then(user =>{
        return admin.auth().setCustomUserClaims(user.uid,{
            admin:true
        });
    })
    .then(()=>{
        return {message:`Exitoso ${data.email} el usuario es ahora administrador`};
    })
    .catch(err =>{
        return err;
    });
});
