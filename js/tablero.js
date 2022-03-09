
let tamano = localStorage.getItem('tam');

// ****** Variables  ******

var iniciar = false; 
var acumularTiempo = 0;
let tamano_tablero = tamano;


// ****** Para comparar el orden de los números
let tablero_3x3 = [1,2,3,4,5,6,7,8,0];
let tablero_4x4 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];


// Matriz correcta para comparar
let tablero_3 = [[1,2,3], [4,5,6], [7,8,0]];
let tablero_4 = [[1,2,3,4], [5,6,7,8], [9,10,11,12], [13,14,15,0]];

// ***** Respaldo del orden correcto de los números
let respaldo_tamano_tablero_3;
let respaldo_tamano_tablero_4;

// ***** USANDO 
let respaldo_tamano_tablero_3x3 = [[0,0,0], [0,0,0], [0,0,0]];
let respaldo_tamano_tablero_4x4 = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]];


const usuario = localStorage.getItem('usuario');

let mostrar_usuario = document.getElementById("mostrar_usuario");

mostrar_usuario.innerHTML = `:  ${usuario}`;


let numero_movimientos = 0;

// ****** Cronometro  ******

window.onload = function() {
    pantalla = document.getElementById("screen");

    iniciar_tablero(tamano_tablero);

    
}


 
// Funciones
function inicio () {
    if (iniciar == false) { 
        tiempoInicial = new Date();
        control = setInterval(cronometro,10);
        iniciar = true;
    }
    document.getElementById('boton_inicio').classList.add('disabled');
    document.getElementById('boton_inicio').setAttribute("disabled", "");
    document.getElementById('boton_pausar').classList.remove('disabled');
    document.getElementById('boton_pausar').removeAttribute('disabled');
    document.getElementById('boton_seguir').classList.add('disabled');
    document.getElementById('boton_seguir').setAttribute("disabled", "");
    document.getElementById('boton_resetear').classList.add('disabled');
    document.getElementById('boton_resetear').setAttribute("disabled", "");

    rellenar_tablero(tamano_tablero);
}

function cronometro () { 
    tiempoActual = new Date();
    acumularTiempo = tiempoActual - tiempoInicial;
    acumularTiempo2 = new Date();
    acumularTiempo2.setTime(acumularTiempo); 
    cc = Math.round(acumularTiempo2.getMilliseconds()/10);
    ss = acumularTiempo2.getSeconds();
    mm = acumularTiempo2.getMinutes();
    hh = acumularTiempo2.getHours()-18;
          
    if (ss < 10) {
        ss = "0"+ss;
    } 
    if (mm < 10) {
        mm = "0"+mm;
    }
    if (hh < 10) {
        hh = "0"+hh;
    }
    pantalla.innerHTML = hh+" : "+mm+" : "+ss;
}
 
 function detener () { 
    if (iniciar == true) {
        clearInterval(control);
        iniciar = false;

        document.getElementById('boton_inicio').classList.add('disabled');
        document.getElementById('boton_inicio').setAttribute("disabled", "");
        document.getElementById('boton_pausar').classList.add('disabled');
        document.getElementById('boton_pausar').setAttribute("disabled", "");
        document.getElementById('boton_seguir').classList.remove('disabled');
        document.getElementById('boton_seguir').removeAttribute('disabled');
        document.getElementById('boton_resetear').classList.remove('disabled');
        document.getElementById('boton_resetear').removeAttribute('disabled');
    }   
}      
 
 function volver () {
    if (iniciar == false) {
        tiempoActual2 = new Date();
        tiempoActual2 = tiempoActual2.getTime();
        acumularResume = tiempoActual2-acumularTiempo;
             
        tiempoInicial.setTime(acumularResume);
        control = setInterval(cronometro,10);
        iniciar = true;

        document.getElementById('boton_inicio').classList.add('disabled');
        document.getElementById('boton_inicio').setAttribute("disabled", "");
        document.getElementById('boton_pausar').classList.remove('disabled');
        document.getElementById('boton_pausar').removeAttribute('disabled');
        document.getElementById('boton_seguir').classList.add('disabled');
        document.getElementById('boton_seguir').setAttribute("disabled", "");
        document.getElementById('boton_resetear').classList.add('disabled');
        document.getElementById('boton_resetear').setAttribute("disabled", "");
    }     
}
 
 function reiniciar () {
    if (iniciar == true) {
        clearInterval(control);
        iniciar = false;
    }

    document.getElementById('boton_inicio').classList.remove('disabled');
    document.getElementById('boton_inicio').removeAttribute('disabled');
    document.getElementById('boton_pausar').classList.add('disabled');
    document.getElementById('boton_pausar').setAttribute("disabled", "");
    document.getElementById('boton_seguir').classList.add('disabled');
    document.getElementById('boton_seguir').setAttribute("disabled", "");
    document.getElementById('boton_resetear').classList.add('disabled');
    document.getElementById('boton_resetear').setAttribute("disabled", "");

    acumularTiempo = 0;
    pantalla.innerHTML = "00 : 00 : 00";

    resetear(tamano_tablero);
}



