const CONTRACT_ADDRESSES = {
    ctbToken: "0x507628f8F827dF956a6aB3e6B7B017c38eF53c06",
    memberNFT: "0x6111AEC6F417840BB12503fc4f879ed880f4cF0A",
    staking: "0xeeC7eEA6a4B28f8cECefAB8aE6d7d6C4a5125ba2",
    dao: "0x9442563B721797b8057CaDEE2Da9550FA4405A8E",
    oracle: "0xBfE880E4F016e69ede4b6CF3728B7EAd043B1647"
};

// ABIs
const ABIS = {
    ctbToken: [
        "function balanceOf(address) view returns (uint256)",
        "function totalSupply() view returns (uint256)",
        "function transfer(address to, uint256 amount) returns (bool)",
        "function approve(address spender, uint256 amount) returns (bool)",
        "function allowance(address owner, address spender) view returns (uint256)",
	"function mint(address to, uint256 amount)"
    ],
    memberNFT: [
        "function hasMinted(address) view returns (bool)",
        "function mintNFT() payable",
        "function mintPrice() view returns (uint256)",
        "function totalSupply() view returns (uint256)",
	"function transferFrom(address from, address to, uint256 tokenId)",
	"function ownerOf(uint256 tokenId) view returns (address)",
	"function balanceOf(address owner) view returns (uint256)",
	"function getMemberLevel(uint256 tokenId) view returns (uint256)",
	"function upgradeMemberLevel(uint256 tokenId, uint256 newLevel)"
    ],
    staking: [
        "function getUserInfo(address) view returns (uint256, uint256, uint256)",
        "function stake(uint256 amount)",
	"function withdraw(uint256 amount)",
        "function claimReward()",
        "function totalStaked() view returns (uint256)"
    ],
    dao: [
        "function proposalCount() view returns (uint256)",
        "function getProposalDetails(uint256) view returns (string, address, uint256, uint256, uint256, uint256, uint256, bool, bool, address)",
        "function createProposal(string description, address target, bytes callData)",
        "function vote(uint256 proposalId, bool support)",
	"function setStakingContract(address _stakingContract)",
	"function stakingContract() view returns (address)"
    ]
};

const ORACLE_ABI = [
    "function getFormattedPrice() view returns (uint256)",
    "function latestPriceData() view returns (uint256, uint256, uint80)",
    "function updateStoredPrice()",
    "function isActive() view returns (bool)"
];

let provider, signer, contracts;
let currentAccount = null;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('connectWallet').addEventListener('click', connectWallet);
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab).classList.add('active');
            if (btn.dataset.tab === 'dashboard') loadDashboard();
            if (btn.dataset.tab === 'dao') loadProposals();
        });
    });
    
    document.getElementById('mintNFTBtn').addEventListener('click', mintNFT);
    document.getElementById('stakeBtn').addEventListener('click', stakeTokens);
    document.getElementById('claimBtn').addEventListener('click', claimRewards);
    document.getElementById('createProposalBtn').addEventListener('click', createProposal);
    document.getElementById('transferNFTBtn').addEventListener('click', transferNFT);
    document.getElementById('transferBtn').addEventListener('click', transferTokens);
    document.getElementById('mintBtn').addEventListener('click', mintTokens);
    document.getElementById('upgradeBtn').addEventListener('click', upgradeLevel);
    document.getElementById('withdrawBtn').addEventListener('click', withdrawTokens);
});

async function connectWallet() {
    if (typeof window.ethereum === 'undefined') {
        alert('Instale o MetaMask!');
        return;
    }
    
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        currentAccount = accounts[0];
        
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        
        contracts = {
            ctbToken: new ethers.Contract(CONTRACT_ADDRESSES.ctbToken, ABIS.ctbToken, signer),
            memberNFT: new ethers.Contract(CONTRACT_ADDRESSES.memberNFT, ABIS.memberNFT, signer),
            staking: new ethers.Contract(CONTRACT_ADDRESSES.staking, ABIS.staking, signer),
            dao: new ethers.Contract(CONTRACT_ADDRESSES.dao, ABIS.dao, signer),
            oracle: new ethers.Contract(CONTRACT_ADDRESSES.oracle, ORACLE_ABI, signer)
        };
        
        const network = await provider.getNetwork();
        if (network.chainId !== 11155111n) {
            alert('Mude para a rede Sepolia no MetaMask!');
            return;
        }
        
        document.getElementById('connectWallet').style.display = 'none';
        document.getElementById('walletInfo').style.display = 'block';
        document.getElementById('walletAddress').textContent = `${currentAccount.slice(0,6)}...${currentAccount.slice(-4)}`;
        document.getElementById('networkName').textContent = 'Sepolia ✅';
        
        await loadDashboard();
        await loadProposals();
        
        setInterval(() => {
            if (document.getElementById('dashboard').classList.contains('active')) loadDashboard();
            if (document.getElementById('dao').classList.contains('active')) loadProposals();
        }, 5000);
        
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar: ' + error.message);
    }
}

