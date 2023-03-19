import { cargaInicialLocalStorage, tarjetasEntrenamientoGuardadas } from "./util.js";



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
    document.querySelector("[data-eliminar]").addEventListener("click", function() { eliminar(idParam) });
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

cargaInicialLocalStorage();
cargaInfo();