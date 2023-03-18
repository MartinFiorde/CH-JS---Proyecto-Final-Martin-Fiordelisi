import { TarjetaEntrenamiento } from "./entidades.js";
import { cargaInicialLocalStorage, ejerciciosGuardados, tarjetasEntrenamientoGuardadas } from "./util.js";

cargaInicialLocalStorage();

const precargaBanner = () => {
    let banner = document.querySelector("[data-banner]");
    let select = document.querySelector("[data-tipo]");
    if (select.value != "") {
        let ejercicio = ejerciciosGuardados().find(x => x.id == select.value);
        banner.src = `../img/entrenamientos/${ejercicio.urlImagen}`;
        if (ejercicio.hasDistancia) {
            document.querySelector("[data-distancia-2]").removeAttribute("style");
            document.querySelector("[data-distancia]").removeAttribute("style");
        } else {
            document.querySelector("[data-distancia]").style.display = "none";
            document.querySelector("[data-distancia-2]").style.display = "none";
        }
    };
};

const precargaSelect = () => {
    const listaEjercicios = ejerciciosGuardados();
    let select = document.querySelector("[data-tipo]");
    listaEjercicios.forEach((aux) => {
        let option = document.createElement("option");
        option.value = aux.id;
        option.innerHTML = aux.nombre;
        select.append(option);
    });
    precargaBanner();
    select.addEventListener("change", precargaBanner);
};

const precargaDatosAModificar = async () => {
    const url = new URL(window.location);
    const idParam = url.searchParams.get("id");
    const tarjeta = await tarjetasEntrenamientoGuardadas().find(x => x.id == idParam);

    document.querySelector("[data-fecha]").addEventListener('change', function (e) { controlarError(e, "fecha") });
    document.querySelector("[data-duracion]").addEventListener('change', function (e) { controlarError(e, "duracion") });
    // document.querySelector("[data-duracion]").addEventListener('input', function (e) { autocompletarDosPuntos(e) });
    document.querySelector("[data-duracion]").addEventListener('input', autocompletarDosPuntosA); 
    document.querySelector("[data-duracion]").oninput = autocompletarDosPuntosB; 
    
    
    if (tarjeta != null) {
        document.querySelector("[data-id]").value = tarjeta.mostrarDato("id");
        document.querySelector("[data-tipo]").value = tarjeta.idEjercicio.id;
        document.querySelector("[data-fecha]").value = tarjeta.mostrarDato("fecha");
        document.querySelector("[data-duracion]").value = tarjeta.mostrarDato("duracion");
        document.querySelector("[data-calorias]").value = tarjeta.mostrarDato("calorias");
        document.querySelector("[data-cardio]").value = tarjeta.mostrarDato("frecuenciaCardiacaPromedio");
        document.querySelector("[data-distancia]").value = tarjeta.mostrarDato("distancia");
        precargaBanner();
    }
}

const autocompletarDosPuntosA = (e) => {
    if (e.target.value.length == 2) {
        e.target.value += `:`;
        document.querySelector("[data-duracion]").removeEventListener('input', autocompletarDosPuntosA);
    }
}

const autocompletarDosPuntosB = (e) => {
    if (e.target.value.length == 5) {
        e.target.value += `:`;
        document.querySelector("[data-duracion]").removeEventListener('input', autocompletarDosPuntosB);
    }
}

const controlarError = (e, codigo) => {
    document.querySelector("[data-duracion]").addEventListener('input', autocompletarDosPuntosA); 
    document.querySelector("[data-duracion]").addEventListener('input', autocompletarDosPuntosB); 
    if (codigo == "duracion") {

        // Elimina todos los caracteres no numéricos del valor de entrada
        // const valorEntrada = e.value.replace(/\D/g, '');

        // https://regexr.com/
        // http://w3.unpocodetodo.info/utiles/regex-en-javascript.php
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
        // https://stackoverflow.com/questions/32043294/regular-expression-for-y-yes-y-yes-1
        const CONFIRMAR = (option) => (/^(?:s(?:i)?)$/i.test(option)); // la misma logica que en la linea siguiente, pero sintetico con regex
        // const CONFIRMAR = (option) => (option == "s" || option == "S" || option == "si" || option == "Si" || option == "SI");

        // if ((!Number.isNaN(parseInt(e.target.value.substring(0, 2), 10)) && !Number.isNaN(parseInt(e.target.value.substring(3, 5), 10)) && !Number.isNaN(parseInt(e.target.value.substring(6, 8), 10))) ||
        if ((/^([0-1]?\d).([0-5]?\d).([0-5]?\d)$/i.test(e.target.value) && e.target.value.length == 8) || // https://stackoverflow.com/questions/8318236/regex-pattern-for-hhmmss-time-string
            e.target.value == "") {
            document.querySelector(`[data-error-${codigo}]`)?.remove();
        } else {
            !document.querySelector(`[data-error-${codigo}]`) && escribirError(codigo);
        };
    }
    if (codigo == "fecha") {
        if (e.target.value.length == 6 || e.target.value == "") {
            document.querySelector(`[data-error-${codigo}]`)?.remove();
        } else {
            if (!document.querySelector(`[data-error-${codigo}]`)) {
                escribirError(codigo);
            }
        };
    }
}

