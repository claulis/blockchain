# DApp com web3.js: Contador descentralizado

## Projeto: DApp de Contador Descentralizado

**Descrição**: Uma DApp onde os usuários podem incrementar ou decrementar um contador armazenado em um contrato inteligente na blockchain Ethereum. A interface será uma página web simples com botões para interagir com o contrato.

**Ferramentas**:

- **Node.js**: Para gerenciar dependências e rodar o servidor.
- **TypeScript**: Para escrever código mais seguro e tipado.
- **Web3.js**: Para interagir com a blockchain Ethereum.
- **Hardhat**: Para compilar, testar e implantar o contrato inteligente.
- **React**: Para a interface de usuário (você pode escolher outra, mas React é simples e popular).
- **MetaMask**: Para conectar a carteira do usuário à DApp.
- **Ganache**: Para rodar uma blockchain Ethereum local.

## Passo a Passo no Visual Studio Code

### Passo 1: Configurar o Ambiente

1. Instale o **Node.js** (versão 18 ou superior) em sua máquina. Verifique com:

     ```bash
     node -v
     npm -v
     ```

2. Instale o **Visual Studio Code** se ainda não o tiver.

3. Crie um diretório para o projeto e abra-o no VS Code:

     ```bash
     mkdir contador-dapp
     cd contador-dapp
     code .
     ```

4. Inicialize um projeto Node.js:

     ```bash
     npm init -y
     ```

>O comando npm init -y é usado para inicializar rapidamente um projeto Node.js, criando um arquivo package.json com as configurações padrão, sem precisar responder às perguntas interativas. Normalmente, quando você executa npm init, o npm pede informações como nome do projeto, versão, descrição, entry point, etc. O -y (ou --yes) pula essas perguntas e aceita os valores padrão, agilizando o processo.

5. Instale o **Hardhat**:

     ```bash
     npm install --save-dev hardhat
     ```

>O comando npm install --save-dev é usado para instalar pacotes npm como dependências de desenvolvimento em um projeto Node.js.. Isso significa que os pacotes instalados serão listados na seção "devDependencies" do arquivo package.json, e normalmente são usados apenas durante o processo de desenvolvimento, testes ou construção do projeto.

6. Configure o Hardhat:

     ```bash
     npx hardhat
     ```

     Escolha "Create a JavaScript project" (vamos adaptar para TypeScript depois).

>O npx é um comando do Node.js que permite executar pacotes npm sem precisar instalá-los globalmente. Ele vem junto com o npm e é especialmente útil para rodar ferramentas que você não quer adicionar permanentemente ao seu projeto.

### Passo 2: Criar a estrutura do projeto

```plaintext
contador-dapp/
├── client/                          # Diretório do front-end (React)
│   ├── src/                        # Código-fonte do React
│   │   ├── App.tsx                 # Componente principal do React
│   │   ├── Counter.json            # ABI do contrato inteligente
│   │   ├── index.tsx               # Ponto de entrada do React
│   │   ├── App.css                 # Estilos do componente App
│   │   └── ...                     # Outros arquivos padrão do React
│   ├── public/                     # Arquivos públicos (HTML, favicon, etc.)
│   ├── package.json                # Dependências e scripts do front-end
│   ├── tsconfig.json               # Configuração do TypeScript para o front-end
│   └── ...                         # Outros arquivos gerados pelo create-react-app
├── contracts/                      # Contratos inteligentes (Solidity)
│   └── Counter.sol                 # Contrato inteligente do contador
├── scripts/                        # Scripts de implantação
│   └── deploy.ts                   # Script para implantar o contrato
├── test/                           # Testes do contrato (opcional, não criado aqui)
├── artifacts/                      # Artefatos gerados pela compilação
│   └── contracts/                 # Compilação dos contratos
│       └── Counter.json           # ABI e bytecode do contrato
├── node_modules/                   # Dependências do Node.js
├── .env                            # Variáveis de ambiente (ex.: chaves privadas)
├── hardhat.config.ts               # Configuração do Hardhat
├── package.json                    # Dependências e scripts do back-end
├── tsconfig.json                   # Configuração do TypeScript para o back-end

```

