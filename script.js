let carrito = [];
let total = 0;

let epocaSeleccionada = "antigua";
let juegos = [];

let juegosMostrados = 6;
let incremento = 6;

// ================== CARGAR JUEGOS ==================
async function cargarJuegos() {

    try {

        const res = await fetch(`data/${epocaSeleccionada}.txt`);

        if (!res.ok) {
            throw new Error("No se pudo cargar el archivo");
        }

        const data = await res.text();

        juegos = data
            .trim()
            .split("\n")
            .filter(linea => linea.trim() !== "")
            .map(linea => {

                const [nombre, epoca, tam, precio, anio, img] =
                    linea.split(";").map(x => x.trim());

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

    } catch (error) {

        console.error(error);

        document.getElementById("catalogo").innerHTML =
            "<h2>Error cargando juegos</h2>";
    }
}

// ================== RENDER ==================
function render() {

    const contenedor = document.getElementById("catalogo");

    const filtrados = juegos.filter(j =>
        epocaSeleccionada === "todas" ||
        j.epoca === epocaSeleccionada
    );

    const visibles = filtrados.slice(0, juegosMostrados);

    let html = "";

    visibles.forEach((j, index) => {

        html += `
        <div class="juego" style="animation-delay:${index * 80}ms">

            <img src="${j.img}" onerror="this.src='img/sin.jpg'">

            <div class="info">

                <h3>${j.nombre}</h3>

                <p>Época: ${j.epoca}</p>
                <p>Tamaño: ${j.tam}</p>
                <p>Año: ${j.anio}</p>
                <p>USD ${j.precio.toFixed(2)}</p>

                <button onclick="agregarPorIndice(${index})">
                    Agregar al carrito
                </button>

            </div>

        </div>
        `;
    });

    contenedor.innerHTML = html;

    const btn = document.getElementById("btnMas");

    if (btn) {
        btn.style.display =
            juegosMostrados >= filtrados.length
                ? "none"
                : "block";
    }
}

// ================== AGREGAR AL CARRITO ==================
function agregarPorIndice(indice) {

    const filtrados = juegos.filter(j =>
        epocaSeleccionada === "todas" ||
        j.epoca === epocaSeleccionada
    );

    const juego = filtrados[indice];

    if (!juego) return;

    carrito.push({
        nombre: juego.nombre,
        precio: Number(juego.precio)
    });

    actualizar();
}

// ================== MÁS JUEGOS ==================
function cargarMas() {
    juegosMostrados += incremento;
    render();
}

// ================== FILTROS ==================
function seleccionarEpoca(epoca) {

    epocaSeleccionada = epoca;

    juegosMostrados = 6;

    cargarJuegos();
}

// ================== ELIMINAR ==================
function eliminar(i) {

    carrito.splice(i, 1);

    actualizar();
}

// ================== ACTUALIZAR CARRITO ==================
function actualizar() {

    const contador = document.getElementById("cantidadCarrito");
    const lista = document.getElementById("listaCarrito");
    const totalHTML = document.getElementById("total");

    if (contador) {
        contador.innerText = carrito.length;
    }

    let html = "";
    total = 0;

    carrito.forEach((juego, i) => {

        total += juego.precio;

        html += `
        <div class="itemCarrito">

            ${juego.nombre} - USD ${juego.precio.toFixed(2)}

            <button onclick="eliminar(${i})">
                ❌
            </button>

        </div>
        `;
    });

    if (lista) {
        lista.innerHTML = html;
    }

    if (totalHTML) {
        totalHTML.innerHTML =
            `<b>Total: USD ${total.toFixed(2)}</b>`;
    }
}

// ================== BUSCADOR ==================
function buscarJuego() {

    const texto =
        document.getElementById("buscar")
        .value
        .toLowerCase();

    document.querySelectorAll(".juego").forEach(juego => {

        const nombre =
            juego.querySelector("h3")
            .innerText
            .toLowerCase();

        juego.style.display =
            nombre.includes(texto)
                ? "block"
                : "none";
    });
}

// ================== PAGO ==================
function irAPago() {

    if (carrito.length === 0) {

        alert("El carrito está vacío");

        return;
    }

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    window.location.href = "pago.html";
}

// ================== INICIO ==================
window.onload = function () {

    cargarJuegos();

    actualizar();
};
