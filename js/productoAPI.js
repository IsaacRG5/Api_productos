export class ProductoAPI {
    #limit;
    #baseUrl;

    constructor(limit = 12) {
        this.#limit = limit;
        this.#baseUrl = "https://dummyjson.com/products";
    }

    async obtenerPorPagina(pagina) {
        const skip = (pagina - 1) * this.#limit;
        const url = `${this.#baseUrl}?limit=${this.#limit}&skip=${skip}`;
        return await this.#fetchDatos(url);
    }

    async buscar(texto) {
        const url = `${this.#baseUrl}/search?q=${texto}`;
        return await this.#fetchDatos(url);
    }

    async #fetchDatos(url) {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const data = await response.json();
        return data.products;
    }
}