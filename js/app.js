import { UI } from "./UI.js";

const ui = new UI("contenedor"); //objeto o instancia a utilizar


const btnSiguiente = document.getElementById("siguiente");
const btnAnterior = document.getElementById("anterior");

const inputBuscar = document.getElementById("buscar");

const paginaActual= document.getElementById("pagina-actual");

let pagina = 1; //Página inicia en 1

const limit = 10; // 12 productos por página

async function obtenerProductos() {

    const skip = (pagina - 1) * limit; //(1-1) *12 = 0 productos omitidos en primera página, (2-1) * 12 = 12 elementos omitidos en segunda página.. Conclusión: Por cada página que se aumente, se omiten 12 productos.

    const url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

    try {

        const response = await fetch(url);

        const data = await response.json();
        console.log(data)

        ui.mostrarProductos(data.products); //data: objeto principal de la api, products: array de productos dentro de data

        console.log(data.products)

    } catch (error) {

        console.log(error);

        ui.mostrarError("Error al cargar productos");

    }

}

async function buscarProductos(texto) { //función asíncrona: función cuyas operaciones tienen una duracion, se ejecutan fuera del flujo principal, evitando que se bloquee el resto del programa

    if (texto.trim() === "") {

        obtenerProductos();

        return;
    }

    const url = `https://dummyjson.com/products/search?q=${texto}`;

    try {

        const response = await fetch(url);

        const data = await response.json();

        ui.mostrarProductos(data.products);

    } catch (error) {

        console.log(error);

        ui.mostrarError("Error al buscar productos");

    }

}

inputBuscar.addEventListener("input", (e) => {

    const texto = e.target.value;

    buscarProductos(texto);

});

btnSiguiente.addEventListener("click", () => {

    pagina++; //aumenta en 1 la pagina actual: pagina 1 + 1= pagina 2

    obtenerProductos();

    paginaActual.textContent= pagina;

});

btnAnterior.addEventListener("click", () => {

    if (pagina > 1) { //paggina minimo 2

        pagina--;

        obtenerProductos();

        paginaActual.textContent= pagina;

    }

});

obtenerProductos();