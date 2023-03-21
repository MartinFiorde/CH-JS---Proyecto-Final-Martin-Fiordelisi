import { TarjetaEntrenamiento } from "./entidades.js";
import { cargaInicialLocalStorage, tarjetasEntrenamientoGuardadas } from "./util.js";

const generarParrafo = (type, title, content) => {
    let main = document.createElement(type);
    let first = document.createElement("strong");
    first.innerHTML = title;
    main.style.textAlign = "left";
    main.append(first);
    main.append(content);
    main.classList.add("card-text");
    return main;
}

const controlDeValoresNulos = (dato) => {
    if (!dato || dato == "00:00:00") {
        return "--";
    } else {
        return dato;
    }
}

const cargarResumen = () => {
    let totalDuracion = 0;
    let totalCalorias = 0;
    let totalDistancia = 0;
    let totalVelocidad = 0;
    let cantidadVelocidad = 0;
    let totalCardio = 0;
    let listaEntrenamientosOBJ = tarjetasEntrenamientoGuardadas();
    const resumen = document.querySelector("[data-resumen]");

    listaEntrenamientosOBJ.forEach(aux => {
        totalDuracion += aux.duracion;
        totalCalorias += aux.calorias;
        aux.distancia != null && (totalDistancia += aux.distancia);
        aux.velocidadPromedio != null && (totalVelocidad += parseFloat(aux.velocidadPromedio));
        aux.velocidadPromedio != null && cantidadVelocidad++;
        totalCardio += aux.frecuenciaCardiacaPromedio * aux.duracion;
    });
    resumen.append(generarParrafo("p", "Duración total ejercitada: ", `${controlDeValoresNulos(TarjetaEntrenamiento.imprimirDuracion(totalDuracion))} hs`));
    resumen.append(generarParrafo("p", "Total Calorias quemadas: ", `${controlDeValoresNulos(totalCalorias)} kcal`));
    resumen.append(generarParrafo("p", "Frec. cardiaca promedio ponderada: ", `${controlDeValoresNulos(parseInt(totalCardio / totalDuracion, 10))} lpm`));
    resumen.append(generarParrafo("p", "Distancia total recorrida: ", `${controlDeValoresNulos(parseFloat((totalDistancia).toFixed(2)))} km`));
    resumen.append(generarParrafo("p", "Velocidad promedio no ponderada: ", `${controlDeValoresNulos(parseFloat((parseFloat(totalVelocidad) / parseFloat(cantidadVelocidad)).toFixed(2)))} km/h`));
};

const generarCarta = (aux) => {
    let div = document.createElement("article");
    div.classList.add("col-md-6");
    let string = ``;
    string = string.concat(`
    <figure class="card__btn card__ flex__card row mb-4 g-0 border rounded overflow-hidden flex-md-row shadow-sm h-md-250 position-relative">
        <figcaption class="card__text col p-2 pe-0 d-flex flex-column position-static">
            <h2 class="card__title d-inline-block mb-0">${aux.idEjercicio.nombre}</h2>
            <p class="mb-3 text-muted">${aux.mostrarDato("fecha")}</p>
            <p class="card-text"><strong>Duración: </strong><br />${aux.mostrarDato("duracion")} hs</p>
            <p class="card-text"><strong>Calorias: </strong><br />${aux.mostrarDato("calorias")} kcal</p>
    `);
    if (aux.idEjercicio.hasDistancia) {
        string = string.concat(`
            <p class="card-text"><strong>Vel. Prom.: </strong><br />${aux.mostrarDato("velocidadPromedio")} km/h</p>
        `);
    } else {
        string = string.concat(`
            <p class="card-text"><strong>Frec. Card. Prom.: </strong><br />${aux.mostrarDato("frecuenciaCardiacaPromedio")} lpm</p>
        `);
    }
    string = string.concat(`
            <a href="./ver-entrenamiento.html?id=${aux.mostrarDato("id")}" class="card__ stretched-link"></a> 
        </figcaption>
        <div class="card__img col-auto d-none d-lg-block">
            <img class="card__img__content bd-placeholder-img rounded shadow-sm m-4" src="../img/entrenamientos/${aux.idEjercicio.urlImagen}" alt="icono ciclismo" aria-label="Placeholder: icono ciclismo" focusable="false" />
        </div>
    </figure>
        `);
    div.innerHTML = string;
    return div;
}

const cargarTablero = () => {
    let listaEntrenamientosOBJ = tarjetasEntrenamientoGuardadas();
    const tablero = document.querySelector("[data-entrenamientos]");
    for (let i = 0; i < listaEntrenamientosOBJ.length; i++) {
        tablero.append(generarCarta(listaEntrenamientosOBJ[i]));
    }
}

cargaInicialLocalStorage();
cargarTablero();
cargarResumen();