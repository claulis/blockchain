# Introdução à Web3

A Web3 é caracterizada como a terceira geração da internet, frequentemente designada como "internet descentralizada". Diferentemente da Web1, que se limitava a conteúdos estáticos de leitura, e da Web2, marcada pela interatividade, mas centralizada em plataformas corporativas, a Web3 promove a descentralização, conferindo aos usuários maior controle sobre seus dados, identidades e ativos digitais. Essa abordagem fundamenta-se em princípios de transparência, segurança, privacidade e autonomia, eliminando a dependência de intermediários e favorecendo interações peer-to-peer (P2P).



## Objetivos da Web3

- Descentralização: Os dados e serviços são distribuídos em redes, sem controle centralizado.
- Propriedade do usuário: Os indivíduos detêm soberania sobre seus dados e ativos digitais.
- Interoperabilidade: Sistemas e aplicativos operam de forma integrada em um ecossistema aberto.
- Resistência à censura: A natureza distribuída dificulta a interrupção ou manipulação das operações.

## Arquitetura da Web3

A arquitetura da Web3 organiza-se em camadas interdependentes, projetadas para suportar aplicativos descentralizados (dApps) e serviços distribuídos. As principais camadas são descritas a seguir:

1. Camada de Infraestrutura (Blockchain e Redes P2P)

- Blockchain: Constitui a base da Web3, funcionando como um livro-razão distribuído que registra transações de forma imutável e transparente. Cada bloco, conectado em cadeia, utiliza criptografia para assegurar integridade e segurança.
 Exemplos: Ethereum, Solana, Polkadot.

- Redes P2P: Compostas por nós que armazenam cópias do ledger e se comunicam diretamente, sem servidores centrais, garantindo redundância e resiliência.
Protocolos: Libp2p, IPFS (InterPlanetary File System).

2. Camada de Protocolos

- Protocolos de Consenso: Estabelecem o mecanismo pelo qual os nós da rede alcançam acordo sobre o estado do blockchain. Destacam-se:
Proof of Work (PoW): Empregado pelo Bitcoin, requer elevado poder computacional para validar transações.
Proof of Stake (PoS): Adotado pela Ethereum 2.0, seleciona validadores com base em criptoativos depositados.

- Smart Contracts: Contratos digitais autoexecutáveis, codificados na blockchain, que realizam ações automaticamente ao cumprir condições predefinidas.
Exemplo: Transferência automática de fundos após confirmação de entrega.

- Interoperabilidade: Protocolos como Polkadot e Cosmos permitem comunicação entre diferentes blockchains, formando um ecossistema integrado.

3. Camada de Armazenamento Descentralizado

Os dados na Web3 são armazenados em sistemas distribuídos, em vez de servidores centrais:

- IPFS: Protocolo que utiliza hashes de conteúdo para localizar e compartilhar arquivos de forma descentralizada.
- Filecoin: Plataforma de mercado para armazenamento distribuído, onde usuários remuneram nós por espaço de armazenamento.
- Arweave: Sistema de armazenamento permanente, no qual os dados são mantidos indefinidamente por uma única taxa.

4. Camada de Identidade e Autenticação

- Identidade Descentralizada (DID): Permite aos usuários gerenciar suas identidades digitais por meio de carteiras criptográficas, eliminando a dependência de provedores centralizados.
Exemplo: Carteiras como MetaMask autenticam usuários em dApps por meio de chaves privadas.

- NFTs (Tokens Não Fungíveis): Representam ativos digitais únicos, como obras de arte, itens de jogos ou certificados, associados à identidade do usuário.

5. Camada de Aplicação (dApps)

- dApps (Aplicativos Descentralizados): Aplicativos que operam em blockchains, integrando interfaces de usuário (geralmente desenvolvidas em JavaScript/HTML) a smart contracts.
Exemplos: Uniswap (finanças descentralizadas), OpenSea (mercado de NFTs), Decentraland (mundo virtual).

6. Camada de Interface

- Carteiras Criptográficas: Ferramentas como MetaMask ou Trust Wallet possibilitam a interação com dApps, gerenciamento de ativos e assinatura de transações.
- Navegadores Web3: Softwares como Brave oferecem suporte nativo a carteiras e protocolos descentralizados.
- APIs e SDKs: Bibliotecas como Web3.js e Ethers.js facilitam a integração entre interfaces tradicionais e blockchains.

## Funcionamento da Web3

O funcionamento da Web3 baseia-se em uma rede descentralizada onde usuários, desenvolvedores e validadores interagem diretamente. O processo típico é descrito a seguir:

- Autenticação: O usuário acessa um dApp por meio de uma carteira criptográfica, que autentica sua identidade utilizando chaves públicas e privadas.
Interação com Smart Contracts: O dApp envia instruções ao blockchain, onde smart contracts executam a lógica programada, como transferência de tokens ou registro de dados.
- Validação na Blockchain: Os nós da rede validam a transação por meio do protocolo de consenso, registrando-a no ledger.
Armazenamento de Dados: Dados associados, como arquivos ou metadados, são armazenados em sistemas como IPFS, acessíveis por hashes.
- Resposta ao Usuário: O dApp atualiza a interface com o resultado da transação, mantendo transparência e rastreabilidade.

### Exemplo Operacional

No contexto de aquisição de um NFT em uma plataforma como OpenSea:

