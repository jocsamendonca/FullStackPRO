// let produtos = ["Computador", "Telefone", "Mouse", "Teclado"];

// console.log(produtos);
// console.log(produtos.length);

// let produtos2 = [];

// produtos.map((produto) => {
//   if (produto != "Mouse") {
//     produtos2.push(produto);
//   }
// });
// console.log(produtos2);

// let produtos3 = produtos.filter((produto) => produto !== "Mouse");

// console.log(produtos3);

// // ===========================

// function buscarProduto(nomeProduto) {
//   // Converte para minúsculo para busca case-insensitive
//   const produtoBuscado = nomeProduto.toLowerCase();

//   // Procura o produto na lista
//   const produtoEncontrado = produtos.find((produto) =>
//     produto.toLowerCase().includes(produtoBuscado)
//   );

//   if (produtoEncontrado) {
//     console.log(
//       `✅ Este produto existe! Nome do produto: ${produtoEncontrado}`
//     );
//     return produtoEncontrado;
//   } else {
//     console.log(`❌ Produto não foi encontrado na lista.`);
//     return null;
//   }
// }

// buscarProduto("Computador");

function verificarNumero(numero) {
  if (numero > 0) {
    return "positivo";
  } else if (numero < 0) {
    return "negativo";
  } else {
    return "zero";
  }
}

let resposta = verificarNumero(999);
// console.log(resposta);

let numeros = [1, 5, 3, 8, 9, 10, 25, 36, 99];

function buscarNumero(numeros, numero) {
  // const encontrado = numeros.find((element) => element === numero);

  // const encontrado = numeros.includes(numero);
  // console.log(encontrado);

  if (numeros.includes(numero)) {
    console.log(`O número ${numero} está no array!`);
  } else {
    console.log("Número não encontrado!");
  }
}

buscarNumero(numeros, 0);

const products = [
  { name: "Maça", price: 2.5 },
  { name: "Coca cola", price: 8 },
  { name: "Guarana", price: 5 },
  { name: "Chocolate", price: 20 },
];

// function buscarPorPreco(produtos) {
//   const resposta = [];
//   produtos.filter((produto) => {
//     if (produto.price < 8) {
//       resposta.push(produto);
//     }
//   });
//   console.log(resposta);
// }
// buscarPorPreco(products);

const buscarPorPreco = products.find((product) => product.price === 20);
console.log(buscarPorPreco);
