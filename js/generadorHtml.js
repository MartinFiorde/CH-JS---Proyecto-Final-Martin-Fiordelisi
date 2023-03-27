
// metodo para generar cartas en entrenamientos.html
const generarTarjeta = (entrenamientoObj) => {
    let div = document.createElement("article");
    div.classList.add("col-md-6");
    let string = ``;
    string = string.concat(`
    <figure class="card__btn card__ flex__card row mb-4 g-0 border rounded overflow-hidden flex-md-row shadow-sm h-md-250 position-relative">
        <figcaption class="card__text col p-2 pe-0 d-flex flex-column position-static">
            <h2 class="card__title d-inline-block mb-0">${entrenamientoObj.idEjercicio.nombre}</h2>
            <p class="mb-3 text-muted">${entrenamientoObj.mostrarDato("fecha")}</p>
            <p class="card-text"><strong>Duración: </strong><br />${entrenamientoObj.mostrarDato("duracion")} hs</p>
            <p class="card-text"><strong>Calorias: </strong><br />${entrenamientoObj.mostrarDato("calorias")} kcal</p>
    `);
    if (entrenamientoObj.idEjercicio.hasDistancia) {
        string = string.concat(`
            <p class="card-text"><strong>Vel. Prom.: </strong><br />${entrenamientoObj.mostrarDato("velocidadPromedio")} km/h</p>
        `);
    } else {
        string = string.concat(`
            <p class="card-text"><strong>Frec. Card. Prom.: </strong><br />${entrenamientoObj.mostrarDato("frecuenciaCardiacaPromedio")} lpm</p>
        `);
    }
    string = string.concat(`
            <a href="./ver-entrenamiento.html?id=${entrenamientoObj.mostrarDato("id")}" class="card__ stretched-link"></a> 
        </figcaption>
        <div class="card__img col-auto d-none d-lg-block">
            <img class="card__img__content bd-placeholder-img rounded shadow-sm m-4" src="../img/entrenamientos/${entrenamientoObj.idEjercicio.urlImagen}" alt="icono ciclismo" aria-label="Placeholder: icono ciclismo" focusable="false" />
        </div>
    </figure>
        `);
    div.innerHTML = string;
    return div;
}

// metodo para generar contenido innerHTML en ver-entrenamiento.html
const verInnerHtml = (EntrenamientoObj) => {
    let string = ``;
    string = string.concat(`
        <div class="card__img col-auto">
            <img class="card__img__content bd-placeholder-img rounded shadow-sm m-4" src="../img/user_placeholder.png" alt="icono pfp foto de usuario" aria-label="Placeholder: foto de usuario" focusable="false" data-banner/>
        </div>
        <figcaption class="card__text col p-2 pe-0 d-flex flex-column position-static">
            <h2 class="card__title d-inline-block mb-0" data-tipo>${EntrenamientoObj.idEjercicio.nombre}</h2>
            <p class="mb-3 text-muted">${EntrenamientoObj.mostrarDato("fecha")}</p>
            <p class="card-text py-0"><strong>Duración: </strong>${EntrenamientoObj.mostrarDato("duracion")} hs</p>
            <p class="card-text py-0"><strong>Calorías: </strong>${EntrenamientoObj.mostrarDato("calorias")} kcal</p>
            <p class="card-text py-0"><strong>Frecuencia cardíaca: </strong>${EntrenamientoObj.mostrarDato("frecuenciaCardiacaPromedio")} lpm</p>
    `);
    if (EntrenamientoObj.idEjercicio.hasDistancia) {
        string = string.concat(`
            <p class="card-text py-0"><strong>Distancia recorrida: </strong>${EntrenamientoObj.mostrarDato("distancia")} km</p>
            <p class="card-text py-0 pb-3"><strong>Velocidad promedio: </strong>${EntrenamientoObj.mostrarDato("velocidadPromedio")} km/h</p>
        `);
    }
    string = string.concat(`
            <div class="btns">
                <input class="btn" type="submit" value="Modificar" data-modificar/>
                <input class="btn" type="submit" value="Eliminar" data-eliminar/>
                <input class="btn" type="reset" value="Volver" data-volver/>
            </div>
        </figcaption>
        `);
    return string;
}


export {generarTarjeta, verInnerHtml};