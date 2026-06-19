let carrito = [];
let total = 0;
let epoca = "antigua";

// ================= IMÁGENES =================
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

// ================= NORMALIZAR TEXTO =================
function normalizar(texto) {
    return (texto || "")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ");
}

// ================= CARGA =================
async function cargarJuegos() {

    const res = await fetch(epoca + ".txt");
    const data = await res.text();

    let html = "";

    data.trim().split("\n").forEach(linea => {

        if (!linea.trim()) return;

        const d = linea.split(";");

        const nombre = (d[0] || "").trim();
        const precio = parseFloat(d[3]) || 0;

        const key = normalizar(nombre);
        const img = imagenes[key] || "img/default.jpg";

        html += `
        <div class="juego">

            <img src="${img}" alt="${nombre}">

            <h3>${nombre}</h3>

            <p>$${precio.toFixed(2)}</p>

            <button class="btn-add"
                data-nombre="${nombre}"
                data-precio="${precio}">
                Agregar
            </button>

        </div>
        `;
    });

    document.getElementById("catalogo").innerHTML = html;
}

// ================= ÉPOCA =================
function seleccionarEpoca(e) {
    epoca = e;
    cargarJuegos();
}

// ================= CARRITO =================
function agregar(nombre, precio) {
    carrito.push({ nombre, precio: Number(precio) });
    total += Number(precio);
    actualizar();
}

function eliminar(i) {
    total -= carrito[i].precio;
    carrito.splice(i, 1);
    actualizar();
}

function actualizar() {

    document.getElementById("cantidadCarrito").innerText = carrito.length;

    const lista = document.getElementById("listaCarrito");
    lista.innerHTML = "";

    carrito.forEach((j, i) => {

        const div = document.createElement("div");
        div.className = "itemCarrito";

        div.innerHTML = `
            ${j.nombre} - $${j.precio.toFixed(2)}
            <button onclick="eliminar(${i})">❌</button>
        `;

        lista.appendChild(div);
    });

    document.getElementById("total").innerHTML =
        "<b>Total: $" + total.toFixed(2) + "</b>";
}

// ================= BOTONES =================
document.addEventListener("click", (e) => {

    if (e.target.classList.contains("btn-add")) {

        const nombre = e.target.dataset.nombre;
        const precio = parseFloat(e.target.dataset.precio);

        agregar(nombre, precio);

        e.target.innerText = "Agregado ✔";
        e.target.disabled = true;
    }
});

// ================= PAGAR =================
function pagar() {

    if (carrito.length === 0) {
        alert("Carrito vacío");
        return;
    }

    alert("Compra realizada ✔");

    carrito = [];
    total = 0;

    actualizar();
}

// ================= INICIO =================
window.onload = () => {
    cargarJuegos();
    actualizar();
};
