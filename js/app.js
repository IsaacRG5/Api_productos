import { ProductoAPI } from "./ProductoAPI.js";
import { UI } from "./UI.js";

// --- Instancias ---
const api = new ProductoAPI(12);
const ui = new UI("contenedor");

// --- Estado ---
let pagina = 1;
let buscando = false;

// --- Elementos del DOM ---
const btnSiguiente = document.getElementById("siguiente");
const btnAnterior = document.getElementById("anterior");
const inputBuscar = document.getElementById("buscar");

// --- Funciones principales ---
async function cargarPagina() {
    try {
        const productos = await api.obtenerPorPagina(pagina);
        ui.mostrarProductos(productos);
    } catch (error) {
        ui.mostrarError("Error al cargar los productos.");
        console.error(error);
    }
}

async function buscar(texto) {
    if (texto.trim() === "") {
        buscando = false;
        cargarPagina();
        return;
    }
    buscando = true;
    try {
        const productos = await api.buscar(texto);
        ui.mostrarProductos(productos);
    } catch (error) {
        ui.mostrarError("Error al buscar productos.");
        console.error(error);
    }
}

// --- Eventos ---
inputBuscar.addEventListener("input", (e) => buscar(e.target.value));

btnSiguiente.addEventListener("click", () => {
    if (buscando) return; // no paginar durante búsqueda
    pagina++;
    cargarPagina();
});

btnAnterior.addEventListener("click", () => {
    if (buscando || pagina <= 1) return;
    pagina--;
    cargarPagina();
});

// --- Inicio ---
cargarPagina();