// Lista para almacenar los nombres de los amigos
let amigos = [];

// Función para agregar un amigo a la lista
function agregarAmigo() {
    const input = document.getElementById('amigo');
    const nombre = input.value.trim();

    if (nombre === '') {
        alert('Por favor, escribe un nombre válido.');
        return;
    }

    if (amigos.includes(nombre)) {
        alert('Este nombre ya está en la lista.');
        return;
    }

    amigos.push(nombre);
    actualizarListaAmigos();
    input.value = '';
}

// Función para actualizar la lista de amigos en el HTML
function actualizarListaAmigos() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';

    amigos.forEach(amigo => {
        const li = document.createElement('li');
        li.textContent = amigo;
        lista.appendChild(li);
    });
}

// Función para sortear los amigos secretos
function sortearAmigo() {
    if (amigos.length < 2) {
        alert('Necesitas al menos 2 amigos para sortear.');
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
        alert('No se pudo realizar un sorteo válido. Intenta de nuevo.');
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

// Event listener para añadir amigo al presionar Enter
document.getElementById('amigo').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        agregarAmigo();
    }
});
