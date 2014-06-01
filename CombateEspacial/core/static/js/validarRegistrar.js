function validar(){
    
    if (document.getElementById("txtNombre").value == ""){
        alert("Nombre no válido.");
        return;
    }   
    else if (document.getElementById("txtApellido").value == ""){
        alert("Apellido no válido.");
        return;
    }  
    else if (document.getElementById("txtNick").value == ""){
        alert("Nick no válido.");
        return;
    } 
    else if (document.getElementById("txtContra").value == ""){
        alert("Contraseña no válida.");
        document.getElementById("txtContra").value = "";
        document.getElementById("txtVContra").value = "";
        return;
    } 
    else if (document.getElementById("txtVContra").value == ""){
        alert("Contraseña no válida.");
        document.getElementById("txtContra").value = "";
        document.getElementById("txtVContra").value = "";
        return;
    }
    else if (document.getElementById("txtContra").value != document.getElementById("txtVContra").value){
        alert("Contraseñas desiguales.");
        document.getElementById("txtContra").value = "";
        document.getElementById("txtVContra").value = "";
        return;
    }
    else{
        document.getElementById("frmRegistrar").submit();
    }          
}
