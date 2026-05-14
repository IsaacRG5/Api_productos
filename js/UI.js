export class UI {

    #contenedor;

    constructor(contenedorId) {
        this.#contenedor = document.getElementById(contenedorId);
    }

    mostrarProductos(productos) {

        if (productos.length === 0) {
            this.#contenedor.innerHTML = `
                <p>No se encontraron productos</p>
            `;
            return;
        }

        this.#contenedor.innerHTML = productos
            .map(producto => this.#crearCard(producto)) //[p1, p2...p12] -> crea una card
            .join("");
    }       

    mostrarError(mensaje) {
        this.#contenedor.innerHTML = `
            <p class="error">${mensaje}</p>
        `;
    }

    #crearCard(producto) {

        return `
            <div class="card">

                <img src="${producto.thumbnail}" alt="${producto.title}">

                <h2>${producto.title}</h2>

                <p class="precio">$${producto.price}</p>

                <p class="descripcion">${producto.description}</p>

            </div>
        `;
    }

}