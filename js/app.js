import { UI } from "./UI.js";

const ui = new UI("contenedor");

const btnSiguiente = document.getElementById("siguiente");
const btnAnterior = document.getElementById("anterior");

const inputBuscar = document.getElementById("buscar");

let pagina = 1;

const limit = 12;

async function obtenerProductos() {

    const skip = (pagina - 1) * limit;

    const url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

    try {

        const response = await fetch(url);

        const data = await response.json();

        ui.mostrarProductos(data.products);

    } catch (error) {

        console.log(error);

        ui.mostrarError("Error al cargar productos");

    }

}

async function buscarProductos(texto) {

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

    pagina++;

    obtenerProductos();

});

btnAnterior.addEventListener("click", () => {

    if (pagina > 1) {

        pagina--;

        obtenerProductos();

    }

});

obtenerProductos();