# Ethereum: Uma Análise Abrangente de sua Tecnologia, Inovação e Impacto Econômico

## Introdução ao Ethereum

O Ethereum é uma plataforma de código aberto que permite a criação e execução de contratos inteligentes e aplicativos descentralizados (dApps) em uma rede blockchain pública.

>**Que tipos de blockchain existem?**
>
> - **Pública**: completamente descentralizada e aberta a qualquer pessoa, permitindo que qualquer um participe da rede como usuário, desenvolvedor, validador ou minerador sem necessidade de permissão. Exemplos: Ethereum, Bitcoin, Solana, Cardano.
> - **Privada**: é restrita e controlada por uma única organização ou grupo, onde o acesso e a participação são limitados a entidades autorizadas.Exemplos: Hyperledger Fabric, Corda, Quorum.
> - **Consórcio**: é parcialmente descentralizada e operada por um grupo de organizações (consórcio) que colaboram para manter a rede. É um meio-termo entre blockchains públicas e privadas. Exemplos: R3 Corda, Hyperledger Besu, Energy Web Chain.
> - **Híbrida**: combina elementos de blockchains públicas e privadas, permitindo que partes dos dados sejam públicas enquanto outras permanecem restritas. Exemplos: Dragonchain, XinFin (eXchange inFinite).

Proposto por Vitalik Buterin em 2013 e lançado em 30 de julho de 2015, o Ethereum expande o conceito de blockchain além de uma simples moeda digital, como o Bitcoin, ao oferecer uma infraestrutura para a execução de código programável de forma segura e transparente [Buterin, 2013]. A Fundação Ethereum, uma organização sem fins lucrativos, foi criada para apoiar o desenvolvimento e a adoção da plataforma. Desde seu lançamento, o Ethereum tem se consolidado como uma das principais redes blockchain, servindo como base para inovações como finanças descentralizadas (DeFi), tokens não fungíveis (NFTs) e organizações autônomas descentralizadas (DAOs).

## Valor Inovador do Ethereum

A principal inovação do Ethereum reside nos **contratos inteligentes**, programas autônomos que executam automaticamente condições acordadas entre partes, sem a necessidade de intermediários. Esses contratos são imutáveis e transparentes, armazenados na blockchain e auditáveis por qualquer pessoa [Wood, 2014]. Essa funcionalidade elimina custos associados a terceiros e aumenta a confiança nas transações.

Além disso, o Ethereum introduziu a possibilidade de criar **tokens personalizados** por meio de padrões como ERC-20 (tokens fungíveis) e ERC-721 (NFTs). Isso deu origem a uma nova economia digital, onde ativos e serviços podem ser tokenizados e negociados de forma descentralizada. Exemplos notáveis incluem o _Uniswap_, uma exchange descentralizada para trocas de tokens, e o _CryptoKitties_, um jogo baseado em NFTs que popularizou os colecionáveis digitais.

## Importância Econômica do Ethereum

O Ethereum desempenha um papel crucial na economia digital, especialmente no crescimento das finanças descentralizadas (DeFi) e do mercado de NFTs. Em 2021, o valor total bloqueado (TVL) em protocolos DeFi ultrapassou US$ 100 bilhões, com o Ethereum respondendo por mais de 60% desse montante [DeFi Pulse, 2021].

>O Valor Total Bloqueado (TVL, do inglês Total Value Locked) é o valor total de todos os ativos depositados em um protocolo de finanças descentralizadas (DeFi) que estão gerando atividade econômica. A atividade econômica pode incluir empréstimos, tomada de crédito, provisão econômica, gestão de ativos ou seguros. O TVL é um indicador quantitativo importante de confiança para protocolos DeFi: quanto mais valor os investidores estão dispostos a bloquear em um protocolo, maior é a confiança deles nesse protocolo.

O mercado de NFTs, por sua vez, movimentou mais de US$ 40 bilhões no mesmo ano, com a maioria das transações ocorrendo na rede Ethereum [NonFungible, 2022].

A criptomoeda nativa, **Ether (ETH)**, é essencial para o funcionamento da rede, sendo usada para pagar taxas de transação (conhecidas como _gas_) e recompensar os participantes. Em setembro de 2024, o Ether é a segunda maior criptomoeda em valor de mercado, ultrapassando US$ 400 bilhões [CoinMarketCap, 2024], o que reflete sua relevância econômica global.

## Como Funciona o Ethereum

O Ethereum opera em uma blockchain pública, onde cada nó mantém uma cópia do livro-razão distribuído. As transações são agrupadas em blocos e adicionadas à blockchain por meio de um mecanismo de consenso. Atualmente, utiliza o **proof-of-work (PoW)**, mas está em transição para o **proof-of-stake (PoS)** com o Ethereum 2.0, visando maior escalabilidade e eficiência energética [Ethereum Foundation, 2023].

