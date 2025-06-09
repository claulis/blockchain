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
        require(_to != address(0), unicode"Endereço inválido");
        require(_from == msg.sender || isApprovedForAll[_from][msg.sender], unicode"Não autorizado");
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