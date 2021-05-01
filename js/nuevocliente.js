// Importar función mostrarAlerta
import { mostrarAlerta, validar } from './funciones.js'
import { nuevoCliente } from './API.js'
// IIFE
(function(){
    const formulario = document.querySelector('#formulario');
    formulario.addEventListener('submit', validarCliente);

    function validarCliente(e) {
        e.preventDefault();

        // Leer los campos nombre email telefono
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;
       
        // Validar. Crear un objeto.  Luego enhance object literals
        const cliente = {
            nombre,
            email,
            telefono,
            empresa
        }

        // Leer los valores del objeto cliente
        // .every (object method) revisa una condición en todos los elementos
        console.log( !Object.values(cliente).every( input => input !== '' ) );
        //revierte los resultados con la exclamación
        //  Object.values(cliente).every( input => input === '' ) ) 
        // Si el resultado es false. Indica que al menos un input está vacío

        if ( validar(cliente)) {
            // Mostrar Mensaje
            mostrarAlerta('Todos los campos son obligatorios');
            return;
        }

        // Paso la validación. 
        // Insertar cliente en la API
        // mostrarAlerta('Si, se paso la validación');
        // https://github.com/typicode/json-server
        // ejemplo de ruta: GET    /posts/id en nuestro caso es GET  /cliente/1
        // pasar el objeto cliente a API.js - nuevoCliente(cliente)
        nuevoCliente(cliente);
    }

   
})();