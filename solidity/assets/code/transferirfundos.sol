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