import { cargaInicialLocalStorage, tarjetasEntrenamientoGuardadas } from "./util.js";
import { verInnerHtml } from "./generadorHtml.js";
import { SweetAlert as swalImport } from './librerias/sweetalert2.js';
// const swalImport = Swal; //LIBRERIA PROMPTS - https://sweetalert2.github.io/
// LIBRERIA PROMPTS SIMILAR - https://github.com/apvarun/toastify-js/blob/master/README.md

const cargaInfo = () => {
    const url = new URL(window.location);
    const idParam = url.searchParams.get("id");
    try {
        const aux = tarjetasEntrenamientoGuardadas().find(x => x.id == idParam);
        let info = document.querySelector("[data-info]");
        info.innerHTML = verInnerHtml(aux);
        document.querySelector("[data-banner]").src = `../img/entrenamientos/${aux.idEjercicio.urlImagen}`;
        document.querySelector("[data-modificar]").addEventListener("click", () => window.location.href = `../pages/cargar-entrenamiento.html?id=${idParam}`);
        document.querySelector("[data-eliminar]").addEventListener("click", function () { confirmarBorrado(idParam) });
        document.querySelector("[data-volver]").addEventListener("click", () => window.location.href = '../pages/entrenamientos.html');
    } catch (error) {
        console.log(error);
        window.location.href = '../404.html'
    }
};

const baseStyle = swalImport.mixin({
    customClass: {
        confirmButton: 'btn',
        cancelButton: 'btn'
    },
    buttonsStyling: false
})

const eliminar = (id) => {
    let listaTarjetas = tarjetasEntrenamientoGuardadas();
    let i = listaTarjetas.findIndex((x) => x.id == id);
    listaTarjetas.splice(i, 1);
    localStorage.setItem("listaTarjetas", JSON.stringify(listaTarjetas));
    baseStyle.fire(
        '¡Eliminado!',
        'El ejercicio se ha removido exitosamente',
        'success'
    ).then((result) => window.location.href = '../pages/entrenamientos.html');
}

const confirmarBorrado = (idParam) => {
    baseStyle.fire({
        title: '¿Está seguro?',
        text: "Esta acción no se puede revertir",
        icon: 'warning',
        showCancelButton: true,

        confirmButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            eliminar(idParam);
        }
    });
}

cargaInicialLocalStorage();
cargaInfo();

