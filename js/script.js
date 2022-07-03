const precios = [];
const nombres = [];
fetch("./data.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((data) => {
      precios.push(data.precio);
    });
    data.forEach((data) => {
      nombres.push(data.nombre);
    });
  });

window.onload = function () {
  retrieveData();
};
function retrieveData() {
  document.getElementById("header(0)").innerHTML = localStorage.getItem("cantidadDS");
  document.getElementById("header(1)").innerHTML = localStorage.getItem("cantidadDS1");
  document.getElementById("header(2)").innerHTML = localStorage.getItem("cantidadDS2");
  document.getElementById("header(3)").innerHTML = localStorage.getItem("cantidadDS3");
  document.getElementById("header(4)").innerHTML = localStorage.getItem("cantidadBB");
  localStorage.getItem("cart") ? "" : localStorage.setItem("cart", "[]");
  JSON.parse(localStorage.getItem("cart")).reduce((a, b) => a + b, 0) > 1 ? calcularPrecios() : "";
}

/********************* LOGIN SIMPLE *********************/
// boton submit

let submit = document.getElementById("submit");

// guardar el nombre

submit.onclick = () => {
  localStorage.setItem("nombreUsuario", document.getElementById("username").value);
};

// nombre a mostrar al lado del bienvenido

let saludo = document.getElementById("titular");
saludo.innerText = "Bienvenido " + localStorage.getItem("nombreUsuario") + "!";

// declaro para que sea mas facil de usar
let usuario = localStorage.getItem("nombreUsuario");

// funcion para esconder el contenido de la pantalla y el que es para mostrar
let esconderTodo = () => {
  document.getElementById("titular").className = "hiddenDos";
  document.getElementById("main").className = "hiddenDos";
  document.getElementById("cambiarNombre").className = "hiddenDos";
  document.getElementById("modal").className = "hiddenDos"
};

let mostrarTodo = () => {
  document.getElementById("login").className = "hiddenDos";
};

// operador avanzado del login simple que tenia antes
// condicion ? caso 1 : caso 2
// si la condicion se cumple se hace el caso 1, sino el caso 2
usuario == false || usuario == null ? esconderTodo() : mostrarTodo();

let cambiarNombre = document.getElementById("cambiarNombre");

cambiarNombre.onclick = () => {
  localStorage.removeItem("nombreUsuario");
  window.location.reload();
};
/********************* FIN LOGIN SIMPLE *********************/

/********************* TOASTIFY *********************/
let notificacionVacio = () =>
  Toastify({
    text: "No lo añadiste a tu carrito!",
    style: {
      background: "rgb(2,0,36)",
      background: "linear-gradient(90deg, rgba(2,0,36,1) 87%, rgba(119,61,61,1) 92%)",
    },
    duration: 2000,
  }).showToast();

let sacadoDelCarrito = () =>
  Toastify({
    text: "Lo quitaste de tu carrito",
    style: {
      background: "rgb(2,0,36)",
      background: "linear-gradient(90deg, rgba(2,0,36,1) 87%, rgba(119,61,61,1) 92%)",
    },
    duration: 2000,
  }).showToast();

let aniadidoAlCarrito = () =>
  Toastify({
    text: "Se añadió " + nombreJuego + " al carrito.",
    style: {
      background: "rgb(2,0,36)",
      background: "linear-gradient(90deg, rgba(2,0,36,1) 87%, rgba(119,61,61,1) 92%)",
    },
    duration: 2000,
  }).showToast();
/********************* FIN TOASTIFY *********************/

/********************* COMIENZO DEL CARRITO *********************/

// Carrito
let arrayCarrito = [];

let calcularPrecios = () => {
  let precioCarrito = document.getElementById("precioCarrito");
  precioCarrito.innerText = `El valor de tu carrito es: ARS$${JSON.parse(localStorage.getItem("cart")).reduce(
    (a, b) => a + b,
    0
  )}`;
};

/********************* FIN DEL CARRITO *********************/

// Funcion para sumar el juego al carrito

function sumarJuego(nombre, valor, i) {
  arrayCarrito = JSON.parse(localStorage.getItem(nombre));
  arrayCarrito.push(valor); // push al arrayCarrito
  localStorage.setItem(nombre, JSON.stringify(arrayCarrito));
  nombreJuego = nombres[i];
  renderNumeros(i);
  calcularPrecios();
  aniadidoAlCarrito();
}