async function loadDashboard() {
    if (!contracts || !currentAccount) return;
    
    try {
        const totalSupply = await contracts.ctbToken.totalSupply();
        const totalStaked = await contracts.staking.totalStaked();
        const proposalCount = await contracts.dao.proposalCount();
        
        let totalNFTs = "0";
        try {
            totalNFTs = await contracts.memberNFT.totalSupply();
        } catch(e) { totalNFTs = "N/A"; }
        
        document.getElementById('totalSupply').textContent = parseFloat(ethers.formatEther(totalSupply)).toFixed(2);
        document.getElementById('totalStaked').textContent = parseFloat(ethers.formatEther(totalStaked)).toFixed(2);
        document.getElementById('totalProposals').textContent = proposalCount.toString();
        document.getElementById('totalNFTs').textContent = totalNFTs.toString();
        
        const balance = await contracts.ctbToken.balanceOf(currentAccount);
        const nftBalance = await contracts.memberNFT.balanceOf(currentAccount);
	const hasNFT = nftBalance > 0;
        const stakingInfo = await contracts.staking.getUserInfo(currentAccount);
        
        document.getElementById('userBalance').textContent = parseFloat(ethers.formatEther(balance)).toFixed(2);
        document.getElementById('userNFT').textContent = hasNFT ? `✅ Sim (${nftBalance.toString()} NFT)` : '❌ Não';
        document.getElementById('userStaked').textContent = parseFloat(ethers.formatEther(stakingInfo[0])).toFixed(2);
        document.getElementById('userRewards').textContent = parseFloat(ethers.formatEther(stakingInfo[1])).toFixed(2);
        
        const mintPrice = await contracts.memberNFT.mintPrice();
        document.getElementById('mintPrice').textContent = ethers.formatEther(mintPrice);
	
	// Carregar analytics do backend
	
	await loadAllAnalytics();
        
        // ========== ORÁCULO - PREÇO DO CTB ==========
        if (contracts.oracle) {
            try {
                const price = await contracts.oracle.getFormattedPrice();
                const priceInUSD = parseFloat(ethers.formatEther(price)).toFixed(2);
                document.getElementById('ctbPrice').textContent = `$${priceInUSD}`;
                
                const latestData = await contracts.oracle.latestPriceData();
                const timestamp = Number(latestData[1]);
                if (timestamp > 0) {
                    document.getElementById('priceUpdate').textContent = new Date(timestamp * 1000).toLocaleString();
                }
            } catch (error) {
                console.error('Erro no oráculo:', error);
                document.getElementById('ctbPrice').textContent = '--';
                document.getElementById('priceUpdate').textContent = 'Erro';
            }
        }
        // ========== FIM ORÁCULO ==========
        
    } catch (error) {
        console.error('Erro no dashboard:', error);
    }
}

// Functions

async function transferTokens() {
    const to = document.getElementById('transferTo').value;
    const amount = document.getElementById('transferAmount').value;
    
    if (!to || !amount) {
        alert('Preencha todos os campos');
        return;
    }
    
    try {
        console.log(`🔄 Transferindo ${amount} CTB para ${to}...`);
        const tx = await contracts.ctbToken.transfer(to, ethers.parseEther(amount));
        await tx.wait();
        alert('✅ Transferência realizada com sucesso!');
        await loadDashboard();
        
        // Limpar campos
        document.getElementById('transferTo').value = '';
        document.getElementById('transferAmount').value = '';
        
    } catch (error) {
        console.error('Erro:', error);
        alert('❌ Erro na transferência: ' + error.message);
    }
}

async function mintTokens() {
    const to = document.getElementById('mintTo').value;
    const amount = document.getElementById('mintAmount').value;
    
    if (!to || !amount) {
        alert('Preencha todos os campos');
        return;
    }
    
    try {
        console.log(`🪙 Mintando ${amount} CTB para ${to}...`);
        const tx = await contracts.ctbToken.mint(to, ethers.parseEther(amount));
        await tx.wait();
        alert('✅ Tokens mintados com sucesso!');
        await loadDashboard();
        
        // Limpar campos
        document.getElementById('mintTo').value = '';
        document.getElementById('mintAmount').value = '';
        
    } catch (error) {
        console.error('Erro:', error);
        alert('❌ Erro ao mintar: ' + error.message);
    }
}

