const imprimirDuracion = (duracion) => {
    let horaTemp = 0 + duracion;
    let hora = parseInt(horaTemp / 3600000, 10);
    horaTemp = horaTemp - hora * 3600000;
    if (hora < 10) {
        hora = "0".concat(hora);
    }

    let minuto = parseInt(horaTemp / 60000, 10);
    horaTemp = horaTemp - minuto * 60000;
    if (minuto < 10) {
        minuto = "0".concat(minuto);
    }

    let segundo = parseInt(horaTemp / 1000, 10);
    if (segundo < 10) {
        segundo = "0".concat(segundo);
    }

    return `${hora}:${minuto}:${segundo}`;
}

class Ejercicio {
    constructor(id, nombre, hasDistancia, urlImagen) {
        this.id = id;
        this.nombre = nombre;
        this.hasDistancia = hasDistancia;
        this.urlImagen = urlImagen;
    }
}

class tarjetaEntrenamiento {
    constructor(id, idEjercicio, fecha, duracion, calorias, velocidadPromedio, frecuenciaCardiacaPromedio) {
        this.id = id;
        this.idEjercicio = idEjercicio;
        this.fecha = fecha;
        this.duracion = duracion;
        this.calorias = calorias;
        this.velocidadPromedio = velocidadPromedio;
        this.distancia = parseFloat((this.velocidadPromedio * this.duracion / 3600000).toFixed(2));
        Number.isNaN(this.distancia) ? this.distancia == null : null;
        this.frecuenciaCardiacaPromedio = frecuenciaCardiacaPromedio;
    }

    mostrarDato(key) {
        if (key == "duracion") {
            return imprimirDuracion(this.duracion);
        } else if (key == "fecha") {
            return this[key]; // PENDIENTE AGREGAR LOGICA DE DATE AL ATRIBUTO, Y LOGICA DE VISUALIZACIÓN A LA CONSULTA
        } else {
            return this[key];
        }

    }
}

let listaEjercicios = [
    new Ejercicio(0, "Ciclismo", true, "../img/entrenamientos/ciclismo.jpg"),
    new Ejercicio(1, "Artes marciales", false, "../img/entrenamientos/karate.jpg"),
    new Ejercicio(2, "Elongación", false, "../img/entrenamientos/elongar.jpg"),
    new Ejercicio(3, "Running", true, "../img/entrenamientos/correr.jpg"),

];

let listaTarjetasEntrenamiento = [
    new tarjetaEntrenamiento(3, listaEjercicios[0], "Dic 30", (0 * 3600000 + 39 * 60000 + 20 * 1000), 272, 9.55, 187),
    new tarjetaEntrenamiento(2, listaEjercicios[1], "Dic 23", (1 * 3600000 + 30 * 60000 + 0 * 1000), 414, null, 127),
    new tarjetaEntrenamiento(1, listaEjercicios[2], "Dic 15", (1 * 3600000 + 10 * 60000 + 30 * 1000), 398, null, 112),
    new tarjetaEntrenamiento(0, listaEjercicios[3], "Nov 28", (2 * 3600000 + 0 * 60000 + 0 * 1000), 398, 6.81, 115),
];

const imprimirTarjetasEnConsola = () => {
    listaTarjetasEntrenamiento.forEach((aux) => {
        console.log("entrenamiento: " + aux.idEjercicio.nombre)
        for (const key in aux) {
            if (aux[key] && !key.substring(0, 2).includes("id", 0)) {
                console.log(key + ": " + aux.mostrarDato(key));
            }
        }
        console.log("- - - - - -");
    });
};

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

const CONFIRMAR = (option) => (option == "s" || option == "S" || option == "si" || option == "Si" || option == "SI");
const MENSAJEERROR = `El valor ingresado no es válido.`

