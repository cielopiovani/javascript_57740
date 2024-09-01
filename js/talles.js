//! CALCULAR TALLE

// Crear elementos
const conteinerSuperior = document.getElementById("conteinerSuperior");

// Crear elementos de la interfaz para talles superiores
const titulo = document.createElement("h1");
titulo.innerText = "Calculadora de talles";

const tituloSuperior = document.createElement("h2");
tituloSuperior.innerText = "Calculemos tu talle para prendas superiores";

const talleBusto = document.createElement("input");
talleBusto.placeholder = "Ingrese su medida de busto";
talleBusto.type = "number";
talleBusto.id = "busto";

const talleBajoBusto = document.createElement("input");
talleBajoBusto.placeholder = "Ingrese su medida de bajo busto";
talleBajoBusto.type = "number";
talleBajoBusto.id = "bajoBusto";

const calcularTalleSuperior = document.createElement("button");
calcularTalleSuperior.innerText = "Calcular talle";
calcularTalleSuperior.className = "calcularTalleSuperior";

const resultadoTalleSuperiores = document.createElement("h1");
resultadoTalleSuperiores.id = "resultadoTallesSuperiores";

// Añadir elementos al contenedor
conteinerSuperior.append(
  titulo,
  tituloSuperior,
  talleBusto,
  talleBajoBusto,
  calcularTalleSuperior,
  resultadoTalleSuperiores
);

// EVENTO PARA VER EL TALLE
calcularTalleSuperior.addEventListener("click", (event) => {
  event.preventDefault();

  const busto = parseInt(document.getElementById("busto").value, 10);
  const bajoBusto = parseInt(document.getElementById("bajoBusto").value, 10);

  // Validación
  if (isNaN(busto) || isNaN(bajoBusto) || busto <= 50 || bajoBusto <= 50) {
    Toastify({
      text: "Por favor, ingresa medidas válidas",
      duration: 3000,
      gravity: "top",
      position: "right",
      style: { background: "red" },
    }).showToast();
    return;
  }

  // Determinar el talle con condicionales
  const talleCorpinio =
    bajoBusto >= 62 && bajoBusto <= 72 && busto >= 75 && busto <= 95
      ? "S"
      : bajoBusto >= 73 && bajoBusto <= 80 && busto >= 75 && busto <= 100
      ? "M"
      : bajoBusto >= 81 && bajoBusto <= 90 && busto >= 75 && busto <= 100
      ? "L"
      : bajoBusto >= 91 && bajoBusto <= 102 && busto >= 89 && busto <= 112
      ? "XL"
      : bajoBusto >= 103 && bajoBusto <= 108 && busto >= 101 && busto <= 118
      ? "2XL"
      : bajoBusto >= 109 && bajoBusto <= 116 && busto >= 101 && busto <= 130
      ? "3XL"
      : "";

  // Mostrar el talle en el DOM
  resultadoTalleSuperiores.innerHTML = talleCorpinio
    ? `<h4>Tu talle sugerido para prendas superiores: ${talleCorpinio}</h4>`
    : `<h4>Las medidas indicadas no están dentro de nuestra tabla de talles, por lo que recomendamos que mires las referencias de cada prenda.</h4>`;
});

//! Calcular talle inferior

// Crear elementos
const conteinerInferior = document.getElementById("conteinerInferior");

// Crear elementos de la interfaz para talles inferiores
const tituloInferior = document.createElement("h2");
tituloInferior.innerText = "Calculemos tu talle para prendas inferiores";

const talleCintura = document.createElement("input");
talleCintura.placeholder = "Ingrese su medida de cintura";
talleCintura.type = "number";
talleCintura.id = "cintura";

const talleCadera = document.createElement("input");
talleCadera.placeholder = "Ingrese su medida de cadera";
talleCadera.type = "number";
talleCadera.id = "cadera";

const calcularTalleInferior = document.createElement("button");
calcularTalleInferior.innerText = "Calcular talle";
calcularTalleInferior.className = "calcularTalleInferior";

const resultadoTalleInferior = document.createElement("h1");
resultadoTalleInferior.id = "resultadoTalleInferior";

// Añadir elementos al contenedor
conteinerInferior.append(
  tituloInferior,
  talleCintura,
  talleCadera,
  calcularTalleInferior,
  resultadoTalleInferior
);

// EVENTO PARA VER EL TALLE
calcularTalleInferior.addEventListener("click", (event) => {
  event.preventDefault();

  const cintura = parseInt(document.getElementById("cintura").value, 10);
  const cadera = parseInt(document.getElementById("cadera").value, 10);

  // Validación
  if (isNaN(cintura) || isNaN(cadera) || cintura <= 50 || cadera <= 50) {
    Toastify({
      text: "Por favor, ingresa medidas válidas",
      duration: 3000,
      gravity: "top",
      position: "right",
      style: { background: "red" },
    }).showToast();
    return;
  }

  // Determinar el talle con condicionales
  const talleBombacha =
    cadera >= 70 && cadera <= 94 && cintura >= 58 && cintura <= 68
      ? "S"
      : cadera >= 95 && cadera <= 100 && cintura >= 60 && cintura <= 76
      ? "M"
      : cadera >= 101 && cadera <= 110 && cintura >= 69 && cintura <= 86
      ? "L"
      : cadera >= 111 && cadera <= 115 && cintura >= 77 && cintura <= 92
      ? "XL"
      : cadera >= 116 && cadera <= 125 && cintura >= 87 && cintura <= 105
      ? "2XL"
      : cadera >= 126 && cadera <= 135 && cintura >= 93 && cintura <= 115
      ? "3XL"
      : "";

  // Mostrar el talle en el DOM
  resultadoTalleInferior.innerHTML = talleBombacha
    ? `<h4>Tu talle sugerido para prendas inferiores: ${talleBombacha}</h4>`
    : `<h4>Las medidas indicadas no están dentro de nuestra tabla de talles, por lo que recomendamos que mires las referencias de cada prenda.</h4>`;
});
