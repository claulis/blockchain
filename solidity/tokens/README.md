# Tokens

## O que são ERCs?

Os ERCs (Ethereum Request for Comments) são padrões técnicos propostos para a blockchain Ethereum. Eles fazem parte das EIPs (Ethereum Improvement Proposals), que são sugestões de melhorias para o ecossistema Ethereum. Os ERCs, especificamente, definem regras e interfaces que os contratos inteligentes devem seguir para serem compatíveis com carteiras (como MetaMask), exchanges (como Uniswap) e outros serviços na rede. Pense neles como "blueprints" ou modelos que facilitam a interoperabilidade entre diferentes aplicações.

### 1. ERC-20: Padrão para Tokens Fungíveis

#### Para que serve?

O ERC-20 é o padrão usado para criar **tokens fungíveis**, ou seja, tokens que são intercambiáveis e têm o mesmo valor entre si. Imagine o dinheiro tradicional: um real é igual a outro real, independentemente de quem o possui. Na blockchain Ethereum, tokens ERC-20 são usados para representar coisas como:

- Criptomoedas (ex.: DAI, USDT).
- Tokens de utilidade (ex.: pagar por serviços em uma plataforma).
- Tokens de governança (ex.: votar em decisões de um projeto).

#### Como funciona?

O ERC-20 define um conjunto de **funções** e **eventos** que um contrato inteligente deve implementar. Isso garante que qualquer aplicativo que suporte o padrão ERC-20 possa interagir com o token. Sem o ERC-20, cada token teria sua própria lógica, dificultando a integração com carteiras e exchanges. Com esse padrão, os desenvolvedores podem criar tokens que "falam a mesma língua" que o ecossistema Ethereum. Aqui estão as principais funções e eventos:

- **Funções:**
  - `totalSupply()`: Mostra o total de tokens existentes.
  - `balanceOf(address)`: Consulta quantos tokens um endereço possui.
  - `transfer(address to, uint256 value)`: Permite que o dono do token envie uma quantidade para outro endereço.
  - `approve(address spender, uint256 value)`: Autoriza outra pessoa (ou contrato) a gastar uma quantidade específica dos seus tokens.
  - `transferFrom(address from, address to, uint256 value)`: Permite que alguém (autorizado via `approve`) transfira tokens em nome do dono.
  - `allowance(address owner, address spender)`: Mostra quanto um endereço autorizado ainda pode gastar em nome do dono.

- **Eventos:**
  - `Transfer(address from, address to, uint256 value)`: Registra toda vez que tokens são transferidos.
  - `Approval(address owner, address spender, uint256 value)`: Registra quando uma autorização é dada.

### 2. ERC-721: Padrão para Tokens Não Fungíveis (NFTs)

#### Para que serve?

O ERC-721 é usado para criar **tokens não fungíveis (NFTs)**, ou seja, tokens únicos que não podem ser trocados diretamente entre si. Pense em uma obra de arte ou um item raro de um jogo: cada um é diferente e tem um valor próprio. Exemplos de uso incluem:

- Arte digital (ex.: CryptoPunks).
- Colecionáveis (ex.: cartas de jogos).
- Propriedade virtual (ex.: terrenos no metaverso).

#### Como funciona?

Diferente do ERC-20, onde todos os tokens são iguais, no ERC-721 cada token tem um identificador único chamado `tokenId`. O contrato mantém um registro de quem possui cada `tokenId`. O ERC-721 permite a criação de ativos digitais únicos e verificáveis na blockchain, revolucionando a forma como pensamos sobre propriedade e autenticidade no mundo digital. Aqui estão as principais funções e eventos:

- **Funções:**
  - `ownerOf(uint256 tokenId)`: Mostra quem é o dono de um `tokenId` específico.
  - `transferFrom(address from, address to, uint256 tokenId)`: Transfere um token específico de um endereço para outro.
  - `approve(address to, uint256 tokenId)`: Autoriza alguém a transferir um `tokenId` específico.
  - `setApprovalForAll(address operator, bool approved)`: Dá permissão a um "operador" para gerenciar todos os seus NFTs.

- **Eventos:**
  - `Transfer(address from, address to, uint256 tokenId)`: Registra a transferência de um NFT.
  - `Approval(address owner, address approved, uint256 tokenId)`: Registra a autorização para um token específico.
  - `ApprovalForAll(address owner, address operator, bool approved)`: Registra a autorização para todos os tokens.

### 3. ERC-1155: Padrão para Tokens Semi-Fungíveis

#### Para que serve?

O ERC-1155 é um padrão mais avançado que combina características dos ERC-20 e ERC-721. Ele permite criar **múltiplos tipos de tokens** (fungíveis e não fungíveis) em um único contrato. É ideal para jogos ou plataformas que precisam gerenciar vários tipos de ativos, como:

- Moedas fungíveis (ex.: ouro em um jogo).
- Itens únicos (ex.: uma espada lendária).
- Itens semi-fungíveis (ex.: ingressos para um evento).

#### Como funciona?

Cada tipo de token é identificado por um `id`. Um mesmo `id` pode ter várias unidades (fungível) ou ser único (não fungível). O ERC-1155 é mais eficiente porque pode lidar com várias transferências em uma única transação. O ERC-1155 reduz custos de gás (taxas da rede) e simplifica o gerenciamento de ativos, sendo uma evolução dos padrões anteriores. Principais funções e eventos:

- **Funções:**
  - `balanceOf(address account, uint256 id)`: Mostra quantas unidades de um `id` um endereço possui.
  - `safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes data)`: Transfere uma quantidade de um `id` específico.
  - `safeBatchTransferFrom(address from, address to, uint256[] ids, uint256[] amounts, bytes data)`: Transfere vários tipos de tokens de uma só vez.
  - `setApprovalForAll(address operator, bool approved)`: Autoriza um operador a gerenciar todos os seus tokens.

- **Eventos:**
  - `TransferSingle(address operator, address from, address to, uint256 id, uint256 value)`: Registra a transferência de um tipo de token.
  - `TransferBatch(address operator, address from, address to, uint256[] ids, uint256[] values)`: Registra transferências em lote.
  - `ApprovalForAll(address account, address operator, bool approved)`: Registra autorizações gerais.

## Exemplos Práticos

### Exemplo 1: Contrato ERC-20 (MeuToken)

Este contrato cria um token fungível chamado "MeuToken" (MTK).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MeuToken {
    string public name = "MeuToken"; // Nome do token
    string public symbol = "MTK"; // Símbolo do token
    uint8 public decimals = 18; // Casas decimais (padrão Ethereum)
    uint256 public totalSupply; // Total de tokens em circulação
    mapping(address => uint256) public balanceOf; // Saldo de cada endereço
    mapping(address => mapping(address => uint256)) public allowance; // Permissões de gasto

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    // Construtor: define o suprimento inicial
    constructor(uint256 _initialSupply) {
        totalSupply = _initialSupply * 10 ** decimals; // Multiplica pelo número de casas decimais
        balanceOf[msg.sender] = totalSupply; // Atribui tudo ao criador
    }

    // Transfere tokens do remetente para outro endereço
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(_to != address(0), "Endereço inválido"); // Evita envio para endereço nulo
        require(balanceOf[msg.sender] >= _value, "Saldo insuficiente"); // Verifica saldo
        balanceOf[msg.sender] -= _value; // Subtrai do remetente
        balanceOf[_to] += _value; // Adiciona ao destinatário
        emit Transfer(msg.sender, _to, _value); // Emite evento
        return true;
    }

    // Autoriza outro endereço a gastar tokens
    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value; // Define a permissão
        emit Approval(msg.sender, _spender, _value); // Emite evento
        return true;
    }

    // Transfere tokens em nome de outro endereço (se autorizado)
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_to != address(0), "Endereço inválido");
        require(balanceOf[_from] >= _value, "Saldo insuficiente");
        require(allowance[_from][msg.sender] >= _value, "Permissão insuficiente");
        balanceOf[_from] -= _value; // Subtrai do dono
        balanceOf[_to] += _value; // Adiciona ao destinatário
        allowance[_from][msg.sender] -= _value; // Reduz a permissão
        emit Transfer(_from, _to, _value); // Emite evento
        return true;
    }
}
```

[MeuToken.sol](../assets/code/MeuToken.sol)

#### Explicação do Código

- **Variáveis:**
  - `name`, `symbol`, `decimals`: Informações básicas do token. O `decimals` define quantas casas decimais o token suporta (18 é o padrão, como no Ether).
  - `totalSupply`: Armazena o total de tokens criados.
  - `balanceOf`: Um mapeamento que associa cada endereço ao seu saldo.
  - `allowance`: Um mapeamento aninhado que controla quanto um endereço pode gastar em nome de outro.

- **Construtor:**
  - Recebe um suprimento inicial (`_initialSupply`) e multiplica por `10 ** decimals` para ajustar as casas decimais. Todos os tokens são atribuídos ao criador (`msg.sender`).

- **Função `transfer`:**
  - Verifica se o destino é válido e se o remetente tem saldo suficiente.
  - Atualiza os saldos e emite o evento `Transfer`.

- **Função `approve`:**
  - Define uma permissão para outro endereço gastar tokens e emite o evento `Approval`.

- **Função `transferFrom`:**
  - Permite transferências em nome de outro endereço, desde que haja permissão suficiente (via `allowance`).

#### Por que não é possível ter um totalSupply infinito?

Pense no totalSupply como o número de ingressos para um show. Se  o show terá um número infinito de ingressos, como pode-se controlar quem entra? Como garante que o local não vai superlotar? E, mais importante, por que alguém pagaria por um ingresso se todos podem entrar de graça a qualquer momento? Definir um número finito de ingressos (ou tokens) cria valor, organização e previsibilidade.

1. Limitações técnicas da blockchain Ethereum:

- Na blockchain Ethereum, o totalSupply de um token ERC-20 é geralmente definido como um número do tipo uint256 (um inteiro não assinado de 256 bits). Esse tipo de dado tem um limite máximo: 2^256 - 1, que é um número absurdamente grande (aproximadamente 10^77). Embora isso seja praticamente "infinito" para fins humanos, ainda é um valor finito.

- Definir um valor literalmente infinito não é suportado pela linguagem Solidity (usada para criar contratos inteligentes no Ethereum), porque a blockchain precisa de valores precisos para calcular saldos, transferências e outras operações. Um valor infinito causaria problemas matemáticos e de armazenamento, já que o sistema não saberia como lidar com algo que não tem limite.

2. Problemas de implementação:

- As funções do padrão ERC-20, como transfer e balanceOf, dependem de cálculos exatos. Por exemplo, quando você transfere tokens, o contrato verifica se o remetente tem saldo suficiente (`balanceOf[msg.sender] >= _value`). Um valor infinito não pode ser armazenado ou comparado de forma confiável, o que quebraria a lógica do contrato.
- Além disso, a blockchain Ethereum opera com gás, que é pago para processar transações. Um totalSupply infinito poderia levar a cenários onde cálculos ou loops consumissem gás indefinidamente, travando o contrato ou tornando-o inutilizável.

3. Razões econômicas e práticas:

- Inflação descontrolada: Um token com suprimento infinito não teria escassez, o que é um fator crucial para o valor de qualquer ativo. Pense em uma moeda como o dólar: se o governo pudesse imprimir quantidades infinitas, o valor da moeda despencaria, pois não haveria limite para a oferta. O mesmo acontece com tokens.
- Confiança dos usuários: Projetos de criptomoedas geralmente definem um totalSupply fixo (como o Bitcoin com seus 21 milhões de moedas) ou um modelo de emissão controlada para dar previsibilidade e confiança aos investidores. Um suprimento infinito poderia afastar usuários, pois ninguém gostaria de investir em algo sem valor estável.

4. Gestão de mercado: Tokens com suprimento fixo ou controlado são mais fáceis de gerenciar em exchanges, carteiras e plataformas DeFi, que dependem de regras claras para operar.

#### Como funciona um suprimento "muito grande" ou dinâmico?

Embora um suprimento literalmente infinito não seja viável, pode-se adotar abordagens que simulam um suprimento flexível:

1. Suprimento muito grande: Pode-se definir um totalSupply extremamente alto, como 2^256 - 1, que é praticamente inalcançável. Por exemplo, muitos tokens têm suprimentos na casa dos bilhões ou trilhões (como o Shiba Inu, com 1 quatrilhão de tokens). Isso dá a ilusão de um suprimento "quase infinito", mas ainda é finito e gerenciável.
2. Mecanismo de cunhagem (minting): Em vez de definir um totalSupply fixo no início, pode-se criar um contrato que permite "cunhar" (mint) novos tokens sob certas condições. Por exemplo, o contrato pode permitir que mais tokens sejam criados com base em regras específicas, como votação de governança ou eventos programados.

```solidity
contract MeuToken{
    string public name = "MeuToken";
    string public symbol = "MKT";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    address public owner;

    constructor(uint256 _initialSupply) {
        totalSupply = _initialSupply;
        balanceOf[msg.sender] = _initialSupply;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Apenas o dono pode chamar esta função");
        _;
    }

    function mint(address _to, uint256 _amount) public onlyOwner {
        totalSupply += _amount; // Aumenta o suprimento total
        balanceOf[_to] += _amount; // Adiciona tokens ao destinatário
        emit Transfer(address(0), _to, _amount); // Registra a cunhagem
    }
}
```

Exemplo: Stablecoins como USDT usam cunhagem para aumentar o suprimento quando necessário, mas isso é controlado por uma entidade centralizada ou por um algoritmo.
3. Tokens com emissão contínua: Alguns projetos, como os que usam modelos inflacionários (ex.: Ethereum antes da transição para Proof of Stake), permitem a criação contínua de tokens. No entanto, isso é feito com regras claras (como uma taxa de emissão anual) para evitar desvalorização descontrolada

#### Como Testar no Remix

1. Abra o Remix (<https://remix.ethereum.org/>).
2. Crie um novo arquivo chamado `MeuToken.sol` e cole o código acima.
3. Compile o contrato (use Solidity versão 0.8.0 ou superior).
4. No painel "Deploy & Run Transactions":
   - Selecione "MeuToken".
   - No campo `_initialSupply`, insira `1000000` (1 milhão de tokens).
   - Clique em "Deploy".
5. Após o deploy:
   - Use `balanceOf` com o endereço do criador (copie o endereço do campo "Account") para verificar que ele tem 1 milhão de tokens.
6. Teste a transferência:
   - Na função `transfer`, insira outro endereço (ex.: `0x123...`) e um valor (ex.: `100`).
   - Clique em "transact" e use `balanceOf` para verificar os saldos do remetente e destinatário.
7. Teste a aprovação:
   - Use `approve` com outro endereço e um valor (ex.: `50`).
   - Use `transferFrom` com o endereço autorizado para transferir esses 50 tokens.

---

### Exemplo 2: Contrato ERC-721 (MeuNFT)

Este contrato cria [NFTs](/solidity/tokens/erc721.md) chamados "MeuNFT" (MNFT).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MeuNFT {
    string public name = "MeuNFT"; // Nome do NFT
    string public symbol = "MNFT"; // Símbolo do NFT
    uint256 public tokenCounter; // Contador para novos tokenIds
    mapping(uint256 => address) public ownerOf; // Dono de cada tokenId
    mapping(address => uint256) public balanceOf; // Quantos NFTs cada endereço possui
    mapping(uint256 => address) public getApproved; // Endereço aprovado para cada tokenId
    mapping(address => mapping(address => bool)) public isApprovedForAll; // Operadores autorizados

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

    // Cria um novo NFT
    function mint(address _to) public returns (uint256) {
        tokenCounter++; // Incrementa o contador
        ownerOf[tokenCounter] = _to; // Define o dono
        balanceOf[_to]++; // Atualiza o saldo
        emit Transfer(address(0), _to, tokenCounter); // Emite evento de criação
        return tokenCounter; // Retorna o tokenId
    }

    // Transfere um NFT
    function transferFrom(address _from, address _to, uint256 _tokenId) public {
        require(_to != address(0), "Endereço inválido");
        require(ownerOf[_tokenId] == _from, "Não é o dono do NFT");
        require(msg.sender == _from || getApproved[_tokenId] == msg.sender || isApprovedForAll[_from][msg.sender], "Não autorizado");
        balanceOf[_from]--; // Reduz o saldo do remetente
        balanceOf[_to]++; // Aumenta o saldo do destinatário
        ownerOf[_tokenId] = _to; // Atualiza o dono
        delete getApproved[_tokenId]; // Remove aprovação anterior
        emit Transfer(_from, _to, _tokenId); // Emite evento
    }

    // Autoriza um endereço a transferir um NFT
    function approve(address _approved, uint256 _tokenId) public {
        require(ownerOf[_tokenId] == msg.sender, "Não é o dono do NFT");
        getApproved[_tokenId] = _approved; // Define a aprovação
        emit Approval(msg.sender, _approved, _tokenId); // Emite evento
    }

    // Autoriza um operador a gerenciar todos os NFTs
    function setApprovalForAll(address _operator, bool _approved) public {
        isApprovedForAll[msg.sender][_operator] = _approved; // Define permissão
        emit ApprovalForAll(msg.sender, _operator, _approved); // Emite evento
    }
}

```