async function mintNFT() {
    try {
        const mintPrice = await contracts.memberNFT.mintPrice();
        const tx = await contracts.memberNFT.mintNFT({ value: mintPrice });
        await tx.wait();
        alert('NFT mintado com sucesso!');
        await loadDashboard();
    } catch (error) {
        alert('Erro: ' + error.message);
    }
}

async function upgradeLevel() {
    const tokenId = document.getElementById('tokenId').value;
    const newLevel = document.getElementById('newLevel').value;
    
    if (!tokenId) {
        alert('Digite o Token ID');
        return;
    }
    
    try {
        // Verificar se você é o dono do NFT
        const owner = await contracts.memberNFT.ownerOf(tokenId);
        if (owner.toLowerCase() !== currentAccount.toLowerCase()) {
            alert('Você não é o dono deste NFT!');
            return;
        }
        
        // Verificar nível atual
        const currentLevel = await contracts.memberNFT.getMemberLevel(tokenId);
        if (newLevel <= currentLevel) {
            alert('O novo nível deve ser maior que o atual!');
            return;
        }
        
        console.log(`⬆️ Upgradendo NFT #${tokenId} do nível ${currentLevel} para ${newLevel}...`);
        
        const tx = await contracts.memberNFT.upgradeMemberLevel(tokenId, newLevel);
        await tx.wait();
        
        alert(`✅ NFT #${tokenId} atualizado para nível ${newLevel}!`);
        
        // Limpar campos
        document.getElementById('tokenId').value = '';
        
        // Recarregar dashboard
        await loadDashboard();
        
    } catch (error) {
        console.error('Erro:', error);
        alert('❌ Erro no upgrade: ' + error.message);
    }
}

async function transferNFT() {
    const tokenId = document.getElementById('transferTokenId').value;
    const toAddress = document.getElementById('transferToAddress').value;
    
    if (!tokenId || !toAddress) {
        alert('Preencha todos os campos');
        return;
    }
    
    try {
        // Verificar se o usuário é o dono do NFT
        const owner = await contracts.memberNFT.ownerOf(tokenId);
        if (owner.toLowerCase() !== currentAccount.toLowerCase()) {
            alert('Você não é o dono deste NFT!');
            return;
        }
        
        // Verificar se o endereço destino é válido
        if (!ethers.isAddress(toAddress)) {
            alert('Endereço inválido!');
            return;
        }
        
        console.log(`🔄 Transferindo NFT #${tokenId} para ${toAddress}...`);
        
        const tx = await contracts.memberNFT.transferFrom(currentAccount, toAddress, tokenId);
        await tx.wait();
        
        alert(`✅ NFT #${tokenId} transferido com sucesso!`);
        
        // Limpar campos
        document.getElementById('transferTokenId').value = '';
        document.getElementById('transferToAddress').value = '';
        
        // Recarregar dados
        await loadDashboard();
        
    } catch (error) {
        console.error('Erro na transferência:', error);
        alert('Erro ao transferir NFT: ' + error.message);
    }
}

async function stakeTokens() {
    const amount = document.getElementById('stakeAmount').value;
    if (!amount) { alert('Digite uma quantidade'); return; }
    
    try {
        const amountWei = ethers.parseEther(amount);
        
        const approveTx = await contracts.ctbToken.approve(CONTRACT_ADDRESSES.staking, amountWei);
        await approveTx.wait();
        
        const stakeTx = await contracts.staking.stake(amountWei);
        await stakeTx.wait();
        
        alert('Stake realizado!');
        await loadDashboard();
    } catch (error) {
        alert('Erro: ' + error.message);
    }
}

async function withdrawTokens() {
    const amount = document.getElementById('withdrawAmount').value;
    
    if (!amount || amount <= 0) {
        alert('Digite uma quantidade válida');
        return;
    }
    
    try {
        const amountWei = ethers.parseEther(amount);
        
        // Verificar se tem stake suficiente
        const stakingInfo = await contracts.staking.getUserInfo(currentAccount);
        const stakedAmount = stakingInfo[0];
        
        if (stakedAmount < amountWei) {
            alert(`Você só tem ${ethers.formatEther(stakedAmount)} CTB em stake`);
            return;
        }
        
        console.log(`🔓 Retirando ${amount} CTB do stake...`);
        
        const tx = await contracts.staking.withdraw(amountWei);
        await tx.wait();
        
        alert(`✅ ${amount} CTB retirados do stake com sucesso!`);
        
        // Limpar campo
        document.getElementById('withdrawAmount').value = '';
        
        // Recarregar dashboard
        await loadDashboard();
        
    } catch (error) {
        console.error('Erro:', error);
        alert('❌ Erro na retirada: ' + error.message);
    }
}

