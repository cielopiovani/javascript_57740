//! CONSTRUCCIÓN

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

// Cargar los productos desde el archivo JSON
function cargarProductos() {
  return fetch("../productos.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cargar los productos");
      }
      return response.json();
    })
    .then((data) => {
      return data.map(
        (producto) =>
          new Producto(
            producto.id,
            producto.titulo,
            producto.precio,
            producto.color,
            producto.img,
            producto.talles
          )
      );
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("products-container").innerHTML = `
        <p>Error al cargar los productos. Por favor, inténtalo de nuevo más tarde.</p>
      `;
      return [];
    });
}

// Renderizar productos
function renderizarProductos(productos) {
  const container = document.getElementById("products-container");
  container.innerHTML = "";

  if (!Array.isArray(productos)) {
    console.error("El parámetro productos no es un arreglo válido.");
    return;
  }

  productos.forEach((producto) => {
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

// Inicializar y cargar los productos
function init() {
  cargarProductos().then((productos) => {
    if (Array.isArray(productos)) {
      renderizarProductos(productos);
    } else {
      console.error("No se pudieron cargar los productos.");
    }
  });
}

init();

//! FUNCIONALIDAD DEL CARRITO

// Agregar al carrito
function agregarAlCarrito(id) {
  const cantidad = parseInt(document.getElementById(`cantidad-${id}`).value);
  const talle = document.getElementById(`talle-${id}`).value;

  if (isNaN(cantidad) || cantidad <= 0) {
    Toastify({
      text: "Por favor, ingresa cantidad",
      duration: 3000,
      gravity: "top",
      position: "right",
      style: { background: "red" },
    }).showToast();
    return;
  }

  const carrito = cargarCarrito();
  const productoExistenteIndex = carrito.findIndex(
    (p) => p.id === id && p.talle === talle
  );

  if (productoExistenteIndex !== -1) {
    carrito[productoExistenteIndex].cantRequerido += cantidad;
  } else {
    cargarProductos().then((productos) => {
      if (!Array.isArray(productos)) {
        console.error("No se pudo obtener la lista de productos.");
        return;
      }

      const producto = productos.find((p) => p.id === id);
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
        guardarCarrito(carrito);
        actualizarCarrito();

        Toastify({
          text: "Bien! Producto agregado",
          duration: 3000,
          gravity: "top",
          position: "right",
          style: { background: "green" },
        }).showToast();
      }
    });
  }

  // Actualizar el carrito en localStorage
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

  carrito.forEach((producto, index) => {
    if (producto.cantRequerido > 0) {
      const li = document.createElement("li");
      li.innerHTML = `
              <img src="${producto.img}">
              ${producto.titulo} (${producto.talle}) - Cantidad: ${
        producto.cantRequerido
      } - Subtotal: $${producto.subTotal()}
          <button class="botonBorrar" onclick="eliminarDelCarrito(${index})">X</button>
      `;
      cartItems.appendChild(li);
      total += producto.subTotal();
    }
  });

  cartTotal.innerText = `Total: $${total}`;
  cartContainer.style.display = "block";
}

// Eliminar un producto del carrito
function eliminarDelCarrito(index) {
  const carrito = cargarCarrito();

  if (index > -1 && index < carrito.length) {
    carrito.splice(index, 1);
    guardarCarrito(carrito);
    actualizarCarrito();

    Toastify({
      text: "Producto eliminado :(",
      duration: 3000,
      gravity: "top",
      position: "right",
      style: { background: "orange" },
    }).showToast();
  }
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

// Finalizar la compra
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

// Aplicación de descuento
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

// Reiniciar
init();
