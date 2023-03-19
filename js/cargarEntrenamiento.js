import { TarjetaEntrenamiento } from "./entidades.js";
import { cargaInicialLocalStorage, ejerciciosGuardados, tarjetasEntrenamientoGuardadas } from "./util.js";

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
    document.querySelector("[data-fecha]").addEventListener('change', (e) => controlarError(e, "fecha", `Debe ingresar una fecha con el formato del ejemplo`));
    document.querySelector("[data-duracion]").addEventListener('change', (e) => controlarError(e, "duracion", `Debe ingresar la información completa`));
    document.querySelector("[data-distancia]").addEventListener('input', (e) => controlarError(e, "distancia", `Debe ingresar un valor numérico`));
    document.querySelector("[data-duracion]").onkeydown = autocompletarDosPuntos;
}

const autocompletarDosPuntos = (e) => {
    if (e.code.includes("Digit") && (e.target.value.length == 1 || e.target.value.length == 4)) {
        e.preventDefault();
        e.target.value += `${e.key.substring(0, 1)}:`;
    }
    if ((e.keyCode == 8) && (e.target.value.length == 3 || e.target.value.length == 6)) {
        e.preventDefault();
        e.target.value = e.target.value.substring(0, e.target.value.length - 2);
    }
    if (e.code.includes("Key")) {
        !document.querySelector(`[data-error-${"duracion"}]`) && escribirError("duracion", `Solo se permite ingresar carácteres numéricos`);
        e.preventDefault();
    } else {
        document.querySelector(`[data-error-${"duracion"}]`)?.remove();
    };
}

const controlarError = (e, codigo, texto) => {
    if (codigo == "duracion") {
        // if ((!Number.isNaN(parseInt(e.target.value.substring(0, 2), 10)) && !Number.isNaN(parseInt(e.target.value.substring(3, 5), 10)) && !Number.isNaN(parseInt(e.target.value.substring(6, 8), 10))) ||
        if ((/^([0-1]?\d).([0-5]?\d).([0-5]?\d)$/i.test(e.target.value) && e.target.value.length == 8) || // https://stackoverflow.com/questions/8318236/regex-pattern-for-hhmmss-time-string
            e.target.value == "") {
            document.querySelector(`[data-error-${codigo}]`)?.remove();
        } else {
            !document.querySelector(`[data-error-${codigo}]`) && escribirError(codigo, texto);
        };
    }
    if (codigo == "fecha") {
        if (e.target.value.length == 6 || e.target.value == "") {
            document.querySelector(`[data-error-${codigo}]`)?.remove();
        } else {
            if (!document.querySelector(`[data-error-${codigo}]`)) {
                escribirError(codigo, texto);
            }
        };
    }
    if (codigo == "distancia") {
        if (!isNaN(parseFloat(e.target.value)) || e.target.value == "") {
            document.querySelector(`[data-error-${codigo}]`)?.remove();
        } else {
            !document.querySelector(`[data-error-${codigo}]`) && escribirError(codigo, texto);
        };
    }
}

const escribirError = (codigo, texto) => {
    let p = document.createElement("p");
    p.style.color = "red";
    p.style.padding = "0";
    p.style.margin = "0";
    p.innerHTML = texto;
    p.setAttribute(`data-error-${codigo}`, "");
    document.querySelector(`[data-${codigo}]`).parentNode.insertBefore(p, document.querySelector(`[data-${codigo}]`).nextSibling);
}

const enviarFormulario = (e) => {
    e.preventDefault();
    let id = document.querySelector("[data-id]").value;
    let tipo = ejerciciosGuardados().find(x => x.id == document.querySelector("[data-tipo]").value);
    let fecha = document.querySelector("[data-fecha]").value; // PENDIENTE AGREGAR LOGICA PARA REPROCESAR STRING A FORMATO DATE
    let duracion = document.querySelector("[data-duracion]").value.substring(0, 2) * 3600000 + document.querySelector("[data-duracion]").value.substring(3, 5) * 60000 + document.querySelector("[data-duracion]").value.substring(6, 8) * 1000;
    let calorias = parseInt(document.querySelector("[data-calorias]").value, 10);
    let cardio = parseInt(document.querySelector("[data-cardio]").value, 10);
    let distancia = parseFloat(parseFloat(document.querySelector("[data-distancia]").value).toFixed(2));
    if (id) {
        const nuevaTarjeta = new TarjetaEntrenamiento(id, tipo, fecha, duracion, calorias, cardio, distancia);
        let listaTarjetasEntrenamiento = tarjetasEntrenamientoGuardadas();
        const i = listaTarjetasEntrenamiento.findIndex(x => x.id == id);
        listaTarjetasEntrenamiento[i] = nuevaTarjeta;
        localStorage.setItem("listaTarjetas", JSON.stringify(listaTarjetasEntrenamiento));
        window.location.href = `../pages/ver-entrenamiento.html?id=${id}`;
    } else {
        const nuevaTarjeta = new TarjetaEntrenamiento(tarjetasEntrenamientoGuardadas()[0].id + 1, tipo, fecha, duracion, calorias, cardio, distancia);
        let listaTarjetasEntrenamiento = tarjetasEntrenamientoGuardadas();
        listaTarjetasEntrenamiento.unshift(nuevaTarjeta);
        localStorage.setItem("listaTarjetas", JSON.stringify(listaTarjetasEntrenamiento));
        window.location.href = `../pages/entrenamientos.html`;
    }
}

const botonCancelar = (e) => {
        e.preventDefault();
        const url = new URL(window.location);
        const idParam = url.searchParams.get("id");
        if (idParam) {
            window.location.href = `../pages/ver-entrenamiento.html?id=${idParam}`;
        } else {
            window.location.href = '../pages/entrenamientos.html?asd=1';
        }
}

const mainFormulario = () => {
    document.querySelector("[data-cancelar]").onclick = botonCancelar;
    document.querySelector("[data-form]").addEventListener("submit", enviarFormulario);
}

cargaInicialLocalStorage();
precargaSelect();
precargaDatosAModificar();
mainFormulario();