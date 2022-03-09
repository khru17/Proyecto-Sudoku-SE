const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
let usuario;
let tamano_tablero;
const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
}

const campos = {
    usuario: false
    
}

const validarFormulario = (e) => {
    // Se hace con switch por si se necesitan validar más campos en versiones futuras
    switch(e.target.name) {
        case "usuario":
            validarCampo(expresiones.usuario, e.target, 'usuario');
        break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)){
        document.getElementById(`${campo}`).classList.add('is-valid');
        document.getElementById(`label_${campo}`).classList.add('text-success');
        document.getElementById(`${campo}`).classList.remove('is-invalid');
        document.getElementById(`label_${campo}`).classList.remove('text-danger');
        campos[campo] = true;
    } else {
        document.getElementById(`${campo}`).classList.remove('is-valid');
        document.getElementById(`label_${campo}`).classList.remove('text-success');
        document.getElementById(`${campo}`).classList.add('is-invalid');
        document.getElementById(`label_${campo}`).classList.add('text-danger');
        campos[campo] = false;
    }
}


inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    if(campos.usuario) {
        usuario = document.getElementById("usuario").value;
        localStorage.setItem('usuario', `${usuario}`);

        tamano_tablero = document.getElementById("tam").value;
        localStorage.setItem("tam", `${tamano_tablero}`);

        formulario.reset();
        window.location.href="tablero.html";
       
    } else {

    }
});

// TABLERO

console.log(usuario);
console.log(tamano_tablero);