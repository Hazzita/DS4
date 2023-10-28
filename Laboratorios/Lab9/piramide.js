function crearPiramides() {
    const divPiramide = document.getElementById('div-piramide');
    const form = new FormData(document.getElementById('form-piramide'));
    const piramide = parseInt(form.get('cantidad-piramide'));

    divPiramide.innerHTML = '';

    let nivel = 1;
    let contador = 1;

    for (let i = 0; i < piramide; i++) {
        const bloque = document.createElement('div');
        bloque.classList.add('bloque');

        for (let j = 0; j < nivel; j++) {
            const nivelDiv = document.createElement('div');
            nivelDiv.classList.add(`piramide-${contador}`);
            bloque.appendChild(nivelDiv);
            contador++;
        }

        divPiramide.appendChild(bloque);
        nivel++;
    }

    return false;
}