async function claimRewards() {
    try {
        const tx = await contracts.staking.claimReward();
        await tx.wait();
        alert('Recompensas recebidas!');
        await loadDashboard();
    } catch (error) {
        alert('Erro: ' + error.message);
    }
}

async function createProposal() {
    const description = document.getElementById('proposalDesc').value;
    const target = document.getElementById('proposalTarget').value;
    
    if (!description || !target) {
        alert('Preencha todos os campos');
        return;
    }
    
    try {
        const tx = await contracts.dao.createProposal(description, target, "0x");
        await tx.wait();
        alert('Proposta criada!');
        await loadProposals();
    } catch (error) {
        alert('Erro: ' + error.message);
    }
}

async function loadProposals() {
    if (!contracts) return;
    
    try {
        const count = await contracts.dao.proposalCount();
        const container = document.getElementById('proposals');
        container.innerHTML = '';
        
        const now = Math.floor(Date.now() / 1000);
        
        for (let i = 0; i < count; i++) {
            const p = await contracts.dao.getProposalDetails(i);
            
            const startTime = Number(p[2]);
            const endTime = Number(p[3]);
            
            let statusText = "";
            let statusColor = "";
            let disableButtons = false;
            
            if (now < startTime) {
                const waitMinutes = Math.ceil((startTime - now) / 60);
                statusText = `⏳ Votação começa em ${waitMinutes} minutos`;
                statusColor = "#ed8936";
                disableButtons = true;
            } else if (now > endTime) {
                statusText = `🔒 Votação encerrada`;
                statusColor = "#e53e3e";
                disableButtons = true;
            } else {
                statusText = `✅ Votação ativa`;
                statusColor = "#48bb78";
                disableButtons = false;
            }
            
            const div = document.createElement('div');
            div.className = 'proposal-card';
            div.innerHTML = `
                <h4>Proposta #${i}</h4>
                <p><strong>Descrição:</strong> ${p[0]}</p>
                <p><strong>Proposer:</strong> ${p[1].slice(0,6)}...${p[1].slice(-4)}</p>
                <p><strong>Votos a favor:</strong> ${ethers.formatEther(p[4])}</p>
                <p><strong>Votos contra:</strong> ${ethers.formatEther(p[5])}</p>
                <p><strong>Início:</strong> ${new Date(startTime * 1000).toLocaleString()}</p>
                <p><strong>Fim:</strong> ${new Date(endTime * 1000).toLocaleString()}</p>
                <p style="color: ${statusColor}; font-weight: bold;">${statusText}</p>
                <div class="vote-buttons">
                    <button onclick="voteProposal(${i}, true)" class="btn-success" ${disableButtons ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>👍 A Favor</button>
                    <button onclick="voteProposal(${i}, false)" class="btn-danger" ${disableButtons ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>👎 Contra</button>
                </div>
            `;
            container.appendChild(div);
        }
    } catch (error) {
        console.error(error);
    }
}

// ========== BACKEND ANALYTICS ==========

async function loadAnalytics() {
    try {
        // Buscar estatísticas do backend
        const statsRes = await fetch('http://localhost:3001/api/stats');
        const statsData = await statsRes.json();
        
        if (statsData.success) {
            document.getElementById('analyticsTotalStakes').textContent = statsData.data.totalStakes || 0;
            document.getElementById('analyticsUniqueStakers').textContent = statsData.data.totalStakers || 0;
            document.getElementById('analyticsTotalRewards').textContent = 
                parseFloat(statsData.data.totalRewardsDistributed || 0).toFixed(2);
            
            // Calcular média por staker
            const avg = statsData.data.totalStakers > 0 
                ? (statsData.data.totalStaked || 0) / statsData.data.totalStakers 
                : 0;
            document.getElementById('analyticsAvgStake').textContent = avg.toFixed(2);
        }
    } catch (error) {
        console.log('Backend analytics offline:', error.message);
        document.getElementById('analyticsTotalStakes').textContent = '--';
        document.getElementById('analyticsUniqueStakers').textContent = '--';
        document.getElementById('analyticsTotalRewards').textContent = '--';
        document.getElementById('analyticsAvgStake').textContent = '--';
    }
}

