function gerarNumerosMega(num) {
  if (num < 6 || num > 9) {
    console.log("Numero não está entre 6 e 9!");
    return [];
  } else {
    // for (let i = 1; i <= num; i++) {
    //   const numeroGerado = Math.floor(Math.random() * 60 + 1);
    //   numeros.push(numeroGerado);
    // }
    const numeros = [];
    while (numeros.length < num) {
      const numeroGerado = Math.floor(Math.random() * 60 + 1);

      if (!numeros.includes(numeroGerado)) {
        numeros.push(numeroGerado);
      }
    }
    return numeros;
  }
}

const sorteio = gerarNumerosMega(6);
console.log(sorteio);