### Passo 3: Criar o Contrato Inteligente

1. No diretório `contracts`, crie um arquivo chamado `Counter.sol`:

     ```solidity
     // SPDX-License-Identifier: MIT
     pragma solidity ^0.8.0;

     contract Counter {
         uint256 public count;

         constructor() {
             count = 0;
         }

         function increment() public {
             count += 1;
         }

         function decrement() public {
             if (count > 0) {
                 count -= 1;
             }
         }

         function getCount() public view returns (uint256) {
             return count;
         }
     }
     ```

Uma variável `count` para armazenar o valor do contador. Funções `increment` e `decrement` para modificar o valor. Uma função `getCount` para consultar o valor atual.

2. Compile o contrato:

     ```bash
     npx hardhat compile
     ```

#### Passo 4: Configurar TypeScript no Hardhat

 1. Instale dependências do TypeScript:

     ```bash
     npm install --save-dev typescript ts-node @types/node @types/mocha
     ```

 > 1. **`typescript`** – O compilador oficial do TypeScript, que traduz código TypeScript para JavaScript. Ele permite escrever código com tipagem estática e melhora a manutenção e escalabilidade de projetos.
 > 2. **`ts-node`** – Uma ferramenta que permite executar arquivos TypeScript diretamente no Node.js sem precisar compilá-los antes. Muito útil para desenvolvimento rápido e testes.
 > 3. **`@types/node`** – Um pacote de definições de tipos para o Node.js. Ele fornece informações sobre módulos internos do Node.js (`fs`, `path`, etc.), permitindo que o TypeScript entenda corretamente a API do Node.
 > 4. **`@types/mocha`** – Definições de tipos para o framework de testes **Mocha**, garantindo que o TypeScript reconheça corretamente funções como `describe()` e `it()` ao escrever testes.

2. Crie um arquivo `tsconfig.json` na raiz do projeto:

     ```json
     {
       "compilerOptions": {
         "target": "es2018",
         "module": "commonjs",
         "strict": true,
         "esModuleInterop": true,
         "outDir": "dist",
         "resolveJsonModule": true
       },
       "include": ["./scripts", "./test"],
       "files": ["./hardhat.config.ts"]
     }
     ```

3. Renomeie `hardhat.config.js` para `hardhat.config.ts` e atualize:

     ```typescript
     import { HardhatUserConfig } from "hardhat/config";
     import "@nomicfoundation/hardhat-toolbox";

     const config: HardhatUserConfig = {
       solidity: "0.8.9",
       networks: {
         hardhat: {
           chainId: 1337,
         },
       },
     };

     export default config;
     ```

### Passo 5: Implantar o Contrato Localmente

  1. Instale e inicie o **Ganache** (blockchain local):

     ```bash
     npm install -g ganache
     ganache
     ```

     Isso inicia uma blockchain local na porta padrão `8545`.

  2. Crie um script de implantação em `scripts/deploy.ts`:

     ```typescript
     import { ethers } from "hardhat";

     async function main() {
       const Counter = await ethers.getContractFactory("Counter");
       const counter = await Counter.deploy();
       await counter.deployed();
       console.log("Counter deployed to:", counter.address);
     }

     main().catch((error) => {
       console.error(error);
       process.exitCode = 1;
     });
     ```

  3. Implante o contrato:

     ```bash
     npx hardhat run scripts/deploy.ts --network hardhat
     ```

     Anote o endereço do contrato exibido no console.

