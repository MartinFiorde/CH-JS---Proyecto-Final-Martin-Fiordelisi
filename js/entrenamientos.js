import { TarjetaEntrenamiento } from "./entidades.js";
import { cargaInicialLocalStorage, tarjetasEntrenamientoGuardadas } from "./util.js";

cargaInicialLocalStorage();

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

    resumen.append(generarParrafo("p", "Duración total ejercitada: ", `${TarjetaEntrenamiento.imprimirDuracion(totalDuracion)} hs`));
    resumen.append(generarParrafo("p", "Total Calorias quemadas: ", `${totalCalorias} kcal`));
    resumen.append(generarParrafo("p", "Distancia total recorrida: ", `${parseFloat((totalDistancia).toFixed(2))} km`));
    resumen.append(generarParrafo("p", "Velocidad promedio no ponderada: ", parseFloat((parseFloat(totalVelocidad) / parseFloat(cantidadVelocidad)).toFixed(2))));
    resumen.append(generarParrafo("p", "Frecuencia cardiaca promedio ponderada: ", parseInt(totalCardio / totalDuracion, 10)));

};

const generarParrafo = (type, title, content) => {
    let main = document.createElement(type);
    let first = document.createElement("strong");
    first.innerHTML = title;
    main.append(first);
    main.append(content);
    main.classList.add("card-text");

    return main;
}

const cargarTablero = () => {
    let listaEntrenamientosOBJ = tarjetasEntrenamientoGuardadas();
    const tablero = document.querySelector("[data-entrenamientos]");

    for (let i = 0; i < listaEntrenamientosOBJ.length; i++) {
        let aux = listaEntrenamientosOBJ[i];
        let div = document.createElement("article");
        div.classList.add("col-md-6");

        if (aux.idEjercicio.hasDistancia) { // FALTA CAMBIAR LINK EN LINEA 62 Y 78 PARA VER-ENTRENAMIENTO, Y QUE ESA PESTAÑA LLEVE A CAMBIAR-ENTRENAMIENTO
            div.innerHTML = `
            <figure class="card__btn card__ flex__card row mb-4 g-0 border rounded overflow-hidden flex-md-row shadow-sm h-md-250 position-relative">
                <figcaption class="card__text col p-2 pe-0 d-flex flex-column position-static">
                    <h2 class="card__title d-inline-block mb-0">${aux.idEjercicio.nombre}</h2>
                    <p class="mb-3 text-muted">${aux.mostrarDato("fecha")}</p>
                    <p class="card-text"><strong>Duración: </strong><br />${aux.mostrarDato("duracion")} hs</p>
                    <p class="card-text"><strong>Calorias: </strong><br />${aux.mostrarDato("calorias")} kcal</p>
                    <p class="card-text"><strong>Vel. Prom.: </strong><br />${aux.mostrarDato("velocidadPromedio")} km/h</p>
                    <a href="./cargar-entrenamiento.html?id=${aux.mostrarDato("id")}" class="card__ stretched-link"></a> 
                </figcaption>
                <div class="card__img col-auto d-none d-lg-block">
                    <img class="card__img__content bd-placeholder-img rounded shadow-sm m-4" src="../img/entrenamientos/${aux.idEjercicio.urlImagen}" alt="icono ciclismo" aria-label="Placeholder: icono ciclismo" focusable="false" />
                </div>
            </figure>
            `;
        } else {
            div.innerHTML = `
            <figure class="card__btn card__ flex__card row mb-4 g-0 border rounded overflow-hidden flex-md-row shadow-sm h-md-250 position-relative">
                <figcaption class="card__text col p-2 pe-0 d-flex flex-column position-static">
                    <h2 class="card__title d-inline-block mb-0">${aux.idEjercicio.nombre}</h2>
                    <p class="mb-3 text-muted">${aux.mostrarDato("fecha")}</p>
                    <p class="card-text"><strong>Duración: </strong><br />${aux.mostrarDato("duracion")} hs</p>
                    <p class="card-text"><strong>Calorias: </strong><br />${aux.mostrarDato("calorias")} kcal</p>
                    <p class="card-text"><strong>Frec. Card. Prom.: </strong><br />${aux.mostrarDato("frecuenciaCardiacaPromedio")} lpm</p>
                    <a href="./cargar-entrenamiento.html?id=${aux.mostrarDato("id")}" class="card__ stretched-link"></a> 
                </figcaption>
                <div class="card__img col-auto d-none d-lg-block">
                    <img class="card__img__content bd-placeholder-img rounded shadow-sm m-4" src="../img/entrenamientos/${aux.idEjercicio.urlImagen}" alt="icono ciclismo" aria-label="Placeholder: icono ciclismo" focusable="false" />
                </div>
            </figure>
            `;
        }

        tablero.append(div);
    }
}

cargarTablero();
cargarResumen();