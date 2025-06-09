# Linguagem Solidity

## Hello World

Declara uma variável pública message com o valor inicial "Hello, World!"

```solidity
pragma solidity ^0.8.0;

contract HelloWorld {
    string public message = "Hello, World!";

    function getMessage() public view returns (string memory) {
        return message;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}
```

[hello.sol](../assets/code/hello.sol)

## Explicando

Este contrato:

- Usa a versão 0.8.0 ou superior do Solidity
- Tem uma função getMessage que retorna o valor atual da mensagem
- Tem uma função setMessage que permite atualizar a mensagem

### 'public view return'

Na Solidity, a construção `public view returns` é usada em funções para definir sua visibilidade, comportamento e tipo de retorno. Vamos quebrar cada parte:

1. **public**: Especifica a visibilidade da função, indicando que ela pode ser chamada tanto internamente (dentro do contrato) quanto externamente (por outros contratos, carteiras ou aplicações).

>Funções `public` são acessíveis por qualquer pessoa ou contrato na blockchain.

2. **view**:É um modificador que indica que a função é apenas de leitura. Ela não modifica o estado da blockchain (não altera variáveis de estado, não emite eventos, não cria novos contratos, etc.).

>Funções `view` não consomem gás quando chamadas externamente, pois apenas leem dados da blockchain.

Exemplos de operações permitidas: ler variáveis de estado, retornar valores calculados com base em dados da blockchain, ou acessar informações como `block.number`.

3. **returns**:

- Define o tipo de dado que a função retorna. Após `returns`, você especifica o tipo (por exemplo, `string`, `uint`, `bool`, etc.). No caso do exemplo anterior, `returns (string memory)` indica que a função `getMessage` retorna uma string armazenada na memória (o modificador `memory` é necessário para tipos de dados complexos como strings ou arrays em Solidity).

### memory

Define um local de armazenamento temporário na blockchain Ethereum.

>Dados em memory existem apenas durante a execução de uma função e são descartados após sua conclusão.

Em Solidity, variáveis de tipos complexos (como string, array, struct) precisam de um especificador de armazenamento (como memory, storage ou calldata) quando declaradas em funções.
Para strings, memory é comumente usado em funções que manipulam ou retornam strings,

Por que memory?

Quando uma função retorna ou manipula uma string, ela precisa alocar espaço para essa string. O modificador memory diz à Solidity para armazenar essa string temporariamente na memória, em vez de persistir no armazenamento da blockchain (storage), que é mais caro e permanente.
>Usar memory é necessário para evitar erros de compilação em Solidity, já que o compilador precisa saber onde alocar tipos de dados complexos.

Outros locais de armazenamento:

- Storage: Usado para variáveis de estado persistentes no contrato (como a variável message no exemplo). Dados em storage são gravados na blockchain e persistem entre chamadas.

- Calldata: Usado para dados de entrada de funções (como parâmetros) que são apenas leitura e não persistem. É mais eficiente em termos de gás para chamadas externas.

## OlaContract

### Análise do contrato

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";

