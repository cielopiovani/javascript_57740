// Clase constructora para los productos
class Producto {
  constructor(
    id,
    titulo,
    precio,
    color,
    img,
    talles,
    cantRequerido = 0,
    talle = ""
  ) {
    this.id = id;
    this.titulo = titulo;
    this.precio = precio;
    this.color = color;
    this.img = img;
    this.talles = talles;
    this.cantRequerido = cantRequerido;
    this.talle = talle;
  }

  subTotal() {
    return this.cantRequerido * this.precio;
  }
}

function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarrito() {
  const carrito = localStorage.getItem("carrito");
  if (carrito) {
    const productos = JSON.parse(carrito);
    return productos.map(
      (p) =>
        new Producto(
          p.id,
          p.titulo,
          p.precio,
          p.color,
          p.img,
          p.talles,
          p.cantRequerido,
          p.talle
        )
    );
  }
  return [];
}

// Crear productos con un array de objetos
const prendas = [
  new Producto(
    1,
    "Corpiño Mar claro",
    30000,
    "natural",
    "../multimedia/producto_1.jpg",
    ["S", "M", "L", "XL", "2XL", "3XL"]
  ),
  new Producto(
    2,
    "Bombacha Mar claro",
    15000,
    "natural",
    "../multimedia/producto_2.jpg",
    ["S", "M", "L", "XL", "2XL", "3XL"]
  ),
  new Producto(
    3,
    "Musculosa Margarita",
    30000,
    "rojo",
    "../multimedia/producto_3.jpg",
    ["S", "M", "L", "XL", "2XL", "3XL"]
  ),
  new Producto(
    4,
    "Calza corta ciclista",
    15500,
    "rojo",
    "../multimedia/producto_4.jpg",
    ["S", "M", "L", "XL", "2XL", "3XL"]
  ),
];

// Crear y enviar el contenido de los productos
function renderizarProductos() {
  const container = document.getElementById("products-container");
  container.innerHTML = "";

  prendas.forEach((producto) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
          <h3>${producto.titulo} (${producto.color})</h3>
          <img src="${producto.img}" alt="${producto.titulo}">
          <p>Precio: $${producto.precio}</p>
          <label for="talle-${producto.id}">Seleccionar Talle:</label>
          <select id="talle-${producto.id}">
              ${producto.talles
                .map((talle) => `<option value="${talle}">${talle}</option>`)
                .join("")}
          </select>
          <input type="number" id="cantidad-${
            producto.id
          }" min="1" placeholder="Cantidad" />
          <button onclick="agregarAlCarrito(${
            producto.id
          })">Agregar al carrito</button>
      `;
    container.appendChild(div);
  });
}

//!CARRITO

// Agregar al carrito
function agregarAlCarrito(id) {
  const cantidad = parseInt(document.getElementById(`cantidad-${id}`).value);
  const talle = document.getElementById(`talle-${id}`).value;

  if (isNaN(cantidad) || cantidad <= 0) {
    alert("Por favor, ingresa una cantidad válida.");
    return;
  }

  const carrito = cargarCarrito();
  const productoExistenteIndex = carrito.findIndex(
    (p) => p.id === id && p.talle === talle
  );

  if (productoExistenteIndex !== -1) {
    carrito[productoExistenteIndex].cantRequerido += cantidad;
  } else {
    const producto = prendas.find((p) => p.id === id);
    if (producto) {
      carrito.push(
        new Producto(
          producto.id,
          producto.titulo,
          producto.precio,
          producto.color,
          producto.img,
          producto.talles,
          cantidad,
          talle
        )
      );
    }
  }

  guardarCarrito(carrito);
  actualizarCarrito();
}

// Mostrar el carrito
function mostrarCarrito() {
  const carrito = cargarCarrito();
  const cartContainer = document.getElementById("cart-container");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = "";
  let total = 0;

  carrito.forEach((producto) => {
    if (producto.cantRequerido > 0) {
      const li = document.createElement("li");
      li.innerHTML = `
              <img src="${producto.img}">
              ${producto.titulo} (${producto.talle}) - Cantidad: ${
        producto.cantRequerido
      } - Subtotal: $${producto.subTotal()}
          `;
      cartItems.appendChild(li);
      total += producto.subTotal();
    }
  });

  cartTotal.innerText = `Total: $${total}`;
  cartContainer.style.display = "block";
}

document.getElementById("close-cart").addEventListener("click", cerrarCarrito);

// Cerrar carrito
function cerrarCarrito() {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.style.display = "none";
}

// Actualizar carrito
function actualizarCarrito() {
  mostrarCarrito();
}

// Finalizar el carrito
function finalizarCompra() {
  const carrito = cargarCarrito();
  const total = carrito.reduce((acc, producto) => acc + producto.subTotal(), 0);
  const dto = descuento(
    carrito.reduce((acc, producto) => acc + producto.cantRequerido, 0)
  );
  const totalConDescuento = total * (1 - dto / 100);

  document.getElementById("cart-container").innerHTML = `
      <h2>Compra Finalizada</h2>
      <p>El precio total de tu compra es: $${totalConDescuento.toFixed(
        2
      )} (Descuento aplicado: ${dto}%)</p>
      <button id="close-cart">Cerrar</button>
  `;
  document
    .getElementById("close-cart")
    .addEventListener("click", cerrarCarrito);

  vaciarCarrito();
}

// Vaciar el carrito
function vaciarCarrito() {
  localStorage.removeItem("carrito");
  actualizarCarrito();
}

//!APLICACION DE DESCUENTO

function descuento(cantidad) {
  if (cantidad >= 6) {
    return 25.0;
  } else if (cantidad >= 4) {
    return 15.0;
  } else {
    return 0.0;
  }
}

document.getElementById("view-cart").addEventListener("click", mostrarCarrito);
document.getElementById("checkout").addEventListener("click", finalizarCompra);

renderizarProductos();
