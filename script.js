const imagenes = {
    "Assassin's Creed Origins": "img/ac_origins.jpg",
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

function guardarCarrito(){
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

async function cargarJuegos(){

    const res = await fetch(epocaSeleccionada + ".txt");
    const data = await res.text();

    const lineas = data.trim().split("\n");

    let html = "";

    for(let i = 0; i < lineas.length; i++){

        if(!mostrarTodos && i >= 3) continue;

        const d = lineas[i].split(";");

        const nombre = d[0];
        const epoca = d[1];
        const tam = d[2];
        const precio = parseFloat(d[3]);
        const anio = d[4];

        const img = imagenes[nombre] || "img/sin.jpg";

        html += `
        <div class="juego">

            <img src="${img}">

            <div class="info">

                <h3>${nombre}</h3>
                <p>${epoca}</p>
                <p>${tam}</p>
                <p>USD ${precio.toFixed(2)}</p>
                <p>${anio}</p>

                <button onclick="agregar('${nombre}', ${precio})">
                    Agregar
                </button>

            </div>

        </div>
        `;
    }

    document.getElementById("catalogo").innerHTML = html;
}

function seleccionarEpoca(e){
    epocaSeleccionada = e;
    mostrarTodos = false;
    cargarJuegos();
}

function agregar(nombre, precio){

    carrito.push({nombre, precio});
    guardarCarrito();
    actualizar();
}

function eliminar(i){

    carrito.splice(i,1);
    guardarCarrito();
    actualizar();
}

function actualizar(){

    document.getElementById("cantidadCarrito").innerText = carrito.length;

    let html = "";
    total = 0;

    carrito.forEach((j,i)=>{

        total += j.precio;

        html += `
        <div class="itemCarrito">

            ${j.nombre} - USD ${j.precio.toFixed(2)}

            <button onclick="eliminar(${i})">❌</button>

        </div>
        `;
    });

    document.getElementById("listaCarrito").innerHTML = html;

    document.getElementById("total").innerHTML =
        `<b>Total: USD ${total.toFixed(2)}</b>`;
}

function buscarJuego(){

    const t = document.getElementById("buscar").value.toLowerCase();

    document.querySelectorAll(".juego").forEach(j=>{

        const nombre = j.querySelector("h3").innerText.toLowerCase();

        j.style.display = nombre.includes(t) ? "block" : "none";
    });
}

function mostrarMas(){
    mostrarTodos = true;
    cargarJuegos();
}

function irAPago(){

    localStorage.setItem("carrito", JSON.stringify(carrito));
    window.location.href = "pago.html";
}

window.onload = ()=>{
    cargarJuegos();
    actualizar();
};
