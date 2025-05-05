// Módulo para gerar hashes (simulando funções de blockchain)
const crypto = require('crypto');

// ====================== //
//  DEFINIÇÃO DO SISTEMA  //
// ====================== //

/**
 * Estrutura de um validador no sistema PoS
 * @param {string} address - Endereço do validador
 * @param {number} stake - Quantidade de moedas "stakeadas"
 */
class Validator {
  constructor(address, stake) {
    this.address = address;
    this.stake = stake;
  }
}

/**
 * Estrutura de um bloco na blockchain
 * @param {number} height - Altura do bloco
 * @param {string} previousHash - Hash do bloco anterior
 * @param {Array} transactions - Lista de transações
 * @param {string} validator - Endereço do validador que criou o bloco
 */
class Block {
  constructor(height, previousHash, transactions, validator) {
    this.height = height;
    this.previousHash = previousHash;
    this.transactions = transactions;
    this.validator = validator;
    this.timestamp = Date.now();
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return crypto
      .createHash('sha256')
      .update(
        this.height +
          this.previousHash +
          JSON.stringify(this.transactions) +
          this.validator +
          this.timestamp
      )
      .digest('hex');
  }
}

// ====================== //
//   ALGORITMO PoS CORE   //
// ====================== //

/**
 * Seleciona o próximo validador com base no stake
 * @param {Array<Validator>} validators - Lista de validadores
 * @returns {Validator} Validador selecionado
 */
function selectValidator(validators) {
  // Calcula o stake total da rede
  const totalStake = validators.reduce((sum, val) => sum + val.stake, 0);

  // Gera um número aleatório entre 0 e totalStake
  let random = Math.random() * totalStake;

  // Seleciona o validador proporcionalmente ao seu stake
  for (const validator of validators) {
    if (random < validator.stake) {
      return validator;
    }
    random -= validator.stake;
  }

  return validators[0]; // Fallback
}

/**
 * Simula a criação de um novo bloco no sistema PoS
 * @param {Array<Validator>} validators - Lista de validadores
 * @param {Block} lastBlock - Último bloco da chain
 * @param {Array} transactions - Transações para incluir no novo bloco
 * @returns {Block} Novo bloco criado
 */
function createNewBlock(validators, lastBlock, transactions) {
  // Seleciona o próximo validador
  const validator = selectValidator(validators);
  console.log(`🎲 Validador selecionado: ${validator.address} (Stake: ${validator.stake})`);

  // Cria o novo bloco
  const newBlock = new Block(
    lastBlock.height + 1,
    lastBlock.hash,
    transactions,
    validator.address
  );

  console.log(`🆕 Bloco #${newBlock.height} criado por ${validator.address}`);
  console.log(`🔗 Hash do bloco: ${newBlock.hash.substr(0, 12)}...`);
  
  return newBlock;
}

// ====================== //
//   EXEMPLO DE USO       //
// ====================== //

// Cria alguns validadores iniciais
const validators = [
  new Validator("Validador_A", 1000),  // Maior stake = maior chance
  new Validator("Validador_B", 500),
  new Validator("Validador_C", 200),
  new Validator("Validador_D", 100)
];

// Bloco genesis (inicial)
const genesisBlock = new Block(0, "0", ["Genesis Transaction"], "Sistema");

// Simula a criação de 5 blocos
let lastBlock = genesisBlock;
for (let i = 1; i <= 5; i++) {
  console.log(`\n=== Rodada ${i} ===`);
  const transactions = [`Tx${i}_1`, `Tx${i}_2`];
  lastBlock = createNewBlock(validators, lastBlock, transactions);
}

// Resultado final
console.log("\n📊 Distribuição de blocos criados:");
validators.forEach(v => {
  const blocksCreated = v.address === "Validador_A" ? 3 : 
                       v.address === "Validador_B" ? 1 : 
                       v.address === "Validador_C" ? 1 : 0;
  console.log(`${v.address}: ${blocksCreated} blocos (Stake: ${v.stake})`);
});