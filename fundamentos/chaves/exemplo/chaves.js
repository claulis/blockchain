// Importa o módulo de criptografia do Node.js
const crypto = require('crypto');

// 1. Geração do par de chaves (pública e privada)
// Usa o algoritmo RSA com tamanho de módulo de 2048 bits (recomendado para segurança)
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048, // Tamanho da chave em bits
  publicKeyEncoding: {
    type: 'spki', // Formato padrão para chaves públicas (SubjectPublicKeyInfo)
    format: 'pem' // Codificação em texto (Privacy Enhanced Mail)
  },
  privateKeyEncoding: {
    type: 'pkcs8', // Formato padrão para chaves privadas (Private-Key Cryptography Standards #8)
    format: 'pem', // Codificação em texto
    // cipher: 'aes-256-cbc', // Opcional: poderia adicionar criptografia à chave privada
    // passphrase: 'senha' // Opcional: senha para proteger a chave privada
  }
});

// Exibe as chaves geradas no console
console.log('Chave Pública:\n', publicKey);
console.log('\nChave Privada:\n', privateKey);

// 2. Criptografando uma mensagem com a chave pública
const mensagem = 'Segredo muito importante!';
// Converte a mensagem para Buffer (formato que as funções de crypto trabalham)
const bufferMensagem = Buffer.from(mensagem, 'utf8');

// Criptografa usando a chave pública
const mensagemCriptografada = crypto.publicEncrypt(
  {
    key: publicKey, // Chave pública para criptografia
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, // Esquema de preenchimento seguro
    oaepHash: 'sha256' // Algoritmo de hash para OAEP
  },
  bufferMensagem // Dados a serem criptografados
);

// Exibe a mensagem criptografada em Base64 (formato texto para binário)
console.log('\nMensagem criptografada (base64):', mensagemCriptografada.toString('base64'));

// 3. Descriptografando com a chave privada
const mensagemDescriptografada = crypto.privateDecrypt(
  {
    key: privateKey, // Chave privada correspondente
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, // Mesmo esquema usado na criptografia
    oaepHash: 'sha256' // Mesmo algoritmo hash
  },
  mensagemCriptografada // Dados criptografados
);

// Exibe a mensagem original recuperada
console.log('\nMensagem descriptografada:', mensagemDescriptografada.toString('utf8'));

// 4. Criando uma assinatura digital (prova de autenticidade)
const dadosParaAssinar = 'Dados importantes que precisam ser assinados';
// Cria um objeto de assinatura usando SHA-256 como hash
const sign = crypto.createSign('SHA256');
// Atualiza com os dados a serem assinados
sign.update(dadosParaAssinar);
sign.end(); // Finaliza a entrada de dados
// Gera a assinatura usando a chave privada (formato Base64)
const assinatura = sign.sign(privateKey, 'base64');

console.log('\nAssinatura digital:', assinatura);

// 5. Verificando a assinatura digital
const verify = crypto.createVerify('SHA256'); // Usa o mesmo algoritmo de hash
verify.update(dadosParaAssinar); // Mesmos dados originais
verify.end(); // Finaliza a entrada
// Verifica se a assinatura é válida usando a chave pública
const isValida = verify.verify(publicKey, assinatura, 'base64');

console.log('\nAssinatura válida?', isValida);