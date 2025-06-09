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
        require(_to != address(0), unicode"Endereço inválido");
        require(ownerOf[_tokenId] == _from, unicode"Não é o dono do NFT");
        require(msg.sender == _from || getApproved[_tokenId] == msg.sender || isApprovedForAll[_from][msg.sender], unicode"Não autorizado");
        balanceOf[_from]--; // Reduz o saldo do remetente
        balanceOf[_to]++; // Aumenta o saldo do destinatário
        ownerOf[_tokenId] = _to; // Atualiza o dono
        delete getApproved[_tokenId]; // Remove aprovação anterior
        emit Transfer(_from, _to, _tokenId); // Emite evento
    }

    // Autoriza um endereço a transferir um NFT
    function approve(address _approved, uint256 _tokenId) public {
        require(ownerOf[_tokenId] == msg.sender, unicode"Não é o dono do NFT");
        getApproved[_tokenId] = _approved; // Define a aprovação
        emit Approval(msg.sender, _approved, _tokenId); // Emite evento
    }

    // Autoriza um operador a gerenciar todos os NFTs
    function setApprovalForAll(address _operator, bool _approved) public {
        isApprovedForAll[msg.sender][_operator] = _approved; // Define permissão
        emit ApprovalForAll(msg.sender, _operator, _approved); // Emite evento
    }
}