[MeuNFT.sol](../assets/code/MeuNFT.sol)

#### Explicação do Código

- **Variáveis:**
  - `name`, `symbol`: Metadados do NFT.
  - `tokenCounter`: Gera novos `tokenId`.
  - `ownerOf`: Associa cada `tokenId` ao seu dono.
  - `balanceOf`: Conta quantos NFTs cada endereço possui.
  - `getApproved`: Endereço autorizado a transferir um `tokenId`.
  - `isApprovedForAll`: Permissões gerais para operadores.

- **Função `mint`:**
  - Cria um novo NFT, incrementando o `tokenCounter` e definindo o dono.

- **Função `transferFrom`:**
  - Transfere um NFT, verificando se o remetente é o dono ou tem permissão.

- **Função `approve`:**
  - Autoriza um endereço a transferir um `tokenId`.

- **Função `setApprovalForAll`:**
  - Dá permissão geral a um operador.

## Como funciona o **tokenId** no ERC-721?

### O que é o tokenId?

- O **tokenId** é um identificador único, geralmente um número inteiro (`uint256` em Solidity), associado a cada NFT em um contrato ERC-721. Ele diferencia um NFT de todos os outros, mesmo dentro do mesmo contrato.
- Cada tokenId é registrado na blockchain Ethereum, vinculado a um endereço (o dono do NFT) por meio de um mapeamento como `mapping(uint256 => address) ownerOf`.
- Pense no tokenId como o número de série de um carro: cada carro tem um número único que o identifica, mesmo que vários carros sejam da mesma marca ou modelo.

