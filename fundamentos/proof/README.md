# Algoritmos proof

## 1. O problema do **Double Spending (Gasto Duplo)**

**Double Spending** (ou "gasto duplo") é um problema em sistemas de dinheiro digital em que uma mesma quantia de moeda é gasta mais de uma vez. Isso acontece porque, diferentemente do dinheiro físico (como uma nota de R$ 100, que só pode ser usada uma vez), dados digitais podem ser copiados e reutilizados fraudulentamente.

### **Como o Double Spending Funciona?**

1. **Ataque Básico**  
   - Um usuário envia a mesma criptomoeda em duas transações diferentes para destinatários distintos.
   - Se a rede não tiver um mecanismo de consenso eficiente, ambas as transações podem ser temporariamente válidas até que uma delas seja detectada como fraudulenta.

2. **Exemplo Prático**  
   - Suponha que Maria Clara tem **1 Bitcoin** e envia:
     - **Transação 1**: 1 BTC para André (para comprar um carro).
     - **Transação 2**: O mesmo 1 BTC para Teresa (antes que a primeira seja confirmada).
   - Se a rede aceitar as duas transações, Maria Clara terá efetivamente gasto o mesmo Bitcoin duas vezes.

### **Como Blockchains Previnem o Double Spending?**

1. **Proof of Work (PoW) – Bitcoin, Litecoin**  
   - Os mineradores validam transações e as incluem em blocos.
   - Uma vez que um bloco é confirmado (após vários blocos subsequentes), a transação se torna irreversível.
   - Tentativas de gastar a mesma moeda novamente serão rejeitadas pela rede.

2. **Proof of Stake (PoS) – Ethereum 2.0, Cardano**  
   - Validadores precisam "travar" moedas como garantia.
   - Se tentarem validar transações fraudulentas (incluindo double spending), perdem parte do valor apostado (*slashing*).

3. **Confirmações Múltiplas**  
   - Quanto mais blocos forem minerados após uma transação, mais segura ela se torna.
   - No Bitcoin, recomenda-se **6 confirmações** para considerar uma transação definitiva.

### **Tipos de Ataques de Double Spending**

1. **Race Attack**  
   - O fraudador envia duas transações conflitantes quase ao mesmo tempo, esperando que uma seja confirmada e a outra rejeitada.

2. **Finney Attack**  
   - Um minerador malicioso pré-minera um bloco com uma transação fraudulenta, mas só o libera após receber um pagamento em outra transação.

3. **51% Attack**  
   - Se um grupo controlar mais de 50% do poder de mineração (PoW) ou *staking* (PoS), pode reverter transações e gastar moedas duas vezes.

## 2. O **Proof of Work (PoW)**, ou **Prova de Trabalho**

 É um algoritmo de consenso usado em blockchains para validar transações e adicionar novos blocos à cadeia. Ele foi popularizado pelo Bitcoin e é fundamental para a segurança e descentralização de muitas criptomoedas.

### **Como o Proof of Work funciona?**

1. **Objetivo Principal**  
   - Garantir que os participantes da rede (mineradores) realizem um trabalho computacional difícil antes de propor um novo bloco, evitando ataques como *double spending* (gasto duplo).

2. **Processo de Mineração**  
   - Os mineradores competem para resolver um **problema matemático complexo** (geralmente um *hash* criptográfico) que exige grande poder de processamento.
   - O problema consiste em encontrar um **nonce** (número aleatório) que, quando combinado com os dados do bloco, gere um *hash* com uma determinada quantidade de zeros à esquerda (dificuldade ajustável).

3. **Validação do Bloco**  
   - Quando um minerador encontra a solução, ele a transmite à rede.
   - Os outros nós verificam facilmente se o *hash* está correto (o trabalho foi realmente feito).
   - Se válido, o bloco é adicionado à blockchain, e o minerador recebe uma recompensa (em criptomoedas).

4. **Ajuste de Dificuldade**  
   - A rede ajusta periodicamente a dificuldade do problema para manter um tempo médio constante entre blocos (ex.: ~10 minutos no Bitcoin).

