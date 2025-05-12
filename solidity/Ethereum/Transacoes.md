# Transações

No Ethereum, as **transações** são os mecanismos fundamentais que permitem a interação com a blockchain, seja para transferir Ether (ETH), executar contratos inteligentes ou implantar novos contratos. Elas representam ações iniciadas por usuários ou sistemas que alteram o estado da blockchain, como atualizar saldos, modificar variáveis de contratos ou criar novos ativos. Como professor de blockchain e Web3, você pode usar essa explicação detalhada para esclarecer o conceito aos seus alunos, com exemplos práticos e uma abordagem clara. Abaixo, explico o que são transações no Ethereum, seus tipos, componentes, como funcionam, e os custos associados, tudo de forma estruturada e acessível.

## **O que é uma Transação no Ethereum?**

Uma transação no Ethereum é uma instrução assinada, enviada de uma **Conta Externamente Controlada (EOA)**, que realiza uma ação na blockchain. Essa ação pode ser:

- Transferir Ether entre contas.
- Chamar uma função de um contrato inteligente (ex.: comprar um NFT).
- Implantar um novo contrato inteligente na rede.

As transações são registradas na blockchain de forma imutável, pública e verificável, garantindo transparência e segurança. Elas são processadas por mineradores (no Ethereum 1.0, com Proof of Work) ou validadores (no Ethereum 2.0, com Proof of Stake) e exigem o pagamento de taxas, conhecidas como **gas**, para compensar o esforço computacional.

## **Tipos de Transações no Ethereum**

Existem três tipos principais de transações, cada uma com um propósito específico:

1. **Transferência de Ether**:
   - Envia ETH de uma conta (EOA ou contrato) para outra.
   - Exemplo: Enviar 1 ETH de sua carteira MetaMask para um amigo.
   - É a forma mais simples de transação, com poucos dados além do valor transferido.

2. **Interação com Contratos Inteligentes**:
   - Chama uma função de um contrato inteligente já implantado na blockchain.
   - Exemplo: Aprovar uma troca de tokens no Uniswap ou votar em uma DAO.
   - Inclui dados que especificam a função a ser executada e seus parâmetros.

3. **Implantação de Contratos Inteligentes**:
   - Publica um novo contrato inteligente na blockchain.
   - Exemplo: Um desenvolvedor implanta um contrato para um protocolo DeFi.
   - Contém o *bytecode* do contrato compilado (geralmente em Solidity) e consome mais *gas* devido à complexidade.

## **Componentes de uma Transação**

Uma transação no Ethereum é composta por vários campos, que são incluídos em uma mensagem criptograficamente assinada. Esses campos são:

1. **Nonce**:
   - Um contador que indica o número de transações enviadas por uma EOA.
   - Garante que transações sejam processadas na ordem correta e evita repetições.
   - Exemplo: Se uma EOA enviou 5 transações, a próxima terá *nonce* 6.

2. **To (Destinatário)**:
   - O endereço de 20 bytes (começando com "0x") da conta ou contrato que receberá a transação.
   - Para implantação de contratos, esse campo é vazio (`0x0`).

3. **Value (Valor)**:
   - A quantidade de Ether (em *wei*, onde 1 ETH = 10^18 *wei*) a ser transferida.
   - Para interações com contratos, pode ser 0 se não houver transferência de ETH.

4. **Data (Dados)**:
   - Campo opcional que contém instruções para contratos inteligentes.
   - Para transferências simples, geralmente está vazio.
   - Para interações com contratos, inclui o identificador da função e os argumentos (codificados em hexadecimal).
   - Para implantação de contratos, contém o *bytecode* do contrato.

5. **Gas Limit (Limite de Gas)**:
   - A quantidade máxima de *gas* que a transação pode consumir.
   - Garante que transações complexas não consumam recursos indefinidamente.
   - Exemplo: Um limite de 21.000 *gas* para uma transferência simples de ETH.

6. **Gas Price (Preço do Gas)**:
   - O valor (em *wei*) que o remetente está disposto a pagar por unidade de *gas*.
   - Mineradores/validadores priorizam transações com preços mais altos.
   - Após o *London Upgrade* (EIP-1559, agosto de 2021), o preço do *gas* inclui uma **taxa base** (ajustada pela rede) e uma **gorjeta** opcional.

7. **Signature (Assinatura)**:
   - Uma assinatura criptográfica gerada com a chave privada da EOA.
   - Usa o algoritmo **ECDSA** (curva *secp256k1*) para autenticar o remetente e garantir que a transação não foi alterada.

## **Como Funciona uma Transação no Ethereum?**

O processo de uma transação no Ethereum segue várias etapas, desde a criação até a inclusão na blockchain:

1. **Criação da Transação**:
   - O usuário usa uma carteira (ex.: MetaMask) para criar a transação.
   - A carteira preenche os campos (*nonce*, *to*, *value*, *data*, *gas limit*, *gas price*) e assina a transação com a chave privada.

2. **Envio à Rede**:
   - A transação assinada é enviada aos nós da rede Ethereum, que a colocam na **mempool** (uma fila de transações pendentes).
   - Nós verificam a validade da transação (ex.: assinatura correta, *nonce* válido, saldo suficiente para pagar *gas*).

3. **Seleção por Mineradores/Validadores**:
   - Mineradores (PoW) ou validadores (PoS) escolhem transações da *mempool*, priorizando aquelas com maior *gas price* ou gorjeta.
   - Eles agrupam transações em um bloco candidato.

4. **Execução na EVM**:
   - A transação é processada pela **Máquina Virtual Ethereum (EVM)**, que atualiza o estado da blockchain.
   - Para transferências de ETH, o saldo do remetente é reduzido e o do destinatário aumentado.
   - Para interações com contratos, a EVM executa o *bytecode* do contrato, atualizando variáveis ou transferindo tokens.

5. **Inclusão no Bloco**:
   - O bloco contendo a transação é validado pelo mecanismo de consenso (PoW ou PoS) e adicionado à blockchain.
   - A transação torna-se imutável e visível publicamente.

6. **Confirmação**:
   - Após a inclusão no bloco, a transação é considerada confirmada, mas pode exigir mais confirmações (blocos subsequentes) para ser vista como definitiva, especialmente para transações de alto valor.

## **Custo das Transações: Gas**

As transações no Ethereum têm um custo associado, chamado **gas**, que compensa o esforço computacional dos mineradores/validadores. Aqui estão os detalhes:

- **Gas**: Uma unidade que mede o trabalho computacional necessário para executar uma transação.
  - Exemplo: Uma transferência simples de ETH consome 21.000 *gas*, enquanto interações complexas com contratos podem consumir centenas de milhares.
- **Gas Price**: O preço por unidade de *gas*, pago em *wei* (geralmente expresso em *gwei*, onde 1 *gwei* = 10^9 *wei*).
- **Custo Total**: Calculado como `Gas Limit x Gas Price`. O remetente deve ter Ether suficiente para cobrir esse custo, além do valor transferido.
- **EIP-1559**: Introduziu uma **taxa base** (ajustada dinamicamente pela rede) e uma **gorjeta** opcional. Parte da taxa base é queimada (removida de circulação), reduzindo a oferta de ETH.

Se o *gas limit* for insuficiente ou o preço do *gas* for muito baixo, a transação pode falhar ou ficar pendente na *mempool*.

## **Exemplo Prático**

Imagine que você quer trocar 1 ETH por um token ERC-20 no Uniswap:

1. Você usa sua carteira (EOA) para criar uma transação.
2. A transação inclui:
   - **Destinatário**: Endereço do contrato do Uniswap.
   - **Valor**: 1 ETH.
   - **Dados**: Instruções para a função de troca (ex.: `swapExactETHForTokens`).
   - **Gas Limit**: 200.000 (estimado pela carteira para cobrir a complexidade).
   - **Gas Price**: 20 *gwei* (definido com base na demanda da rede).
3. A transação é assinada com sua chave privada e enviada à rede.
4. Um validador processa a transação, executa a troca no contrato do Uniswap, e transfere os tokens para sua EOA.
5. O custo do *gas* (ex.: 0,004 ETH) é deduzido do seu saldo, e o bloco é adicionado à blockchain.

## **Importância das Transações no Ethereum**

- **Mudança de Estado**: Transações são a única forma de alterar o estado da blockchain (saldos, variáveis de contratos, etc.).
- **Interação com dApps**: Permitem que usuários acessem aplicativos descentralizados, como DeFi, NFTs, ou jogos.
- **Descentralização**: A validação distribuída das transações garante a segurança e a resistência à censura.
- **Economia da Rede**: As taxas de *gas* incentivam a eficiência e sustentam os mineradores/validadores.

## **Desafios das Transações**

- **Custo Elevado**: Em períodos de alta demanda, as taxas de *gas* podem disparar, tornando transações simples (ex.: transferir 10 USD em ETH) custosas.
- **Escalabilidade**: A rede Ethereum processa cerca de 15 transações por segundo, o que pode causar atrasos em momentos de pico.
- **Complexidade para Iniciantes**: Configurar *gas limit* e *gas price* pode ser confuso, embora carteiras modernas automatizem isso.

Soluções como o **Ethereum 2.0** (com PoS e *sharding*) e **camadas 2** (ex.: Optimism, Arbitrum) estão sendo implementadas para melhorar a escalabilidade e reduzir custos.

