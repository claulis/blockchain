
# **Explicação Detalhada**  

## **1. O que é o Nonce?**  

- **Nonce** (*Number Used Once*) é um número aleatório que mineradores ajustam para gerar um hash válido.  
- No Bitcoin, o hash deve começar com vários zeros (dificuldade).  
- **Exemplo**: Se `difficulty = 4`, o hash deve começar com `0000...`.

### **2. Como Funciona o Código?**  

1. **Prepara os dados do bloco**:  
   - Concatena `transactions` + `previousHash` + `nonce`.  
2. **Gera o hash SHA-256**:  
   - Usa `crypto.createHash('sha256')` para calcular o hash.  
3. **Verifica o hash**:  
   - Se o hash começar com `0000...`, o nonce é válido.  
4. **Repete até encontrar**:  
   - Incrementa o `nonce` e tenta novamente até achar um hash válido.  

### **3. Por que isso é importante no Bitcoin?**  

- **Proof of Work (PoW)**: Exige que mineradores gastem energia para encontrar o nonce, garantindo segurança.  
- **Imutabilidade**: Alterar um bloco exige recalcular todos os nonces seguintes (inviável computacionalmente).  

---

## **Como Testar?**  

3. **Execute no terminal**:  
   ```bash
   node nonce.js
   ```
4. **Ajuste a dificuldade**:  
   - `difficulty = 4` (rápido para testes).  
   - No Bitcoin real, a dificuldade é muito maior (ex.: 19 zeros).  

---

## **Possíveis Melhorias**  

- **Otimização**: Usar WebAssembly ou multithreading para mineração mais rápida.  
- **Timeout**: Adicionar um limite de tempo para evitar loops infinitos acidentais.  
- **Interface Gráfica**: Integrar com um frontend para visualização em tempo real.  