### Como o tokenId é usado?

O tokenId é usado em várias funções do padrão ERC-721 para gerenciar o NFT:

1. **Rastrear propriedade**:
   - A função `ownerOf(tokenId)` retorna o endereço Ethereum que possui o NFT com aquele tokenId.
   - Exemplo: Se possuir um CryptoKitty com `tokenId` 12345, chamar `ownerOf(12345)` retorna o endereço do dono.

2. **Transferir o NFT**:
   - Funções como `transferFrom(address from, address to, uint256 tokenId)` usam o tokenId para especificar qual NFT está sendo transferido.
   - Exemplo: vender um NFT no OpenSea, e o contrato usa o tokenId para transferir a propriedade para o comprador.

3. **Metadados**:
   - A função `tokenURI(tokenId)` retorna um link (geralmente um arquivo JSON) com informações sobre o NFT, como nome, imagem ou atributos. O tokenId é usado para identificar qual NFT está sendo consultado.
   - Exemplo: Para um Bored Ape com `tokenId` 500, o `tokenURI(500)` pode retornar um link para um JSON que descreve o macaco, como "chapéu de pirata, óculos escuros".

4. **Criação (minting)**:
   - Quando um novo NFT é criado (ou "cunhado"), o contrato atribui um novo tokenId único. Geralmente, isso é feito incrementando um contador (ex.: `nextTokenId++`).
   - Exemplo: Um contrato de NFTs começa com `tokenId` 1 e incrementa para 2, 3, etc., a cada novo NFT criado.

