# Gas

No Ethereum, **Gas** é uma unidade que mede o esforço computacional necessário para executar operações na blockchain, como enviar transações, interagir com contratos inteligentes ou implantar novos contratos. Ele funciona como o "combustível" que alimenta a rede, garantindo que os mineradores ou validadores sejam compensados pelo trabalho de processar e validar transações.

## **O que é Gas no Ethereum?**

Gas é uma métrica abstrata que quantifica o custo computacional de uma operação na **Máquina Virtual Ethereum (EVM)**, o ambiente que executa transações e contratos inteligentes. Cada operação na EVM (como somar dois números, armazenar dados ou verificar uma assinatura) consome uma quantidade específica de Gas. Os usuários pagam por esse Gas em **Ether (ETH)**, a criptomoeda nativa do Ethereum, para incentivar os mineradores (no Ethereum 1.0, com Proof of Work) ou validadores (no Ethereum 2.0, com Proof of Stake) a processarem suas transações.

Pense no Gas como o "pedágio" que você paga para usar a rodovia da blockchain Ethereum. Assim como um carro maior ou uma viagem mais longa exige mais combustível, operações mais complexas na blockchain consomem mais Gas.

## **Por que o Gas Existe?**

O Gas tem várias funções cruciais no ecossistema Ethereum:

1. **Compensação aos Participantes**:
   - Mineradores/validadores gastam recursos computacionais (energia, hardware) para processar transações. O Gas garante que sejam pagos por esse trabalho.
2. **Prevenção de Abusos**:
   - Como cada operação custa Gas, usuários mal-intencionados não podem sobrecarregar a rede com transações infinitas ou complexas sem pagar um custo proporcional.
3. **Alocação de Recursos**:
   - O Gas ajuda a priorizar transações em momentos de alta demanda, já que usuários dispostos a pagar mais têm suas transações processadas mais rápido.

## **Componentes do Gas**

O custo de uma transação no Ethereum depende de dois fatores principais: **Gas Limit** e **Gas Price**. O produto desses dois determina o custo total em Ether.

1. **Gas Limit (Limite de Gas)**:
   - Representa a quantidade máxima de Gas que uma transação pode consumir.
   - Cada tipo de operação tem um custo fixo em Gas, definido pelo protocolo Ethereum. Exemplos:
     - Transferência simples de ETH: 21.000 Gas.
     - Chamar uma função de contrato inteligente: Pode variar de 30.000 a centenas de milhares, dependendo da complexidade.
     - Implantar um contrato: Geralmente consome mais de 100.000 Gas.
   - O usuário define o *Gas Limit* ao criar a transação, normalmente com base em estimativas fornecidas por carteiras como MetaMask.
   - Se o *Gas Limit* for muito baixo, a transação falha (mas o Gas usado até o ponto de falha é cobrado).

2. **Gas Price (Preço do Gas)**:
   - É o valor que o usuário paga por unidade de Gas, expresso em *wei* (1 ETH = 10^18 *wei*) ou, mais comumente, em *gwei* (1 *gwei* = 10^9 *wei*).
   - Exemplo: Um *Gas Price* de 20 *gwei* significa que cada unidade de Gas custa 0,00000002 ETH.
   - Após o **London Upgrade** (EIP-1559, agosto de 2021), o *Gas Price* é composto por:
     - **Base Fee (Taxa Base)**: Um valor mínimo ajustado dinamicamente pela rede, que varia com base na demanda. Parte dessa taxa é "queimada" (removida de circulação).
     - **Priority Fee (Gorjeta)**: Um valor opcional que o usuário adiciona para incentivar mineradores/validadores a priorizarem sua transação.

3. **Custo Total**:
   - Calculado como: `Custo Total (em ETH) = Gas Usado x Gas Price`.
   - Exemplo: Uma transação que usa 21.000 Gas com um *Gas Price* de 20 *gwei* custa:
     - 21.000 x 20 *gwei* = 420.000 *gwei* = 0,00042 ETH.

## **Como o Gas é Calculado?**

Cada operação na EVM tem um custo de Gas predefinido, especificado no **Yellow Paper** do Ethereum.
Alguns exemplos:

- **Operações Simples**:
  - Somar dois números: 3 Gas.
  - Transferir ETH: 21.000 Gas (custo base).
- **Operações Complexas**:
  - Armazenar 256 bits na blockchain (*SSTORE*): 20.000 Gas.
  - Criar um contrato (*CREATE*): 32.000 Gas + custo do *bytecode*.
  - Chamar uma função de contrato: Varia conforme a lógica do contrato.

Quando você envia uma transação, a EVM executa todas as operações necessárias e soma o Gas consumido. Se o *Gas Limit* for atingido antes da conclusão, a transação é revertida, mas o Gas usado é cobrado.

## **Exemplo Prático**

Você quer comprar um token ERC-20 no Uniswap:

1. Você cria uma transação com:
   - **Gas Limit**: 200.000 (estimado pela carteira para cobrir a interação com o contrato do Uniswap).
   - **Gas Price**: 30 *gwei* (baseado na demanda da rede, com 25 *gwei* de taxa base e 5 *gwei* de gorjeta).
2. A transação é executada, consumindo 150.000 Gas (menos que o limite).
3. O custo é:
   - 150.000 x 30 *gwei* = 4.500.000 *gwei* = 0,0045 ETH.
4. O valor é deduzido do seu saldo em ETH, além do valor pago pelo token.

Se a rede estiver congestionada, o *Gas Price* pode subir (ex.: 100 *gwei*), aumentando o custo para 0,015 ETH, mesmo para a mesma transação.

## **Mudanças com o EIP-1559**

O **EIP-1559**, implementado em agosto de 2021, reformulou o mercado de Gas no Ethereum para torná-lo mais previsível e eficiente:

- **Taxa Base**: Calculada automaticamente pela rede com base na demanda. Aumenta quando a rede está cheia e diminui quando há menos transações.
- **Queima de ETH**: A taxa base é removida de circulação, reduzindo a oferta total de Ether ao longo do tempo, o que pode aumentar seu valor.
- **Gorjeta**: Permite que usuários paguem extra para acelerar suas transações.
- **Taxa Máxima**: Usuários definem um limite superior (*Max Fee*) para evitar pagar mais do que o esperado.

Essa mudança tornou as taxas mais transparentes e reduziu a necessidade de ajustes manuais de *Gas Price* em carteiras.

## **Importância do Gas no Ethereum**

- **Incentivo Econômico**: Garante que mineradores/validadores sejam recompensados, mantendo a rede operacional.
- **Segurança**: Previne ataques de *spam* ou loops infinitos, já que cada operação custa Gas.
- **Priorização**: Permite que usuários com transações urgentes paguem mais para serem processados rapidamente.
- **Transparência**: Os custos de Gas são previsíveis (com base nas operações) e auditáveis.

## **Soluções para Altos Custos de Gas**

- **Ethereum 2.0**: A transição para Proof of Stake e o uso de *sharding* (divisão da blockchain em cadeias menores) promete aumentar a escalabilidade, reduzindo a competição por Gas.
- **Camadas 2 (Layer 2)**: Soluções como Optimism, Arbitrum e Polygon processam transações fora da blockchain principal (Layer 1) e as finalizam no Ethereum, com custos muito menores (ex.: 0,01 USD por transação).
- **Ajustes de Mercado**: O EIP-1559 ajuda a estabilizar os preços, e futuras melhorias (como EIP-4844) podem reduzir ainda mais os custos.