1. O usuário conecta sua carteira MetaMask ao dApp.
2. Seleciona um NFT e inicia a compra, assinando a transação com sua chave privada.
3. O smart contract no Ethereum verifica a disponibilidade de fundos e transfere o NFT para a carteira do usuário.
4. A transação é validada pelos nós da rede Ethereum e registrada no blockchain.
5. O NFT é exibido na carteira do usuário, com o arquivo associado (armazenado no IPFS) acessível via hash.

## Tecnologias Envolvidas

A Web3 é sustentada por um conjunto de tecnologias integradas, descritas a seguir:

### Blockchain:

Ethereum: Plataforma principal para dApps e smart contracts.
Solana: Reconhecida por alta escalabilidade e baixas taxas.
Binance Smart Chain, Cardano, Polkadot: Alternativas com diferentes características.

### Linguagens de Programação:

Solidity: Utilizada para desenvolvimento de smart contracts no Ethereum.
Rust: Empregada em blockchains como Solana e Polkadot.
JavaScript/TypeScript: Aplicadas em interfaces de dApps, com bibliotecas como Web3.js e Ethers.js.

### Armazenamento Descentralizado:

IPFS: Para compartilhamento e armazenamento de arquivos distribuídos.
Filecoin: Mercado de armazenamento descentralizado.
Arweave: Armazenamento permanente de dados.

### Protocolos de Comunicação:

Libp2p: Suporte a redes P2P.
Whisper: Comunicação privada em redes descentralizadas.

### Ferramentas de Desenvolvimento:

Truffle/Hardhat: Frameworks para desenvolvimento de smart contracts.
Remix: Ambiente de desenvolvimento integrado para Solidity.
Infura/Alchemy: APIs para conexão de dApps a blockchains.

### Carteiras e Identidade:

MetaMask, Trust Wallet: Gerenciamento de chaves e interação com dApps.
ENS (Ethereum Name Service): Endereços legíveis (ex.: nome.eth) para substituir endereços complexos.

### Tokens e Economia:

Criptomoedas: Como ETH e BTC, para transações.
Tokens de Governança: Utilizados em DAOs para votação.
NFTs: Representação de ativos digitais exclusivos.

## Frameworks para Web3

Frameworks Web3 geralmente se dividem em:

- **Desenvolvimento e Implantação de Contratos Inteligentes**: Ferramentas para escrever, compilar, testar e implantar contratos.
- **Interação com Blockchain**: Bibliotecas para conectar DApps a blockchains.
- **Ferramentas de Interface e Integração**: Frameworks para criar front-ends que interagem com blockchains.
- **Outras Blockchains**: Ferramentas específicas para blockchains além do Ethereum.

### Principais Frameworks para Web3

#### 1. Desenvolvimento e Implantação de Contratos Inteligentes

- [Hardhat](https://hardhat.org/): Um ambiente de desenvolvimento Ethereum para compilar, testar, implantar e depurar contratos inteligentes. Oferece um ambiente local de blockchain, plugins extensíveis e integração com TypeScript.

- [Foundry](https://getfoundry.sh/): Um framework em Rust para desenvolvimento Ethereum, focado em velocidade e testes. Testes em Solidity (em vez de JavaScript) e desempenho superior em projetos complexos.

#### 2. Interação com Blockchain

- [Web3.js](https://web3js.org/#/): Biblioteca JavaScript/TypeScript para interagir com blockchains Ethereum com amplo suporte para chamadas a contratos, transações e gerenciamento de carteiras.
 
- [Ethers.js](https://github.com/ethers-io/ethers.js): Uma alternativa ao Web3.js, com API mais moderna e suporte nativo a TypeScript. Mais leve e com melhor tipagem, ideal para projetos TypeScript.

- [Wagmi](https://wagmi.sh/): Um conjunto de hooks React para interagir com blockchains Ethereum, baseado em Ethers.js.Simplifica a criação de front-ends reativos, integrando carteiras e contratos.

>Hooks são funções especiais do React (introduzidas na versão 16.8) que permitem gerenciar estado, efeitos colaterais e outras funcionalidades em componentes funcionais, sem a necessidade de componentes de classe.

#### 3. Ferramentas de Interface e Integração

- [RainbowKit](https://rainbowkit.com/pt-BR): Um kit de conexão de carteiras, compatível com Wagmi, para integrar MetaMask, WalletConnect, etc.Oferece uma interface amigável para autenticação de usuários.

#### 4. Frameworks para Outras Blockchains

- **Anchor (Solana)**: Framework para desenvolver programas (equivalentes a contratos inteligentes) na blockchain Solana.

- **Substrate (Polkadot)**: Framework para criar blockchains personalizadas compatíveis com Polkadot. Ideal para projetos que requerem blockchains específicas.

- **CosmWasm (Cosmos)**: Framework para contratos inteligentes em blockchains Cosmos, escrito em Rust.Suporta múltiplas blockchains no ecossistema Cosmos.
 
#### Comparando os Frameworks (para Ethereum)

| Framework   | Tipo                     | Vantagens                              | Desvantagens                          |
|-------------|--------------------------|----------------------------------------|---------------------------------------|
| Hardhat     | Desenvolvimento Ethereum  | Flexível, TypeScript, plugins          | Curva de aprendizado inicial          |
| Foundry     | Desenvolvimento Ethereum  | Rápido, testes em Solidity             | Baseado em Rust, menos familiar       |
| Web3.js     | Interação com Blockchain | Amplo suporte, comunidade grande       | API menos moderna                     |
| Ethers.js   | Interação com Blockchain | Leve, TypeScript-friendly              | Menos recursos que Web3.js            |
| Wagmi       | Front-end                | Hooks React, integração fácil           | Limitado a React                      |


