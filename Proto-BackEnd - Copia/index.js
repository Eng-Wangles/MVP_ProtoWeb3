const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

console.log("=".repeat(60));
console.log("🚀 BACKEND WEB3 - PROTOCOLO DESCENTRALIZADO");
console.log("=".repeat(60));

// ========== CONFIGURAÇÃO ==========
const RPC_URL = "https://sepolia.gateway.tenderly.co";
const provider = new ethers.JsonRpcProvider(RPC_URL);

// Endereços dos contratos
const CONTRACTS = {
    ctbToken: "0x507628f8F827dF956a6aB3e6B7B017c38eF53c06",
    memberNFT: "0x6111AEC6F417840BB12503fc4f879ed880f4cF0A",
    staking: "0xeeC7eEA6a4B28f8cECefAB8aE6d7d6C4a5125ba2",
    dao: "0x275ABa3a55afa7D1561c8165B407b6CFbbA4264B",
    oracle: "0xBfE880E4F016e69ede4b6CF3728B7EAd043B1647"
};

// ========== ARMAZENAMENTO EM JSON ==========
const DATA_FILE = 'protocolo-data.json';

let data = {
    stakes: [],
    withdraws: [],
    rewards: [],
    nftMints: [],
    proposals: [],
    votes: []
};

// Carregar dados salvos
if (fs.existsSync(DATA_FILE)) {
    data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    console.log("📁 Dados carregados do arquivo");
}

