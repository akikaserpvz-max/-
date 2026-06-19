let carrito = [];
let total = 0;
let epoca = "antigua";

// ================= JUEGOS =================
const imagenes = {
    "Assassin's Creed Origins": "img/ac.jpg",
    "Ryse: Son of Rome": "img/ryse.jpg",
    "Total War: Rome II": "img/rome2.jpg",
    "Kingdom Come Deliverance": "img/kingdom.jpg",
    "A Plague Tale Innocence": "img/plague.jpg",
    "Crusader Kings III": "img/ck3.jpg",
    "Mafia Definitive Edition": "img/mafia.jpg",
    "L.A. Noire": "img/lanoire.jpg",
    "GTA V": "img/gta5.jpg",
    "Cyberpunk 2077": "img/cyberpunk.jpg"
};

// ================= CARGA =================
async function cargarJuegos(){

    const res = await fetch(epoca + ".txt");
    const data = await res.text();

    let html = "";

    data.trim().split("\n").forEach(linea => {

        const d = linea.split(";");

        const nombre = d[0];
        const precio = parseFloat(d[3]);

        const img = imagenes[nombre] || "img/default.jpg";

        html += `
        <div class="juego">

            <img src="${img}">

            <h3>${nombre}</h3>

            <p>$${precio}</p>

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
function seleccionarEpoca(e){
    epoca = e;
    cargarJuegos();
}

// ================= CARRITO =================
function agregar(nombre,precio){

    carrito.push({nombre,precio});
    total += precio;

    actualizar();
}

function eliminar(i){

    total -= carrito[i].precio;
    carrito.splice(i,1);

    actualizar();
}

function actualizar(){

    document.getElementById("cantidadCarrito").innerText = carrito.length;

    const lista = document.getElementById("listaCarrito");

    lista.innerHTML = "";

    carrito.forEach((j,i)=>{

        const div = document.createElement("div");
        div.className = "itemCarrito";

        div.innerHTML = `
            ${j.nombre} - $${j.precio}
            <button onclick="eliminar(${i})">❌</button>
        `;

        lista.appendChild(div);
    });

    document.getElementById("total").innerHTML =
        "<b>Total: $" + total.toFixed(2) + "</b>";
}

// ================= BOTONES (ESTABLE) =================
document.addEventListener("click", (e)=>{

    if(e.target.classList.contains("btn-add")){

        const nombre = e.target.dataset.nombre;
        const precio = parseFloat(e.target.dataset.precio);

        agregar(nombre,precio);

        e.target.innerText = "Agregado ✔";
        e.target.disabled = true;
    }
});

// ================= PAGAR =================
function pagar(){

    if(carrito.length === 0){
        alert("Carrito vacío");
        return;
    }

    alert("Compra realizada ✔");
    carrito = [];
    total = 0;
    actualizar();
}

// ================= INICIO =================
window.onload = ()=>{
    cargarJuegos();
    actualizar();
};