// ****** Tablero  ******

function iniciar_tablero ( tamano ) {

    let cuadro_tamano

    if( tamano == 3) {
        cuadro_tamano = 'bt-3';
    } else {
        cuadro_tamano = 'bt-4';
    }

    for( let i = 0 ; i < tamano ; i++ ){

        let fila = document.createElement('div');
        fila.id = `fila-${i}`;
        fila.className = 'row  justify-content-center'
        document.getElementById('tablero_cuadro').appendChild(fila);

        let botones_grupo = document.createElement('div');
        botones_grupo.id = `grupo-${i}`;
        botones_grupo.className = 'btn-group btn-group-lg';
        document.getElementById(`fila-${i}`).appendChild(botones_grupo);

        for( let j = 0 ; j < tamano ; j++) {

            let columna = document.createElement('button');
            columna.type = 'button';
            columna.id = `${i}-${j}`;
            columna.className = `btn btn-info ${cuadro_tamano}`;
            document.getElementById(`grupo-${i}`).appendChild(columna);
            document.getElementById(columna.id).setAttribute("onclick", "revisa(this)");
        }
    }


    
}


function rellenar_tablero ( tamano ) {

    if( tamano == 3) {
        cuadro_tamano = 'bt-3';
        tablero_3x3.sort(function(a, b){return 0.5 - Math.random()});
        respaldo_tamano_tablero_3 = tablero_3x3.slice();
    } else {
        cuadro_tamano = 'bt-4';
        tablero_4x4.sort(function(a, b){return 0.5 - Math.random()});
        respaldo_tamano_tablero_4 = tablero_4x4.slice();
    }

    let count = 0;
    
    for ( let i = 0 ; i < tamano ; i++ ){

        for ( let j = 0 ; j < tamano ; j++ ){
 
            let numero = document.createElement('p');
            numero.id = 'numero_cuadro';

            if( tamano == 3 ){
                // Se agregan los valores del array (ya desordenados) en una matriz nxn
                respaldo_tamano_tablero_3x3 [i][j] = respaldo_tamano_tablero_3[count];

                if (tablero_3x3[count] == 0){
                    let boton_0  = document.getElementById(`${i}-${j}`);
                    boton_0.className = `btn btn-danger ${cuadro_tamano}`;
                } else {
                    numero.textContent = `${tablero_3x3[count]}`;
                    document.getElementById(`${i}-${j}`).appendChild(numero);
                }

            } else {

                // Se agregan los valores del array (ya desordenados) en una matriz nxn
                respaldo_tamano_tablero_4x4 [i][j] = respaldo_tamano_tablero_4[count];

                if (tablero_4x4[count] == 0){
                    let boton_0  = document.getElementById(`${i}-${j}`);
                    boton_0.className = `btn btn-danger ${cuadro_tamano}`;

                } else {
                    numero.textContent = `${tablero_4x4[count]}`;
                    document.getElementById(`${i}-${j}`).appendChild(numero);
                }
            }
            count++;
        }  
    }

    
}

function resetear ( tamano ) {

    let padre = document.getElementById('tablero_cuadro');
    while( padre.firstChild ){
        padre.removeChild(padre.firstChild);
    }

    iniciar_tablero(tamano);
    
    let movimientos = document.getElementById('screen_movimientos');
    movimientos.innerText = `0`;
    
}

