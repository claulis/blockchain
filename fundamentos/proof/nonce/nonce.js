// Importa o módulo 'crypto' para gerar hashes SHA-256 (Node.js)
const crypto = require('crypto');

/**
 * Função que simula a mineração de um bloco em blockchain (Proof of Work).
 * @param {string} transactions - Dados das transações do bloco.
 * @param {string} previousHash - Hash do bloco anterior (garante a imutabilidade da cadeia).
 * @param {number} difficulty - Número de zeros requeridos no início do hash (dificuldade).
 * @returns {Object} Retorna o nonce encontrado e o hash do bloco.
 */
function mineBlock(transactions, previousHash, difficulty) {
    let nonce = 0; // Inicia o nonce em 0
    const targetPrefix = '0'.repeat(difficulty); // Cria o prefixo alvo (ex: "0000")

    console.log(`Iniciando mineração... Dificuldade: ${difficulty} zeros.`);

    // Loop infinito até encontrar o nonce válido
    while (true) {
        // Concatena os dados do bloco: transações + hash anterior + nonce
        const blockData = transactions + previousHash + nonce;

        // Gera o hash SHA-256 em hexadecimal
        const hash = crypto.createHash('sha256').update(blockData).digest('hex');

        // Verifica se o hash começa com o prefixo alvo (ex: "0000")
        if (hash.startsWith(targetPrefix)) {
            console.log(`✅ Bloco minerado! Nonce encontrado: ${nonce}`);
            console.log(`🔗 Hash do bloco: ${hash}`);
            return { nonce, hash }; // Retorna o nonce e o hash
        }

        nonce++; // Incrementa o nonce para a próxima tentativa

        // Mostra progresso a cada 1 milhão de tentativas (opcional)
        if (nonce % 1000000 === 0) {
            console.log(`⏳ Testando nonce: ${nonce}...`);
        }
    }
}

// ===== Exemplo de Uso ===== //
const transactions = "Alice→Bob:10BTC,Charlie→Dave:5BTC"; // Dados das transações
const previousHash = "00000000000000000001a2b3c4d5e6f789"; // Hash do bloco anterior (exemplo)
const difficulty = 6; // Quantidade de zeros no início do hash (dificuldade ajustável)

// Executa a mineração
const minedBlock = mineBlock(transactions, previousHash, difficulty);

/* Saída esperada (exemplo):
   Iniciando mineração... Dificuldade: 4 zeros.
   ⏳ Testando nonce: 1000000...
   ⏳ Testando nonce: 2000000...
   ✅ Bloco minerado! Nonce encontrado: 2345678
   🔗 Hash do bloco: 0000a1b2c3d4e5f6...
*/