### **Vantagens do Proof of Work**

✅ **Segurança**: Ataques exigiriam mais de 50% do poder computacional da rede (*ataque 51%*), o que é extremamente caro.  
✅ **Descentralização**: Qualquer um pode participar da mineração, sem necessidade de permissão.  
✅ **Comprovadamente eficaz**: Usado com sucesso no Bitcoin desde 2009.

### **Desvantagens do Proof of Work**

❌ **Alto consumo de energia**: Exige hardware poderoso (ASICs/GPUs) e eletricidade em larga escala.  
❌ **Centralização de mineradores**: Grandes *pools* de mineração dominam o processo.  
❌ **Escalabilidade limitada**: Tempo de confirmação mais lento comparado a outros mecanismos (como *Proof of Stake*).

### **Exemplo Prático (Bitcoin)**

- Cada bloco contém transações e um *hash* do bloco anterior.  
- Mineradores calculam milhões de *hashes* por segundo até encontrar um que atenda à dificuldade atual.  
- O primeiro a resolver ganha **6,25 BTC** (em 2023) + taxas das transações.  

### **Alternativas ao Proof of Work**

- **Proof of Stake (PoS)**: Usado por Ethereum 2.0, Cardano, etc. – validação baseada em posse de moedas, não em poder computacional.  
- **Outros**: Proof of Authority (PoA), Delegated Proof of Stake (DPoS).  

## 3. **Proof of Stake (PoS) – Prova de Participação**  

O **Proof of Stake (PoS)** é um algoritmo de consenso usado em blockchains para validar transações e criar novos blocos de forma mais eficiente em comparação ao *Proof of Work (PoW)*. Em vez de depender de poder computacional (mineração), o PoS seleciona validadores com base na quantidade de moedas que eles "bloqueiam" (fazem *stake*) na rede.

### **1. Validação por Participação (Staking)**

- Os participantes (**validadores**) precisam **travar (lock) uma quantia de moedas** na rede como garantia (*stake*).
- Quanto maior o *stake*, maior a chance de ser escolhido para validar blocos e receber recompensas.

### **2. Seleção Aleatória de Validadores**

- Ao contrário do PoW (onde mineradores competem), no PoS, o próximo validador é escolhido de forma **aleatória**, mas ponderada pelo valor em *stake*.
- Exemplo: Se Maria Clara tem 10% das moedas em *stake*, ela tem ~10% de chance de ser selecionada.

### **3. Validação e Recompensas**

- O validador escolhido verifica as transações, propõe um bloco e o envia para outros validadores confirmarem.
- Se o bloco for aprovado, o validador recebe **recompensas** (geralmente em criptomoedas).
- Se tentar fraudar, perde parte do *stake* (**slashing**).

### **4. Finalidade (Finality)**

- Em algumas blockchains PoS (como Ethereum 2.0), as transações são consideradas **finalizadas** mais rapidamente do que no PoW, reduzindo riscos de *reorganização* da blockchain.

---

### **Vantagens do Proof of Stake (PoS)**

✅ **Baixo consumo de energia** (não precisa de mineração pesada como no Bitcoin).  
✅ **Mais escalável** (processa mais transações por segundo).  
✅ **Menos centralização** (não depende de hardware caro como ASICs).  
✅ **Segurança econômica** (fraudes custam caro, pois o validador perde seu *stake*).  

---

### **Desvantagens do Proof of Stake (PoS)**

❌ **Risco de centralização por "ricos"** (quem tem mais moedas tem mais influência).  
❌ **Problema do "Nothing at Stake"** (em *forks*, validadores podem apoiar múltiplas cadeias sem custo).  
❌ **Barreira inicial** (precisa ter moedas para participar da validação).  

---

### **Diferença Entre Proof of Work (PoW) e Proof of Stake (PoS)**

