import { TarjetaEntrenamiento } from "./entidades.js";
import { cargaInicialLocalStorage, ejerciciosGuardados, tarjetasEntrenamientoGuardadas } from "./util.js";

cargaInicialLocalStorage();

const cargaInfo = () => {
    const url = new URL(window.location);
    const idParam = url.searchParams.get("id");
    console.log("idParam", idParam)
    const aux = tarjetasEntrenamientoGuardadas().find(x => x.id == idParam);
    let info = document.querySelector("[data-info]");
    if (aux.idEjercicio.hasDistancia) {
        info.innerHTML = `
            <div class="card__img col-auto">
                    <img class="card__img__content bd-placeholder-img rounded shadow-sm m-4" src="../img/user_placeholder.png" alt="icono pfp foto de usuario" aria-label="Placeholder: foto de usuario" focusable="false" data-banner/>
                </div>
                <figcaption class="card__text col p-2 pe-0 d-flex flex-column position-static">
                    <h2 class="card__title d-inline-block mb-0" data-tipo>${aux.idEjercicio.nombre}</h2>
                    <p class="mb-3 text-muted">${aux.mostrarDato("fecha")}</p>
                    <p class="card-text py-0"><strong>Duración: </strong>${aux.mostrarDato("duracion")} hs</p>
                    <p class="card-text py-0"><strong>Calorías: </strong>${aux.mostrarDato("calorias")} kcal</p>
                    <p class="card-text py-0"><strong>Frecuencia cardíaca: </strong>${aux.mostrarDato("frecuenciaCardiacaPromedio")} lpm</p>
                    <p class="card-text py-0"><strong>Distancia recorrida: </strong>${aux.mostrarDato("distancia")} km</p>
                    <p class="card-text py-0 pb-3"><strong>Velocidad promedio: </strong>${aux.mostrarDato("velocidadPromedio")} km/h</p>
                    <div class="btns">
                        <input class="btn" type="submit" value="Modificar" data-modificar/>
                        <input class="btn" type="submit" value="Eliminar" data-eliminar/>
                        <input class="btn" type="reset" value="Volver" data-volver/>
                    </div>
                </figcaption>
            `;
    } else {
        info.innerHTML = `
            <div class="card__img col-auto">
                    <img class="card__img__content bd-placeholder-img rounded shadow-sm m-4" src="../img/user_placeholder.png" alt="icono pfp foto de usuario" aria-label="Placeholder: foto de usuario" focusable="false" data-banner/>
                </div>
                <figcaption class="card__text col p-2 pe-0 d-flex flex-column position-static">
                <h2 class="card__title d-inline-block mb-0" data-tipo>${aux.idEjercicio.nombre}</h2>
                    <p class="mb-3 text-muted">${aux.mostrarDato("fecha")}</p>
                    <p class="card-text py-0"><strong>Duración: </strong>${aux.mostrarDato("duracion")} hs</p>
                    <p class="card-text py-0"><strong>Calorías: </strong>${aux.mostrarDato("calorias")} kcal</p>
                    <p class="card-text py-0"><strong>Frecuencia cardíaca: </strong>${aux.mostrarDato("frecuenciaCardiacaPromedio")} lpm</p>
                    <div class="btns">
                        <input class="btn" type="submit" value="Modificar" data-modificar/>
                        <input class="btn" type="submit" value="Eliminar" data-eliminar/>
                        <input class="btn" type="reset" value="Volver" data-volver/>
                    </div>
                </figcaption>
            `;
    }
    document.querySelector("[data-banner]").src = `../img/entrenamientos/${aux.idEjercicio.urlImagen}`;
    document.querySelector("[data-modificar]").addEventListener("click", () => window.location.href = `../pages/cargar-entrenamiento.html?id=${idParam}`);
    document.querySelector("[data-eliminar]").addEventListener("click", function () { eliminar(idParam) });
    document.querySelector("[data-volver]").addEventListener("click", () => window.location.href = '../pages/entrenamientos.html');
};

const eliminar = (id) => {
    console.log("idParam", parseInt(id), typeof parseInt(id));
    let listaTarjetas = tarjetasEntrenamientoGuardadas();
    let i = listaTarjetas.findIndex((x) => x.id == id);
    console.log("i",i)
    listaTarjetas.splice(i, 1);
    localStorage.setItem("listaTarjetas", JSON.stringify(listaTarjetas));
    window.location.href = '../pages/entrenamientos.html';
}

const cargarDatos = () => {
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

cargaInfo();