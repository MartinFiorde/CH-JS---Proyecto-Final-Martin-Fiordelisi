import { TarjetaEntrenamiento, Ejercicio } from './cargarEntrenamiento.js';

const parseJsonToTarjetaEntrenamiento = (json) => {
    let listaEntrenamientosOBJ = [];
    for (let i = 0; i < json.length; i++) {
        let aux = Object.assign(new TarjetaEntrenamiento, json[i]);
        aux.idEjercicio = Object.assign(new Ejercicio, aux.idEjercicio);
        listaEntrenamientosOBJ.push(aux);
    }
    return listaEntrenamientosOBJ;
}

const cargarLocalSotage = () => {
    if (localStorage.getItem("listaTarjetas") == null) {
        let listaEjercicios = [
            new Ejercicio(0, "Ciclismo", true, "ciclismo.jpg"),
            new Ejercicio(1, "Artes marciales", false, "karate.jpg"),
            new Ejercicio(2, "Elongación", false, "elongar.jpg"),
            new Ejercicio(3, "Running", true, "correr.jpg"),

        ];

        let listaTarjetasEntrenamiento = [
            new TarjetaEntrenamiento(3, listaEjercicios[0], "Dic 30", (0 * 3600000 + 39 * 60000 + 20 * 1000), 272, 9.55, 187),
            new TarjetaEntrenamiento(2, listaEjercicios[1], "Dic 23", (1 * 3600000 + 30 * 60000 + 0 * 1000), 414, null, 127),
            new TarjetaEntrenamiento(1, listaEjercicios[2], "Dic 15", (1 * 3600000 + 10 * 60000 + 30 * 1000), 398, null, 112),
            new TarjetaEntrenamiento(0, listaEjercicios[3], "Nov 28", (2 * 3600000 + 0 * 60000 + 0 * 1000), 398, 6.81, 115),
        ];
        localStorage.setItem("listaTarjetas", JSON.stringify(listaTarjetasEntrenamiento));

    }
    let listaEntrenamientosOBJ = parseJsonToTarjetaEntrenamiento(JSON.parse(localStorage.getItem("listaTarjetas")));

}

const imprimirResumen = () => {
    let totalDuracion = 0;
    let totalCalorias = 0;
    let totalDistancia = 0;
    let totalVelocidad = 0;
    let cantidadVelocidad = 0;
    let totalCardio = 0;

    listaTarjetasEntrenamiento.forEach(aux => {
        totalDuracion += aux.duracion;
        totalCalorias += aux.calorias;
        aux.distancia != null ? totalDistancia += aux.distancia : null;
        aux.velocidadPromedio != null ? totalVelocidad += parseFloat(aux.velocidadPromedio) : null;
        aux.velocidadPromedio != null ? cantidadVelocidad++ : null;
        totalCardio += aux.frecuenciaCardiacaPromedio * aux.duracion;
    });

    let mensaje = "Resumen de toda su actividad:\n";
    mensaje = mensaje.concat("Duración total ejercitada: " + imprimirDuracion(totalDuracion) + "\n");
    mensaje = mensaje.concat("Total Calorias quemadas: " + totalCalorias + "\n");
    mensaje = mensaje.concat("Distancia total recorrida: " + parseFloat((totalDistancia).toFixed(2)) + "\n");
    mensaje = mensaje.concat("Velocidad promedio no ponderada: " + parseFloat((parseFloat(totalVelocidad) / parseFloat(cantidadVelocidad)).toFixed(2)) + "\n");
    mensaje = mensaje.concat("Frecuencia cardiaca promedio ponderada: " + parseInt(totalCardio / totalDuracion, 10) + "\n");
    mensaje = mensaje.concat("- - - - - -");

    console.log(mensaje);
};



const cargarTablero = () => {
    let listaEntrenamientosOBJ = parseJsonToTarjetaEntrenamiento(JSON.parse(localStorage.getItem("listaTarjetas")));
    const tablero = document.querySelector("[data-entrenamientos]");

    for (let i = 0; i < listaEntrenamientosOBJ.length; i++) {
        let aux = listaEntrenamientosOBJ[i];
        let div = document.createElement("article");
        div.classList.add("col-md-6");

        if (aux.idEjercicio.hasDistancia) {
            div.innerHTML = `
            <figure class="card__btn card__ flex__card row mb-4 g-0 border rounded overflow-hidden flex-md-row shadow-sm h-md-250 position-relative">
                <figcaption class="card__text col p-2 pe-0 d-flex flex-column position-static">
                    <h2 class="card__title d-inline-block mb-0">${aux.idEjercicio.nombre}</h2>
                    <p class="mb-3 text-muted">${aux.mostrarDato("fecha")}</p>
                    <p class="card-text"><strong>Duración: </strong><br />${aux.mostrarDato("duracion")} hs</p>
                    <p class="card-text"><strong>Calorias: </strong><br />${aux.mostrarDato("calorias")} kcal</p>
                    <p class="card-text"><strong>Vel. Prom.: </strong><br />${aux.mostrarDato("velocidadPromedio")} km/h</p>
                    <!-- <a href="../404.html" class="card__ stretched-link"></a> -->
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
                    <!-- <a href="../404.html" class="card__ stretched-link"></a> -->
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