const escribirError = (codigo) => {
    const MENSAJEERROR = `El valor ingresado no es válido.`;
    let p = document.createElement("p");
    p.style.color = "red";
    p.style.padding = "0";
    p.style.margin = "0";
    p.innerHTML = `El valor ingresado no es válido.`;
    p.setAttribute(`data-error-${codigo}`, "");
    document.querySelector(`[data-${codigo}]`).parentNode.insertBefore(p, document.querySelector(`[data-${codigo}]`).nextSibling);
}

const mainFormulario = () => {
    document.querySelector("[data-form]").addEventListener("submit", (e) => {
        e.preventDefault();
        let id = document.querySelector("[data-id]").value;
        let tipo = ejerciciosGuardados().find(x => x.id == document.querySelector("[data-tipo]").value);
        let fecha = document.querySelector("[data-fecha]").value; // PENDIENTE AGREGAR LOGICA PARA REPROCESAR STRING A FORMATO DATE
        let duracion = document.querySelector("[data-duracion]").value.substring(0, 2) * 3600000 + document.querySelector("[data-duracion]").value.substring(3, 5) * 60000 + document.querySelector("[data-duracion]").value.substring(6, 8) * 1000;
        let calorias = parseInt(document.querySelector("[data-calorias]").value, 10);
        let cardio = parseInt(document.querySelector("[data-cardio]").value, 10);
        let distancia = parseFloat(parseFloat(document.querySelector("[data-distancia]").value).toFixed(2));

        if (!id) {
            const nuevaTarjeta = new TarjetaEntrenamiento(tarjetasEntrenamientoGuardadas().length, tipo, fecha, duracion, calorias, cardio, distancia);
            let listaTarjetasEntrenamiento = tarjetasEntrenamientoGuardadas();
            listaTarjetasEntrenamiento.unshift(nuevaTarjeta);
            localStorage.setItem("listaTarjetas", JSON.stringify(listaTarjetasEntrenamiento));
        } else {
            const nuevaTarjeta = new TarjetaEntrenamiento(id, tipo, fecha, duracion, calorias, cardio, distancia);
            let listaTarjetasEntrenamiento = tarjetasEntrenamientoGuardadas();
            const i = listaTarjetasEntrenamiento.findIndex(x => x.id == id);
            listaTarjetasEntrenamiento[i] = nuevaTarjeta;
            console.log(i)
            console.log(listaTarjetasEntrenamiento[i])
            localStorage.setItem("listaTarjetas", JSON.stringify(listaTarjetasEntrenamiento));
            //FALTA LOGICA PARA MODIFICAR ENTRADA EXISTENTE
        }
        window.location.href = "/pages/entrenamientos.html"

    });
}

precargaSelect();
precargaDatosAModificar();
mainFormulario();


/*
const cargarFecha = () => {
    if (typeof option.substring(0, 3) == "string" && !Number.isNaN(parseInt(option.substring(4, 6), 10))) {
        return option; // PENDIENTE AGREGAR LOGICA PARA REPROCESAR STRING A FORMATO DATE
    }
}
const cargarDuracion = () => {
    if (!Number.isNaN(parseInt(option.substring(0, 2), 10)) && !Number.isNaN(parseInt(option.substring(3, 5), 10)) && !Number.isNaN(parseInt(option.substring(6, 8), 10))) {
        return option.substring(0, 2) * 3600000 + option.substring(3, 5) * 60000 + option.substring(6, 8) * 1000;
    }
}
const cargarCalorias = () => {
    if (!Number.isNaN(parseInt(option, 10))) {
        return parseInt(option, 10);
    }
}
const cargarDistancia = (EjercicioHasDistancia) => {
    if (!EjercicioHasDistancia) {
        return null;
    } else {
        if (!Number.isNaN(parseFloat(option))) {
            return parseFloat(parseFloat(option).toFixed(2));
        }
    }
}
const cargarCardio = () => {
    if (!Number.isNaN(parseInt(option, 10))) {
        return parseInt(option, 10);
    }
}
function main() {
    option = window.prompt("Bievenido a su registro de entrenamientos! Le gustaría ingresar un nuevo entrenamiento? (s / n)");
    if (CONFIRMAR(option)) {
        let ejercicio = parseJsonToTarjetaEntrenamiento(JSON.parse(localStorage.getItem("listaTarjetas")));
        const nuevaTarjeta = new TarjetaEntrenamiento(listaTarjetasEntrenamiento.length, ejercicio, cargarFecha(), cargarDuracion(), cargarCalorias(), cargarDistancia(ejercicio.hasDistancia), cargarCardio());
        listaTarjetasEntrenamiento.unshift(nuevaTarjeta);
        let listaEntrenamientosOBJ = parseJsonToTarjetaEntrenamiento(JSON.parse(localStorage.getItem("listaTarjetas")));
    }
}
*/

