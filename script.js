const imagenes = {
    "Assassins Creed Origins": "img/ac_origins.jpg",
    "Ryse: Son of Rome": "img/ryse.jpg",
    "Total War: Rome II": "img/rome2.jpg",
    "Kingdom Come Deliverance": "img/kingdom_come.jpg",
    "A Plague Tale Innocence": "img/plague_tale.jpg",
    "Crusader Kings III": "img/ck3.jpg",
    "Mafia Definitive Edition": "img/mafia.jpg",
    "L.A. Noire": "img/lanoire.jpg",
    "Grand Theft Auto V": "img/gta5.jpg",
    "Cyberpunk 2077": "img/cyberpunk2077.jpg",
    "Deus Ex Human Revolution": "img/deus_ex.jpg",
    "Detroit Become Human": "img/detroit.jpg"
};

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = 0;
let epocaSeleccionada = "antigua";
let mostrarTodos = false;

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

async function cargarJuegos() {

    try {

        const res = await fetch(epocaSeleccionada + ".txt");

        if (!res.ok) {
            throw new Error("No se encontró " + epocaSeleccionada + ".txt");
        }

        const data = await res.text();
        const lineas = data.trim().split("\n");

        let html = "";

        for (let i = 0; i < lineas.length; i++) {

            if (!mostrarTodos && i >= 3) continue;

            const d = lineas[i].trim().split(";");

            if (d.length < 5) continue;

            const nombre = d[0].trim();
            const epoca = d[1].trim();
            const tam = d[2].trim();
            const precio = parseFloat(d[3]);
            const anio = d[4].trim();

            const img = imagenes[nombre] || "img/sin.jpg";

            html += `
                <div class="juego">

                    <img
                        src="${img}"
                        alt="${nombre}"
                        onerror="this.src='img/sin.jpg'">

                    <div class="info">

                        <h3>${nombre}</h3>

                        <p>Época: ${epoca}</p>
                        <p>Tamaño: ${tam}</p>
                        <p>USD ${precio.toFixed(2)}</p>
                        <p>Año: ${anio}</p>

                        <button
                            class="btnAgregar"
                            data-nombre="${nombre}"
                            data-precio="${precio}">
                            Agregar al carrito
                        </button>

                    </div>

                </div>
            `;
        }

        document.getElementById("catalogo").innerHTML = html;

        document.querySelectorAll(".btnAgregar").forEach(btn => {

            btn.addEventListener("click", function () {

                agregar(
                    this.dataset.nombre,
                    Number(this.dataset.precio)
                );

            });

        });

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

window.onload = function () {
    cargarJuegos();
    actualizar();
};    cargarJuegos();
    actualizar();
};