function revisa ( boton_id ) {

    let id = boton_id.id; //  ${i}-${j} del boton seleccionado

    let posicion = busqueda( tamano_tablero ); //  ${i}-${j} del valor de 0

    let separar_id = id.split('-');
    let separar_posicion = posicion.split('-');

    if ( id == posicion){

        console.log("No se pude cambiar");

    } else {


        if( tamano_tablero == 3 ) {

            

            // Obteniendo el valor del cuadro y se almacena en una variable, para tenermo como respaldo para cambiarlo en la matriz
            let respaldo_valor_cuadrado = respaldo_tamano_tablero_3x3[separar_id[0]][separar_id[1]];


            console.log("valor que tiene el boton seleccionado: " + respaldo_valor_cuadrado);

            // Quita el número del boton seleccionado y cambia el color
            let cuadro = document.getElementById(`${separar_id[0]}-${separar_id[1]}`);
            cuadro.removeChild(cuadro.firstChild);
            let boton_0  = document.getElementById(`${separar_id[0]}-${separar_id[1]}`);
            boton_0.className = `btn btn-danger ${cuadro_tamano}`;
       

            // Poner el cuadro en rojo en azul (si se puede hacer el cambio)
            let numero = document.createElement('p');
            numero.id = 'numero_cuadro';
            numero.textContent = `${respaldo_valor_cuadrado}`;
            document.getElementById(`${separar_posicion[0]}-${separar_posicion[1]}`).appendChild(numero);
            boton_nuevo = document.getElementById(`${separar_posicion[0]}-${separar_posicion[1]}`);
            boton_nuevo.className = `btn btn-info ${cuadro_tamano}`;

            // Cambiando los valores en la matriz 
            respaldo_tamano_tablero_3x3[separar_posicion[0]][separar_posicion[1]] = respaldo_valor_cuadrado;
            respaldo_tamano_tablero_3x3[separar_id[0]][separar_id[1]] = 0;
            //console.log(respaldo_tamano_tablero_3x3);

            // Aumentando el contador
            numero_movimientos++;
            let movimientos = document.getElementById('screen_movimientos');
            movimientos.innerText = `${numero_movimientos}`;

            let completado = validando();

            if(completado){
                let MENSAJE = "  !!! Has Finalizado el Puzle !!!  ";;
                $("#mensaje").html(MENSAJE);
                $("#modalMensaje").modal('show');
                detener();
                reiniciar();
                
            }
        }


        if( tamano_tablero == 4 ) {
            // Obteniendo el valor del cuadro y se almacena en una variable, para tenermo como respaldo para cambiarlo en la matriz
            let respaldo_valor_cuadrado = respaldo_tamano_tablero_4x4[separar_id[0]][separar_id[1]];


            console.log("valor que tiene el boton seleccionado: " + respaldo_valor_cuadrado);

            // Quita el número del boton seleccionado y cambia el color
            let cuadro = document.getElementById(`${separar_id[0]}-${separar_id[1]}`);
            cuadro.removeChild(cuadro.firstChild);
            let boton_0  = document.getElementById(`${separar_id[0]}-${separar_id[1]}`);
            boton_0.className = `btn btn-danger ${cuadro_tamano}`;
       

            // Poner el cuadro en rojo en azul (si se puede hacer el cambio)
            let numero = document.createElement('p');
            numero.id = 'numero_cuadro';
            numero.textContent = `${respaldo_valor_cuadrado}`;
            document.getElementById(`${separar_posicion[0]}-${separar_posicion[1]}`).appendChild(numero);
            boton_nuevo = document.getElementById(`${separar_posicion[0]}-${separar_posicion[1]}`);
            boton_nuevo.className = `btn btn-info ${cuadro_tamano}`;

            // Cambiando los valores en la matriz 
            respaldo_tamano_tablero_4x4[separar_posicion[0]][separar_posicion[1]] = respaldo_valor_cuadrado;
            respaldo_tamano_tablero_4x4[separar_id[0]][separar_id[1]] = 0;
            //console.log(respaldo_tamano_tablero_3x3);

            // Aumentando el contador
            numero_movimientos++;
            let movimientos = document.getElementById('screen_movimientos');
            movimientos.innerText = `${numero_movimientos}`;

            let completado = validando();

            if(completado){
                let MENSAJE = "  !!! Has Finalizado el Puzle !!!  ";
                $("#mensaje").html(MENSAJE);
                $("#modalMensaje").modal('show');
                detener();
                reiniciar();
                
            }
        }

        
    }  
}



