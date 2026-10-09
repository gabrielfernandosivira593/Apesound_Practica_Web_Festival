if (window.AOS) {
    AOS.init({
        duration: 1000,      // duración en ms
        easing: 'ease-out-back',
        offset: 80,         // px antes de que el elemento entre en pantalla
        once: true
    });
}

// ===== COUNTDOWN HASTA EL FESTIVAL =====

// Fecha objetivo: 17/07/2027 a las 18:00
var fechaFestival = new Date("2027-06-12T18:00:00");

function actualizarCountdown() {

  var ahora = new Date();

  // Diferencia en milisegundos entre la fecha del festival y ahora
  var diferencia = fechaFestival - ahora;

  if (diferencia <= 0) {
    // El festival ya ha empezado o ha pasado
    document.getElementById("dias").textContent = "00";
    document.getElementById("horas").textContent = "00";
    document.getElementById("minutos").textContent = "00";
    document.getElementById("segundos").textContent = "00";

  } else {

    // 1000 ms = 1 segundo, 1000*60 = 1 minuto, etc.
    // Math.floor() redondea hacia abajo (quitamos los decimales)
    var dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    var horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    var segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    document.getElementById("dias").textContent = dias;
    document.getElementById("horas").textContent = horas;
    document.getElementById("minutos").textContent = minutos;
    document.getElementById("segundos").textContent = segundos;
  }
}

// Lo ejecutamos una vez nada más cargar la página...
actualizarCountdown();

// ...y luego lo repetimos cada 1000 ms (1 segundo) para que vaya avanzando
setInterval(actualizarCountdown, 1000);

// ===== MENÚ MÓVIL (navbar) =====
var navToggle = document.getElementById("navToggle");
var navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", function () {
  navMenu.classList.toggle("active");
});

// ===== NAVBAR: cambia de color al hacer scroll =====
// Empieza transparente (sobre el hero) y se vuelve sólido
// en cuanto el usuario baja más de 50px, para que no se mezcle
// visualmente con el contenido de las secciones.
 
var navbar = document.querySelector(".navbar");
 
window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
});


// ===== GALERÍA: PhotoSwipe =====
// "gallery" es el contenedor con las fotos y "children" indica qué elementos
// de dentro son las fotos (los enlaces <a>). Al hacer click en una, se abre
// en grande en un modal con navegación, zoom y cierre.
 
var lightbox = new PhotoSwipeLightbox({
  gallery: "#galeria-fotos",
  children: "a",
  pswpModule: PhotoSwipe
});
 
lightbox.init();
 
// ===== MODAL "VER DETALLES" DE LAS ENTRADAS =====
// Hay un único modal en el HTML. Lo rellenamos con el título y el texto
// que corresponda según el botón que se haya pulsado.
 
var modalOverlay = document.getElementById("modalOverlay");
var modalTitulo = document.getElementById("modalTitulo");
var modalTexto = document.getElementById("modalTexto");
var modalCerrar = document.getElementById("modalCerrar");
 
function abrirModal(titulo, texto) {
  modalTitulo.textContent = titulo;
  modalTexto.textContent = texto;
  modalOverlay.classList.remove("hidden");
}
 
function cerrarModal() {
  modalOverlay.classList.add("hidden");
}
 
// Cerrar con el botón ✕
modalCerrar.addEventListener("click", cerrarModal);
 
// Cerrar también si se hace click en el fondo oscuro (fuera de la caja)
modalOverlay.addEventListener("click", function (evento) {
  if (evento.target === modalOverlay) {
    cerrarModal();
  }
});
 
var botonAbono = document.getElementById("boton-abono");
botonAbono.addEventListener("click", function () {
  abrirModal("Abono 3 días", "Incluye acceso a todos los escenarios y zona de acampada.");
});
 
var botonDia = document.getElementById("boton-dia");
botonDia.addEventListener("click", function () {
  abrirModal("Entrada día", "Elige el día al finalizar la compra online.");
});
 
var botonVip = document.getElementById("boton-vip");
botonVip.addEventListener("click", function () {
  abrirModal("VIP", "Zona VIP con barra exclusiva y mejor visibilidad del escenario.");
});