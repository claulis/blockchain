// Função de hash simples que usa o algoritmo DJB2
function hashString(str) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 33) ^ str.charCodeAt(i);
    }
    return hash >>> 0; // Garante que o resultado seja um número não negativo.
  }
  
  // Exemplo de uso da função de hash
  const texto = "Meu nome é João da Silva";
  const valorDeHash = hashString(texto);
  
  console.log(`Texto: "${texto}"`);
  console.log(`Valor de Hash: ${valorDeHash}`);

   