# Estruturas de dados para Blockchain

A estrutura da blockchain é fundamentada em conceitos de estrutura de dados e algoritmos. Esses mecanimso computacionais, unidos e integrados, garantem o funcionamento do mecanismo para blockchain.

Quais são os conceitos de estruturas de dados usados?

Aqui tem uma lista:

## Listas Encadeadas: A Corrente dos Blocos  

Imagine uma corrente onde cada elo guarda um pedaço de informação e um gancho que o prende ao elo anterior. Assim funcionam as **listas encadeadas**: cada bloco em uma blockchain contém seus dados (como transações) e uma "ligação" (o *hash* do bloco anterior), formando uma cadeia imutável. Se alguém tentar alterar um bloco no meio, todos os ganchos depois dele quebrariam, revelando a fraude. Essa estrutura simples, porém poderosa, é a espinha dorsal da blockchain.  

Para mais detalhes [linked list](../estruturadados/linkedlist/README.md)

## Tabelas de Hash: O Livro-Caixa Digital

Se uma blockchain fosse um banco, as **tabelas de hash** seriam seu livro-caixa instantâneo. Elas mapeiam chaves (como endereços de carteiras) para valores (saldos ou transações) em tempo constante — como abrir um armário e pegar exatamente o que precisa sem procurar. No Bitcoin, essa estrutura (UTXO) rastreia moedas não gastas com eficiência, garantindo que ninguém gaste o mesmo dinheiro duas vezes. São o "GPS" que mantém o sistema rápido e confiável.

Para mais detalhes [hash](../estruturadados/hash/README.md)

## Árvores de Merkle: O Quebra-Cabeça da Verificação

Pense em uma árvore genealógica, mas em vez de nomes, cada "parente" é um resumo criptográfico (*hash*) dos seus "filhos". Na blockchain, as **árvores de Merkle** organizam centenas de transações em uma estrutura hierárquica, onde a raiz (o *hash* do topo) representa todas elas de forma compacta. Isso permite que você prove que uma transação está no bloco sem precisar examinar cada uma — como verificar um único pedaço de um quebra-cabeça e saber que o resto está correto.  

Para mais detalhes [merkle](../estruturadados/merkle/README.md)

---
Aqui para [Criptografia assimetrica](../chaves/README.md)