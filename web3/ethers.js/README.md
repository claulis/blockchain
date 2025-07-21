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

### Estrutura do Projeto

A estrutura do projeto é organizada para separar o back-end (blockchain) do front-end (interface):

| Diretório/Arquivo | Descrição |
|-------------------|-----------|
| `contracts/Counter.sol` | Contrato inteligente em Solidity. |
| `scripts/deploy.ts` | Script de implantação do contrato. |
| `artifacts/` | Artefatos gerados pelo Hardhat (inclui `Counter.json`). |
| `client/src/App.tsx` | Componente React principal. |
| `client/src/Counter.json` | ABI do contrato para interação com Ethers.js. |
| `client/src/App.css` | Estilos da interface. |
| `hardhat.config.ts` | Configuração do Hardhat. |
| `tsconfig.json` | Configuração do TypeScript para o back-end. |
| `.env` | Variáveis de ambiente (chaves privadas, Infura). |

#### Como funciona?

- O contrato inteligente (`Counter.sol`) gerencia o estado do contador.
- Ethers.js conecta o front-end React ao contrato, permitindo transações (incrementar/decrementar) e consultas (visualizar o contador).
- Hardhat compila e implanta o contrato; Ganache simula a blockchain localmente; MetaMask autentica transações.

#### Como rodar localmente?

1. Inicie o Ganache para criar uma blockchain local.
2. Compile e implante o contrato com Hardhat.
3. Inicie o servidor React e conecte o MetaMask à rede local.
4. Acesse a DApp no navegador para interagir com o contador.

#### Como publicar?

1. Implante o contrato na rede Sepolia usando Hardhat.
2. Atualize o front-end com o endereço do contrato e a URL da rede.
3. Hospede o front-end em uma plataforma como Vercel.

## Passo a Passo no Visual Studio Code

### Passo 1: Configurar o Ambiente

