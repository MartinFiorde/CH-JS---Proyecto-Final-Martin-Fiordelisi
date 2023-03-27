import { TarjetaEntrenamiento } from "./entidades.js";
import { cargaInicialLocalStorage, tarjetasEntrenamientoGuardadas } from "./util.js";
import { generarTarjeta } from "./generadorHtml.js";

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

const cargarTablero = () => {
    let listaEntrenamientosOBJ = tarjetasEntrenamientoGuardadas();
    const tablero = document.querySelector("[data-entrenamientos]");
    for (let i = 0; i < listaEntrenamientosOBJ.length; i++) {
        tablero.append(generarTarjeta(listaEntrenamientosOBJ[i]));
    }
}

cargaInicialLocalStorage();
cargarTablero();
cargarResumen();