contract OlaContract {
    string public nome;
    uint public idade;


    // Declaração do evento
    event DetailsUpdated(string nome, uint idade);

    // Função para definir nome e idade
    function setDetails(string calldata _nome, uint _idade) public {
        require(bytes(_nome).length > 0, unicode"Nome nao pode ser vazio");
        require(_idade > 0, "Idade deve ser maior que zero");
        nome = _nome;
        idade = _idade;
         // Emissão do evento
        emit DetailsUpdated(_nome, _idade);
    }

    // Função para retornar uma mensagem de cumprimento
    function dizerOla() public view returns (string memory) {
        return string(abi.encodePacked(unicode"Olá,", nome, unicode"! Você tem ", Strings.toString(idade), " anos."));
    }
}
```
[olacontract.sol](../assets/code/olacontract.sol)

1. **Licença e versão**:
   - `SPDX-License-Identifier: MIT`: Define a licença do contrato como MIT, que é padrão para contratos reutilizáveis.
   - `pragma solidity ^0.8.0`: Especifica que o contrato é compatível com Solidity versão 0.8.0 ou superior.

2. **Importação**:
   - `import "@openzeppelin/contracts/utils/Strings.sol";`: Importa a biblioteca `Strings` da OpenZeppelin, que fornece a função `toString` para converter `uint256` em `string`.

3. **Variáveis de estado**:
   - `string public name`: Armazena o nome em `storage` (persistente na blockchain).
   - `uint public age`: Armazena a idade como um inteiro sem sinal em `storage`.

4. **Função `setDetails`**:
   - Recebe um nome (`_name` como `calldata` para eficiência) e uma idade (`_age` como `uint`).
   - Atualiza as variáveis de estado `name` e `age`.

5. **Função `dizerOla`**:
   - É uma função `view` (só leitura, não modifica o estado).
   - Usa `abi.encodePacked` para concatenar strings e criar uma mensagem como "Olá, Alice! Você tem 25 anos.".
   - O modificador `unicode` é usado nas strings literais `"Olá,"` e `"! Você tem "` para suportar caracteres Unicode, como a vírgula com acento em "Olá,". Isso é útil para garantir a codificação correta de caracteres especiais.
   - `Strings.toString(age)` converte a idade em uma string.
   - Retorna a mensagem concatenada como `string memory` (armazenada temporariamente na memória).

### Sobre o uso de `unicode`

O prefixo `unicode` antes de strings literais (ex.: `unicode"Olá,"`) foi introduzido em Solidity para permitir o uso de caracteres Unicode diretamente no código. Isso é importante para suportar caracteres não-ASCII, como acentos em português (ex.: "á" em "Olá").
Sem o `unicode`, strings literais são tratadas como UTF-8, mas podem causar problemas de codificação em algumas ferramentas ou interfaces. O uso explícito de `unicode` garante compatibilidade e legibilidade.

### `require`

Require é uma função de controle de fluxo em Solidity que verifica se uma condição é verdadeira. Se for falsa, a transação é revertida, o estado da blockchain não é alterado, e qualquer gás usado até aquele ponto é consumido, mas o restante é devolvido.

>Se a condição do require falhar, a execução para imediatamente, evitando o consumo desnecessário de gás em operações subsequentes.

Sintaxe:

```solidity
require(condição, "mensagem de erro");
```

- condição: Uma expressão booleana que deve ser true para a execução continuar.
- "mensagem de erro": Uma string opcional que descreve o motivo da falha, retornada ao chamador em caso de erro.

Outros detalhes:

- `bytes(_nome).length > 0`:A função bytes() converte a string em um array de bytes, permitindo verificar seu comprimento.

### eventos

Eventos são mecanismos em Solidity para registrar ações ou mudanças de estado na blockchain. Eles são emitidos pelo contrato e armazenados nos logs da transação, permitindo que aplicações externas (como dApps, carteiras ou indexadores como The Graph) sejam notificadas.

>Eventos são armazenados nos logs da blockchain, que são mais baratos em termos de gás do que armazenar dados em variáveis de estado.

Podem ser indexados (até três parâmetros por evento) para facilitar buscas por ferramentas externas.

>Não podem ser lidos diretamente pelo contrato que os emite, mas são acessíveis por aplicações externas via bibliotecas como Web3.js ou ethers.js.

#### Como o evento funciona no contrato

1. Declaração do evento:
event DetailsUpdated(string name, uint age);
Define um evento chamado DetailsUpdated com dois parâmetros: name (string) e age (uint).
Esses parâmetros são os dados que serão registrados nos logs da blockchain quando o evento for emitido.
2. Emissão do evento:
emit DetailsUpdated(_name,_age);
Na função setDetails, após as validações com require e a atualização das variáveis name e age, o evento é emitido.
O emit registra os valores atuais de _name e_age nos logs da transação.
3. O que acontece na blockchain:
Quando setDetails é chamado (ex.: setDetails("Alice", 25)), o evento DetailsUpdated é incluído nos logs da transação.

4. Os logs contêm:

- O nome do evento (DetailsUpdated).
- Os parâmetros ("Alice", 25).
- Informações sobre a transação, como o endereço do contrato e o hash da transação.

>Esses logs podem ser acessados por ferramentas externas para reagir à atualização (ex.: atualizar uma interface de usuário).

5. Verifique a seção de Logs no console do Remix. Você verá algo como:

![Deploy](../assets/images/image.png)

clicar no botão deploy para ver o log

![logs](../assets/images/logs.png)

O evento DetailsUpdated notifica mudanças em name e age, emitido após as validações com require.
Ele é útil para rastrear atualizações e integrar com aplicações externas.
O custo de gás é baixo, e os logs são permanentes na blockchain, permitindo consultas futuras.

## Contrato Transferência de fundo entre contas

```solidity

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TransferenciaFundos {
    mapping(address => uint256) public saldos;
    struct Transaction {
        address de;
        address para;
        uint256 quantia;
        uint256 timestamp;
    }
    Transaction[] public transactions;

    function depositar() public payable {
        saldos[msg.sender] += msg.value;
    }

    function transferir(address _para, uint256 _quantia) public {
        require(_para != address(0), unicode"Endereço inválido");
        require(_quantia > 0, "Valor deve ser maior que zero");
        require(saldos[msg.sender] >= _quantia, "Saldo insuficiente");

        saldos[msg.sender] -= _quantia;
        saldos[_para] += _quantia;
        transactions.push(Transaction(msg.sender, _para, _quantia, block.timestamp));
    }

    function getSaldo(address _conta) public view returns (uint256) {
        return saldos[_conta];
    }

    function numeroTransactions() public view returns (uint256) {
        return transactions.length;
    }
}
```
[transferirfundos.sol](../assets/code/transferirfundos.sol)

### Explicação

1. `// SPDX-License-Identifier: MIT`
   Especifica a licença do código, indicando que o contrato está sob a licença MIT, que permite uso, modificação e distribuição livres, desde que a licença seja incluída. É uma boa prática para contratos Solidity, especialmente para publicação ou auditoria.

