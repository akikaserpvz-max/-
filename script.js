let carrito = [];
let total = 0;

let epocaSeleccionada = "antigua";
let juegos = [];

// ================== CARGAR JUEGOS DESDE TXT ==================
async function cargarJuegos() {

    try {

        const res = await fetch(`data/${epocaSeleccionada}.txt`);

        if (!res.ok) {
            throw new Error("No se encontró el archivo TXT");
        }

        const data = await res.text();

        juegos = data
            .trim()
            .split("\n")
            .filter(linea => linea.trim() !== "")
            .map(linea => {

                const [nombre, epoca, tam, precio, anio, img] = linea.split(";");

                return {
                    nombre,
                    epoca: epoca.toLowerCase(),
                    tam,
                    precio: Number(precio),
                    anio: Number(anio),
                    img
                };
            });

        render();

    } catch (err) {
        console.error("Error cargando juegos:", err);
        document.getElementById("catalogo").innerHTML =
            `<h2>Error al cargar juegos</h2>`;
    }
}

// ================== RENDER ==================
function render() {

    const contenedor = document.getElementById("catalogo");

    const filtrados = juegos.filter(j =>
        epocaSeleccionada === "todas" ||
        j.epoca === epocaSeleccionada
    );

    let html = "";

    filtrados.forEach(j => {

        html += `
        <div class="juego">

            <img src="${j.img}" onerror="this.src='img/sin.jpg'">

            <div class="info">

                <h3>${j.nombre}</h3>
                <p>Época: ${j.epoca}</p>
                <p>Tamaño: ${j.tam}</p>
                <p>Año: ${j.anio}</p>
                <p>USD ${j.precio.toFixed(2)}</p>

                <button onclick="agregar(this.dataset.nombre, Number(this.dataset.precio))"
                        data-nombre="${j.nombre}"
                        data-precio="${j.precio}">
                    Agregar al carrito
                </button>

            </div>

        </div>
        `;
    });

    contenedor.innerHTML = html;
}

// ================== FILTRO DE ÉPOCA ==================
function seleccionarEpoca(epoca) {
    epocaSeleccionada = epoca;
    cargarJuegos();
}

// ================== CARRITO ==================
function agregar(nombre, precio) {

    carrito.push({
        nombre: String(nombre),
        precio: Number(precio)
    });

    actualizar();
}

function eliminar(i) {
    carrito.splice(i, 1);
    actualizar();
}

// ================== ACTUALIZAR CARRITO ==================
function actualizar() {

    const contador = document.getElementById("cantidadCarrito");
    const lista = document.getElementById("listaCarrito");
    const totalHTML = document.getElementById("total");

    if (contador) contador.innerText = carrito.length;

    let html = "";
    total = 0;

    carrito.forEach((j, i) => {

        total += j.precio;

        html += `
        <div class="itemCarrito">
            ${j.nombre} - USD ${j.precio.toFixed(2)}
            <button onclick="eliminar(${i})">❌</button>
        </div>
        `;
    });

    if (lista) lista.innerHTML = html;
    if (totalHTML) totalHTML.innerHTML = `<b>Total: USD ${total.toFixed(2)}</b>`;
}

// ================== BUSCADOR ==================
function buscarJuego() {

    const texto = document.getElementById("buscar").value.toLowerCase();

    document.querySelectorAll(".juego").forEach(j => {

        const nombre = j.querySelector("h3").innerText.toLowerCase();

        j.style.display = nombre.includes(texto) ? "block" : "none";
    });
}

// ================== MOSTRAR TODOS ==================
function mostrarMas() {
    epocaSeleccionada = "antigua";
    cargarJuegos();
}

// ================== PAGO ==================
function irAPago() {

    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    window.location.href = "pago.html";
}

// ================== INICIO ==================
window.onload = function () {
    cargarJuegos();
    actualizar();
};