Aqui para rever os algoritmos [proof](/fundamentos/proof/README.md)

### Componentes Principais

- [**Contas**](../Ethereum/Contas.md): Existem contas controladas externamente (EOAs), gerenciadas por usuários, e contas de contrato, que contêm código de contratos inteligentes.
- [**Transações**](../Ethereum/Transacoes.md): Ações que alteram o estado da blockchain, como transferências de Ether ou interações com contratos.
- [**Gas**](../Ethereum/Gas.md): Unidade que mede o esforço computacional necessário para processar transações ou contratos, pago em Ether.

### Execução de Contratos Inteligentes

Os contratos inteligentes são escritos em linguagens como Solidity, compilados em _bytecode_ e executados pela **Máquina Virtual Ethereum (EVM)**. Quando um usuário interage com um contrato, a EVM processa o código e atualiza o estado da blockchain, consumindo _gas_ proporcional à complexidade da operação.

## Algoritmos Criptográficos e Estruturas de Dados no Ethereum

O Ethereum combina algoritmos criptográficos e estruturas de dados para garantir segurança e eficiência.

### Criptografia

- **Criptografia de Chave Pública**: Utiliza o algoritmo ECDSA (_Elliptic Curve Digital Signature Algorithm_) com a curva secp256k1 para assinar transações e autenticar usuários [Wood, 2014].
- **Função de Hash**: Emprega o Keccak-256, uma variante do SHA-3, para gerar hashes de transações, blocos e estados.

Aqui para rever algoritmos de [criptografia](/fundamentos/chaves/README.md)

### Estruturas de Dados

- **Merkle Tree**: Uma estrutura em árvore que resume todas as transações de um bloco em uma raiz de Merkle, permitindo verificação eficiente da integridade dos dados.
- **Merkle Patricia Trie**: Usada para armazenar o estado da blockchain (saldos, dados de contratos), otimizando atualizações e verificações.

Aqui para rever conceitos de [estruturas de dados](/fundamentos/estruturadados/README.md)

### Algoritmo de Consenso

O **Ethash**, algoritmo de mineração no PoW, é projetado para ser resistente a ASICs e favorecer GPUs. Ele exige que os mineradores encontrem um _nonce_ que produza um hash válido conforme o nível de dificuldade da rede.

## Processo de Mineração do Ethereum

No modelo PoW, os **mineradores** validam transações e adicionam blocos à blockchain resolvendo problemas matemáticos complexos:

1. **Coleta de Transações**: Selecionam transações da _mempool_, priorizando altas taxas de _gas_.
2. **Criação do Bloco**: Incluem um _nonce_ aleatório no candidato a bloco.
3. **Prova de Trabalho**: Encontram um _nonce_ que satisfaça o critério de dificuldade.
4. **Recompensa**: Recebem 2 ETH por bloco mais taxas de _gas_.

A dificuldade é ajustada para manter um tempo médio de bloco de 15 segundos. Com o PoS no Ethereum 2.0, os **validadores** substituem os mineradores, apostando Ether como garantia para participar do consenso [Ethereum Foundation, 2023].

## Referências

- BUTERIN, V. _Ethereum: A next-generation smart contract and decentralized application platform_. 2013. Disponível em: [https://ethereum.org/en/whitepaper/](https://ethereum.org/en/whitepaper/). Acesso em: 10 out. 2024.
- COINMARKETCAP. _Ethereum (ETH) price, charts, market cap, and other metrics_. 2024. Disponível em: [https://coinmarketcap.com/currencies/ethereum/](https://coinmarketcap.com/currencies/ethereum/). Acesso em: 10 out. 2024.
- DEFI PULSE. _Total value locked (USD) in DeFi_. 2021. Disponível em: [https://defipulse.com/](https://defipulse.com/). Acesso em: 10 out. 2024.
- ETHEREUM FOUNDATION. _Ethereum 2.0 (Eth2)_. 2023. Disponível em: [https://ethereum.org/en/eth2/](https://ethereum.org/en/eth2/). Acesso em: 10 out. 2024.
- NONFUNGIBLE. _NFT market report 2021_. 2022. Disponível em: [https://nonfungible.com/market-report-2021](https://nonfungible.com/market-report-2021). Acesso em: 10 out. 2024.
- WOOD, G. _Ethereum: A secure decentralised generalised transaction ledger_. Ethereum Yellow Paper, 2014. Disponível em: [https://ethereum.github.io/yellowpaper/paper.pdf](https://ethereum.github.io/yellowpaper/paper.pdf). Acesso em: 10 out. 2024.
