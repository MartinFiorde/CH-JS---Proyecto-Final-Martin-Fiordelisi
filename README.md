# CH-JS---Proyecto-Final-Martin-Fiordelisi

Hola a todos! En este repositorio se encuentra el resultado final de 2 meses de cursado en el programa de JavaScript dictado por la institución CoderHouse.

El objetivo del presente proyecto es brindarle dinámica a la maqueta realizada en el curso anterior (https://github.com/MartinFiorde/ch-curso-html-proyecto-final), a través de inputs de usuario, generación dinámica del DOM, conexión a bases de dato en formato .json, y el uso de localStorage como una especie de "base de datos" para brindarle persistencia a las funcionalidades brindadas por el sitio web.

El sitio web está destinado al seguimiento y guía de rutinas de entrenamiento, para que los usuarios puedan tener un control de avance, constancia frecuencia y rendimiento de sus ejercicios, así como la generación de un resumen sintético del historíal de entrenamiento general. 

Link al portal en GitHubPages: https://martinfiorde.github.io/CH-JS---Proyecto-Final-Martin-Fiordelisi/

Para este proyecto se utilizó JavaScript como principal lenguaje de programación, con la implementación de API propias como 
* Fetch API, 
* Web Storage API, o la 
* interfaz Document (DOM).

Adicionalmente se utilizaron librerías como 
* SweetAlert2 para la generación de "popup boxes", 
* Uuid para la generación de IDs únicos, y 
* Luxon para el manejo de fechas.

El sitio web fue testeado en Google Chrome, Mozilla Firefox, Opera, y diferentes versiones de Android desde telefonos celulares. La funcionalidad propia de la aplicación es 100% funcional en todos los navegadores web testeados, existiendo únicamente algunos bugs de accesibilidad y diseño, detallados a continuación:

    * La casilla de "duración" en el formulario de carga de ejercicios tiene función de autocompletado para los separadores ":" del formato hs:min:seg. Esta función de accesibilidad no funciona en celulares, o cuando se utiliza el Num Pad desde un ordenador.
    * Ligeros cambios de diseño no intencionados en Mozilla Firefox.

Aprovecho para enviarle un agradecimiento enorme a todo el equipo de CoderHouse, y especialmente al tutor Damian Gonzalez, que en cada corrección me brindó feedback muy muy útil para ir aplicando buenas prácticas sobre el código escrito.

Mil gracias!