2. `pragma solidity ^0.8.0;`
   Define a versão do compilador Solidity a ser usada. O símbolo `^` indica compatibilidade com qualquer versão 0.8.x (ex.: 0.8.0 até 0.8.20). Garante que o contrato seja compilado com uma versão específica para evitar incompatibilidades.

3. `contract TransferenciaFundos {`
   Declara o início do contrato chamado `TransferenciaFundos`. Todo o código subsequente define as funcionalidades desse contrato.

4. `mapping(address => uint256) public saldos;`
   Cria um mapeamento público chamado `saldos` que associa endereços Ethereum (`address`) a valores inteiros sem sinal (`uint256`), representando o saldo em Wei (1 ETH = 10^18 Wei). O modificador `public` gera automaticamente uma função getter para consultar os saldos.

5. `struct Transaction {`
   Define uma estrutura chamada `Transaction` para armazenar informações sobre cada transferência realizada. Uma `struct` é como um tipo de dado personalizado que agrupa variáveis relacionadas.

6. `address de;`
   Declara um campo `de` do tipo `address` na estrutura `Transaction`, que armazena o endereço do remetente da transferência.

7. `address para;`
   Declara um campo `para` do tipo `address` na estrutura `Transaction`, que armazena o endereço do destinatário da transferência.

8. `uint256 quantia;`
   Declara um campo `quantia` do tipo `uint256` na estrutura `Transaction`, que armazena o valor transferido (em Wei).

9. `uint256 timestamp;`
   Declara um campo `timestamp` do tipo `uint256` na estrutura `Transaction`, que armazena o momento da transação (em segundos desde a época Unix, obtido via `block.timestamp`).

10. `Transaction[] public transactions;`
    Cria um array público dinâmico chamado `transactions` que armazena instâncias da estrutura `Transaction`. Cada transferência é registrada nesse array. O modificador `public` permite que o array seja acessado externamente (ex.: para consultar transações por índice).

11. `function depositar() public payable {`
    Declara a função `depositar`, que permite aos usuários enviar Ether para o contrato, aumentando seu saldo. O modificador `public` permite que qualquer um chame a função, e `payable` indica que a função pode receber Ether.

12. `saldos[msg.sender] += msg.value;`
    Adiciona o valor enviado na transação (`msg.value`, em Wei) ao saldo do remetente (`msg.sender`, o endereço que chama a função) no mapeamento `saldos`. Por exemplo, se um usuário enviar 5 ETH, seu saldo aumenta em 5 * 10^18 Wei.

    >O que é o objeto msg? O msg é uma variável embutida no Solidity que está disponível em todas as funções de um contrato. Ele contém metadados sobre a transação ou chamada de função atual, permitindo que o contrato interaja com informações do blockchain, como o remetente da transação, o valor em Ether enviado, ou os dados incluídos na chamada.
    >Principais atributos do msg:
     - msg.sender (tipo: address payable). Representa o endereço da conta (ou contrato) que chamou a função atual. Pode ser um usuário externo (EOA - Externally Owned Account) ou outro contrato.
     - msg.value (tipo: uint256). Representa o valor em Wei (1 ETH = 10^18 Wei) enviado com a transação. Só é relevante em funções marcadas como payable.
     - msg.data (tipo: bytes). Contém os dados brutos da chamada da função, incluindo o seletor da função (os primeiros 4 bytes do hash Keccak-256 da assinatura da função) e os argumentos passados.
     - msg.sig (tipo: bytes4) Contém os primeiros 4 bytes do msg.data, que representam o seletor da função chamada (o identificador da função).

13. `function transferir(address _para, uint256 _quantia) public {`
    Declara a função `transferir`, que permite ao usuário transferir `_quantia` Wei para o endereço `_para`. O modificador `public` permite que qualquer um chame a função.

