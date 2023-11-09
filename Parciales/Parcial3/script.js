document.getElementById('rowForm').addEventListener('submit', function(event) { // Agrega un escuchador de eventos al formulario
    event.preventDefault();
    const rowCount = document.getElementById('rowCount').value; // Obtiene el número de filas ingresado por el usuario
    if(rowCount >= 1 && rowCount <= 50) { // Verifica que el número de filas esté entre 1 y 50
        generatePyramid(rowCount); // Genera la pirámide
        const container = document.querySelector('.container'); // Obtiene el contenedor de la pirámide
        findMaxPath(container); // Encuentra el camino con el mayor peso
        highlightMaxPath(container); // Resalta el camino con el mayor peso
    } else {
        alert('Ingrese un número válido entre 1 y 50'); 
    }
});

document.getElementById('reiniciar').addEventListener('click', function(event) { 
    event.preventDefault(); 
    document.getElementById('rowCount').value = ''; // Limpia el campo de entrada
    document.getElementById('resultado').innerHTML = ''; // Limpia el resultado
    document.getElementById('lista').innerHTML = ''; // Limpia la lista

    const container = document.querySelector('.container'); // Obtiene el contenedor de la pirámide
    container.innerHTML = ''; // Limpia la pirámide
});

function generatePyramid(rowCount) { // Genera la pirámide
    const container = document.querySelector('.container'); // Obtiene el contenedor de la pirámide
    container.innerHTML = ''; // Limpia la pirámide

    for (let i = 1; i <= rowCount; i++) { // Crea las filas
        const row = document.createElement('div'); // Crea una fila
        row.classList.add('row'); // Agrega la clase 'row' a la fila
        for (let j = 1; j <= i; j++) { // Crea los cuadros
            var random_n = Math.floor(Math.random() * 100); // Genera un número aleatorio entre 0 y 99
            const square = document.createElement('button'); // Crea un cuadro
            square.classList.add('square'); // Agrega la clase 'square' al cuadro
            square.textContent = random_n; // Agrega el número aleatorio al cuadro
            row.appendChild(square); // Agrega el cuadro a la fila
        }
        container.appendChild(row); // Agrega la fila al contenedor
    }
}

function findMaxPath(pyramid) { // Encuentra el camino con el mayor peso
    const rows = pyramid.querySelectorAll('.row'); // Obtiene todas las filas de la pirámide
    const pyramidArray = []; // Almacena la pirámide como una matriz bidimensional de números

    // Convierte la pirámide en una matriz bidimensional de números
    for (let i = 0; i < rows.length; i++) { // Recorre todas las filas
        const squares = rows[i].querySelectorAll('.square'); // Obtiene todos los cuadros de la fila actual
        pyramidArray.push(Array.from(squares).map(square => parseInt(square.textContent))); // Convierte los cuadros en números y los agrega a la matriz
    }

    // Comienza desde la segunda fila hacia arriba y actualiza los valores máximos en cada celda
    for (let i = pyramidArray.length - 2; i >= 0; i--) { 
        for (let j = 0; j < pyramidArray[i].length; j++) {
            pyramidArray[i][j] += Math.max(pyramidArray[i + 1][j], pyramidArray[i + 1][j + 1]); // Actualiza el valor máximo en la celda actual
        }
    }

    // Ahora, construye el camino con el mayor peso
    const path = []; // Almacena el camino con el mayor peso
    let columnIndex = 0; // Comenzamos en el primer cuadro de la primera fila

    for (let i = 0; i < pyramidArray.length; i++) { // Recorre todas las filas
        path.push(columnIndex); // Agrega el índice del cuadro actual al camino
        if (i < pyramidArray.length - 1) { // En todas las filas excepto la última, elige el cuadro adyacente con el mayor peso
            // En todas las filas excepto la última, elige el cuadro adyacente con el mayor peso
            if (pyramidArray[i + 1][columnIndex] > pyramidArray[i + 1][columnIndex + 1]) {
                columnIndex = columnIndex; // No cambia de columna
            } else {
                columnIndex = columnIndex + 1; // Mueve a la siguiente columna
            }
        }
    }

    // Resalta el camino con el mayor peso
    highlightMaxPath(pyramid, path);

    // El valor máximo estará en la cima de la pirámide
    return pyramidArray[0][0];
}

function highlightMaxPath(pyramid, path) { // Resalta el camino con el mayor peso
    const rows = pyramid.querySelectorAll('.row'); // Obtiene todas las filas de la pirámide
    let currentRow = 0;
    let cantidad_final = 0;
    let nuevo = [];

    for (const row of rows) { // Recorre todas las filas
        const squares = row.querySelectorAll('.square'); // Obtiene todos los cuadros de la fila actual
        const index = path[currentRow]; // Obtiene el índice del cuadro actual

        for (let i = 0; i < squares.length; i++) { // Recorre todos los cuadros de la fila actual
            if (i === index) { // Si el cuadro actual es el cuadro en el camino
                squares[i].style.backgroundColor = 'yellow'; // Resalta el cuadro en el camino
                cantidad_final += parseInt(squares[i].textContent); // Suma el valor del cuadro al total
                nuevo.push(squares[i].textContent); // Agrega el valor del cuadro a la lista
            } else {
                squares[i].style.backgroundColor = ''; // Restablece el color de fondo
            }
        }
        currentRow++; // Mueve a la siguiente fila
    }

    let resultado = document.getElementById('resultado'); // Obtiene el elemento con el id 'resultado'
    resultado.innerHTML = 'Resultado: ' + cantidad_final; // Muestra el total
    mostrarLista(nuevo); // Muestra la lista
}

function mostrarLista(valor) { // Muestra la lista
    let lista = document.getElementById('lista'); // Obtiene el elemento con el id 'lista'
    lista.innerHTML = ''; // Limpia la lista
    for (let i = 0; i < valor.length; i++) {  // Recorre todos los elementos de la lista
        let li = document.createElement('div'); // Crea un elemento de lista
        li.innerHTML = valor[i]; // Agrega el valor del elemento a la lista
        lista.appendChild(li); // Agrega el elemento a la lista
}
}