#### Exemplo de código com tokenId

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MeuNFT is ERC721 {
    uint256 public nextTokenId;

    constructor() ERC721("MeuNFT", "MNFT") {
        nextTokenId = 1;
    }

    function mint(address to) public {
        uint256 tokenId = nextTokenId;
        _mint(to, tokenId);
        nextTokenId++;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "NFT não existe");
        return string(abi.encodePacked("https://meu-site.com/nft/", tokenId, ".json"));
    }
}
```

#### Explicação do código

- **nextTokenId**: Um contador que garante que cada novo NFT receba um tokenId único.
- **mint**: Cria um novo NFT com o próximo tokenId e o atribui a um endereço.
- **tokenURI**: Retorna os metadados do NFT, usando o tokenId para identificar qual NFT está sendo consultado.

### Como vincular um NFT a algo do mundo real, como um imóvel ou uma obra de arte?

Vincular um NFT a um ativo do mundo real, como um imóvel ou uma obra de arte, é um processo que combina tecnologia blockchain com estruturas legais e práticas do mundo físico. O NFT atua como um **certificado digital de propriedade** ou um **representante digital** do ativo, mas a conexão com o mundo real depende de sistemas fora da blockchain (off-chain). Vamos explorar como isso funciona, com exemplos e passos práticos.

#### Como funciona a vinculação?

1. **Representação digital**:
   - O NFT é criado na blockchain Ethereum com um tokenId único. Seus metadados (acessados via `tokenURI`) contêm informações que descrevem o ativo do mundo real, como o endereço de um imóvel ou a descrição de uma obra de arte.
   - Exemplo: Um NFT representando um imóvel pode ter metadados com o endereço do imóvel, número do registro e uma foto da propriedade.

2. **Contrato legal**:
   - Para que o NFT tenha validade no mundo real, ele deve estar vinculado a um contrato legal reconhecido pelas autoridades locais. Esse contrato especifica que o dono do NFT é o proprietário do ativo físico.
   - Exemplo: Para um imóvel, o NFT pode estar ligado a um contrato registrado em cartório que reconhece o dono do tokenId como o proprietário legal.

3. **Prova de autenticidade**:
   - Os metadados do NFT podem incluir documentos digitalizados, como certidões de propriedade ou certificados de autenticidade, armazenados em sistemas como IPFS (InterPlanetary File System) para garantir acesso permanente.
   - Exemplo: Para uma obra de arte, o NFT pode incluir um certificado assinado pelo artista ou uma galeria.

4. **Transferência de propriedade**:
   - Quando o NFT é transferido (usando `transferFrom`), o contrato legal associado pode exigir que a transferência seja registrada no mundo real (ex.: atualizar o registro do imóvel em cartório).
   - Algumas plataformas automatizam isso com contratos inteligentes que interagem com sistemas off-chain.

#### Passo a passo para vincular um NFT a um imóvel ou obra de arte

1. **Criar o NFT**:
   - Escrever um contrato ERC-721 que emita um NFT com um tokenId único.
   - Incluir metadados (via `tokenURI`) com detalhes do ativo, como:
     - Para um imóvel: Endereço, número de registro, fotos, descrição.
     - Para uma obra de arte: Nome do artista, título, imagem em alta resolução, certificado de autenticidade.

2. **Estabelecer um contrato legal**:
   - Trabalhaar com um advogado para criar um contrato que vincule a posse do NFT à propriedade do ativo físico. Esse contrato deve ser reconhecido pelas leis locais.
   - Exemplo: Para um imóvel, o contrato pode estipular que o dono do `tokenId` 100 é o proprietário legal do imóvel descrito nos metadados.

3. **Armazenar metadados**:
   - Hospedar os metadados em um sistema descentralizado como IPFS para garantir que não sejam alterados.
   - Exemplo: Um arquivo JSON com os detalhes do imóvel ou da obra de arte é armazenado no IPFS, e o link é retornado pela função `tokenURI`.

4. **Integrar com sistemas off-chain**:
   - Usar uma plataforma ou serviço que conecte a blockchain a sistemas do mundo real. Por exemplo:
     - Para imóveis, plataformas como **Propy** ou **RealT** integram NFTs ou tokens com registros imobiliários.
     - Para obras de arte, mercados como **OpenSea** ou **SuperRare** permitem que artistas vinculem NFTs a certificados de autenticidade.

5. **Transferência e validação**:
   - Quando o NFT é transferido, a plataforma ou contrato inteligente notifica as partes relevantes (ex.: cartório, galeria) para atualizar a propriedade no mundo real.
   - Algumas jurisdições podem exigir etapas manuais, como registrar a transferência em um cartório.

#### Exemplo: NFT para um imóvel

- **Cenário**: Você possui um apartamento e quer representá-lo como um NFT.
- **Passos**:
  1. Criar um contrato ERC-721 e emita um NFT com `tokenId` 1.
  2. Nos metadados, inclua:
     - Endereço: "Rua Exemplo, 123, São Paulo, SP".
     - Registro: "Matrícula 456789 no Cartório X".
     - Link para fotos e documentos no IPFS.
  3. Registrar um contrato legal em cartório que diz: "O dono do NFT com tokenId 1 no contrato 0x123... é o proprietário do imóvel".
  4. Quando for vendido o NFT (usando `transferFrom`), o cartório é notificado para atualizar o registro do imóvel.
- **Plataforma real**: A **Propy** usa NFTs para representar imóveis, integrando com registros legais em algumas jurisdições.

#### Exemplo: NFT para uma obra de arte

- **Cenário**: Um artista cria uma pintura e quer vendê-la como NFT.
- **Passos**:
  1. Criar um NFT com `tokenId` 500 em um contrato ERC-721.
  2. Os metadados incluem:
     - Título: "Noite Estrelada Digital".
     - Artista: "João Silva".
     - Imagem: Link para a pintura em alta resolução no IPFS.
     - Certificado: PDF assinado pelo artista, também no IPFS.
  3. Um contrato legal especifica que o dono do NFT tem direitos sobre a obra física (se aplicável) ou a versão digital.
  4. O NFT é vendido no OpenSea, e o comprador recebe o tokenId 500, que prova sua posse.
- **Plataforma real**: Artistas como **Beeple** vendem NFTs no OpenSea, muitas vezes vinculados a obras físicas ou digitais com certificados.

#### Desafios de vincular NFTs a ativos do mundo real

1. **Validade legal**:
   - Nem todas as jurisdições reconhecem NFTs como prova de propriedade. Por exemplo, um cartório no Brasil pode não aceitar um NFT como documento oficial sem um contrato legal associado.
   - Solução: Trabalhar com advogados e plataformas que integrem blockchain com sistemas legais.

2. **Dependência de sistemas off-chain**:
   - Os metadados do NFT (como imagens ou documentos) são frequentemente armazenados fora da blockchain (ex.: IPFS ou servidores centralizados). Se o servidor cair, os metadados podem ficar inacessíveis.
   - Solução: Usar sistemas descentralizados como IPFS ou Arweave.

3. **Autenticidade**:
   - Vincular um NFT a uma obra física exige confiança no emissor (ex.: o artista ou a galeria). Se o certificado for falso, o NFT perde valor.
   - Solução: Usar plataformas confiáveis ou oráculos (como Chainlink) para validar autenticidade.

4. **Custo**:
   - Criar e transferir NFTs no Ethereum pode ser caro devido às taxas de gás.
   - Solução: Usar redes compatíveis com Ethereum, como Polygon, que têm taxas mais baixas.

##### Exemplos reais de vinculação

1. **Imóveis**:
   - **Propy**: Uma plataforma que tokeniza imóveis como NFTs. Cada NFT representa um imóvel, com metadados que incluem a matrícula e documentos legais. A transferência do NFT é sincronizada com registros imobiliários.
   - **RealT**: Tokeniza frações de imóveis (usando ERC-20 para frações e ERC-721 para propriedades inteiras), permitindo que investidores comprem partes de propriedades.

2. **Obras de arte**:
   - **Beeple**: O artista vendeu um NFT por US$ 69 milhões na Christie's, vinculado a uma obra digital. O NFT incluía metadados com a imagem e um certificado de autenticidade.
   - **SuperRare**: Plataforma onde artistas criam NFTs vinculados a obras digitais, com certificados que garantem a autenticidade.

#### Como Testar no Remix

1. Crie um arquivo `MeuNFT.sol` no Remix e cole o código.
2. Compile e implante o contrato.
3. Chame `mint` com um endereço (ex.: o seu próprio endereço) para criar um NFT. Anote o `tokenId` retornado.
4. Use `ownerOf` com o `tokenId` para verificar o proprietário.
5. Teste a transferência:
   - Use `transferFrom` com o endereço atual, um novo endereço e o `tokenId`.
   - Verifique o novo dono com `ownerOf`.
6. Teste a aprovação:
   - Use `approve` para autorizar outro endereço.
   - Transfira o NFT com o endereço autorizado.

---

### Exemplo 3: Contrato ERC-1155 (MeuJogo)

O **ERC-1155**, ou "Ethereum Request for Comments 1155", é um padrão de token multiuso que permite a criação de **tokens fungíveis** (como moedas) e **não fungíveis** (como NFTs) no mesmo contrato inteligente. Ele foi projetado para ser mais eficiente e flexível do que os padrões ERC-20 e ERC-721, especialmente para casos como jogos, colecionáveis e sistemas que precisam gerenciar múltiplos tipos de ativos. O ERC-1155 pode ser pensado como uma "caixa mágica" que pode conter diferentes tipos de itens: moedas de ouro (fungíveis, como ERC-20), espadas únicas (não fungíveis, como ERC-721), e até itens semi-fungíveis, como ingressos numerados para um show. Em vez de precisar de caixas separadas (contratos diferentes para ERC-20 e ERC-721), o ERC-1155 organiza tudo em uma só, economizando espaço e custos.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MeuJogo {
    mapping(uint256 => mapping(address => uint256)) public balanceOf; // Saldo de cada id por endereço
    mapping(address => mapping(address => bool)) public isApprovedForAll; // Operadores autorizados

    event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

    // Cria novos tokens (ex.: ID 1 = moedas, ID 2 = espada)
    function mint(address _to, uint256 _id, uint256 _amount) public {
        balanceOf[_id][_to] += _amount; // Adiciona ao saldo
        emit TransferSingle(msg.sender, address(0), _to, _id, _amount); // Emite evento
    }

    // Transfere tokens
    function safeTransferFrom(address _from, address _to, uint256 _id, uint256 _amount, bytes memory _data) public {
        require(_to != address(0), "Endereço inválido");
        require(_from == msg.sender || isApprovedForAll[_from][msg.sender], "Não autorizado");
        require(balanceOf[_id][_from] >= _amount, "Saldo insuficiente");
        balanceOf[_id][_from] -= _amount; // Subtrai do remetente
        balanceOf[_id][_to] += _amount; // Adiciona ao destinatário
        emit TransferSingle(msg.sender, _from, _to, _id, _amount); // Emite evento
    }

    // Autoriza um operador
    function setApprovalForAll(address _operator, bool _approved) public {
        isApprovedForAll[msg.sender][_operator] = _approved;
        emit ApprovalForAll(msg.sender, _operator, _approved);
    }
}
```

