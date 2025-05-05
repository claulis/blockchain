# `type: 'spki'`, `type: 'pkcs8'` e `format: 'pem'`

Esses termos estão relacionados a formatos de armazenamento de chaves públicas e privadas em criptografia assimétrica (como RSA, ECC, etc.). Vamos entender cada um:

---

## **1. `type: 'spki'` (SubjectPublicKeyInfo)**

### **O que é?**

- **SPKI** é um padrão para armazenar **chaves públicas** em um formato estruturado.
- Define como uma chave pública deve ser codificada, incluindo:
  - O algoritmo usado (ex: RSA, ECDSA).
  - Os parâmetros da chave (ex: módulo e expoente no RSA).
- É parte do padrão **X.509** (usado em certificados digitais).

### **Quando usar?**

- Quando você quer **exportar/armazenar uma chave pública** em um formato amplamente compatível.
- Usado em certificados SSL/TLS, chaves SSH e outros sistemas de criptografia.

### **Exemplo em PEM (formato legível):**

```plaintext
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAz6fJ6vX7J9Y...
-----END PUBLIC KEY-----
```

---

## **2. `type: 'pkcs8'` (Private-Key Cryptography Standards #8)**

### **O que é?**

- **PKCS#8** é um padrão para armazenar **chaves privadas** de forma genérica.
- Suporta diferentes algoritmos (RSA, ECDSA, Ed25519, etc.).
- Pode ser **criptografado** (protegido por senha) ou **não criptografado**.

### **Quando usar?**

- Quando você precisa armazenar uma **chave privada** em um formato padrão.
- Usado em sistemas modernos (Node.js, OpenSSL, Java, etc.).

### **Exemplo em PEM (não criptografado):**

```plaintext
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDZx2vj...
-----END PRIVATE KEY-----
```

### **Exemplo em PEM (criptografado com senha):**

```plaintext
-----BEGIN ENCRYPTED PRIVATE KEY-----
MIIFHDBOBgkqhkiG9w0BBQ0wQTApBgkqhkiG9w0BBQwwHAQIgAgA1Aw...
-----END ENCRYPTED PRIVATE KEY-----
```

---

## **3. `format: 'pem'` (Privacy Enhanced Mail)**

### **O que é?**

- **PEM** é um formato de codificação em **Base64** para dados binários.
- Inclui **cabeçalhos** (`-----BEGIN...`) e **rodapés** (`-----END...`).
- Usado para **chaves públicas, privadas e certificados**.

### **Quando usar?**

- Quando você quer um formato **legível** (texto) para armazenar chaves.
- Compatível com OpenSSL, Node.js, APIs web e arquivos de configuração.

### **Exemplos:**

| Tipo          | Formato PEM                          |
|---------------|--------------------------------------|
| Chave Pública | `-----BEGIN PUBLIC KEY-----` ...     |
| Chave Privada | `-----BEGIN PRIVATE KEY-----` ...    |
| Certificado   | `-----BEGIN CERTIFICATE-----` ...    |

---

## **Comparação entre `spki` e `pkcs8`**

| Característica      | `spki` (Chave Pública)       | `pkcs8` (Chave Privada)      |
|---------------------|-----------------------------|-----------------------------|
| **Finalidade**      | Armazenar chaves públicas   | Armazenar chaves privadas   |
| **Algoritmos**      | RSA, ECC, Ed25519, etc.     | RSA, ECC, Ed25519, etc.     |
| **Criptografia**    | Sem criptografia            | Pode ser criptografado      |
| **Uso típico**      | Certificados, SSL, SSH      | Armazenamento seguro        |

---

### **Exemplo em Node.js:**

```javascript
const { generateKeyPairSync } = require('crypto');

// Gerando par de chaves RSA
const { publicKey, privateKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',  // Formato para chave pública
    format: 'pem'  // Codificação em texto
  },
  privateKeyEncoding: {
    type: 'pkcs8', // Formato para chave privada
    format: 'pem'  // Codificação em texto
    // cipher: 'aes-256-cbc', // Opcional: criptografar a chave privada
    // passphrase: 'senha'   // Opcional: senha de proteção
  }
});

console.log("Chave Pública (SPKI/PEM):\n", publicKey);
console.log("\nChave Privada (PKCS8/PEM):\n", privateKey);
```

---


