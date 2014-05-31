
function validar(){
    
    var contraA = document.getElementById("txtContraA");
    var contraN = document.getElementById("txtContraN");
    var contraNV = document.getElementById("txtVContraN");
    var frase = document.getElementById("txtFrase");
    
    if(contraA.value == "" || contraN.value == "" || contraNV.value == ""){
        
        alert('Llene adecuadamente los campos de contraseña');
        return;
    
    }else if(contraN.value != contraNV.value){
        
        alert('Las contraseñas no coinciden');
        contraN.value = "";
        contraNV.value = "";
        return;
    } 
    
    document.getElementById("formEditar").submit();
    
}

