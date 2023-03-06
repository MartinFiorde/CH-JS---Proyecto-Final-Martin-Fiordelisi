let option;
let monto;
let tasa;
let plazo;

mainBucle:
do {
    monto = parseInt(prompt("Ingrese el monto a depositar"));

    if (!Number.isInteger(monto) || monto <= 0) {
        option = window.prompt("El monto debe ser un valor válido. Quiere intentar nuevamente? (si / no)");
        continue mainBucle;
    }
    plazo = parseInt(prompt("Ingrese el plazo a depositar.\n Nuestras tasas de interes mensuales son:\n 10% desde los 30 dias\n 15% desde los 60 dias\n 20% desde los 180 dias"));

    // use un switch que espere un booleano true en vez de esperar "cases" especificos, 
    // y hago condicionales en cascada en cada case, para poder abarcar un rango de opciones en cada case
    switch (true) {
        case (plazo >= 30 && plazo < 60):
            tasa = 10;
            break;

        case (plazo >= 60 && plazo < 180):
            tasa = 15;
            break;

        case (plazo >= 180 && plazo <= 360):
            tasa = 20;
            break;

        default:
            option = window.prompt("El plazo ingresado debe ser de entre 30 y 360 días. Quiere intentar nuevamente? (si / no)")
            continue mainBucle;
    }

    respuesta();
    option = prompt(`Felicidades! Han terminado los ${plazo} días y se le han acreditado $${calcular()} pesos. \nDesea realizar un nuevo depósito? (si / no)`);
} while (option == "si" || option == "s");


function respuesta() {

    return window.alert(`Ha depositado $${monto} pesos por el plazo de ${plazo} días. \nRecibirá al final del plazo un monto total de $${calcular()}`);
}

function calcular() {
    return Math.round((monto + monto * (tasa / 100 * plazo / 30)) * 100) / 100;
}