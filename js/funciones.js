export function mostrarAlerta(mensaje) {

    // Revisar por una alerta previa
    const alerta = document.querySelector('.bg-red-100');

    if (!alerta) {//Si no esta la clase
        // Scripting
        const alerta = document.createElement('p');

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `
            <strong class="font-bold">¡error!</strong>
            <span class="block sm:inline">${mensaje}</span>
        `;

        // Elemento formulario para insertar el html
        const formulario = document.querySelector('#formulario');
        formulario.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

export function validar(obj) { //objeto cliente
    return !Object.values(obj).every( input => input !== '');
}