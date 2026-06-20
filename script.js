let carrito = [];
let total = 0;

let epocaSeleccionada = "todas";
let mostrarTodos = true;

// ================== BASE DE DATOS ==================
const juegos = [
    {
        nombre: "Assassin's Creed Origins",
        epoca: "Antigua",
        tam: "45 GB",
        precio: 29.99,
        anio: 2017,
        img: "img/ac_origins.jpg"
    },
    {
        nombre: "Ryse: Son of Rome",
        epoca: "Antigua",
        tam: "25 GB",
        precio: 19.99,
        anio: 2014,
        img: "img/ryse.jpg"
    },
    {
        nombre: "Total War: Rome II",
        epoca: "Antigua",
        tam: "30 GB",
        precio: 24.99,
        anio: 2013,
        img: "img/rome2.jpg"
    },
    {
        nombre: "Kingdom Come Deliverance",
        epoca: "Medieval",
        tam: "60 GB",
        precio: 39.99,
        anio: 2018,
        img: "img/kingdom.jpg"
    }
];

// ================== CARGAR JUEGOS ==================
function cargarJuegos() {

    try {

        let html = "";

        const filtrados = juegos.filter(j => {
            return epocaSeleccionada === "todas" || j.epoca === epocaSeleccionada;
        });

        filtrados.forEach(juego => {

            html += `
            <div class="juego">

                <img src="${juego.img}"
                     alt="${juego.nombre}"
                     onerror="this.src='img/sin.jpg'">

                <div class="info">

                    <h3>${juego.nombre}</h3>
                    <p>Época: ${juego.epoca}</p>
                    <p>Tamaño: ${juego.tam}</p>
                    <p>Año: ${juego.anio}</p>
                    <p>USD ${juego.precio.toFixed(2)}</p>

                    <button onclick='agregar(${JSON.stringify(juego.nombre)}, ${juego.precio})'>
                        Agregar al carrito
                    </button>

                </div>

            </div>
            `;
        });

        document.getElementById("catalogo").innerHTML = html;

    } catch (error) {

        console.error(error);

        document.getElementById("catalogo").innerHTML =
            `<h2>Error al cargar los juegos</h2><p>${error.message}</p>`;
    }
}

// ================== FILTRO ÉPOCA ==================
function seleccionarEpoca(epoca) {
    epocaSeleccionada = epoca;
    cargarJuegos();
}

// ================== CARRITO ==================
function agregar(nombre, precio) {

    carrito.push({
        nombre,
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

// ================== BÚSQUEDA ==================
function buscarJuego() {

    const texto = document.getElementById("buscar").value.toLowerCase();

    document.querySelectorAll(".juego").forEach(juego => {

        const nombre = juego.querySelector("h3").innerText.toLowerCase();

        juego.style.display = nombre.includes(texto) ? "block" : "none";
    });
}

// ================== MOSTRAR MÁS ==================
function mostrarMas() {
    mostrarTodos = true;
    cargarJuegos();
}

// ================== PAGO ==================
function pagar() {

    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    window.location.href = "pago.html";
}

// ================== INICIO (IMPORTANTE) ==================
window.onload = function () {
    cargarJuegos();
    actualizar();
};
    guardarCarrito();
    actualizar();
}

function actualizar() {

    document.getElementById("cantidadCarrito").innerText = carrito.length;

    let html = "";
    total = 0;

    carrito.forEach((j, i) => {

        total += Number(j.precio);

        html += `
        <div class="itemCarrito">

            ${j.nombre} - USD ${Number(j.precio).toFixed(2)}

            <button onclick="eliminar(${i})">
                ❌
            </button>

        </div>
        `;
    });

    document.getElementById("listaCarrito").innerHTML = html;

    document.getElementById("total").innerHTML =
        `<b>Total: USD ${total.toFixed(2)}</b>`;
}

function buscarJuego() {

    const texto = document
        .getElementById("buscar")
        .value
        .toLowerCase();

    document.querySelectorAll(".juego").forEach(juego => {

        const nombre = juego
            .querySelector("h3")
            .innerText
            .toLowerCase();

        juego.style.display =
            nombre.includes(texto) ? "block" : "none";
    });
}

function mostrarMas() {
    mostrarTodos = true;
    cargarJuegos();
}

function pagar() {

    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    window.location.href = "pago.html";
}

window.onload = function () {
    cargarJuegos();
    actualizar();
};                    <h3>${nombre}</h3>

                    <p>Época: ${epoca}</p>
                    <p>Tamaño: ${tam}</p>
                    <p>USD ${precio.toFixed(2)}</p>
                    <p>Año: ${anio}</p>

                    <button onclick='agregar(${JSON.stringify(nombre)}, ${precio})'>
                        Agregar al carrito
                    </button>

                </div>

            </div>
            `;
        }

        document.getElementById("catalogo").innerHTML = html;

    } catch (error) {

        console.error(error);

        document.getElementById("catalogo").innerHTML = `
            <h2>Error al cargar los juegos</h2>
        `;
    }
}

function seleccionarEpoca(epoca) {
    epocaSeleccionada = epoca;
    mostrarTodos = false;
    cargarJuegos();
}

function agregar(nombre, precio) {

    carrito.push({
        nombre: nombre,
        precio: Number(precio)
    });

    guardarCarrito();
    actualizar();

    alert(nombre + " agregado al carrito");
}

function eliminar(i) {

    carrito.splice(i, 1);

    guardarCarrito();
    actualizar();
}

function actualizar() {

    document.getElementById("cantidadCarrito").innerText = carrito.length;

    let html = "";
    total = 0;

    carrito.forEach((j, i) => {

        total += Number(j.precio);

        html += `
        <div class="itemCarrito">

            ${j.nombre} - USD ${Number(j.precio).toFixed(2)}

            <button onclick="eliminar(${i})">
                ❌
            </button>

        </div>
        `;
    });

    document.getElementById("listaCarrito").innerHTML = html;

    document.getElementById("total").innerHTML =
        `<b>Total: USD ${total.toFixed(2)}</b>`;
}

function buscarJuego() {

    const texto = document
        .getElementById("buscar")
        .value
        .toLowerCase();

    document.querySelectorAll(".juego").forEach(juego => {

        const nombre = juego
            .querySelector("h3")
            .innerText
            .toLowerCase();

        juego.style.display =
            nombre.includes(texto) ? "block" : "none";
    });
}

function mostrarMas() {
    mostrarTodos = true;
    cargarJuegos();
}

function irAPago() {

    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    window.location.href = "pago.html";
}

window.onload = () => {
    cargarJuegos();
    actualizar();
};                </div>
            `;
        }

        document.getElementById("catalogo").innerHTML = html;

    } catch (error) {

        console.error(error);

        document.getElementById("catalogo").innerHTML = `
            <div style="padding:20px;color:red;">
                <h2>Error al cargar los juegos</h2>
                <p>${error.message}</p>
            </div>
        `;
    }
}