async function loadRanking() {
    try {
        const rankingRes = await fetch('http://localhost:3001/api/ranking/stakers');
        const rankingData = await rankingRes.json();
        
        const container = document.getElementById('rankingList');
        
        if (!rankingData.success || rankingData.data.length === 0) {
            container.innerHTML = '<p>Nenhum staker encontrado</p>';
            return;
        }
        
        container.innerHTML = '';
        
        for (const staker of rankingData.data) {
            const div = document.createElement('div');
            div.className = 'ranking-item';
            div.innerHTML = `
                <span class="rank-number">#${staker.rank}</span>
                <span class="rank-address">${staker.user.slice(0,6)}...${staker.user.slice(-4)}</span>
                <span class="rank-amount">${staker.totalStaked.toFixed(2)} CTB</span>
            `;
            container.appendChild(div);
        }
        
    } catch (error) {
        console.log('Ranking offline:', error.message);
        document.getElementById('rankingList').innerHTML = '<p>Ranking indisponível</p>';
    }
}

async function loadActivityFeed() {
    try {
        const feedRes = await fetch('http://localhost:3001/api/feed');
        const feedData = await feedRes.json();
        
        const container = document.getElementById('activityFeed');
        
        if (!feedData.success || feedData.data.length === 0) {
            container.innerHTML = '<p>Nenhuma atividade recente</p>';
            return;
        }
        
        container.innerHTML = '';
        
        for (const activity of feedData.data.slice(0, 20)) {
            const div = document.createElement('div');
            div.className = 'activity-item';
            
            let typeClass = '';
            let typeText = '';
            let detailText = '';
            
            switch (activity.type) {
                case 'stake':
                    typeClass = 'stake';
                    typeText = '🔒 STAKE';
                    detailText = `${activity.user.slice(0,6)}...${activity.user.slice(-4)} fez stake de ${parseFloat(activity.amount).toFixed(2)} CTB`;
                    break;
                case 'nft':
                    typeClass = 'nft';
                    typeText = '🖼️ NFT';
                    detailText = `${activity.user.slice(0,6)}...${activity.user.slice(-4)} mintou NFT #${activity.amount}`;
                    break;
                case 'reward':
                    typeClass = 'reward';
                    typeText = '💰 REWARD';
                    detailText = `${activity.user.slice(0,6)}...${activity.user.slice(-4)} recebeu ${parseFloat(activity.amount).toFixed(2)} CTB`;
                    break;
                default:
                    typeClass = 'stake';
                    typeText = '📝 ACTION';
                    detailText = `${activity.user.slice(0,6)}...${activity.user.slice(-4)} realizou uma ação`;
            }
            
            // Calcular tempo relativo
            const timestamp = activity.timestamp;
            const blockTime = Math.floor(Date.now() / 1000);
            const diffMinutes = Math.floor((blockTime - timestamp) / 60);
            let timeText = 'agora';
            if (diffMinutes > 0) {
                timeText = `há ${diffMinutes} min`;
            }
            if (diffMinutes > 60) {
                timeText = `há ${Math.floor(diffMinutes / 60)}h`;
            }
            
            div.innerHTML = `
                <span class="activity-type ${typeClass}">${typeText}</span>
                <span class="activity-detail">${detailText}</span>
                <span class="activity-time">${timeText}</span>
            `;
            container.appendChild(div);
        }
        
    } catch (error) {
        console.log('Activity feed offline:', error.message);
        document.getElementById('activityFeed').innerHTML = '<p>Feed indisponível</p>';
    }
}

// Função para carregar todos os analytics

async function loadAllAnalytics() {
    await loadAnalytics();
    await loadRanking();
    await loadActivityFeed();
}

window.voteProposal = async (id, support) => {
    try {
        const tx = await contracts.dao.vote(id, support);
        await tx.wait();
        alert('Voto registrado!');
        await loadProposals();
    } catch (error) {
        alert('Erro: ' + error.message);
    }
}

// Buscar dados do backend
async function loadBackendData() {
    try {
        const response = await fetch('http://localhost:3001/api/dashboard');
        const result = await response.json();
        if (result.success) {
            console.log('📊 Dados do backend:', result.data);
            // Atualizar frontend
            document.getElementById('backendTotalStakes').textContent = result.data.totalStakes;
            document.getElementById('backendTotalStakers').textContent = result.data.totalStakers;
        }
    } catch (error) {
        console.log('Backend offline:', error.message);
    }
};