// si no existen en el localStorage los creo con un valor de 0
localStorage.getItem("cantidadDS") ? "" : localStorage.setItem("cantidadDS", 0);
localStorage.getItem("cantidadDS1") ? "" : localStorage.setItem("cantidadDS1", 0);
localStorage.getItem("cantidadDS2") ? "" : localStorage.setItem("cantidadDS2", 0);
localStorage.getItem("cantidadDS3") ? "" : localStorage.setItem("cantidadDS3", 0);
localStorage.getItem("cantidadBB") ? "" : localStorage.setItem("cantidadBB", 0);
// contadores
let contadorDS = localStorage.getItem("cantidadDS");
let contadorDS1 = localStorage.getItem("cantidadDS1");
let contadorDS2 = localStorage.getItem("cantidadDS2");
let contadorDS3 = localStorage.getItem("cantidadDS3");
let contadorBB = localStorage.getItem("cantidadBB");
// el contador de cuantos juegos se compra
function renderNumeros(i) {
  let header = document.getElementById(`header(${i})`);
  if (i === 0) {
    contadorDS++;
    header.innerText = contadorDS;
    localStorage.setItem("cantidadDS", contadorDS);
  } else if (i === 1) {
    contadorDS1++;
    header.innerText = contadorDS1;
    localStorage.setItem("cantidadDS1", contadorDS1);
  } else if (i === 2) {
    contadorDS2++;
    header.innerText = contadorDS2;
    localStorage.setItem("cantidadDS2", contadorDS2);
  } else if (i === 3) {
    contadorDS3++;
    header.innerText = contadorDS3;
    localStorage.setItem("cantidadDS3", contadorDS3);
  } else if (i === 4) {
    contadorBB++;
    header.innerText = contadorBB;
    localStorage.setItem("cantidadBB", contadorBB);
  }
}

// Funcion para restar un juego del carrito

function restarNumero(i) {
  let header = document.getElementById(`header(${i})`);
  if (i === 0) {
    contadorDS--;
    header.innerText = contadorDS;
    localStorage.setItem("cantidadDS", contadorDS);
  } else if (i === 1) {
    contadorDS1--;
    header.innerText = contadorDS1;
    localStorage.setItem("cantidadDS1", contadorDS1);
  } else if (i === 2) {
    contadorDS2--;
    header.innerText = contadorDS2;
    localStorage.setItem("cantidadDS2", contadorDS2);
  } else if (i === 3) {
    contadorDS3--;
    header.innerText = contadorDS3;
    localStorage.setItem("cantidadDS3", contadorDS3);
  } else if (i === 4) {
    contadorBB--;
    header.innerText = contadorBB;
    localStorage.setItem("cantidadBB", contadorBB);
  }
}

// lo comento todo por si me olvido

function restarJuego(nombre, valor, i) {
  // tomo los 3 valores que necesito
  if (localStorage.getItem(nombre) === null) {
    notificacionVacio(); // si NO existe en el storage tira error
  } else {
    let data = JSON.parse(localStorage.getItem(nombre));
    let indiceRestar = data.indexOf(valor);
    if (indiceRestar == -1) {
      notificacionVacio(); // si no hay ninguno en el carrito
    } else {
      data.splice(indiceRestar, 1);
      localStorage.setItem(nombre, JSON.stringify(data));
      let sacar = arrayCarrito.indexOf(precios[i]);
      sacar !== -1 && arrayCarrito.splice(sacar, 1);
      sacadoDelCarrito();
      restarNumero(i);
      calcularPrecios();
      // si existe en el carrito, busco el valor, splice
    }
  }
}

// Funcion de simular la compra

function compraTerminada() {
  Swal.fire({
    icon: "success",
    title: `Muchas gracias por su compra, ${usuario}.`,
    text: "Su entrega será realizada en 48hrs hábiles",
    showConfirmButton: false,
    timer: 2500,
    width: "50%",
  });
}

// CAJITA MODAL (robada del internet)

let modal = document.getElementById("myModal");

// Boton que abre la caja modal
let btn = document.getElementById("myBtn");

// El elemento <span> que cierra el modal
let span = document.getElementsByClassName("close")[0];

// Cuando el usuario apreta el boton, abrir el modal

btn.onclick = function () {
  modal.style.display = "block";
};

// Cuando el usuario apreta la X (span) cerrar el modal
span.onclick = function () {
  modal.style.display = "none";
};

// cuando el usuario apreta en cualquier lugar que no sea el modal, cerrar
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};