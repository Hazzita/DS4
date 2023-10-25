function verResultado() {
    let inicial = document.getElementById('inicial').value;
    let final = document.getElementById('final').value;

    if (inicial == "" || final == "") {
        alert("Ingrese los valores");
        return;
    }

    let resultado = valorAleatorio(parseFloat(inicial), parseFloat(final));

    let resultadoBinario = valorBinario(resultado);

    console.log("El numero aleatorio es: " + resultado + " en binario es: " + resultadoBinario);
}

function valorAleatorio(inicial, final) {
    const numeroAleatorio = Math.random() * (final - inicial) + inicial;

    return Math.floor(numeroAleatorio);
}

function valorBinario(numero) {
    let binario = "";
    let residuo = 0;

    while (numero >= 2) {
        residuo = numero % 2;
        numero = Math.floor(numero / 2);
        binario = residuo + binario;
    }

    binario = numero + binario;

    return binario;
}
