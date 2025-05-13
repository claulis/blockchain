# Introdução
Algoritmos de hash são amplamente utilizados em uma variedade de aplicações, incluindo garantia de integridade de dados, autenticação de senhas, geração de assinaturas digitais, criptografia e muito mais. Eles são uma ferramenta fundamental em segurança de dados e processamento eficiente de informações. Exemplos de algoritmos de hash amplamente conhecidos incluem MD5, SHA-1, SHA-256, e bcrypt, entre outros. Os algoritmos de hash mais antigos, como **MD5 e SHA-1, são agora considerados inseguros para muitos casos de uso devido a vulnerabilidades conhecidas**, e é recomendável usar algoritmos mais recentes e seguros quando a segurança é uma preocupação.

## Função HASH
Um hash, em termos gerais, é uma representação única e fixa de um dado, geralmente uma sequência de caracteres ou qualquer tipo de entrada, que é produzida por meio de uma função de hash. Os hashes são amplamente utilizados em ciência da computação e têm várias aplicações importantes:

1. **Integridade de Dados**: Um dos usos mais comuns dos hashes é garantir a integridade dos dados. Ao calcular um hash de um arquivo ou conjunto de dados, você pode armazenar esse valor de hash e, posteriormente, calcular o hash novamente. Se o hash recalculado for o mesmo que o hash original, isso indica que os dados não foram alterados. Qualquer alteração nos dados resultaria em um hash completamente diferente.

2. **Verificação de Autenticidade**: Os hashes também são usados na verificação de autenticidade. Quando você faz o download de um arquivo de uma fonte confiável, muitas vezes é fornecido um valor de hash para o arquivo original. Após o download, você pode calcular o hash do arquivo que você baixou e compará-lo com o valor de hash fornecido. Se eles coincidirem, você pode ter confiança de que o arquivo não foi adulterado durante o download.

3. **Senhas Seguras**: Para armazenar senhas com segurança, em vez de armazenar a senha real, os sistemas armazenam o hash da senha. Quando um usuário tenta fazer login, o sistema calcula o hash da senha inserida e compara com o hash armazenado no banco de dados. Isso protege as senhas dos usuários, pois o hash é difícil de reverter para a senha original.

4. **Tabelas de Hash**: Em estruturas de dados, as tabelas de hash são usadas para armazenar pares de chave-valor de maneira eficiente. Elas usam uma função de hash para calcular o índice onde um valor deve ser armazenado ou recuperado. Isso permite uma recuperação rápida de dados com base em uma chave.

5. **Criptografia**: Em criptografia, hashes são usados para criar chaves de assinatura e autenticação. Algoritmos de criptografia de chave pública, como o RSA, usam hashes para garantir a autenticidade e a integridade das mensagens.

6. **Evitar Colisões**: Funções de hash são projetadas para minimizar colisões, ou seja, quando duas entradas diferentes produzem o mesmo valor de hash. Embora seja impossível evitar completamente colisões em funções de hash, algoritmos de hash são projetados para tornar as colisões extremamente improváveis.

7. **Resumo de Dados**: Em resumos de dados, como na criação de índices em bancos de dados ou na pesquisa eficiente, os hashes são usados para acelerar a recuperação de informações.

8. **Segurança Digital**: Em segurança digital, os hashes são usados para criar assinaturas digitais e verificar a autenticidade de mensagens e documentos eletrônicos.

## Como funciona um algoritmo HASH?
**Um algoritmo de hash é um procedimento matemático que transforma uma entrada (ou mensagem) em um valor fixo de tamanho fixo, geralmente uma sequência de bytes.** A saída resultante é chamada de "hash" e é uma representação única e **aparentemente aleatória* da entrada original. Aqui estão os princípios fundamentais de como um algoritmo de hash funciona:

1. **Entrada Arbitrária**: Um algoritmo de hash aceita uma entrada de tamanho arbitrário. Isso pode ser uma string, arquivo, mensagem ou qualquer outro tipo de dados.

2. **Saída de Tamanho Fixo**: Independentemente do tamanho da entrada, o algoritmo de hash produz uma saída de tamanho fixo. Por exemplo, um algoritmo pode sempre produzir um hash de 256 bits.

3. **Determinismo**: O mesmo valor de entrada sempre produzirá o mesmo valor de hash. Isso significa que, se você calcular o hash da mesma entrada várias vezes, obterá o mesmo resultado.

4. **Função de Dispersão**: Um algoritmo de hash é uma função de dispersão que mapeia a entrada em um espaço menor de saída. Idealmente, a função de hash distribui as entradas de forma uniforme ao longo do espaço de saída, minimizando colisões (duas entradas diferentes produzindo o mesmo hash).

5. **Eficiência**: Algoritmos de hash devem ser eficientes e rápidos de calcular, mesmo para entradas grandes.

6. **Resistência a Colisões**: Um bom algoritmo de hash deve minimizar colisões, que ocorrem quando duas entradas diferentes produzem o mesmo hash. Isso é importante para garantir a unicidade dos hashes.

7. **Imutabilidade**: Qualquer alteração na entrada, mesmo uma pequena, deve resultar em um hash completamente diferente.

8. **Irreversibilidade**: O processo de hash deve ser irreversível, o que significa que não é possível partir do hash para recuperar a entrada original. Isso é conhecido como a propriedade "unidirecional" do hash.

9. **Avaliação Rápida**: Algoritmos de hash devem ser fáceis de calcular e avaliar. A complexidade de tempo de calcular um hash deve ser eficiente.

## Explicação do exemplo

1. Instale o Nodejs
2. Instale o VS Code
3. Abra um novo Terminal e execute na pasta do código este comando `node hash.js`
4. Agora modifique o código `const texto = "Meu nome é João da Silva";` adicionando um ponto no final da frase, apenas um ponto `const texto = "Meu nome é João da Silva.";`. Qual será o resultado?


```javascript
// Função de hash simples que usa o algoritmo DJB2
function hashString(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return hash >>> 0; // Garante que o resultado seja um número não negativo.
}

// Exemplo de uso da função de hash
const texto = "Exemplo de texto para hash";
const valorDeHash = hashString(texto);

console.log(`Texto: "${texto}"`);
console.log(`Valor de Hash: ${valorDeHash}`);
```

Neste exemplo, usamos um algoritmo de hash simples chamado DJB2. Ele itera por cada caractere na string de entrada e combina a codificação UTF-16 desse caractere com um valor acumulado (inicializado como 5381) usando operações de deslocamento e xor. O resultado é um valor de hash que pode ser usado para identificar a string.


```
primeira execução
Texto: "Meu nome é João da Silva"
Valor de Hash: 4085972725

segunda execução
Texto: "Meu nome é João da Silva."
Valor de Hash: 1693113787
```

**Mesmo modificando um ponto o resultado será completamente diferente e contendo a mesma quantidade de numeros**

