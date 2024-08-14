// Clase constructora para los productos
class Producto {
  constructor(id, titulo, precio, color, img, talles, cantRequerido = 0, talle = '') {
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
      return productos.map(p => new Producto(p.id, p.titulo, p.precio, p.color, p.img, p.talles, p.cantRequerido, p.talle));
  }
  return [];
}

// Crear productos con un array de objetos
const prendas = [
  new Producto(1, "Corpiño Mar claro", 30000, "natural", "../multimedia/producto_1.jpg", ["S", "M", "L", "XL", "2XL", "3XL"]),
  new Producto(2, "Bombacha Mar claro", 15000, "natural", "../multimedia/producto_2.jpg", ["S", "M", "L", "XL", "2XL", "3XL"]),
  new Producto(3, "Musculosa Margarita", 30000, "rojo", "../multimedia/producto_3.jpg", ["S", "M", "L", "XL", "2XL", "3XL"]),
  new Producto(4, "Calza corta ciclista", 15500, "rojo", "../multimedia/producto_4.jpg", ["S", "M", "L", "XL", "2XL", "3XL"]),
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
              ${producto.talles.map(talle => `<option value="${talle}">${talle}</option>`).join("")}
          </select>
          <input type="number" id="cantidad-${producto.id}" min="1" placeholder="Cantidad" />
          <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
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
  const productoExistenteIndex = carrito.findIndex(p => p.id === id && p.talle === talle);

  if (productoExistenteIndex !== -1) {
      
      carrito[productoExistenteIndex].cantRequerido += cantidad;
  } else {
      
      const producto = prendas.find(p => p.id === id);
      if (producto) {
          carrito.push(new Producto(producto.id, producto.titulo, producto.precio, producto.color, producto.img, producto.talles, cantidad, talle));
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

  carrito.forEach(producto => {
      if (producto.cantRequerido > 0) {
          const li = document.createElement("li");
          li.innerHTML = `
              <img src="${producto.img}">
              ${producto.titulo} (${producto.talle}) - Cantidad: ${producto.cantRequerido} - Subtotal: $${producto.subTotal()}
          `;
          cartItems.appendChild(li);
          total += producto.subTotal();
      }
  });

  cartTotal.innerText = `Total: $${total}`;
  cartContainer.style.display = 'block';
}

document.getElementById("close-cart").addEventListener("click", cerrarCarrito);

// Cerrar carrito
function cerrarCarrito() {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.style.display = 'none';
}

// Actualizar carrito
function actualizarCarrito() {
  mostrarCarrito();
}

// Finalizar el carrito
function finalizarCompra() {
  const carrito = cargarCarrito();
  const total = carrito.reduce((acc, producto) => acc + producto.subTotal(), 0);
  const dto = descuento(carrito.reduce((acc, producto) => acc + producto.cantRequerido, 0));
  const totalConDescuento = total * (1 - dto / 100);

  document.getElementById("cart-container").innerHTML = `
      <h2>Compra Finalizada</h2>
      <p>El precio total de tu compra es: $${totalConDescuento.toFixed(2)} (Descuento aplicado: ${dto}%)</p>
      <button id="close-cart">Cerrar</button>
  `;
  document.getElementById("close-cart").addEventListener("click", cerrarCarrito);

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











// !CREANDO LOS PRODUCTOS Y EL CARRITO

// // Clase constructora de los productos
// class Producto {
//   constructor(titulo, precio, color, cantRequerido) {
//     this.titulo = titulo;
//     this.precio = precio;
//     this.color = color;
//     this.cantRequerido = cantRequerido;
//   }
//   subTotal() {
//     return this.cantRequerido * this.precio;
//   }
// }

// function resumenPedidoAlert(pedido) {
//   let total = 0;
//   let resumen = "";
//   i = 1;

//   pedido.forEach((prenda) => {
//     console.log(prenda.titulo + " | Subtotal: ARS " + prenda.subTotal());
//     total += prenda.subTotal();
//     resumen +=
//       i +
//       " - " +
//       prenda.titulo +
//       " | " +
//       "Cantidad: " +
//       prenda.cantRequerido +
//       " | Subtotal producto $" +
//       prenda.subTotal() +
//       "\n";
//     i += 1;
//   });
//   resumen =
//     "¡Perfecto! Su pedido es: \n" +
//     resumen +
//     "\nY el subtotal de su pedido es de $" +
//     total +
//     " ARS ";
//   alert(resumen);
//   return { resumen, total };
// }

// // Declarando los objetos
// const prendas = [];

// prendas.push(new Producto("Corpiño Viento Sur", 30000, "negro", 0));
// prendas.push(new Producto("Bombacha Viento Sur", 15000, "negro", 0));
// prendas.push(new Producto("Corpiño Claromeco", 30000, "chocolate", 0));
// prendas.push(new Producto("Bombacha Claromeco", 15500, "chocolate", 0));

// // Productos disponibles
// const prendasDisponibles = prendas.reduce(
//   (acc, prenda) =>
//     acc +
//     "- " +
//     prenda.titulo +
//     " " +
//     prenda.color +
//     " $" +
//     prenda.precio +
//     "\n",
//   "Por el momento, tenemos disponibles las siguientes prendas: \n"
// );

// alert(prendasDisponibles);

// let pedido = [];

// prendas.forEach((prenda) => {
//   cantRequerido = parseInt(
//     prompt(
//       "Ingrese la cantidad de " +
//         prenda.titulo +
//         " que quiere llevar. Si no desea llevar éste artículo ingrese 0"
//     )
//   );
//   if (cantRequerido > 0) {
//     const nuevoElemento = new Producto(
//       prenda.titulo,
//       prenda.precio,
//       prenda.color,
//       cantRequerido
//     );
//     pedido.push(nuevoElemento);
//   }
// });

// let { resumen, total } = resumenPedidoAlert(pedido);

// let confirmacionCompra = parseInt(
//   prompt(
//     "Si está de acuerdo con su compra y desea continuar al pago, ingrese el número 1.\nSi te arrepentiste, y deseas eliminar un producto del carrito, ingrese el número 2 "
//   )
// );

// if (confirmacionCompra === 1) {
//   alert("Orden confirmada");
// } else if (confirmacionCompra === 2) {
//   alert("Ok, vamos a modificar la orden de compras");
//   let eliminarProducto = prompt(
//     "Indique el número que corresponde al producto que desea quitar del carrito:\n" +
//       resumen
//   );
//   pedido.splice(eliminarProducto - 1, 1);
//   let resultado = resumenPedidoAlert(pedido);
//   resumen = resultado.resumen;
//   total = resultado.total;
// }

// //! CALCULANDO DESCUENTOS E IMPORTE FINAL

// function descuento(cantidad) {
//   if (cantidad >= 6) {
//     return 25.0;
//   } else if (cantidad >= 4) {
//     return 15.0;
//   } else {
//     return 0.0;
//   }
// }

// // Productos disponibles
// const cantTotal = pedido.reduce((acc, prenda) => acc + prenda.cantRequerido, 0);

// let dto = descuento(cantTotal);

// console.log(cantTotal);

// if (dto > 0) {
//   alert(
//     "Felicitaciones " +
//       nombre +
//       " ! Obtuviste un " +
//       dto +
//       "% de decuento por llevar más de 4 prendas. El precio total de tu compra por llevar " +
//       cantTotal +
//       " artículo es: $" +
//       total * (1 - dto / 100) +
//       " ¡Gracias por tu compra!"
//   );
// } else {
//   alert(
//     "El precio total de tu compra por llevar " +
//       cantTotal +
//       " es: $" +
//       subTotal * (1 - dto / 100) +
//       " ¡Gracias por tu compra!"
//   );
// }
