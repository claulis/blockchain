# NFTs: Conceitos e Exemplos Explicativos

## 1. Introdução aos NFTs

Um Token Não Fungível (NFT) é um ativo digital único registrado em uma blockchain, garantindo sua autenticidade, propriedade e imutabilidade. Diferentemente de criptomoedas como Bitcoin, que são fungíveis (cada unidade é idêntica), os NFTs são únicos, como uma obra de arte ou um item de coleção. Eles ganharam destaque em áreas como arte digital, jogos, música e até ingressos para eventos.

Exemplo: Um aluno pode imaginar um NFT como uma pintura original em um museu. Embora cópias digitais possam existir, apenas o proprietário registrado na blockchain possui o "original", comprovado por um certificado digital.

**Propriedade Verificável na Blockchain**

Um NFT é registrado em uma blockchain, como Ethereum, o que garante que sua propriedade é única e rastreável. Quando um artista cria um NFT, ele pode provar que é o criador original e que o comprador possui o "original" digital. Essa autenticidade é valiosa para colecionadores, similar a um certificado de autenticidade para uma pintura física.

Exemplo: Um aluno pode imaginar um artista que pinta um quadro físico. Se ele o vende, o comprador recebe a tela original e um certificado. Na internet, uma imagem da pintura pode ser copiada infinitamente, mas um NFT funciona como o "quadro original" digital, registrado na blockchain. Por exemplo, a obra "EVERYDAYS: The First 5000 Days" de Beeple, vendida por US$69 milhões em 2021, era um NFT que garantia ao comprador a propriedade exclusiva, mesmo que imagens da obra circulassem online.

**Exclusividade e Escassez**

A unicidade de um NFT cria escassez, o que aumenta seu valor percebido. Ao contrário de uma imagem gratuita na internet, que pode ser baixada por qualquer pessoa, um NFT é limitado (ex.: uma edição única ou uma coleção de 10 itens). Essa exclusividade atrai colecionadores que valorizam itens raros.

Exemplo: Considere a coleção "Bored Ape Yacht Club", com 10.000 NFTs de macacos, cada um com atributos únicos (ex.: chapéus, cores). A raridade de certos atributos faz alguns macacos valerem milhões, enquanto uma imagem gratuita de um macaco não teria o mesmo apelo. O aluno pode pensar em um artista que cria um NFT de uma ilustração única, como "Dragão Cósmico #1", e o vende como um item exclusivo, aumentando seu valor em comparação com uma ilustração compartilhada no Instagram.

**Monetização Direta e Royalties**

NFTs permitem que artistas monetizem suas obras diretamente, sem intermediários, e configurem royalties para ganhos em revendas. Quando uma obra é disponibilizada gratuitamente na internet, o artista geralmente não ganha nada com compartilhamentos ou cópias. Já com NFTs, o artista pode vender a obra e continuar lucrando se ela for revendida.

Exemplo: Um aluno pode imaginar um músico que lança uma música como NFT na plataforma Rarible, definindo royalties de 10%. Se o NFT for vendido inicialmente por 0.1 ETH e, anos depois, revendido por 5 ETH, o músico recebe 10% do valor da revenda (0.5 ETH). Um exemplo real é a banda Kings of Leon, que lançou um álbum como NFT em 2021, oferecendo benefícios como ingressos VIP e ganhando diretamente com as vendas.

## 2. Tecnologia por Trás dos NFTs

Os NFTs dependem de tecnologias específicas:

**Blockchain:** Um registro descentralizado que armazena transações de forma segura. Exemplos incluem Ethereum, Polygon e Solana.
**Contratos Inteligentes:** Programas na blockchain que definem as regras do NFT, como propriedade e transferência. O padrão ERC-721 é amplamente usado no Ethereum.
**Metadados:** Informações sobre o NFT, como nome, descrição e link para um arquivo (ex.: imagem), armazenadas em um arquivo JSON, geralmente no IPFS.

Exemplo de metadados:

```json
{
  "name": "Gato Estelar #1",
  "description": "Primeiro NFT da coleção Gatos Estelares",
  "image": "ipfs://Qm.../gato1.png",
  "attributes": [
    { "trait_type": "Cor", "value": "Prata" },
    { "trait_type": "Raridade", "value": "Rara" }
  ]
}
```

Este JSON descreve um NFT de uma coleção fictícia, com uma imagem hospedada no IPFS e atributos que aumentam seu valor.

## 3. Exemplo Prático 1: Criando um Contrato Inteligente para NFTs

