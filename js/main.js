//! BIENVENIDA Y CALCULO TALLE

let nombre = prompt(
  "Hola! Bienvenida a la tienda online de DUNAS.\nSomos un proyecto de diseño de ropa interior y prendas esenciales de algodón, cómodas, suaves y de excelente calidad.\nPrimero vamos a ayudarte a elegir el talle correcto, y luego vamos a realizar la compra.\n¿Cómo es tu nombre?"
);

// Determinar el talle de corpinios con condicional
let busto = parseInt(
  prompt(
    "Hola " +
      nombre +
      ". Nuestra tabla de talles para prendas superiores va de 75cm a 130cm de busto. ¿Cuál es tu medida de busto?:"
  )
);
let bajoBusto = parseInt(
  prompt("¿Y cuál es tu medida de espalda o bajo busto?")
);

let talleCorpinio = "";

if (bajoBusto >= 62 && bajoBusto <= 72 && busto >= 75 && busto <= 95) {
  talleCorpinio = "S";
} else if (bajoBusto >= 73 && bajoBusto <= 80 && busto >= 75 && busto <= 100) {
  talleCorpinio = "M";
} else if (bajoBusto >= 81 && bajoBusto <= 90 && busto >= 75 && busto <= 100) {
  talleCorpinio = "L";
} else if (bajoBusto >= 91 && bajoBusto <= 102 && busto >= 89 && busto <= 112) {
  talleCorpinio = "XL";
} else if (
  bajoBusto >= 103 &&
  bajoBusto <= 108 &&
  busto >= 101 &&
  busto <= 118
) {
  talleCorpinio = "2XL";
} else if (
  bajoBusto >= 109 &&
  bajoBusto <= 130 &&
  busto >= 101 &&
  busto <= 130
) {
  talleCorpinio = "3XL";
}

if (talleCorpinio == "") {
  talleCorpinio = prompt(
    "Verifica que estas ingresando una medida que éste dentro de los 85cm y los 130cm. En caso contrario, no tenemos talle para vos pero podés elegirlo manualmente para continuar con la compra:"
  );
} else {
  alert("Perfecto. Tu talle sugerido de corpiños es " + talleCorpinio);
}

// Determinar el talle de bombachas con condicional
alert(
  "Genial " +
    nombre +
    ", ya tenemos tu talle ideal para corpiños. Ahora debemos calcular tu talle para prendas inferiores."
);

let cintura = parseInt(
  prompt(
    "Nuestra tabla de talles para prendas inferiores va de 70cm a 135cm de cadera. ¿Cuál es tu medida de cintura?:"
  )
);
let cadera = parseInt(prompt("¿Y cuál es tu medida de caderas?:"));

let talleBombacha = "";

if (cadera >= 70 && cadera <= 94 && cintura >= 58 && cintura <= 68) {
  talleBombacha = "S";
} else if (cadera >= 95 && cadera <= 100 && cintura >= 60 && cintura <= 76) {
  talleBombacha = "M";
} else if (cadera >= 101 && cadera <= 110 && cintura >= 69 && cintura <= 86) {
  talleBombacha = "L";
} else if (cadera >= 111 && cadera <= 115 && cintura >= 77 && cintura <= 92) {
  talleBombacha = "XL";
} else if (cadera >= 116 && cadera <= 125 && cintura >= 87 && cintura <= 105) {
  talleBombacha = "2XL";
} else if (cadera >= 126 && cadera <= 135 && cintura >= 93 && cintura <= 115) {
  talleBombacha = "3XL";
}
if (talleBombacha == "") {
  talleBombacha = prompt(
    "Verifica que estas ingresando una medida que éste dentro de los 85cm y los 130cm de cadera. En caso contrario, no tenemos talle para vos pero podés elegirlo manualmente para continuar con la compra:"
  );
} else {
  alert(
    "Perfecto " +
      nombre +
      ". Tu talle sugerido para bombachas es " +
      talleBombacha
  );
}

alert("Ahora si. ¡Vamos por la compra!");

//!CREANDO LOS PRODUCTOS Y EL CARRITO

