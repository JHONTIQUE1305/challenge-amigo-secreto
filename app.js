// Lista para almacenar los nombres de los amigos
let amigos = JSON.parse(localStorage.getItem('amigos')) || [];

// Función para mostrar mensajes temporales
function mostrarMensaje(texto) {
    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.textContent = texto;
    mensajeDiv.style.display = 'block';
    setTimeout(() => {
        mensajeDiv.style.display = 'none';
    }, 3000);
}

// Función para agregar un amigo a la lista
function agregarAmigo() {
    const input = document.getElementById('amigo');
    const nombre = input.value.trim();

    if (nombre === '') {
        mostrarMensaje('Por favor, escribe un nombre válido.');
        return;
    }

    if (amigos.includes(nombre)) {
        mostrarMensaje('Este nombre ya está en la lista.');
        return;
    }

    amigos.push(nombre);
    localStorage.setItem('amigos', JSON.stringify(amigos));
    actualizarListaAmigos();
    input.value = '';
}

// Función para actualizar la lista de amigos en el HTML
function actualizarListaAmigos() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';

    amigos.forEach(amigo => {
        const li = document.createElement('li');
        li.innerHTML = `${amigo} <button class="button-delete" onclick="eliminarAmigo('${amigo}')">Eliminar</button>`;
        lista.appendChild(li);
    });
}

// Función para eliminar un amigo de la lista
function eliminarAmigo(nombre) {
    amigos = amigos.filter(amigo => amigo !== nombre);
    localStorage.setItem('amigos', JSON.stringify(amigos));
    actualizarListaAmigos();
}

// Función para sortear los amigos secretos
function sortearAmigo() {
    if (amigos.length < 2) {
        mostrarMensaje('Necesitas al menos 2 amigos para sortear.');
        return;
    }

    // Crear una copia de la lista para asignar
    let asignados = [...amigos];
    let sorteo = {};

    // Intentar asignar hasta que sea válido (nadie se asigna a sí mismo)
    let intentos = 0;
    let valido = false;

    while (!valido && intentos < 100) {
        valido = true;
        asignados = [...amigos].sort(() => Math.random() - 0.5);

        for (let i = 0; i < amigos.length; i++) {
            if (amigos[i] === asignados[i]) {
                valido = false;
                break;
            }
        }
        intentos++;
    }

    if (!valido) {
        mostrarMensaje('No se pudo realizar un sorteo válido. Intenta de nuevo.');
        return;
    }

    // Crear el objeto de sorteo
    amigos.forEach((amigo, index) => {
        sorteo[amigo] = asignados[index];
    });

    // Mostrar los resultados
    mostrarResultados(sorteo);
}

// Función para mostrar los resultados del sorteo
function mostrarResultados(sorteo) {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';

    Object.keys(sorteo).forEach(amigo => {
        const li = document.createElement('li');
        li.textContent = `El amigo secreto de ${amigo} es ${sorteo[amigo]}`;
        resultado.appendChild(li);
    });
}

// Función para resetear el juego
function resetearJuego() {
    amigos = [];
    localStorage.removeItem('amigos');
    actualizarListaAmigos();
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('amigo').value = '';
    document.getElementById('mensaje').style.display = 'none';
}

// Event listener para añadir amigo al presionar Enter
document.getElementById('amigo').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        agregarAmigo();
    }
});

// Cargar la lista al iniciar
actualizarListaAmigos();