| **Critério**       | **Proof of Work (PoW)** | **Proof of Stake (PoS)** |
|-------------------|----------------|----------------|
| **Consumo de energia** | Alto (mineração) | Baixo (validação por *stake*) |
| **Velocidade** | Mais lento (ex: Bitcoin ~10 min/bloco) | Mais rápido (ex: Ethereum ~12 segundos/bloco) |
| **Segurança** | Resistente a ataques 51%, mas custoso | Ataques custam perda de *stake* |
| **Descentralização** | Dominado por *mining pools* | Dominado por grandes *holders* |
| **Exemplos** | Bitcoin, Litecoin | Ethereum 2.0, Cardano, Solana |

---

### **Exemplo Prático (Ethereum 2.0)**

- Para ser um validador na Ethereum PoS, é preciso **travar 32 ETH**.
- Se validar corretamente, ganha recompensas (~4-7% ao ano).
- Se ficar offline ou agir maliciosamente, perde parte do *stake*.

## 4. **O que é o Nonce?**  

O **nonce** (*number used once*, ou "número usado uma vez") é um valor aleatório crítico em sistemas criptográficos, especialmente em blockchains que usam **Proof of Work (PoW)**, como Bitcoin. Ele é ajustado pelos mineradores para gerar um *hash* válido que atenda à dificuldade da rede.  

### **Função do Nonce em Blockchains (Proof of Work)**  

1. **Objetivo Principal**  
   - Encontrar um número (**nonce**) que, quando combinado com os dados do bloco, produza um *hash* (ex: SHA-256 no Bitcoin) que atenda a um critério específico (ex.: *hash* com vários zeros no início).  

2. **Como Funciona na Mineração?**  
   - Os mineradores testam **milhões de nonces por segundo** até encontrar um que gere um *hash* válido.  
   - Exemplo no Bitcoin:  

     ```plaintext
     Hash alvo: 0000000000000000000a1b2c3d4e5f6... (dificuldade ajustável)
     Nonce correto: 123456789 → Hash do bloco: 0000000000000000000a1b2c3d4e5f6...
     ```  

   - Quem encontra o *nonce* primeiro ganha o direito de adicionar o bloco à blockchain e recebe a recompensa.  

3. **Propriedades do Nonce**  
   - **Único**: Só funciona para um bloco específico.  
   - **Aleatório**: Não há padrão previsível, exigindo força bruta computacional.  
   - **Ajustável**: Se o *hash* não for válido, o minerador incrementa o *nonce* e tenta novamente.  

### **Exemplo Prático (Bitcoin)**  

- Um bloco contém:  
  - Transações  
  - *Hash* do bloco anterior  
  - *Timestamp*  
  - **Nonce** (inicialmente = 0)  
- O minerador calcula:  

  ```python
  while True:
      hash = SHA256(transações + hash_anterior + nonce)
      if hash.startswith("0000000"):  # Dificuldade exigida
          print("Bloco minerado! Nonce =", nonce)
          break
      nonce += 1  # Testa o próximo número
  ```  

- Se o *nonce* correto for **452.356**, esse valor é incluído no bloco para comprovar que o trabalho foi realizado.  

### **Nonce em Proof of Stake (PoS)?**  

No **PoS** (como Ethereum 2.0), não há mineração competitiva, então o *nonce* não é usado da mesma forma. Em vez disso:  

- Validadores são escolhidos aleatoriamente com base no *stake* (moedas travadas).  
- O conceito de *nonce* pode aparecer em assinaturas digitais, mas não como um mecanismo de consenso.  

---

### **Por que o Nonce é Importante?**  

🔹 **Segurança**: Dificulta ataques, pois exige poder computacional massivo para falsificar blocos.  
🔹 **Prova de Trabalho**: Comprova que o minerador gastou energia para validar o bloco.  
🔹 **Imutabilidade**: Garante que blocos antigos não sejam alterados sem recalcular todos os *nonces* subsequentes.  

---

### **Curiosidade**  

No Bitcoin, o *nonce* é um número de **32 bits**, limitado a ~4,3 bilhões de combinações. Se os mineradores testarem todos sem sucesso, eles alteram outros campos do bloco (como o *timestamp* ou uma transação) e reiniciam a busca.  

---

Aqui para exemplo sobre o [nonce](../proof/nonce/README.md)
Aqui para exemplo sobre o [pos](../proof/pos/README.md)
