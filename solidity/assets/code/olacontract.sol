pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";

contract OlaContract {
    string public nome;
    uint public idade;


    // Declaração do evento
    event DetailsUpdated(string nome, uint idade);

    // Função para definir nome e idade
    function setDetails(string calldata _nome, uint _idade) public {
        require(bytes(_nome).length > 0, "Nome nao pode ser vazio");
        require(_idade > 0, "Idade deve ser maior que zero");
        nome = _nome;
        idade = _idade;
         // Emissão do evento
        emit DetailsUpdated(_nome, _idade);
    }

    // Função para retornar uma mensagem de cumprimento
    function dizerOla() public view returns (string memory) {
        return string(abi.encodePacked(unicode"Olá,", nome, unicode"! Você tem ", Strings.toString(idade), " anos."));
    }
}