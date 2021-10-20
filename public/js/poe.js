function colorea_rojo(){
    let elemento = document.getElementById("nombre_lab");
    elemento.style.color = "red"; 
    elemento.style.fontStyle = "italic"; 
}

function colorea_negro(){
    let elemento = document.getElementById("nombre_lab");
    elemento.style.color = "black";
    elemento.style.fontStyle = "normal";
}

function info_taxes(){
    window.alert("Los precios que aparecen no tienen IVA. El impuesto en cuestión es del 16% y aparecerá cuando los agregue al carrito.");
}

//Validador passwords ------------------------------------------------------------------------------------------------
var psswrd;
function boton_verificador(){
    var texto=document.getElementById("ingreso").value;
    var resul=true;
    longitud=texto.length;
    //Espacios en blanco
    for(var i=0;i<longitud;i++){
        if (texto.charAt(i) == " "){
            document.getElementById("verificacion").innerHTML = "La contraseña no puede tener espacios en blanco";
            resul=false;
        }
    }
    //Longitud > 8
    if(resul==true){
        if(longitud < 8){
            document.getElementById("verificacion").innerHTML = "¡Contraseña INSEGURA!. Debe tener al menos 8 caracteres."; 
            resul=false;
        }
    }
    //Números
    if(resul==true){
        var cont_num=0;
        //Buscar números
        for(var i=0;i<longitud;i++){
            if (texto.charAt(i).charCodeAt(0) >= 48 && texto.charAt(i).charCodeAt(0) <= 57){
                cont_num++;
            }
        }
        if(cont_num == 0){
            document.getElementById("verificacion").innerHTML = "¡Contraseña INSEGURA!. Debe tener números.";
            resul=false;
        }
    }
    //Minúsculas
    if(resul==true){
        var cont_min=0;
        //Buscar números
        for(var i=0;i<longitud;i++){
            if (texto.charAt(i).charCodeAt(0) >= 97 && texto.charAt(i).charCodeAt(0) <= 122){
                cont_min++;
            }
        }
        if(cont_min == 0){
            document.getElementById("verificacion").innerHTML = "¡Contraseña INSEGURA!. Debe tener letras en minúsculas.";
            resul=false;
        }
    }
    //Mayúsculas
    if(resul==true){
        var cont_may=0;
        //Buscar números
        for(var i=0;i<longitud;i++){
            if (texto.charAt(i).charCodeAt(0) >= 65 && texto.charAt(i).charCodeAt(0) <= 90){
                cont_may++;
            }
        }
        if(cont_may == 0){
            document.getElementById("verificacion").innerHTML = "¡Contraseña INSEGURA!. Debe tener letras en mayúsculas.";
            resul=false;
        }
    }
    //SpecialCaracteres
    if(resul==true){
        var cont_special=0;
        //Buscar números
        for(var i=0;i<longitud;i++){
            if (texto.charAt(i) == "-" || texto.charAt(i) == "*" || texto.charAt(i) == "?"|| texto.charAt(i) == "!"|| texto.charAt(i) == "@"|| texto.charAt(i) == "#"|| texto.charAt(i) == "$"|| texto.charAt(i) == "/"|| texto.charAt(i) == "("|| texto.charAt(i) == ")"|| texto.charAt(i) == "{"|| texto.charAt(i) == "}"|| texto.charAt(i) == "="|| texto.charAt(i) == "."|| texto.charAt(i) == ","|| texto.charAt(i) == ";"|| texto.charAt(i) == ":"){
                cont_special++;
            }
        }
        if(cont_special == 0){
            document.getElementById("verificacion").innerHTML = "¡Contraseña INSEGURA!. Debe tener caracteres especiales.";
            resul=false;
        }
    }

    //Segura
    if(resul==true){
        document.getElementById("verificacion").innerHTML = "¡Contraseña SEGURA!.";
        psswrd=texto;
    }
    
    console.log(cont_num);
}

function buscando(){
    if(document.getElementById("rep_pass").value === psswrd){
        return true;
    }else{
        return false; 
    }
}

function conf_pass(){
    if(buscando()){
        document.getElementById("verific_pass").innerHTML = "¡Las contraseñas coinciden!";
    }else{
        document.getElementById("verific_pass").innerHTML = "Las contraseñas NO coindicen";
    }
}

document.getElementById("rep_pass").onkeyup = conf_pass;
//----------------------------------------------------------------------------------------------------------------------
var num_multis=0;
var num_arduinos=0;
var num_protos=0;

function add_multi(){
    num_multis++;
    carrito(false);
}
function add_ardui(){
    num_arduinos++;
    carrito(false);
}
function add_proto(){
    num_protos++;
    carrito(false);
}
function reset_carrito() {
    num_multis=num_arduinos=num_protos=0;
    carrito(true);
}

function carrito(reset_flag) {
    var total_prev,iva,total;
    var precio_multi=0;
    var precio_arduino=0;
    var precio_protos=0;
    var text_multi,text_arduinos,text_protos,text_precios;
    if(num_multis>0 || reset_flag==true){
        console.log("Multis: " + num_multis);
        precio_multi = num_multis * 300;
        text_multi = "Multímetros: " + num_multis +", precio: $" + precio_multi;
        document.getElementById("carrimulti").innerHTML = text_multi;    
    }
    if(num_arduinos>0 || reset_flag==true){
        console.log("Arduinos: " + num_arduinos); 
        precio_arduino = num_arduinos * 179;
        text_arduinos = "Arduinos: " + num_arduinos +", precio: $" + precio_arduino;
        document.getElementById("carriarduinos").innerHTML = text_arduinos;
    }
    if(num_protos>0 || reset_flag==true){
        console.log("Protos: " + num_protos); 
        precio_protos = num_protos * 55;
        text_protos = "Protoboards: " + num_protos +", precio: $" + precio_protos;
        document.getElementById("carriprotos").innerHTML = text_protos;
    }
    total_prev = precio_multi + precio_arduino + precio_protos;
    iva = total_prev*0.16;
    total = total_prev + iva;
    text_precios = "Total sin IVA: $" +total_prev+". IVA(16%): $" +iva;
    text_precio_final = "Total a pagar: $"+total;
    document.getElementById("precios").innerHTML = text_precios;
    document.getElementById("precio_final").innerHTML = text_precio_final;
    reset_flag=false;
}