14. `require(_para != address(0), unicode"Endereço inválido");`
    Usa a função `require` para verificar se o endereço de destino `_para` não é o endereço zero (`0x0`), que é inválido. Se for, a transação reverte com a mensagem "Endereço inválido". O `unicode` antes da string permite caracteres especiais (como acentos), embora não seja necessário aqui.

15. `require(_quantia > 0, "Valor deve ser maior que zero");`
    Verifica se o valor a ser transferido (`_quantia`) é maior que zero. Se não for, a transação reverte com a mensagem "Valor deve ser maior que zero", evitando transferências nulas.

16. `require(saldos[msg.sender] >= _quantia, "Saldo insuficiente");`
    Confirma que o saldo do remetente (`msg.sender`) no mapeamento `saldos` é suficiente para cobrir `_quantia`. Se não for, reverte com a mensagem "Saldo insuficiente".

17. `saldos[msg.sender] -= _quantia;`
    Subtrai `_quantia` do saldo do remetente no mapeamento `saldos`, atualizando seu saldo após a transferência.

18. `saldos[_para] += _quantia;`
    Adiciona `_quantia` ao saldo do destinatário (`_para`) no mapeamento `saldos`, completando a transferência.

19. `transactions.push(Transaction(msg.sender, _para, _quantia, block.timestamp));`
    Registra a transferência no array `transactions`, adicionando uma nova instância da estrutura `Transaction`. Os campos são preenchidos com:
      - `msg.sender`: endereço do remetente.
      - `_para`: endereço do destinatário.
      - `_quantia`: valor transferido.
      - `block.timestamp`: timestamp do bloco atual (momento da transação).

20. `function getSaldo(address _conta) public view returns (uint256) {`
    Declara a função `getSaldo`, que retorna o saldo de um endereço específico (`_conta`). O modificador `view` indica que a função não altera o estado do blockchain, e `returns (uint256)` especifica que o retorno é um valor inteiro sem sinal.

21. `return saldos[_conta];`
    Retorna o saldo do endereço `_conta` armazenado no mapeamento `saldos`. Se o endereço nunca depositou ou recebeu fundos, retorna 0.

22. `function numeroTransactions() public view returns (uint256) {`
    Declara a função `numeroTransactions`, que retorna o número total de transações registradas no array `transactions`. O modificador `view` indica que é uma função de leitura.

23. `return transactions.length;`
    Retorna o comprimento do array `transactions`, que representa o número total de transferências realizadas.

### Como o Contrato Funciona

- **Depósito**: Usuários chamam `depositar` enviando Ether, que aumenta seu saldo no mapeamento `saldos`.
- **Transferência**: Usuários chamam `transferir` para enviar uma quantia a outro endereço, desde que tenham saldo suficiente. A transferência atualiza os saldos e registra a transação no array `transactions`.
- **Consulta**: Usuários podem verificar o saldo de qualquer conta com `getSaldo` e o número total de transações com `numeroTransactions`.

1. **Depósito Realizado?**
   - Certifique-se de chamar `depositar` com um valor no campo "Value" do Remix (ex.: `5` ETH). Por exemplo:
     - Selecione uma conta na JavaScript VM.
     - Insira `5` no campo "Value" (em ETH).
     - Clique em `depositar`.
     - Chame `getSaldo` com o endereço da conta usada (copie do campo "Account").
   - **Erro comum**: Não inserir um valor no campo "Value", resultando em `msg.value` igual a 0.

2. **Conta Correta?**
   - Verifique se o endereço passado para `getSaldo` é o mesmo que fez o depósito. No Remix, copie o endereço do campo "Account" e cole em `getSaldo`.

3. **Instância do Contrato**:
   - Se você implantou o contrato várias vezes, pode estar chamando `getSaldo` em uma instância antiga. Use a instância mais recente na seção "Deployed Contracts".

4. **Exemplo de Teste no Remix**:
   - Compile o contrato no Remix (`^0.8.0`).
   - Selecione **JavaScript VM (Berlin)**.
   - Implante o contrato.
   - Com a conta `0x5B38Da6a...`, insira `5` ETH no campo "Value" e chame `depositar`.
   - Chame `getSaldo` com `0x5B38Da6a...`. Deve retornar `5000000000000000000` (5 ETH em Wei).
   - Chame `transferir` com outro endereço (ex.: `0xAb8483F6...`) e quantia `2000000000000000000` (2 ETH).
   - Verifique `getSaldo` para ambas as contas e `numeroTransactions` (deve retornar `1`).

5. **Se o problema de `getSaldo` retornar zero persistir**
Confirme:

- O valor exato inserido no campo "Value" ao chamar `depositar`.
- O endereço exato passado para `getSaldo`.
- Se a transação de depósito foi confirmada (verifique os logs no Remix).