[MeuJogo.sol](../assets/code/MeuJogo.sol)

#### Explicação do Código

- **Variáveis:**
  - `balanceOf`: Saldo de cada `id` por endereço.
  - `isApprovedForAll`: Permissões gerais.

- **Função `mint`:**
  - Cria tokens de um `id` específico (ex.: 1000 moedas com `id=1` ou 1 espada com `id=2`).

- **Função `safeTransferFrom`:**
  - Transfere uma quantidade de um `id`, verificando permissões e saldo.

- **Função `setApprovalForAll`:**
  - Autoriza um operador.

### Características principais do ERC-1155

O ERC-1155 é conhecido pela sua flexibilidade e eficiência. Aqui estão os principais recursos que o definem:

1. **Suporte a múltiplos tipos de tokens**:
   - Um único contrato ERC-1155 pode gerenciar vários tipos de tokens, cada um identificado por um **id** (semelhante ao `tokenId` do ERC-721).
   - Esses tokens podem ser:
     - **Fungíveis**: Como moedas, onde cada unidade é idêntica (ex.: 100 moedas de ouro).
     - **Não fungíveis**: Como NFTs, onde cada token é único (ex.: uma espada lendária).
     - **Semi-fungíveis**: Tokens que têm alguma unicidade, mas podem existir em quantidades limitadas (ex.: 50 ingressos numerados para um evento).
   - Exemplo: Em um jogo, um contrato ERC-1155 pode gerenciar moedas (fungíveis), armas únicas (NFTs) e poções limitadas (semi-fungíveis).

