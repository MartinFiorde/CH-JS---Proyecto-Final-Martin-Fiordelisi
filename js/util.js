import { Ejercicio, TarjetaEntrenamiento } from "./entidades.js";

// https://regexr.com/
// http://w3.unpocodetodo.info/utiles/regex-en-javascript.php
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
// https://stackoverflow.com/questions/32043294/regular-expression-for-y-yes-y-yes-1
const CONFIRMAR = (option) => (/^(?:s(?:i)?)$/i.test(option)); // la misma logica que en la linea siguiente, pero sintetico con regex
// const CONFIRMAR = (option) => (option == "s" || option == "S" || option == "si" || option == "Si" || option == "SI");

export const cargaInicialLocalStorage = () => {
    if (localStorage.getItem("listaEjercicios") == null || localStorage.getItem("listaEjercicios") == "[]") {
        let listaEjercicios = [
            new Ejercicio(0, "Ciclismo", true, "ciclismo.jpg"),
            new Ejercicio(1, "Artes marciales", false, "karate.jpg"),
            new Ejercicio(2, "Elongación", false, "elongar.jpg"),
            new Ejercicio(3, "Running", true, "correr.jpg"),
        ];
        localStorage.setItem("listaEjercicios", JSON.stringify(listaEjercicios));
    }

    if (localStorage.getItem("listaTarjetas") == null || localStorage.getItem("listaTarjetas") == "[]") {
        let option = prompt("Detectamos que no tiene entrenamientos cargados. Desea recuperar los entrenamientos guardados en memoria? s/n")
        if (CONFIRMAR(option)) {
            let listaEjercicios = ejerciciosGuardados();
            let listaTarjetasEntrenamiento = [
                new TarjetaEntrenamiento(3, listaEjercicios[0], "Dic 30", (0 * 3600000 + 39 * 60000 + 20 * 1000), 272, 187, 6.26),
                new TarjetaEntrenamiento(2, listaEjercicios[1], "Dic 23", (1 * 3600000 + 30 * 60000 + 0 * 1000), 414, 127, null),
                new TarjetaEntrenamiento(1, listaEjercicios[2], "Dic 15", (1 * 3600000 + 10 * 60000 + 30 * 1000), 398, 112, null),
                new TarjetaEntrenamiento(0, listaEjercicios[3], "Nov 28", (2 * 3600000 + 0 * 60000 + 0 * 1000), 398, 115, 13.62),
            ];
            localStorage.setItem("listaTarjetas", JSON.stringify(listaTarjetasEntrenamiento));
        } else {
            localStorage.setItem("listaTarjetas", "[]");
        }

    }
}

export const ejerciciosGuardados = () => {
    let json = JSON.parse(localStorage.getItem("listaEjercicios"));
    let listaObj = [];

    for (let i = 0; i < json.length; i++) {
        let aux = Object.assign(new Ejercicio, json[i]);
        listaObj.push(aux);
    }
    return listaObj;
}

export const tarjetasEntrenamientoGuardadas = () => {
    let json = JSON.parse(localStorage.getItem("listaTarjetas"));
    let listaObj = [];
    for (let i = 0; i < json.length; i++) {
        let aux = Object.assign(new TarjetaEntrenamiento, json[i]);
        aux.idEjercicio = Object.assign(new Ejercicio, aux.idEjercicio);
        listaObj.push(aux);
    }
    return listaObj;
}
