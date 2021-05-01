import { obtenerCliente, editarCliente } from './API.js';
import { mostrarAlerta, validar } from './funciones.js'
// IIFE
(function() {
    // Campos del formulario
    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const telefonoInput = document.querySelector('#telefono');
    const empresaInput = document.querySelector('#empresa');
    const idInput = document.querySelector('#id');
 



    // Cargar contenido
    document.addEventListener('DOMContentLoaded', async () => {
        // Identificar que cliente estoy editando
        // http://127.0.0.1:5500/REST/editar-cliente.html?id=3
        const parametrosURL = new URLSearchParams(window.location.search);
        const idCliente = parseInt( parametrosURL.get('id'));
        console.log(idCliente);//obtener id
        // obtenerCliente(idCliente); asignar una variable para el return
        const cliente = await obtenerCliente(idCliente);
        // Marcará un error debido a que debe realizar una espera.
        // por tanto es necesario un async await
        console.log(cliente);
        mostrarCliente(cliente);
        // 8. Guardar Cambios del Cliente a Editar
        // submit al formulario
        const formulario = document.querySelector('#formulario');
        formulario.addEventListener('submit', validarCliente);
    });

    function mostrarCliente(cliente) {
        console.log(cliente);
        // Extraer con un destructuring
        const { nombre, email, telefono, empresa, id } = cliente;
        // Llenar cada selector con los datos
        nombreInput.value = nombre;
        emailInput.value = email;
        telefonoInput.value = telefono;
        empresaInput.value = empresa;
        idInput.value = id;

    }

    function validarCliente(e) {
        e.preventDefault();
        
        const cliente = {
            nombre: nombreInput.value,
            email:  emailInput.value,
            telefono: telefonoInput.value,
            empresa: empresaInput.value,
            id: parseInt(idInput.value)
        }
        console.log(cliente);
       
        if ( validar(cliente)) {
            
            mostrarAlerta('Todos los campos son obligatorios');
            return;
        }

        // Reescribe el Objeto
        editarCliente(cliente);
    }

})();