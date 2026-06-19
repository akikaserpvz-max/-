let carrito = [];
let total = 0;
let epoca = "antigua";
let mostrarTodo = false;

const imagenes = {
    "grand theft auto v": "img/gta5.jpg",
    "deus ex human revolution": "img/deus_ex.jpg",
    "detroit become human": "img/detroit.jpg",
    "assassin's creed origins": "img/ac_origins.jpg",
    "ryse: son of rome": "img/ryse.jpg",
    "total war: rome ii": "img/rome2.jpg",
    "kingdom come deliverance": "img/kingdom_come.jpg",
    "a plague tale innocence": "img/plague_tale.jpg",
    "crusader kings iii": "img/ck3.jpg",
    "mafia definitive edition": "img/mafia.jpg",
    "l.a. noire": "img/lanoire.jpg",
    "cyberpunk 2077": "img/cyberpunk2077.jpg"
};

function normalizar(texto) {
    return (texto || "")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ");
}

async function cargarJuegos() {

    try {

        const res = await fetch(epoca + ".txt");

        if (!res.ok) {
            throw new Error("No se pudo cargar " + epoca + ".txt");
        }

        const data = await res.text();

        let html = "";

        const lineas = data.trim().split("\n");

        lineas.forEach((linea, indice) => {

            if (!mostrarTodo && indice >= 3) return;

            const d = linea.split(";");

            const nombre = (d[0] || "").trim();
            const precio = parseFloat(d[3]) || 0;

            const key = normalizar(nombre);
            const img = imagenes[key] || "img/default.jpg";

            html += `
            <div class="juego">

                <img src="${img}" alt="${nombre}">

                <h3>${nombre}</h3>

                <p><b>Precio:</b> USD ${precio.toFixed(2)}</p>

                <button class="btn-add"
                    data-nombre="${nombre}"
                    data-precio="${precio}">
                    Agregar al carrito
                </button>

            </div>
            `;
        });

        document.getElementById("catalogo").innerHTML = html;

    } catch (error) {

        console.error(error);

        document.getElementById("catalogo").innerHTML =
            "<p>Error cargando juegos.</p>";
    }
}

function seleccionarEpoca(e) {
    epoca = e;
    mostrarTodo = false;
    cargarJuegos();
}

function mostrarMas() {
    mostrarTodo = true;
    cargarJuegos();
}

function agregar(nombre, precio) {

    carrito.push({
        nombre,
        precio: Number(precio)
    });

    total += Number(precio);

    actualizar();
}

function eliminar(indice) {

    total -= carrito[indice].precio;

    carrito.splice(indice, 1);

    actualizar();
}

function actualizar() {

    document.getElementById("cantidadCarrito").textContent =
        carrito.length;

    const lista = document.getElementById("listaCarrito");

    lista.innerHTML = "";

    carrito.forEach((juego, indice) => {

        const div = document.createElement("div");

        div.className = "itemCarrito";

        div.innerHTML = `
            ${juego.nombre}
            - USD ${juego.precio.toFixed(2)}

            <button onclick="eliminar(${indice})">
                ❌
            </button>
        `;

        lista.appendChild(div);
    });

    document.getElementById("total").innerHTML =
        `<b>Total: USD ${total.toFixed(2)}</b>`;
}

function buscarJuego() {

    const texto = document
        .getElementById("buscar")
        .value
        .toLowerCase()
        .trim();

    const juegos = document.querySelectorAll(".juego");

    juegos.forEach(juego => {

        const nombre = juego
            .querySelector("h3")
            .textContent
            .toLowerCase();

        juego.style.display =
            nombre.includes(texto)
                ? "block"
                : "none";
    });
}

document.addEventListener("click", (e) => {

    if (e.target.classList.contains("btn-add")) {

        const nombre = e.target.dataset.nombre;
        const precio = parseFloat(e.target.dataset.precio);

        agregar(nombre, precio);

        e.target.disabled = true;
        e.target.textContent = "Agregado ✔";
    }
});

function pagar() {

    if (carrito.length === 0) {

        alert("El carrito está vacío.");
        return;
    }

    const nombres = carrito.map(j => j.nombre).join("\n");

    alert(
        "Gracias por su compra.\n\n" +
        "Juegos comprados:\n" +
        nombres
    );

    carrito = [];
    total = 0;

    actualizar();
}

window.onload = () => {

    cargarJuegos();
    actualizar();

    console.log("Script cargado correctamente");
};
