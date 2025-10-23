# Padrão ERC-20 – Conceitos, Características e Implementação no Remix IDE

## Sumário

1. [Introdução ao Padrão ERC-20](#introdução-ao-padrão-erc-20)  
2. [Finalidade do ERC-20](#finalidade-do-erc-20)  
3. [Características Essenciais](#características-essenciais)  
4. [Casos de Uso](#casos-de-uso)  
5. [Implementação no Remix IDE](#implementação-no-remix-ide)  
   5.1 [Exemplo 1: Token Simples](#exemplo-1-token-simples)  
   5.2 [Exemplo 2: Token com Função de Mint](#exemplo-2-token-com-função-de-mint)  
   5.3 [Exemplo 3: Token com Taxa de Burn](#exemplo-3-token-com-taxa-de-burn)  
6. [Passos para Testar no Remix IDE](#passos-para-testar-no-remix-ide)  
7. [Conclusão](#conclusão)  

## Introdução ao Padrão ERC-20

O ERC-20 é um padrão técnico para a criação de tokens fungíveis na blockchain Ethereum. Introduzido em 2015 por Fabian Vogelsteller e Vitalik Buterin, ele define uma interface comum que garante compatibilidade entre tokens e aplicações, como carteiras, exchanges descentralizadas (DEXs) e protocolos DeFi.

> - **ERC** significa *Ethereum Request for Comments*.  
> - **20** é o número da proposta (EIP-20).  
> - Tokens ERC-20 são intercambiáveis (fungíveis), semelhantes a moedas como o real ou dólar.

## Finalidade do ERC-20

O ERC-20 padroniza as interações com tokens para assegurar interoperabilidade. Sem esse padrão cada token teria funções diferentes para transferência ou consulta de saldo e carteiras (ex: MetaMask) e DEXs (ex: Uniswap) precisariam de integrações personalizadas.  

> Uma DEX (exchange descentralizada) na Ethereum é uma plataforma que permite negociar criptomoedas diretamente entre usuários, sem intermediários. Ela usa contratos inteligentes para executar transações de forma automática e segura, mantendo os ativos nas carteiras dos próprios usuários

Com o ERC-20 qualquer aplicação que suporte o padrão pode interagir com qualquer token ERC-20 e facilita a criação, transferência, aprovação e consulta de tokens de forma universal.

## Características Essenciais

O padrão exige **6 funções obrigatórias** e **2 eventos**. Além disso, recomenda variáveis para metadados. A tabela abaixo resume cada item:

| Elemento                  | Descrição                                                                 | Tipo      |
|---------------------------|---------------------------------------------------------------------------|-----------|
| `totalSupply()`           | Retorna a quantidade total de tokens em circulação.                       | Função    |
| `balanceOf(address)`      | Retorna o saldo de um endereço específico.                                | Função    |
| `transfer(address, uint256)` | Transfere tokens do remetente para um destinatário.                    | Função    |
| `transferFrom(address, address, uint256)` | Transfere tokens em nome de outro endereço (após aprovação).     | Função    |
| `approve(address, uint256)` | Autoriza um endereço a gastar uma quantidade de tokens do remetente.    | Função    |
| `allowance(address, address)` | Retorna a quantidade aprovada que um endereço pode gastar de outro.   | Função    |
| `Transfer` (evento)       | Emitido em toda transferência para registrar no blockchain.               | Evento    |
| `Approval` (evento)       | Emitido ao aprovar gastos para registrar autorizações.                    | Evento    |

**Recomendações (não obrigatórias):**  
- `name`: Nome do token (ex: "MeuToken").  
- `symbol`: Símbolo (ex: "MTK").  
- `decimal` : 18

O mecanismo `approve` + `transferFrom` é essencial para DeFi, permitindo que contratos (ex: Uniswap) gastem tokens do usuário sem acesso total à carteira.

### regras para decimal

A escolha de **18 casas decimais** como padrão para tokens ERC-20 não é obrigatória, mas é **altamente recomendada** por motivos de compatibilidade e precisão.

- **Precisão semelhante ao Ether (ETH):**  
  O Ether, moeda nativa da Ethereum, usa 18 casas decimais. Isso significa que 1 ETH = 1 × 10¹⁸ wei. Para manter consistência entre tokens e facilitar cálculos, os tokens ERC-20 adotam o mesmo padrão.

- **Facilidade de integração com dApps e carteiras:**  
  A maioria das aplicações descentralizadas (dApps), carteiras e exchanges já espera tokens com 18 casas decimais. Usar esse padrão evita erros de conversão e incompatibilidades.

- **Flexibilidade para microtransações:**  
  Com 18 casas decimais, é possível realizar transações com frações muito pequenas de tokens, o que é útil em jogos, recompensas, ou sistemas de micropagamento.

- **Evita arredondamentos indesejados:**  
  Quanto maior a precisão, menor o risco de perdas por arredondamento em cálculos financeiros ou distribuição de tokens.

 O campo `decimals` é opcional e pode ser definido com qualquer valor entre 0 e 18. Por exemplo:

- `decimals = 0`: token indivisível (como ingressos ou NFTs)
- `decimals = 2`: semelhante a moedas fiduciárias (centavos)
- `decimals = 18`: padrão mais comum para tokens fungíveis

## Casos de Uso

1. **Stablecoins**: Tokens com valor estável (ex: USDC = 1 USD). Usados em pagamentos e trocas, com alta liquidez em DEXs.  
2. **Tokens de Governança**: Dão direito a voto em DAOs (ex: UNI da Uniswap). O saldo determina o poder de voto.  
3. **Tokens de Utilidade/Recompensa**: Em jogos ou plataformas (ex: recompensas em Play-to-Earn). Permitem mint de novos tokens como incentivo.

## Implementação no Remix IDE

O Remix IDE é uma ferramenta online para compilar, deployar e testar contratos Solidity. Use a versão Solidity ^0.8.0. Os exemplos abaixo são completos e prontos para uso. Copie, compile e deploye em uma rede de teste (ex: Sepolia).

### Exemplo 1: Token Simples

Contrato básico com todas as funções ERC-20 implementadas.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MeuToken {
    string public name = "MeuToken";
    string public symbol = "MTK";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor(uint256 initialSupply) {
        totalSupply = initialSupply * (10 ** decimals);
        balanceOf[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }

    function transfer(address to, uint256 value) public returns (bool) {
        require(balanceOf[msg.sender] >= value, "Saldo insuficiente");
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }

    function approve(address spender, uint256 value) public returns (bool) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) public returns (bool) {
        require(balanceOf[from] >= value, "Saldo insuficiente");
        require(allowance[from][msg.sender] >= value, "Aprovacao insuficiente");
        balanceOf[from] -= value;
        balanceOf[to] += value;
        allowance[from][msg.sender] -= value;
        emit Transfer(from, to, value);
        return true;
    }
}
```

### Exemplo 2: Token com Função de Mint

**Mint** (do inglês "cunhar") é o processo de **criar novos tokens** em uma blockchain. Quando você "mintea" um token, está gerando unidades novas que antes não existiam e adicionando-as à oferta total.

Em contratos inteligentes (como ERC-20), "mintar" significa:

- Aumentar o `totalSupply` (quantidade total de tokens)
- Creditar esses novos tokens na conta de alguém (geralmente do criador ou de um usuário)
- Emitir um evento `Transfer` do endereço `0x0` (indicando criação)

> Mint ≠ Transferência. **Mintar**: criar tokens novos. **Transferir**: mover tokens já existentes entre contas

Herda do token simples e adiciona mint controlado pelo owner.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GameToken is MeuToken {
    address public owner;

    constructor() MeuToken(0) {
        owner = msg.sender;
    }

    function mint(address to, uint256 amount) public {
        require(msg.sender == owner, "Apenas o owner pode mintar");
        uint256 value = amount * (10 ** decimals);
        totalSupply += value;
        balanceOf[to] += value;
        emit Transfer(address(0), to, value);
    }
}

Esse código cria tokens e envia para o endereço `to`. O `address(0)` representa que os tokens vieram “do nada” — ou seja, foram criados.
```

### Exemplo 3: Token com Taxa de Burn

A **taxa de burn** (ou taxa de queima) é um mecanismo usado em contratos inteligentes para **destruir uma parte dos tokens** em cada transação. Isso reduz a oferta total de tokens ao longo do tempo.

Sempre que alguém faz uma transferência, uma **porcentagem da quantia é "queimada"** — ou seja, enviada para um endereço inacessível (`0x000...dead`) ou simplesmente removida do total. O restante é enviado ao destinatário normalmente.

Objetivos da taxa de burn

- **Reduzir inflação**: menos tokens circulando = mais escassez
- **Aumentar valor**: com menor oferta, o valor tende a subir (teoricamente)
- **Incentivar holding**: usuários podem preferir guardar tokens em vez de gastar

> Importante
> - A taxa de burn deve ser **transparente** e bem documentada no contrato.
> - Nem todos os tokens usam burn — é uma escolha de design.


```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TaxToken is MeuToken {
    uint256 public constant TAX_RATE = 200; // 2% (200/10000)

    constructor(uint256 initialSupply) MeuToken(initialSupply) {}

    function transfer(address to, uint256 value) public override returns (bool) {
        uint256 tax = value * TAX_RATE / 10000;
        uint256 net = value - tax;
        super.transfer(address(0), tax); // Burn
        super.transfer(to, net);        // Envio líquido
        return true;
    }
}
```

Aplica 2% de burn em cada transferência.

## Passos para Testar no Remix IDE

1. Acesse [remix.ethereum.org](https://remix.ethereum.org).  
2. Crie um novo arquivo `.sol` e cole o código de um exemplo.  
3. No painel "Solidity Compiler", selecione versão ^0.8.0 e compile.  
4. No painel "Deploy & Run Transactions":  
   - Selecione "Injected Provider" (conecte MetaMask à rede Sepolia).  
   - Deploye o contrato (ex: `initialSupply = 1000`).  
5. Interaja:  
   - Consulte `balanceOf` do deployer.  
   - Use `transfer` para enviar tokens.  
   - Teste `approve` + `transferFrom` com outra conta.  
6. Verifique eventos no log de transações.


## Referências Bibliográficas

BUTERIN, V. **ERC-20 Token Standard**. Ethereum Improvement Proposals, n. 20, 2015. Disponível em: <https://eips.ethereum.org/EIPS/eip-20>. Acesso em: 23 out. 2025.

VOGELSTELLER, F.; BUTERIN, V. **EIP-20: ERC-20 Token Standard**. GitHub, 2017. Disponível em: <https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md>. Acesso em: 23 out. 2025.

OPENZEPPELIN. **ERC20 - OpenZeppelin Docs**. OpenZeppelin, 2025. Disponível em: <https://docs.openzeppelin.com/contracts/5.x/erc20>. Acesso em: 23 out. 2025.

REMIX PROJECT. **Remix - Ethereum IDE**. Remix, 2025. Disponível em: <https://remix.ethereum.org>. Acesso em: 23 out. 2025.