1. **Instalar Pré-requisitos**:
   - Certifique-se de que o [Node.js](https://nodejs.org/) (versão 18 ou superior) está instalado:

     ```bash
     node -v
     npm -v
     ```

   - Instale o [Visual Studio Code](https://code.visualstudio.com/) se ainda não o tiver.

2. **Criar o Diretório do Projeto**:
   - Crie um diretório e abra-o no VS Code:

     ```bash
     mkdir counter-dapp
     cd counter-dapp
     code .
     ```

   - Inicialize um projeto Node.js:

     ```bash
     npm init -y
     ```

3. **Instalar Hardhat**:
   - Instale o Hardhat e suas dependências:

     ```bash
     npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
     ```

   - Configure o Hardhat, escolhendo um projeto TypeScript:

     ```bash
     npx hardhat
     ```

     Selecione "Create a TypeScript project" e aceite as opções padrão.

4. **Instalar Dependências do TypeScript**:
   - Instale pacotes adicionais para TypeScript:

     ```bash
     npm install --save-dev typescript ts-node @types/node @types/mocha
     ```

5. **Configurar TypeScript**:
   - Crie um arquivo `tsconfig.json` na raiz do projeto:

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

6. **Configurar Hardhat**:
   - Edite `hardhat.config.ts` na raiz do projeto:

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

### Passo 2: Criar o Contrato Inteligente

**Pergunta**: Que funções um contrato de contador precisa para gerenciar incrementos e decrementos de forma segura?

1. **Escrever o Contrato**:
   - No diretório `contracts`, crie `Counter.sol`:

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

2. **Compilar o Contrato**:
   - Execute:

     ```bash
     npx hardhat compile
     ```

   - Isso gera os artefatos do contrato em `artifacts/contracts/Counter.sol/Counter.json`.

### Passo 3: Implantar o Contrato Localmente

**Pergunta**: Como você pode garantir que o contrato está funcionando corretamente antes de conectá-lo ao front-end?

1. **Iniciar o Ganache**:
   - Instale o Ganache globalmente:

     ```bash
     npm install -g ganache
     ```

   - Inicie uma blockchain local:

     ```bash
     ganache
     ```

     Anote a URL (geralmente `http://127.0.0.1:8545`) e as chaves privadas das contas fornecidas.

2. **Criar Script de Implantação**:
   - No diretório `scripts`, crie `deploy.ts`:

```typescript
import { ethers } from "hardhat";

async function main() {
  const Counter = await ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();
  await counter.waitForDeployment(); // ethers v6 method
  console.log("Counter deployed to:", await counter.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
```

3. **Implantar o Contrato**:
   - Execute:

     ```bash
     npx hardhat run scripts/deploy.ts --network hardhat
     ```

   - Anote o endereço do contrato exibido no console.

### Passo 4: Criar a Interface com React

**Pergunta**: Como uma interface de usuário pode facilitar a interação com o contrato inteligente?

1. **Criar o Projeto React**:
   - Crie um projeto React com TypeScript:

     ```bash
     cd counter-dapp
     npx create-react-app client --template typescript
     cd client
     npm install ethers
     ```

2. **Criar o Componente Principal**:
   - Edite `client/src/App.tsx`:

```typescript
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import CounterABI from "./Counter.json";
import "./App.css";

const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
const contractAddress = "INSIRA_O_ENDEREÇO_DO_CONTRATO_AQUI"; // Substitua pelo endereço do contrato
const contract = new ethers.Contract(contractAddress, CounterABI.abi, provider);

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  const [account, setAccount] = useState("");
  const [signer, set signer] = useState<ethers.Signer | null>(null);

  useEffect(() => {
    async function load() {
      const accounts = await provider.listAccounts();
      setAccount(accounts[0]);
      const signer = provider.getSigner();
      setSigner(signer);

      const contractWithSigner = contract.connect(signer);
      const currentCount = await contractWithSigner.getCount();
      setCount(Number(currentCount));
    }
    load();
  }, []);

  const increment = async () => {
    if (!signer) return;
    const contractWithSigner = contract.connect(signer);
    const tx = await contractWithSigner.increment();
    await tx.wait();
    const newCount = await contractWithSigner.getCount();
    setCount(Number(newCount));
  };

  const decrement = async () => {
    if (!signer) return;
    const contractWithSigner = contract.connect(signer);
    const tx = await contractWithSigner.decrement();
    await tx.wait();
    const newCount = await contractWithSigner.getCount();
    setCount(Number(newCount));
  };

  return (
    <div className="container">
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

3. **Adicionar Estilos**:
   - Crie `client/src/App.css`:

```css
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  text-align: center;
}
h1 {
  color: #333;
}
button {
  padding: 10px 20px;
  margin: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
```

4. **Copiar o ABI do Contrato**:
   - Copie o conteúdo de `artifacts/contracts/Counter.sol/Counter.json` para `client/src/Counter.json`.

5. **Iniciar o Servidor React**:
   - Execute:

     ```bash
     npm start
     ```

### Passo 5: Testar Localmente

**Pergunta**: Como você pode verificar se a interação entre o front-end e o contrato está funcionando corretamente?

1. **Configurar o MetaMask**:
   - Instale a extensão [MetaMask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) no navegador.
   - Adicione a rede local do Ganache (URL: `http://127.0.0.1:8545`, chain ID: 1337).
   - Importe uma conta do Ganache usando uma das chaves privadas fornecidas.

2. **Testar a DApp**:
   - Acesse `http://localhost:3000` no navegador.
   - Verifique se o contador é exibido e se os botões "Incrementar" e "Decrementar" atualizam o valor corretamente.

## Estrutura do Projeto

A estrutura do projeto é organizada para separar o back-end (blockchain) do front-end (interface):

| Diretório/Arquivo | Descrição |
|-------------------|-----------|
| `contracts/Counter.sol` | Contrato inteligente em Solidity. |
| `scripts/deploy.ts` | Script de implantação do contrato. |
| `artifacts/` | Artefatos gerados pelo Hardhat (inclui `Counter.json`). |
| `client/src/App.tsx` | Componente React principal. |
| `client/src/Counter.json` | ABI do contrato para interação com Ethers.js. |
| `client/src/App.css` | Estilos da interface. |
| `hardhat.config.ts` | Configuração do Hardhat. |
| `tsconfig.json` | Configuração do TypeScript para o back-end. |
| `.env` | Variáveis de ambiente (chaves privadas, Infura). |