2. **Transferências em lote (batch transfers)**:
   - O ERC-1155 permite transferir múltiplos tokens (de diferentes IDs) em uma única transação, usando funções como `safeBatchTransferFrom`. Isso reduz custos de gás em comparação com ERC-20 ou ERC-721, onde cada tipo de token exige um contrato separado.
   - Exemplo: Você pode enviar 100 moedas, 2 espadas e 5 poções para outro jogador em uma única transação.

3. **Gerenciamento eficiente**:
   - Como todos os tokens estão em um único contrato, o ERC-1155 economiza gás e simplifica a manutenção, já que não é necessário implantar múltiplos contratos.
   - Exemplo: Em vez de criar um contrato ERC-20 para moedas e um ERC-721 para NFTs, um contrato ERC-1155 faz tudo.

4. **Funções principais**:
   - **balanceOf(address owner, uint256 id)**: Retorna quantos tokens de um determinado `id` um endereço possui.
   - **safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes data)**: Transfere uma quantidade específica de tokens de um `id` para outro endereço.
   - **safeBatchTransferFrom**: Transfere múltiplos tokens de diferentes IDs em uma única transação.
   - **setApprovalForAll(address operator, bool approved)**: Autoriza um operador (como um mercado) a gerenciar todos os tokens de um usuário.
   - **tokenURI(uint256 id)** (opcional): Retorna metadados para um token específico, similar ao ERC-721.

5. **Metadados**:
   - Como no ERC-721, o ERC-1155 suporta metadados via `tokenURI`, que descrevem os atributos do token (ex.: imagem, descrição, nome).
   - Exemplo: Um NFT com `id` 1 pode ter metadados que apontam para uma imagem de uma espada, enquanto um token fungível com `id` 2 pode representar moedas sem metadados específicos.

### Como funciona o **id** no ERC-1155?

O **id** no ERC-1155 é semelhante ao `tokenId` do ERC-721, mas com uma diferença crucial: ele pode representar tanto tokens únicos (não fungíveis) quanto grupos de tokens idênticos (fungíveis).

- Cada tipo de token no contrato ERC-1155 é identificado por um **id** único (`uint256`).
- Para tokens **fungíveis**, o `id` representa um tipo de token, e o contrato rastreia quantas unidades desse tipo um endereço possui (ex.: 100 unidades do `id` 1, que são moedas).
- Para tokens **não fungíveis**, o `id` representa um token único, e o contrato garante que apenas uma unidade desse `id` exista (ex.: `id` 2 para uma espada única).
- A função `balanceOf(address, id)` verifica quantos tokens de um determinado `id` um endereço possui, permitindo gerenciar tanto tokens fungíveis quanto não fungíveis.

Exemplo:

- `id` 1: 1000 moedas de ouro (fungível, várias unidades).
- `id` 2: Uma espada lendária (não fungível, apenas 1 unidade).
- `id` 3: 50 ingressos para um show (semi-fungível, quantidade limitada).

### Como funciona um contrato ERC-1155?

O ERC-1155 é implementado em Solidity, e um único contrato pode gerenciar vários tipos de tokens. Aqui está um exemplo simplificado:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract MeuJogo is ERC1155 {
    constructor() ERC1155("https://meu-site.com/api/{id}.json") {
        // Cria 1000 moedas fungíveis (id 1)
        _mint(msg.sender, 1, 1000, "");
        // Cria 1 espada única (id 2, não fungível)
        _mint(msg.sender, 2, 1, "");
        // Cria 50 ingressos (id 3, semi-fungível)
        _mint(msg.sender, 3, 50, "");
    }

    function mint(address to, uint256 id, uint256 amount) public {
        _mint(to, id, amount, ""); // Cria tokens com o id especificado
    }

    function transferBatch(address from, address to, uint256[] memory ids, uint256[] memory amounts) public {
        safeBatchTransferFrom(from, to, ids, amounts, ""); // Transfere múltiplos tokens
    }
}
```

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract MeuJogo is ERC1155 {
    constructor() ERC1155("https://meu-site.com/api/{id}.json") {
        _mint(msg.sender, 1, 1000, "");
        _mint(msg.sender, 2, 1, "");
        _mint(msg.sender, 3, 50, "");
    }

    function mint(address to, uint256 id, uint256 amount) public {
        _mint(to, id, amount, "");
    }

    function transferBatch(address from, address to, uint256[] memory ids, uint256[] memory amounts) public {
        safeBatchTransferFrom(from, to, ids, amounts, "");
    }
}
```

#### Explicação do código

- **Herança**: Usa a biblioteca OpenZeppelin para implementar o padrão ERC-1155.
- **Minting**: A função `_mint` cria tokens com um `id` específico e uma quantidade (`amount`). Por exemplo, cria 1000 moedas (`id` 1) e 1 espada (`id` 2).
- **Transferência em lote**: A função `transferBatch` permite transferir múltiplos tokens (ex.: 100 moedas e 1 espada) em uma única transação.
- **Metadados**: O contrato define uma URL base para `tokenURI`, que retorna informações sobre cada `id` (ex.: imagem de uma espada para `id` 2).

#### Exemplos reais de tokens ERC-1155

O ERC-1155 é amplamente usado, especialmente em jogos e plataformas que precisam de múltiplos tipos de ativos. Aqui estão alguns exemplos:

1. **The Sandbox**:
   Um mundo virtual onde os usuários criam, compram e vendem ativos digitais, como terrenos (NFTs) e itens de jogo (fungíveis ou semi-fungíveis).
   Um único contrato ERC-1155 gerencia terrenos (não fungíveis, cada um com um `id` único), moedas do jogo (fungíveis, com um `id` específico), e itens como roupas ou ferramentas (semi-fungíveis).
   - **Exemplo**: Você compra um terreno (`id` 1000, quantidade 1) e 500 moedas SAND (`id` 2000, quantidade 500) no mesmo contrato.
   - **Impacto**: O ERC-1155 reduz os custos de gás e simplifica o gerenciamento de ativos em um jogo complexo.

2. **Enjin**:
   Uma plataforma para criar ativos de jogos blockchain, como armas, personagens e moedas. O contrato ERC-1155 da Enjin permite que desenvolvedores criem tokens fungíveis (ex.: moedas) e não fungíveis (ex.: espadas únicas) para jogos.
   - **Exemplo**: Em um jogo, você recebe 100 moedas (`id` 1) e uma armadura única (`id` 2) em uma única transação.
   - **Impacto**: Enjin usa o ERC-1155 para integrar ativos em vários jogos, permitindo interoperabilidade.

3. **OpenSea (coleções)**:
   Um mercado de NFTs que suporta tanto ERC-721 quanto ERC-1155. Algumas coleções no OpenSea usam ERC-1155 para criar edições limitadas de NFTs (semi-fungíveis). Por exemplo, um artista pode emitir 100 cópias de uma obra digital, todas com o mesmo `id`, mas em quantidade limitada.
   - **Exemplo**: Você compra uma cópia de uma arte digital (`id` 300, quantidade 1) no OpenSea, que é parte de uma edição de 100 unidades.

4. **Decentraland (itens)**:
   Além de terrenos (ERC-721), Decentraland usa ERC-1155 para itens como roupas ou acessórios no jogo. Roupas podem ser semi-fungíveis (ex.: 100 camisetas com `id` 400), enquanto itens únicos têm seu próprio `id`.
   - **Exemplo**: Você equipa seu avatar com uma camiseta (`id` 400, quantidade 1) e transfere 50 moedas do jogo (`id` 401) para um amigo.

---

### Conexão com o mundo real (como imóveis ou obras de arte)

Como discutimos na sua pergunta anterior sobre ERC-721, vincular tokens a ativos do mundo real, como imóveis ou obras de arte, exige combinar a blockchain com sistemas off-chain. O ERC-1155 pode ser usado para isso de forma semelhante ao ERC-721, mas com vantagens adicionais:

1. **Imóveis**:
   Um contrato ERC-1155 pode representar um imóvel único (não fungível, com um `id` específico) ou frações de um imóvel (fungíveis, com outro `id`).
   - **Exemplo**: Um contrato ERC-1155 emite um NFT com `id` 1 para um imóvel completo e 100 tokens fungíveis com `id` 2 para frações desse imóvel. Os metadados do `id` 1 incluem o endereço e a matrícula, enquanto o `id` 2 representa participações.
  
2. **Obras de arte**:
   Um artista pode emitir um NFT único (`id` 1, quantidade 1) para uma obra original e tokens semi-fungíveis (`id` 2, quantidade 50) para edições limitadas.
   - **Exemplo**: Uma pintura é representada por `id` 1, com metadados apontando para a imagem e um certificado. Cópias digitais numeradas são emitidas com `id` 2, e o contrato gerencia ambas.

#### Processo de vinculação

- **Metadados**: Como no ERC-721, o `tokenURI` retorna informações sobre o ativo (ex.: endereço do imóvel, imagem da obra).
- **Contrato legal**: Um contrato off-chain vincula o `id` do token à propriedade no mundo real, reconhecido por cartórios ou galerias.
- **Integração**: Plataformas como Propy (imóveis) ou Rarible (arte) conectam o token a sistemas legais ou certificados de autenticidade.

### Por que o ERC-1155 é importante?

O ERC-1155 é um divisor de águas por sua eficiência e versatilidade:

- **Economia de gás**: Transferências em lote e um único contrato para múltiplos tokens reduzem custos na blockchain Ethereum.
- **Flexibilidade**: Suporta tokens fungíveis, não fungíveis e semi-fungíveis, ideal para jogos, mercados e coleções mistas.
- **Interoperabilidade**: Como ERC-20 e ERC-721, é compatível com carteiras (MetaMask) e plataformas (OpenSea).
- **Escalabilidade**: Gerenciar muitos tipos de tokens em um contrato é mais eficiente do que criar contratos separados.

### Limitações do ERC-1155

- **Complexidade**: O ERC-1155 é mais complexo de implementar do que ERC-20 ou ERC-721, exigindo mais cuidado no design do contrato.
- **Custo inicial**: Embora economize gás a longo prazo, implantar um contrato ERC-1155 pode ser caro devido à sua flexibilidade.
- **Adoção**: Embora esteja ganhando popularidade, o ERC-1155 ainda é menos usado que ERC-20 e ERC-721 em alguns contextos.


#### Como Testar no Remix

1. Crie um arquivo `MeuJogo.sol` no Remix e cole o código.
2. Compile e implante o contrato.
3. Chame `mint`:
   - `mint(seu_endereço, 1, 1000)` para 1000 moedas.
   - `mint(seu_endereço, 2, 1)` para 1 espada.
4. Use `balanceOf` com o `id` e o endereço para verificar os saldos.
5. Teste a transferência:
   - Use `safeTransferFrom` para transferir 500 moedas (`id=1`) e a espada (`id=2`) para outro endereço.

## Referências

<https://eips.ethereum.org/EIPS/eip-20>
<https://github.com/ethereum/EIPs/issues/20>
<https://eips.ethereum.org/EIPS/eip-721>