// Salvar dados
function saveData() {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// ========== ABIs PARA EVENTOS ==========
const STAKING_ABI = [
    "event Staked(address indexed user, uint256 amount)",
    "event Withdrawn(address indexed user, uint256 amount)",
    "event RewardPaid(address indexed user, uint256 reward)"
];

const NFT_ABI = [
    "event NFTMinted(address indexed to, uint256 indexed tokenId, uint256 level)"
];

const DAO_ABI = [
    "event ProposalCreated(uint256 indexed id, address indexed proposer, string description, uint256 startTime, uint256 endTime)",
    "event VoteCast(uint256 indexed id, address indexed voter, bool support, uint256 weight)"
];

const staking = new ethers.Contract(CONTRACTS.staking, STAKING_ABI, provider);
const nft = new ethers.Contract(CONTRACTS.memberNFT, NFT_ABI, provider);
const dao = new ethers.Contract(CONTRACTS.dao, DAO_ABI, provider);

let lastIndexedBlock = 0;

async function indexEvents() {
    try {
        const currentBlock = await provider.getBlockNumber();
        const fromBlock = lastIndexedBlock === 0 ? currentBlock - 5000 : lastIndexedBlock + 1;
        
        if (fromBlock > currentBlock) return;
        
        console.log(`\n📡 Indexando blocos ${fromBlock} até ${currentBlock}...`);
        
        // Stakes
        const stakeEvents = await staking.queryFilter("Staked", fromBlock, currentBlock);
        for (const event of stakeEvents) {
            data.stakes.push({
                user: event.args[0],
                amount: ethers.formatEther(event.args[1]),
                timestamp: event.blockNumber,
                txHash: event.transactionHash
            });
        }
        console.log(`   ✅ ${stakeEvents.length} novos stakes`);
        
        // Withdraws
        const withdrawEvents = await staking.queryFilter("Withdrawn", fromBlock, currentBlock);
        for (const event of withdrawEvents) {
            data.withdraws.push({
                user: event.args[0],
                amount: ethers.formatEther(event.args[1]),
                timestamp: event.blockNumber,
                txHash: event.transactionHash
            });
        }
        console.log(`   ✅ ${withdrawEvents.length} novas retiradas`);
        
        // Rewards
        const rewardEvents = await staking.queryFilter("RewardPaid", fromBlock, currentBlock);
        for (const event of rewardEvents) {
            data.rewards.push({
                user: event.args[0],
                amount: ethers.formatEther(event.args[1]),
                timestamp: event.blockNumber,
                txHash: event.transactionHash
            });
        }
        console.log(`   ✅ ${rewardEvents.length} novas recompensas`);
        
        // NFTs
        const nftEvents = await nft.queryFilter("NFTMinted", fromBlock, currentBlock);
        for (const event of nftEvents) {
            data.nftMints.push({
                user: event.args[0],
                tokenId: event.args[1].toString(),
                level: event.args[2].toString(),
                timestamp: event.blockNumber,
                txHash: event.transactionHash
            });
        }
        console.log(`   ✅ ${nftEvents.length} novos NFTs`);
        
        // Propostas
        const proposalEvents = await dao.queryFilter("ProposalCreated", fromBlock, currentBlock);
        for (const event of proposalEvents) {
            data.proposals.push({
                id: event.args[0].toString(),
                description: event.args[2],
                proposer: event.args[1],
                startTime: event.args[3].toString(),
                endTime: event.args[4].toString(),
                forVotes: "0",
                againstVotes: "0",
                status: "active"
            });
        }
        console.log(`   ✅ ${proposalEvents.length} novas propostas`);
        
        // Votes
        const voteEvents = await dao.queryFilter("VoteCast", fromBlock, currentBlock);
        for (const event of voteEvents) {
            data.votes.push({
                proposalId: event.args[0].toString(),
                voter: event.args[1],
                support: event.args[2],
                weight: ethers.formatEther(event.args[3]),
                timestamp: event.blockNumber
            });
            
            // Atualizar contagem da proposta
            const proposal = data.proposals.find(p => p.id === event.args[0].toString());
            if (proposal) {
                if (event.args[2]) {
                    proposal.forVotes = (parseFloat(proposal.forVotes) + parseFloat(ethers.formatEther(event.args[3]))).toString();
                } else {
                    proposal.againstVotes = (parseFloat(proposal.againstVotes) + parseFloat(ethers.formatEther(event.args[3]))).toString();
                }
            }
        }
        console.log(`   ✅ ${voteEvents.length} novos votos`);
        
        lastIndexedBlock = currentBlock;
        saveData();
        
    } catch (error) {
        console.error("Erro na indexação:", error.message);
    }
}

// ========== API REST ==========

// Dashboard
app.get('/api/dashboard', async (req, res) => {
    try {
        const ctbContract = new ethers.Contract(CONTRACTS.ctbToken, [
            "function totalSupply() view returns (uint256)"
        ], provider);
        
        const totalSupply = await ctbContract.totalSupply();
        
        res.json({
            success: true,
            data: {
                totalSupply: ethers.formatEther(totalSupply),
                totalStakes: data.stakes.length,
                totalStakers: [...new Set(data.stakes.map(s => s.user))].length,
                totalNFTs: data.nftMints.length,
                totalProposals: data.proposals.length,
                totalStaked: data.stakes.reduce((sum, s) => sum + parseFloat(s.amount), 0)
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Histórico do usuário
app.get('/api/user/:address/history', (req, res) => {
    const address = req.params.address.toLowerCase();
    
    res.json({
        success: true,
        data: {
            stakes: data.stakes.filter(s => s.user.toLowerCase() === address),
            rewards: data.rewards.filter(r => r.user.toLowerCase() === address),
            nfts: data.nftMints.filter(n => n.user.toLowerCase() === address)
        }
    });
});

// Ranking
app.get('/api/ranking/stakers', (req, res) => {
    const ranking = {};
    data.stakes.forEach(stake => {
        if (!ranking[stake.user]) ranking[stake.user] = 0;
        ranking[stake.user] += parseFloat(stake.amount);
    });
    
    const sorted = Object.entries(ranking)
        .map(([user, total]) => ({ user, totalStaked: total }))
        .sort((a, b) => b.totalStaked - a.totalStaked)
        .slice(0, 20)
        .map((item, index) => ({ ...item, rank: index + 1 }));
    
    res.json({ success: true, data: sorted });
});

// Feed de atividades
app.get('/api/feed', (req, res) => {
    const feed = [
        ...data.stakes.map(s => ({ ...s, type: 'stake' })),
        ...data.nftMints.map(n => ({ ...n, type: 'nft' })),
        ...data.rewards.map(r => ({ ...r, type: 'reward' }))
    ].sort((a, b) => b.timestamp - a.timestamp).slice(0, 30);
    
    res.json({ success: true, data: feed });
});

// Propostas
app.get('/api/proposals', (req, res) => {
    res.json({ success: true, data: data.proposals });
});

// Estatísticas
app.get('/api/stats', (req, res) => {
    res.json({
        success: true,
        data: {
            totalStakes: data.stakes.length,
            totalWithdraws: data.withdraws.length,
            totalRewards: data.rewards.length,
            totalNFTs: data.nftMints.length,
            totalProposals: data.proposals.length,
            totalVotes: data.votes.length
        }
    });
});

// ========== INICIAR SERVIDOR ==========
const PORT = 3001;

app.listen(PORT, async () => {
    console.log(`\n🌐 Servidor rodando em http://localhost:${PORT}`);
    console.log("\n📋 ENDPOINTS DISPONÍVEIS:");
    console.log("   GET /api/dashboard");
    console.log("   GET /api/stats");
    console.log("   GET /api/user/:address/history");
    console.log("   GET /api/ranking/stakers");
    console.log("   GET /api/feed");
    console.log("   GET /api/proposals");
    
    await indexEvents();
    setInterval(indexEvents, 30000);
    
    console.log("\n✅ Backend Web3 iniciado!");
    console.log("=".repeat(60));
});