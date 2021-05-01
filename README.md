# JS44CRMCrudconRESTyAsyncAwait
JS 44. PROYECTO CRM Crud con REST y Async Await
* 1. Creando una API con JSON Server
* 2. Validación para Crear Nuevos Clientes
* 3. Mostrar un mensaje si no se pasa la validación
* 4. Enviar una Petición POST al servidor con el nuevo cliente
* 5. Listar los clientes de la API
* 6. Eliminar Clientes de la API
* 7. Obtener un Cliente para Editar
* 8. Guardar Cambios del Cliente a Editar

API.js
```javascript

// 1 - Instalar node.js. ver la versión: node -v y ver la versión de npm digitar: npm -v
// 2 - Instalar json-server a través de npm. En la consola: npm i -g json-server
// 3 - -g indica instalación global. 

// Al terminar la instalación indicará:
// added 178 packages, and audited 179 packages in 11s
// 13 packages are looking for funding
//   run `npm fund` for details
// found 0 vulnerabilities

// 4 - json-server: Es una herramienta que proporciona un servidor json de descanso simulado en un minuto.
// Tener una maqueta del servicio Rest Web en su lugar, para obtener los datos de demostración.
// JSON Server es un módulo de node que puede utilizar para crear un servicio web de demostración
//  Todo lo que necesita es un archivo JSON para utilizarlo.

//  json-server genera automaticamente id y numeros 

// 5 - En la consola ir a la carpeta. cd arrastrar y soltar la carpeta. Escribir json-server db.json -p 4000 
// 6 - Done. http://localhost:4000/clientes entrega la dirección
// 7 - Detener la ejecución ctrl + c
// 8 - CRUD Create Read Update Delete
// 9 - module import y export
// 10- API.js interacciones
// 11- editar cliente y nuevo cliente tiene validación. Se encuentra en funciones.js
// 12 - funciones para poder reutilizar en dif. archivos
// 13 - API REST full ¿De qué trata? REST (Representational State Transfer) 
// 13.1 - Una API(Application Programming Interface) de transferencia de estado representacional (REST), o API de RESTful, es una interfaz de programación de aplicaciones que se ajusta a los límites de la arquitectura REST.
// 13.2 - Un servicio REST no es una arquitectura software, sino un conjunto de restricciones que tener en cuenta en la arquitectura software que usaremos para crear aplicaciones web respetando HTTP.
// 13.3 - Las restricciones que definen a un sistema RESTful serían:
// Cliente-servidor, sin estado, cacheable, interfaz uniforme, sistemas de capas.
// Métodos en una API REST: 
// GET: es usado para recuperar un recurso.
// POST: para crear un nuevo recurso. También puede usarse para enviar datos a un recurso que ya existe para su procesamiento.
//  En este segundo caso, no se crearía ningún recurso nuevo. 
// PUT: crear o editar un recurso. En el cuerpo de la petición irá la representación completa del recurso. 
// En caso de existir, se reemplaza, de lo contrario se crea el nuevo recurso. 
// PATCH: realiza actualizaciones parciales. En el cuerpo de la petición se incluirán los cambios a realizar en el recurso.
// Puede ser más eficiente en el uso de la red que PUT ya que no envía el recurso completo.
// DELETE: se usa para eliminar un recurso.
// HEAD funciona igual que GET pero no recupera el recurso. Se usa sobre todo para testear si existe el recurso antes
// de hacer la petición GET para obtenerlo (un ejemplo de su utilidad sería comprobar si existe un fichero o recurso 
// de gran tamaño y saber la respuesta que obtendríamos de la API REST antes de proceder a la descarga del recurso).
// OPTIONS: permite al cliente conocer las opciones o requerimientos asociados a un recurso antes de iniciar
//  cualquier petición sobre el mismo.
// 13.4 - Métodos seguros: Son aquellos que no modifican recursos (GET HEAD OPTIONS)
// 13.5 . Métodos idempotentes: Serían aquellos que se pueden llamar varias veces obteniendo el mismo
//  resultado (GET, PUT, DELETE, HEAD y OPTIONS).
// 13.5 - La idempotencia es de mucha importancia ya que permite que la API sea tolerante a fallos.
// 14 - Características de una API REST
// 14.1 - El uso de hipermedios: Para permitir al usuario navegar por los distintos recursos de una API REST a través de enlaces HTML 
// 14.2 - Independencia de lenguajes: La separación en capas de la API permite que el cliente se despreocupe del lenguaje en que esté 
// implementado el servidor. Basta a ambos con saber que las respuestas se recibirán en el lenguaje de intercambio 
// usado (que será XML o JSON).
// 14.3 -  APIs deben manejar cualquier error que se produzca: Devolviendo la información de error adecuada al cliente.
//  Por ejemplo, en el caso de que se haga una petición GET sobre un recurso inexistente, la API devolvería un código de error HTTP 404.
// graphql otra alternativa a rest api


// 5. Listar los clientes de la API. Trabajar con el index.html

import { obtenerClientes, eliminarCliente } from './API.js';

(function(){
    //Selector <tbody id="listado-clientes"
    const listado = document.querySelector('#listado-clientes');
    
    // Una vez cargado el HTML
    document.addEventListener('DOMContentLoaded', mostrarClientes);

    // click en cualquier zona de listado se activa
    listado.addEventListener('click', confirmarEliminar);

    // Clientes entregará Promise pending. ¿por que? Debido a que la función se ejecuta una vez cargado HTML, pero obtenerClientes
    //  aún no tiene datos, es decir, aún no se completa el Promise de Fetch para descargar todos los clientes.
    // Pero se puede detener la ejecución del código mostrarClientes con async await. Por tanto espera a obtenerClientes
    // Al cambiar a async await el resultado del console.log(clientes) será un Array 
    async function mostrarClientes() {
        const clientes = await obtenerClientes();//espera y luego se ejecuta el sgte código
        console.log(clientes);
        clientes.forEach(cliente => {
            // destructuring
            const { nombre, email, telefono, empresa, id} = cliente; 
            // Scripting
            const row = document.createElement('tr');
            
            row.innerHTML += `
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                <p class="text-sm leading-10 text-gray-700"> ${email} </p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                <p class="text-gray-700">${telefono}</p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                <p class="text-gray-600">${empresa}</p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
            </td>
            `;

            listado.appendChild(row);        
        });        
    }

    // e debido al delegation. Es para saber a que le damos click
    // 7. Prevenir Event Bubbling con Delegation
    // 6. Eliminar Clientes de la API
    function confirmarEliminar(e) {
        //En #listado-clientes, revisar si existe la clase eliminar
        if(e.target.classList.contains('eliminar')) {
            console.log('Diste click en eliminar');
             // notar data-cliente="${id}", esto para leer el registro y saber a que le dimos click
             const clienteId = e.target.dataset.cliente; // valor dataset-cliente
             console.log(clienteId);
             const confirmar = confirm('¿Deseas eliminar este registro?');

             if (confirmar) {
                 console.log('Eliminando...', clienteId); 
                 eliminarCliente(clienteId);
             }
        }
    }
 
    // Extracción del cliente que se editará y segundo guardar los cambios
   
})();
```
API.js
```javascript
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
```


