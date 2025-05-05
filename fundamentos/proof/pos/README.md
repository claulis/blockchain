# **Algoritmo Proof of Stake (PoS) em JavaScript**

## **Como Funciona o Proof of Stake (PoS)?**

###  Componentes Principais

- **Validadores**: Participantes que "stakeam" (bloqueiam) moedas para ter direito a validar blocos.
- **Seleção Proporcional**: Quanto maior o stake, maior a chance de ser selecionado.
- **Criação de Blocos**: O validador selecionado cria e propaga o novo bloco.

### Testar

Execute:

```bash
node pos.js
```

### Saída Esperada (Exemplo)

```planitext
=== Rodada 1 ===
🎲 Validador selecionado: Validador_A (Stake: 1000)
🆕 Bloco #1 criado por Validador_A
🔗 Hash do bloco: a12b45c678d9...

=== Rodada 2 ===
🎲 Validador selecionado: Validador_B (Stake: 500)
🆕 Bloco #2 criado por Validador_B
...

📊 Distribuição de blocos criados:
Validador_A: 3 blocos (Stake: 1000)
Validador_B: 1 bloco (Stake: 500)
...
```

## **Vantagens do PoS**

✅ **Eficiência Energética** - Consome ~99% menos energia que PoW  
✅ **Escalabilidade** - Processa mais transações por segundo  
✅ **Segurança Econômica** - Ataques são financeiramente desvantajosos  

## **Desafios**

⚠️ **Centralização** - Ricos podem acumular mais influência  
⚠️ **Nothing-at-Stake** - Risco teórico de validadores apoiarem múltiplas chains  

Este exemplo simplificado mostra os conceitos fundamentais do PoS usado em Ethereum 2.0, Cardano e outras blockchains modernas.