const cargarEjercicio = () => {
    let mensaje = `Seleccione el número del entrenamiento realizado:\n`;
    listaEjercicios.forEach(aux => {
        mensaje = mensaje.concat(`${aux.id} - ${aux.nombre}\n`);
    });
    option = window.prompt(mensaje);
    if (option < listaEjercicios.length && option >= 0) {
        return option;
    } else {
        alert(MENSAJEERROR);
        return cargarEjercicio();
    }
}

const cargarFecha = () => {
    option = (window.prompt(`Seleccione la fecha:\n(ejemplos: dic 12, ene 07, feb 28, sep 01)`));
    if (typeof option.substring(0, 3) == "string" && !Number.isNaN(parseInt(option.substring(4, 6), 10))) {
        return option; // PENDIENTE AGREGAR LOGICA PARA REPROCESAR STRING A FORMATO DATE
    } else {
        alert(MENSAJEERROR);
        return cargarFecha();
    }
}

const cargarDuracion = () => {
    option = (window.prompt(`Ingrese la cantidad de tiempo que duró el ejercicio:\n(ejemplos: 01:00:00, 00:54:30, 2:54:59)`));
    if (!Number.isNaN(parseInt(option.substring(0, 2), 10)) && !Number.isNaN(parseInt(option.substring(3, 5), 10)) && !Number.isNaN(parseInt(option.substring(6, 8), 10))) {
        return option.substring(0, 2) * 3600000 + option.substring(3, 5) * 60000 + option.substring(6, 8) * 1000;
    } else {
        alert(MENSAJEERROR);
        return cargarDuracion();
    }
}

const cargarCalorias = () => {
    option = (window.prompt(`Seleccione la cantidad de calorías quemadas:\n(ejemplos: 216, 98, 1032, 416)`));
    if (!Number.isNaN(parseInt(option, 10))) {
        return parseInt(option, 10);
    } else {
        alert(MENSAJEERROR);
        return cargarCalorias();
    }
}

const cargarVelocidadPromedio = (EjercicioHasDistancia) => {
    if (!EjercicioHasDistancia) {
        return null;
    } else {
        option = (window.prompt(`Seleccione la velocidad promedio en km/h:\n(ejemplos: 3.12, 9.6, 2, 13.25)`));
        if (!Number.isNaN(parseFloat(option))) {
            return parseFloat(parseFloat(option).toFixed(2));
        } else {
            alert(MENSAJEERROR);
            return cargarVelocidadPromedio();
        }
    }
}

const cargarCardio = () => {
    option = (window.prompt(`Seleccione la frecuencia cardiaca promedio:\n(ejemplos: 98, 120, 165, 65)`));
    if (!Number.isNaN(parseInt(option, 10))) {
        return parseInt(option, 10);
    } else {
        alert(MENSAJEERROR);
        return cargarCardio();
    }
}

function main() {
    loop1:
    do {
        option = window.prompt("Bievenido a su registro de entrenamientos! Le gustaría ingresar un nuevo entrenamiento? (s / n)");
        while (CONFIRMAR(option)) {
            if (option == "") {
                break;
            }
            if (CONFIRMAR(option)) {
                let ejercicio = listaEjercicios[cargarEjercicio()];
                const nuevaTarjeta = new tarjetaEntrenamiento(listaTarjetasEntrenamiento.length, ejercicio, cargarFecha(), cargarDuracion(), cargarCalorias(), cargarVelocidadPromedio(ejercicio.hasDistancia), cargarCardio());
                listaTarjetasEntrenamiento.unshift(nuevaTarjeta);
            }
            option = window.prompt("Le gustaría ingresar un nuevo entrenamiento? (s / n)");
        };
        if (option == "") {
            break loop1;
        }
        option = window.prompt("Desea ver sus entrenamientos por consola? (s / n)");
        if (CONFIRMAR(option)) {
            imprimirTarjetasEnConsola();
        }

        option = window.prompt("Desea ver un resumen de toda su actividad por consola? (s / n)");
        if (CONFIRMAR(option)) {
            imprimirResumen();
        }
    } while (false);
}

main();