### Passo 6: Criar a Interface com React

  1. Crie um projeto React com TypeScript:

     ```bash
     npx create-react-app client --template typescript
     cd client
     npm install web3
     ```

  2. Crie um componente em `client/src/App.tsx`:

     ```typescript
     import React, { useState, useEffect } from "react";
     import Web3 from "web3";
     import CounterABI from "./Counter.json"; // Você criará este arquivo

     const web3 = new Web3("http://127.0.0.1:8545");
     const contractAddress = "INSIRA_O_ENDEREÇO_DO_CONTRATO_AQUI";
     const counterContract = new web3.eth.Contract(CounterABI.abi, contractAddress);

     const App: React.FC = () => {
       const [count, setCount] = useState(0);
       const [account, setAccount] = useState("");

       useEffect(() => {
         async function load() {
           const accounts = await web3.eth.getAccounts();
           setAccount(accounts[0]);
           const currentCount = await counterContract.methods.getCount().call();
           setCount(Number(currentCount));
         }
         load();
       }, []);

       const increment = async () => {
         await counterContract.methods.increment().send({ from: account });
         const newCount = await counterContract.methods.getCount().call();
         setCount(Number(newCount));
       };

       const decrement = async () => {
         await counterContract.methods.decrement().send({ from: account });
         const newCount = await counterContract.methods.getCount().call();
         setCount(Number(newCount));
       };

       return (
         <div>
           <h1>Contador Descentralizado</h1>
           <p>Conta: {account}</p>
           <p>Contador: {count}</p>
           <button onClick={increment}>Incrementar</button>
           <button onClick={decrement}>Decrementar</button>
         </div>
       );
     };

     export default App;
     ```

  3. Copie o ABI do contrato (encontrado em `artifacts/contracts/Counter.json`) para `client/src/Counter.json`.
  4. Inicie o servidor React:

     ```bash
     npm start
     ```

### Passo 7: Testar Localmente

  1. Certifique-se de que o Ganache está rodando.
  2. Abra o navegador com MetaMask instalado e configure-o para conectar à rede local (<http://localhost:8545>, chain ID 1337).
  3. Importe uma conta do Ganache no MetaMask usando a chave privada fornecida pelo Ganache.
  4. Acesse `http://localhost:3000` e teste os botões "Incrementar" e "Decrementar". Verifique se o contador atualiza.

### Passo 8: Publicar a DApp

  1. Configure uma rede pública no `hardhat.config.ts`:

     ```typescript
     import { HardhatUserConfig } from "hardhat/config";
     import "@nomicfoundation/hardhat-toolbox";
     import * as dotenv from "dotenv";

     dotenv.config();

     const config: HardhatUserConfig = {
       solidity: "0.8.9",
       networks: {
         hardhat: {
           chainId: 1337,
         },
         sepolia: {
           url: "https://sepolia.infura.io/v3/SUA_CHAVE_INFURA",
           accounts: [process.env.PRIVATE_KEY || ""],
         },
       },
     };

     export default config;
     ```

  2. Crie um arquivo `.env` com sua chave privada e chave da API Infura:

     ```env
     PRIVATE_KEY=SUA_CHAVE_PRIVADA
     INFURA_API_KEY=SUA_CHAVE_INFURA
     ```

  3. Implante na rede Sepolia:

     ```bash
     npx hardhat run scripts/deploy.ts --network sepolia
     ```

  4. Hospede o front-end (por exemplo, no Vercel ou Netlify):
     - Execute `npm run build` no diretório `client`.
     - Faça upload da pasta `build` para a plataforma de hospedagem.
  5. Atualize o `contractAddress` em `App.tsx` com o endereço do contrato implantado na Sepolia.

### Como Funciona

- **Contrato Inteligente**: Armazena o estado do contador na blockchain.
- **Web3.js**: Permite que o front-end envie transações (increment/decrement) e consulte o estado (getCount).
- **React**: Fornece uma interface amigável para os usuários.
- **Ganache**: Simula uma blockchain Ethereum local para testes.
- **MetaMask**: Conecta a carteira do usuário à DApp para assinar transações.

### Como Rodar

1. Inicie o Ganache.
2. Compile e implante o contrato com Hardhat.
3. Inicie o servidor React.
4. Conecte o MetaMask à rede local e teste a DApp.

### Como Publicar

1. Implante o contrato em uma rede pública (ex.: Sepolia).
2. Hospede o front-end em uma plataforma como Vercel.
3. Atualize o endereço do contrato no código do front-end.