O aluno aprenderá a criar um contrato inteligente em Solidity para mintar uma coleção de NFTs. O contrato abaixo permite criar NFTs e rastrear sua quantidade.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ColecaoNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("ColecaoNFT", "CNFT") Ownable(msg.sender) {}

    function mintNFT(address destinatario, string memory tokenURI) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 novoTokenId = _tokenIds.current();
        _safeMint(destinatario, novoTokenId);
        _setTokenURI(novoTokenId, tokenURI);
        return novoTokenId;
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }
}
```

Explicação linha por linha:

Linha 1-2: Define a licença MIT e a versão do Solidity.
Linha 4-6: Importa bibliotecas do OpenZeppelin para ERC-721, suporte a metadados (ERC721URIStorage) e controle de acesso (Ownable).
Linha 8: Declara o contrato ColecaoNFT, que herda funcionalidades de ERC721URIStorage e Ownable.
Linha 10: Usa Counters para gerar IDs únicos para cada NFT.
Linha 12: O construtor define o nome ("ColecaoNFT") e o símbolo ("CNFT") do NFT, além de configurar o proprietário.
Linha 14-19: A função mintNFT permite ao proprietário criar um NFT, atribuindo-o a um destinatário e associando um tokenURI.
Linha 21-23: A função totalSupply retorna o número total de NFTs criados.

>O contrato Ownable da OpenZeppelin define um proprietário para o contrato inteligente e fornece um modificador chamado onlyOwner. Esse modificador garante que apenas o endereço do proprietário pode chamar funções protegidas por ele. No contexto de um contrato de NFT, isso significa que ações como minting (criação de novos NFTs), alteração de metadados ou outras configurações do contrato são restritas ao proprietário.

Como testar:

1. Acessar o Remix IDE (remix.ethereum.org).
2. Criar um novo arquivo e cola o código acima.
3. Compilar o contrato com Solidity 0.8.0 ou superior.
4. Implantar na rede de teste Sepolia, obtendo ETH de teste em faucets como `<https://faucet.sepolia.dev>`.
5. Chamar mintNFT com:
Um endereço de destinatário (ex.: carteira MetaMask do aluno).
Um tokenURI (ex.: ipfs://Qm.../metadata.json, criado com Pinata).

6. Verificar o NFT no OpenSea Testnets (testnets.opensea.io) usando o endereço do contrato e o ID do token.

Exemplo: Suponha que queira criar um NFT para uma pintura digital. Ele hospeda a imagem e os metadados no IPFS usando Pinata, obtém o link ipfs://Qm.../metadata.json, e usa esse link ao chamar mintNFT. O NFT será visível no OpenSea com a imagem e os atributos definidos.

## 4. Exemplo Prático 2: Mintando e Vendendo um NFT no OpenSea

Aprender a criar e vender um NFT no OpenSea, uma plataforma popular para NFTs.

Passos para Mintar:

1. Acessar opensea.io e conecta sua carteira MetaMask.
2. Clica em "Create" > "Create a Collection" e define:
Nome: "Minha Primeira Coleção".
Logotipo: Uma imagem PNG (ex.: um ícone de estrela).
Descrição: "Coleção de arte digital única".

Adiciona um NFT:

1. Clica em "Add Item".
2. Faz upload de uma imagem (ex.: uma ilustração em PNG).
3. Preenche: Nome ("Estrela #1"), Descrição ("Obra única"), Atributos (ex.: "Cor: Azul", "Raridade: Comum").
4. Escolhe a blockchain: Polygon (sem taxas de gás) ou Ethereum.
5. Clica em "Create" para mintar o NFT (lazy minting, registrado na blockchain apenas ao vender).

Passos para Vender:

1. Acessar o NFT em "My Collections".
2. Clica em "Sell" e escolhe:
3. Preço fixo: 0.01 ETH.
4. Leilão: Preço inicial de 0.005 ETH, duração de 7 dias.
5. Confirma a transação na MetaMask, pagando taxas de gás (se Ethereum).
O NFT aparece listado no OpenSea para compradores.


Exemplo: O aluno cria um NFT de uma foto de um pôr do sol. Ele define atributos como "Local: Praia", "Hora: 18h" e usa Polygon para evitar taxas. Ao listar por 0.01 ETH, o NFT aparece no OpenSea, atraindo colecionadores interessados em fotografia.

## 5. Exemplo Prático 3: Criando um NFT na Rarible

O aluno explorará a Rarible, outra plataforma popular, para entender diferenças em relação ao OpenSea.
Passos:

1. Acessar rarible.com e conecta sua carteira MetaMask.
2. Clica em "Create" e escolhe:
Tipo: "Single" (um NFT) ou "Multiple" (edição limitada).
Blockchain: Ethereum, Polygon ou outra suportada.

3. Faz upload de uma imagem (ex.: um desenho digital).
4. Preenche: Nome ("Lua Cheia #1"), Descrição, Royalties (ex.: 10% para futuras vendas).
5. Escolhe "Free Minting" (lazy minting) ou paga gás para mintar imediatamente.
6. Clica em "Create Item" e confirma na MetaMask.
7. Para vender, lista o NFT com preço fixo ou leilão, similar ao OpenSea.

Diferenças em relação ao OpenSea:

Rarible permite configurar royalties diretamente no processo de minting.
Interface mais personalizável para coleções.
Suporta mais blockchains (ex.: Flow, Tezos).

Exemplo explicativo: O aluno cria um NFT de uma animação curta na Rarible, usando Polygon. Ele define royalties de 15% para ganhar em revendas futuras. Após listar por 0.02 ETH, o NFT aparece no mercado da Rarible, atraindo colecionadores de animações.

## 6. Recursos Adicionais

OpenZeppelin: <https://docs.openzeppelin.com/contracts/4.x/erc721>
OpenSea: <https://opensea.io>
Rarible: <https://rarible.com>
Pinata (IPFS): <https://pinata.cloud>
Ethereum Testnets: <https://faucet.sepolia.dev>
Solidity: <https://docs.soliditylang.org>
