let nombre = prompt(
  "Hola! Bienvenida a la tienda online de DUNAS.\nSomos un proyecto de diseño de ropa interior y prendas esenciales de algodón, cómodas, suaves y de excelente calidad.\nPrimero vamos a ayudarte a elegir el talle correcto, y luego vamos a realizar la compra.\n¿Cómo es tu nombre?"
);

// Determinar el talle de corpinios con condicional

let busto = parseInt(
  prompt(
    "Hola " +
      nombre +
      ". Nuestra tabla de talles para prendas superiores va de 85cm a 130cm de busto. ¿Cuál es tu medida de busto?:"
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
    "Nuestra tabla de talles para prendas inferiores va de 85cm a 130cm de cadera. ¿Cuál es tu medida de cintura?:"
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


//? IMPORTANTE - Desarrollé dos opciones a partir de acá. Lo dejo, ya que fué parte de mi proceso, pero para el proyecto final se que debe ir sólo una, y no debe estar comentado. Para correr la opción A debe estar comentada la opción B, y viceversa.

//! -----------------------------------------------------------------

//! OPCIÓN A: Carrito de compras y cantidad de artículos pedidos con un do while

// let pedido;

// let artUno = 0;
// let artDos = 0;
// let artTres = 0;
// let artCuatro = 0;

// let subUno = 0;
// let subDos = 0;
// let subTres = 0;
// let subCuatro = 0;

// do {
//     pedido = parseInt(prompt("Tenemos en stock los siguientes productos:\n\n1. Corpiño Viento Sur $15000ARS\n2. Corpiño Mar $18000ARS\n3. Bombacha Viento Sur $12000ARS\n4. Bombacha Mar $13000\n\nElijá el número que corresponda al artículo que desea llevar, y cuándo el pedido este completo, ingrese 0"));
//         if (pedido == 1){
//             artUno= parseInt(prompt("¿Cuántos corpiños Viento Sur en talle " + talleCorpinio + " quiere llevar?"));
//             subUno = artUno * 15000;
//             alert("El subtotal es: $" + subUno + "ARS");
//         } else if (pedido ==2){
//             artDos = parseInt(prompt("¿Cuántos corpiños Mar en talle " + talleCorpinio + " quiere llevar?"));
//             subDos = artDos * 18000;
//             alert("El subtotal es: $"+ subDos + "ARS");
//         } else if (pedido == 3){
//             artTres = parseInt(prompt("¿Cuántas bombachas Viento Sur en talle " + talleBombacha + " quiere llevar?"));
//             subTres = artTres * 12000;
//             alert("El subtotal es: $"+ subTres + "ARS");
//         } else if (pedido == 4){
//             artCuatro = parseInt(prompt("¿Cuántas bombachas Viento Sur en talle " + talleBombacha + " quiere llevar?"));
//             subCuatro = artCuatro * 13000;
//             alert("El subtotal es: $"+ subCuatro + "ARS");
//         } else if (pedido == 0){
//             alert("Perfecto! Continuaremos a calcular el total de su pedido.");
//         } else {
//             alert("Ingrese una opción valida.")
//         }
// }
// while (pedido !== 0);

// let cantTotal = artUno + artDos + artTres + artCuatro;
// let subTotal = subUno + subDos + subTres + subCuatro;


//! OPCIÓN B: Incluyo lista de objeto, que todavía no vimos en las clases y que por eso me dió dudas presentarlo sólo con esta opción

alert(
  "Tenemos en stock los siguientes productos:\n\n1. Corpiño Viento Sur $15.000ARS\n2. Corpiño Mar $16.000ARS\n3. Bombacha Flor $12.000ARS\n4. Bombacha Claromeco $9.000ARS\n\nLe preguntaremos cuántos quiere de cada artículo, y en el caso de no querer ninguno debe ingrear 0."
);

// Calculando la cantidad de prendas con un for

let productos = [
  "Corpiño Viento Sur",
  "Corpiño Mar",
  "Bombacha Flor",
  "Bombacha Claromeco",
];
let precios = [15000, 16000, 12000, 9000];

let subTotal = 0;
let cantTotal = 0;

for (let i = 0; i < 4; i++) {
  let cantidad = parseInt(
    prompt("Ingresá la cantidad de " + productos[i] + " que quieres llevar:")
  );
  subTotal += cantidad * precios[i];
  cantTotal += cantidad;
}


//! -----------------------------------------------------------------

// Calculando el importe final con descuentos con una función en común para las dos opciones

function descuento(cantidad) {
  if (cantidad >= 6) {
    return 25.0;
  } else if (cantidad >= 4) {
    return 15.0;
  } else {
    return 0.0;
  }
}

let dto = descuento(cantTotal);
if (dto > 0) {
  alert(
    "Felicitaciones! Obtuviste un " +
      dto +
      "% de decuento por llevar más de 4 prendas. El precio total de tu compra por llevar " + cantTotal + " artículo es: $" +
      subTotal * (1 - dto / 100) + " ¡Gracias por tu compra!"
  );
} else {
  alert("El precio total de tu compra por llevar " + cantTotal + " es: $" + subTotal * (1 - dto / 100) + " ¡Gracias por tu compra!");
}
