export class Ejercicio {
    constructor(id, nombre, hasDistancia, urlImagen) {
        this.id = id;
        this.nombre = nombre;
        this.hasDistancia = hasDistancia;
        this.urlImagen = urlImagen;
    }
}

export class TarjetaEntrenamiento {
    constructor(id, idEjercicio, fecha, duracion, calorias, frecuenciaCardiacaPromedio, distancia) {
        this.id = id;
        this.idEjercicio = idEjercicio;
        this.fecha = fecha;
        this.duracion = duracion;
        this.calorias = calorias;
        this.frecuenciaCardiacaPromedio = frecuenciaCardiacaPromedio;
        this.distancia = distancia;
        this.velocidadPromedio = parseFloat((this.distancia / this.duracion * 3600000).toFixed(2)) || null;
    }

    mostrarDato(key) {
        switch (key) {
            case "duracion":
                return TarjetaEntrenamiento.imprimirDuracion(this.duracion);
            case "fecha":
                return TarjetaEntrenamiento.imprimirFechaCorta(this.fecha);
            default:
                return this[key];
        }
    }

    static imprimirDuracion(duracion) {
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

    static imprimirFechaCorta(fecha) {
        var meses = [undefined, 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        return `${meses[parseInt(fecha.substring(5, 7))]} ${fecha.substring(fecha.length-2)}`
    }
}