# 🚀 Protocolo Descentralizado MVP - ContributeDAO

Um protocolo completo para governança e recompensas na blockchain Ethereum (testnet Sepolia).

## 📋 O que este projeto faz?

- **Token CTB** - Token ERC-20 para governança e recompensas
- **NFT Member** - NFT com níveis (Bronze/Prata/Ouro) para identificar membros
- **Staking** - Trave seus tokens e ganhe recompensas automáticas
- **DAO** - Crie propostas e vote (quanto mais stake, mais peso no voto)
- **Oracle** - Preço do CTB em USD via Chainlink

## 🏗️ Como funciona?
┌─────────────────┐       ┌─────────────────┐     ┌─────────────────┐
│ FRONTEND        │────▶  │ BACKEND        │────▶│ BLOCKCHAIN      │
│ (Site Web)      │       │ (API Node)      │     │ (Sepolia)       │
│ localhost:8080  │       │ localhost:3001  │     │                 │
└─────────────────┘       └─────────────────┘     └─────────────────┘

## 📦 Endereços dos Contratos (Sepolia)

| Contrato | Endereço |
|----------|----------|
| **CTB Token** | `0x507628f8F827dF956a6aB3e6B7B017c38eF53c06` |
| **Member NFT** | `0x6111AEC6F417840BB12503fc4f879ed880f4cF0A` |
| **Staking** | `0xeeC7eEA6a4B28f8cECefAB8aE6d7d6C4a5125ba2` |
| **DAO** | `0x9442563B721797b8057CaDEE2Da9550FA4405A8E` |
| **Oracle** | `0xBfE880E4F016e69ede4b6CF3728B7EAd043B1647` |

## 🚀 Como executar o projeto?

### Pré-requisitos
- Node.js instalado (versão 16+)
- MetaMask instalado no navegador
- Conta com ETH na Sepolia (use faucet)

### 1. Iniciar o Backend (API)

cd backend
npm install
node index.js

O servidor vai rodar em: http://localhost:3001

### 2. Iniciar o Frontend (Site)

cd frontend
python -m http.server 8080

Acesse no navegador: http://localhost:8080

### 3. Conectar o MetaMask

Rede: Sepolia
Conecte sua carteira clicando no botão "Conectar MetaMask"

🧪 Funcionalidades disponíveis

Guia             O que faz

Dashboard        Ver estatísticas, saldo, stake e recompensas
Token            Transferir CTB para outra carteira
NFT              Mintar NFT, fazer upgrade de nível
Staking          Fazer stake, retirar, reivindicar recompensas
Governança       Criar propostas e votar

📊 API Endpoints (Backend)

Endpoint  Retorna
GET /api/dashboard           Estatísticas do protocolo
GET /api/stats               Métricas gerais
GET /api/ranking/stakers     Ranking dos maiores stakers
GET /api/feed                Atividades recentes
GET /api/user/0x.../history  Histórico do usuário

✅ Testes

cd hardhat
npm install
npx hardhat test

Resultado: 26 testes aprovados (100%)

📁 Estrutura do projeto

protocolo-descentralizado-mvp/
├── frontend/          # Site (HTML, CSS, JS)
├── backend/           # API Node.js
├── hardhat/           # Testes e auditoria
└── contracts/         # Contratos Solidity

🛡️ Segurança

Proteção contra reentrância
Controle de acesso (onlyOwner)
Pausa de emergência
Validação de inputs

📝 Licença
MIT - Use à vontade!

👨‍💻 Autor
Wangles M. Soares