// Clase constructora de los productos
class Producto {
  constructor(titulo, precio, color, cantRequerido) {
    this.titulo = titulo;
    this.precio = precio;
    this.color = color;
    this.cantRequerido = cantRequerido;
  }
  subTotal() {
    return this.cantRequerido * this.precio;
  }
}

function resumenPedidoAlert(pedido) {
  let total = 0;
  let resumen = "";
  i = 1;

  pedido.forEach((prenda) => {
    console.log(prenda.titulo + " | Subtotal: ARS " + prenda.subTotal());
    total += prenda.subTotal();
    resumen +=
      i +
      " - " +
      prenda.titulo +
      " | " +
      "Cantidad: " +
      prenda.cantRequerido +
      " | Subtotal producto $" +
      prenda.subTotal() +
      "\n";
    i += 1;
  });
  resumen =
    "¡Perfecto! Su pedido es: \n" +
    resumen +
    "\nY el subtotal de su pedido es de $" +
    total +
    " ARS ";
  alert(resumen);
  return { resumen, total };
}

// Declarando los objetos
const prendas = [];

prendas.push(new Producto("Corpiño Viento Sur", 30000, "negro", 0));
prendas.push(new Producto("Bombacha Viento Sur", 15000, "negro", 0));
prendas.push(new Producto("Corpiño Claromeco", 30000, "chocolate", 0));
prendas.push(new Producto("Bombacha Claromeco", 15500, "chocolate", 0));

// Productos disponibles
const prendasDisponibles = prendas.reduce(
  (acc, prenda) =>
    acc +
    "- " +
    prenda.titulo +
    " " +
    prenda.color +
    " $" +
    prenda.precio +
    "\n",
  "Por el momento, tenemos disponibles las siguientes prendas: \n"
);

alert(prendasDisponibles);

let pedido = [];

prendas.forEach((prenda) => {
  cantRequerido = parseInt(
    prompt(
      "Ingrese la cantidad de " +
        prenda.titulo +
        " que quiere llevar. Si no desea llevar éste artículo ingrese 0"
    )
  );
  if (cantRequerido > 0) {
    const nuevoElemento = new Producto(
      prenda.titulo,
      prenda.precio,
      prenda.color,
      cantRequerido
    );
    pedido.push(nuevoElemento);
  }
});

let { resumen, total } = resumenPedidoAlert(pedido);

let confirmacionCompra = parseInt(
  prompt(
    "Si está de acuerdo con su compra y desea continuar al pago, ingrese el número 1.\nSi te arrepentiste, y deseas eliminar un producto del carrito, ingrese el número 2 "
  )
);

if (confirmacionCompra === 1) {
  alert("Orden confirmada");
} else if (confirmacionCompra === 2) {
  alert("Ok, vamos a modificar la orden de compras");
  let eliminarProducto = prompt(
    "Indique el número que corresponde al producto que desea quitar del carrito:\n" +
      resumen
  );
  pedido.splice(eliminarProducto - 1, 1);
  let resultado = resumenPedidoAlert(pedido);
  resumen = resultado.resumen;
  total = resultado.total;
}

//! CALCULANDO DESCUENTOS E IMPORTE FINAL

function descuento(cantidad) {
  if (cantidad >= 6) {
    return 25.0;
  } else if (cantidad >= 4) {
    return 15.0;
  } else {
    return 0.0;
  }
}

// Productos disponibles
const cantTotal = pedido.reduce((acc, prenda) => acc + prenda.cantRequerido, 0);

let dto = descuento(cantTotal);

console.log(cantTotal);

if (dto > 0) {
  alert(
    "Felicitaciones " +
      nombre +
      " ! Obtuviste un " +
      dto +
      "% de decuento por llevar más de 4 prendas. El precio total de tu compra por llevar " +
      cantTotal +
      " artículo es: $" +
      total * (1 - dto / 100) +
      " ¡Gracias por tu compra!"
  );
} else {
  alert(
    "El precio total de tu compra por llevar " +
      cantTotal +
      " es: $" +
      subTotal * (1 - dto / 100) +
      " ¡Gracias por tu compra!"
  );
}