// Busca la posición del número 0
function busqueda () {

    if(tamano_tablero == 3 ) {
        for(let i = 0 ; i < tamano_tablero ; i++) {
            for ( let j = 0; j < tamano_tablero ; j++){
    
                if (respaldo_tamano_tablero_3x3[i][j] == 0){
                    return `${i}-${j}`;
                }
    
            }
        }
    } else {

        for(let i = 0 ; i < tamano_tablero ; i++) {
            for ( let j = 0; j < tamano_tablero ; j++){
    
                if (respaldo_tamano_tablero_4x4[i][j] == 0){
                    return `${i}-${j}`;
                }
    
            }
        }
    }
}


// Validando si esta en orden los números
function validando ( tamano ) {

    for( let i = 0 ; i < tamano_tablero ; i++ ) {
        for( let j = 0 ; j < tamano_tablero ; j++ ){

            if(tablero_3[i][j] != respaldo_tamano_tablero_3x3[i][j]){

                    return false;
            }
        }
    }
    
    return true;

}



// function cuadros_poder_mover ( posicionA, posicionB) {

//     let posicion_A = posicionA;
//     let posicion_B = posicionB;

//     if ( tamano_tablero == 3) {

//         if( posicion_A == 0 && posicion_B == 0) {

//             document.getElementById("0-2").classList.add('disabled');
//             document.getElementById("0-2").setAttribute("disabled", "");


//             document.getElementById("1-1").classList.add('disabled');
//             document.getElementById("1-1").setAttribute("disabled", "");


//             document.getElementById("1-2").classList.add('disabled');
//             document.getElementById("1-2").setAttribute("disabled", "");


//             document.getElementById("2-0").classList.add('disabled');
//             document.getElementById("2-0").setAttribute("disabled", "");


//             document.getElementById("2-1").classList.add('disabled');
//             document.getElementById("2-1").setAttribute("disabled", "");


//             document.getElementById("2-2").classList.add('disabled');
//             document.getElementById("2-2").setAttribute("disabled", "");

//         } else if( posicion_A == 2 && posicion_B == 0 ) {
            
//             document.getElementById("0-0").classList.add('disabled');
//             document.getElementById("0-0").setAttribute("disabled", "");


//             document.getElementById("0-1").classList.add('disabled');
//             document.getElementById("0-1").setAttribute("disabled", "");


//             document.getElementById("0-2").classList.add('disabled');
//             document.getElementById("0-2").setAttribute("disabled", "");


//             document.getElementById("1-1").classList.add('disabled');
//             document.getElementById("1-1").setAttribute("disabled", "");


//             document.getElementById("1-2").classList.add('disabled');
//             document.getElementById("1-2").setAttribute("disabled", "");


//             document.getElementById("2-2").classList.add('disabled');
//             document.getElementById("2-2").setAttribute("disabled", "");

//         } else if( posicion_A == 2 && posicion_B == 2 ) {
            
//             document.getElementById("0-0").classList.add('disabled');
//             document.getElementById("0-0").setAttribute("disabled", "");


//             document.getElementById("0-1").classList.add('disabled');
//             document.getElementById("0-1").setAttribute("disabled", "");


//             document.getElementById("0-2").classList.add('disabled');
//             document.getElementById("0-2").setAttribute("disabled", "");


//             document.getElementById("1-0").classList.add('disabled');
//             document.getElementById("1-0").setAttribute("disabled", "");


//             document.getElementById("1-1").classList.add('disabled');
//             document.getElementById("1-1").setAttribute("disabled", "");


//             document.getElementById("2-0").classList.add('disabled');
//             document.getElementById("2-0").setAttribute("disabled", "");
//         }

//     }
// }