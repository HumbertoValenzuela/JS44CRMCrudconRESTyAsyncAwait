// Activar json-server db.json -p 4000
const url = 'http://localhost:4000/clientes';

// Crear nuevo Cliente
export const nuevoCliente = async cliente => {
    console.log(cliente);// ver comunicación con nuevoCliente.js y extrae el objeto 

    // Agregar datos
    try {
        // por default fetch tiene un get. En este caso es post
        // objeto de config.
        await fetch(url, {
            method: 'POST',
            //Se envia de 2 formas string o objeto
            body: JSON.stringify( cliente ), //Este caso de objeto cliente a string
            // De que tipo de dato se envía, en este caso es json
            headers:{
                'Content-Type': 'application/json'
            }
        })
        // Se completa la acción. Enviar a index
        window.location.href = 'index.html';
    } catch (error) {
        console.log(error);
    }
}

// Obtiene todos los clientes
export const obtenerClientes = async () => {
    try {
        const resultado = await fetch(url);//Por default fetch envía un GET
        const clientes = await resultado.json();
        return clientes;// retornar para consumir los datos en otro archivo
    } catch (error) {
        console.log(error);
    }
}

// 6. Eliminar Clientes de la API
// Importar función en la app.js
export const eliminarCliente = async clienteId => {
    try {
        await fetch (`${url}/${clienteId}`, { 
            method: 'DELETE'   
        })
    } catch (error) {
        console.log(error);
    }
}

// Obtener un cliente por su ID
export const obtenerCliente = async id => {
    try {
        const resultado = await fetch(`${url}/${id}`);
        const cliente = await resultado.json();
        console.log(cliente);
        return cliente; //retornar objeto cliente
        // si se realiza un return entonces se debe asignar a una variable
    } catch (error) {
        console.log(error);
    }
}

// Actualiza un registro
// Los principios de REST es que actualizar tiene que ser similar a un eliminar
// es decir, poner la url y el id
export const editarCliente = async cliente => {
    console.log(cliente);// contiene el objeto modificado
    try {
        await fetch(`${url}/${cliente.id}`, {
            method: 'PUT',
            body: JSON.stringify(cliente),//para pasar todos los datos
            headers: {'Content-Type': 'application/json'}
        })
        window.location.href = 'index.html';
    } catch (error) {
        console.log(error);
        mostrarAlerta(error);
    }
}