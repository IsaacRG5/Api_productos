const contenedor = document.getElementById("contenedor");

const btnSiguiente = document.getElementById("siguiente");
const btnAnterior = document.getElementById("anterior");

const inputBuscar = document.getElementById("buscar");

let pagina = 1;
const limit =12;

async function obtenerProductos() {

    const skip = (pagina - 1) * limit;

    const url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

    try {

        const response = await fetch(url);
        const data = await response.json();

        mostrarProductos(data.products);

    } catch(error) {

        console.log(error);

    }

}

async function buscarProductos(texto) {

    if(texto.trim() === ""){
        obtenerProductos();
        return;
    }

    const url = `https://dummyjson.com/products/search?q=${texto}`;

    try {

        const response = await fetch(url);
        const data = await response.json();

        mostrarProductos(data.products);

    } catch(error){

        console.log(error);

    }

}

function mostrarProductos(productos) {

    contenedor.innerHTML = "";

    if(productos.length === 0){

        contenedor.innerHTML = "<p>No se encontraron productos</p>";
        return;
    }

    productos.forEach(producto => {

        contenedor.innerHTML += `

        <div class="card">

            <img src="${producto.thumbnail}">
            <h2>${producto.title}</h2>
            <p>$${producto.price}</p>
            <p>$${producto.description}</p>

        </div>`;

    });

}

inputBuscar.addEventListener("input", (e) => {

    const texto = e.target.value;

    buscarProductos(texto);

});

btnSiguiente.addEventListener("click", ()=> {

    pagina++;
    obtenerProductos();

});

btnAnterior.addEventListener("click", () => {

    if(pagina > 1){

        pagina--;
        obtenerProductos();

    }

});

obtenerProductos();