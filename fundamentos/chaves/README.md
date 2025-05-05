# **Criptografia Assimétrica (Chaves Pública e Privada): Conceitos Avançados e Conexão com Blockchain**

---

## **1. Fundamentos da Criptografia Assimétrica**

A criptografia assimétrica, também chamada de **criptografia de chave pública-privada**, é um sistema que utiliza **dois tipos de chaves** matematicamente relacionadas:

### **Chave Pública**

- **O que é?** Uma chave que pode ser **compartilhada livremente**.
- **Função principal:**  
  - Criptografar dados.
  - Verificar assinaturas digitais.
- **Características:**
  - Não precisa ser protegida (é pública).
  - Derivada da chave privada, mas **não é possível** recriar a chave privada a partir dela (devido a funções matemáticas irreversíveis, como fatoração de números primos ou curvas elípticas).

### **Chave Privada**

- **O que é?** Uma chave que **deve ser mantida em segredo**.
- **Função principal:**  
  - Descriptografar dados.
  - Criar assinaturas digitais.
- **Características:**
  - Se perdida ou comprometida, a segurança é quebrada.
  - Usada para provar **posse** (autenticação) e **não repúdio** (garantia de que uma mensagem foi enviada pelo dono da chave).

---

## **2. Como Funciona na Prática?**

### **Cenário 1: Criptografia/Descriptografia**

- **Alice** quer enviar uma mensagem secreta para **Bob**.
  1. **Bob** gera um par de chaves (pública + privada) e envia sua **chave pública** para Alice.
  2. **Alice** usa a **chave pública de Bob** para criptografar a mensagem.
  3. **Bob** usa sua **chave privada** para descriptografar a mensagem.
  
✅ **Vantagem:** Segurança mesmo em canais não confiáveis (como a internet).

### **Cenário 2: Assinatura Digital**

- **Bob** quer provar que uma mensagem foi enviada por ele.
  1. **Bob** cria um **hash** (resumo criptográfico) da mensagem.
  2. **Bob** usa sua **chave privada** para assinar o hash.
  3. **Alice** usa a **chave pública de Bob** para verificar se a assinatura é válida.

✅ **Vantagem:** Autenticidade e integridade dos dados.

---

## **3. Algoritmos Usados**

| Algoritmo       | Base Matemática               | Aplicações Comuns           |
|----------------|-----------------------------|---------------------------|
| **RSA**        | Fatoração de números primos  | SSL/TLS, Bitcoin (assinaturas) |
| **ECDSA**      | Curvas elípticas            | Ethereum, Blockchain       |
| **Ed25519**    | Curvas elípticas (EdDSA)    | Chaves SSH, Monero         |

---

## **4. Conexão com Blockchain**

Blockchains como **Bitcoin** e **Ethereum** dependem fortemente de criptografia assimétrica. Veja como:

### **A. Carteiras (Wallets)**

- Cada usuário tem um **par de chaves**:
  - **Chave privada:** Controla o acesso aos fundos (quem tem a chave privada controla a carteira).
  - **Chave pública:** Gera o **endereço público** (ex: `1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa` no Bitcoin).

### **B. Transações**

1. **Assinatura:** Quando você envia Bitcoin, sua **chave privada** assina a transação.
2. **Verificação:** Os nós da rede usam sua **chave pública** para validar a assinatura.

✅ **Segurança:** Ninguém pode gastar seus fundos sem sua chave privada.

### **C. Contratos Inteligentes (Ethereum)**

- Smart Contracts também usam chaves públicas para identificar participantes.
- Exemplo: Um contrato DeFi pode verificar assinaturas para liberar tokens.

---

## **5. Ataques e Vulnerabilidades**

- **Perda da chave privada** → Perda irreversível de fundos (ex: casos de HDs perdidos com Bitcoin).
- **Ataques quânticos:** Computadores quânticos podem quebrar RSA/ECC no futuro (soluções pós-quânticas estão em desenvolvimento).
- **Falhas em geradores de números aleatórios:** Se a chave privada não for realmente aleatória, pode ser recriada.

---

## **6. Exemplo Prático em Blockchain (Bitcoin)**

### **Passo a Passo: Como uma Transação Funciona?**

1. **Input:** Você tem 1 BTC e quer enviar 0.5 BTC para alguém.
2. **Assinatura:**
   - Sua carteira gera um **hash da transação**.
   - Sua **chave privada** assina esse hash (usando ECDSA).
3. **Broadcast:** A transação assinada é enviada para a rede.
4. **Validação:** Os mineradores verificam:
   - Se a **assinatura** corresponde à **chave pública**.
   - Se você tem saldo suficiente.
5. **Confirmação:** A transação é incluída em um bloco.

---

Aqui para [Algoritmos proof](../proof/README.md)