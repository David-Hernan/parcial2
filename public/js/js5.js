function ejer1(){
    const num_ejer1 = window.prompt("Ejercicio 1. Ingrese un número: ");
    console.info("Ejercicio 1: Ingresó el número: " + num_ejer1);

    //Crear la table
    let tabla_1 = "<table>";
        //Encabezado de la tabla
        tabla_1 = tabla_1 + "<thead>"+"<tr>"+"<th>n</th>"+"<th>n^2</th>"+"<th>n^3</th>"+"</tr>"+"</thead>";
        //Body
        tabla_1 = tabla_1 + "<tbody>";
            //Cálculo de potencias
            for (let i=1; i<=num_ejer1; i++){
                tabla_1 = tabla_1+"<tr>"+"<td>"+i+"</td>"+"<td>"+Math.pow(i,2)+"</td>"+"<td>"+Math.pow(i,3)+"</td>"+"</tr>";      
            }
        tabla_1 = tabla_1+"</tbody>";
    tabla_1 = tabla_1+"</table>";
    //Imprimir en toda la pantalla
    document.write(tabla_1);
    document.write("Actualice para volver");
}

function ejer2(){
    const num1 = Math.floor((Math.random()*100)+1);
    const num2 = Math.floor((Math.random()*100)+1);
    var inicio = new Date();
    const num_ejer2 = window.prompt("Ejercicio 2. Indique el resultado de la suma: "+num1+"+"+num2+"=");
    var fin = new Date();
    const diff_tiempo=(fin.getTime() - inicio.getTime())/1000;
    const tiempo_print = "Tiempo de respuesta: "+diff_tiempo+" segundos";
    if((num1+num2)==num_ejer2){
        texto="Respuesta CORRECTA"
    }else{
        texto="Respuesta INCORRECTA"
    }
    console.info(texto);
    console.info(tiempo_print);
    document.getElementById("resp_ejer2").innerHTML = texto;
    document.getElementById("resp_ejer2_b").innerHTML = tiempo_print;
}

function contador(arreglo){
    var ceros=0;
    var neg=0;
    var pos=0;
    for(let elemento of arreglo){
        if(elemento<0){
            neg++;
        }else if(elemento>0){
            pos++;
        }else{
            ceros++;
        }
    }
    const texto = "Negativos: "+neg+", Positivos: "+pos+", Ceros: "+ceros;
    document.getElementById("resp_ejer3").innerHTML = texto;
}

function ejer3_a(){
    const nums = [];
    nums.push(12);
    nums.push(34);
    nums.push(0);
    nums.push(5);
    nums.push(-5);
    nums.push(-9);
    nums.push(10);
    nums.push(0);
    nums.push(0);
    nums.push(6);

    contador(nums);
}
function ejer3_b(){
    const nums = [];
    nums.push(-40);
    nums.push(0);
    nums.push(0);
    nums.push(-7);
    nums.push(0);
    nums.push(5);
    nums.push(-5);
    nums.push(0);
    nums.push(8);
    nums.push(-100);

    contador(nums);
}

function promedios(matriz){
    const respuesta = [];
    const filas=columnas=4;
    for(let i=0; i<filas; i++){
        var acum = 0;
        for(let j=0; j<columnas; j++){
            acum+=matriz[i][j];
        }
        acum=acum/4;
        respuesta[i]=acum;
        //console.info(respuesta);
    }
    const texto = "Los promedios de cada fila son los siguientes: "+respuesta;
    document.getElementById("resp_ejer4").innerHTML = texto;
}

function ejer4_a(){
    var matrix = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16]
      ];
    
    promedios(matrix)
}

function ejer4_b(){
    var matrix = [
        [8, 24, 3, 6],
        [8, 2, 9, 45],
        [100, 99, 45, 16],
        [80, 71, 56, 78]
      ];
    
    promedios(matrix)
}

function inverso(numero){
    var inverso=0;
    var sobra;
    while(numero!=0){
        sobra=Math.floor(numero%10);
        numero=Math.floor(numero/10);
        inverso=Math.floor(inverso*10+sobra);
    }
    console.info(inverso);
    texto="El inverso es: "+inverso;
    document.getElementById("resp_ejer5").innerHTML = texto;
}

function ejer5_a(){
    numero_5=12345;
    inverso(numero_5);
}

function ejer5_b(){
    numero_5=58297;
    inverso(numero_5);
}


//Objeto
function reloj(hora,minuto,segundo){
    this.hora=hora;
    this.minuto=minuto;
    this.segundo=segundo;
    this.getHora=getHora;
    this.getMinuto=getMinuto;
    this.getSegundo=getSegundo;
    this.setHora=setHora;
    this.setMinuto=setMinuto;
    this.setSegundo=setSegundo;
}
//Getters
function getHora(){
    texto="La hora es: "+this.hora;
    document.getElementById("resp_ejer6_a").innerHTML = texto;
    return texto;
}
function getMinuto(){
    texto="El minuto es: "+this.minuto;
    document.getElementById("resp_ejer6_b").innerHTML = texto;
    return texto;
}
function getSegundo(){
    texto="El segundo es: "+this.segundo;
    document.getElementById("resp_ejer6_c").innerHTML = texto;
    return texto;
}
//Setters
function setHora(){
    this.hora++;
    if(this.hora>=24){
        this.hora=0;
    }
}
function setMinuto(){
    this.minuto++;
    if(this.minuto>=60){
        this.minuto=0;
    }
}
function setSegundo(){
    this.segundo++;
    if(this.segundo>=60){
        this.segundo=0;
    }
}

mi_reloj = new reloj(12,59,34); 
console.log(mi_reloj);

//Botones objeto
//Consultar
function ejer6_h(){
    laHora=mi_reloj.getHora();
    console.info(laHora); 
}
function ejer6_m(){
    elMin=mi_reloj.getMinuto();
    console.info(elMin);
}
function ejer6_s(){
    elSeg=mi_reloj.getSegundo();
    console.info(elSeg);
}
//Incrementar
function ejer6_hs(){
    mi_reloj.setHora();
    mi_reloj.getHora();
}
function ejer6_ms(){
    mi_reloj.setMinuto();
    mi_reloj.getMinuto();
}
function ejer6_ss(){
    mi_reloj.setSegundo();
    mi_reloj.getSegundo();
}

