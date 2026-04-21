const { expect } = require("chai");

describe("DAOSimple", function () {
    let ctbToken, dao, staking;
    let owner, user1, user2;

    beforeEach(async function () {
        [owner, user1, user2] = await ethers.getSigners();
        
        const CTBToken = await ethers.getContractFactory("CTBToken");
        ctbToken = await CTBToken.deploy();
        await ctbToken.deployed();
        
        const Staking = await ethers.getContractFactory("StakingContract");
        staking = await Staking.deploy(ctbToken.address, ctbToken.address);
        await staking.deployed();
        
        const DAO = await ethers.getContractFactory("DAOSimple");
        dao = await DAO.deploy(ctbToken.address);
        await dao.deployed();
        
        // Configurar o staking contract no DAO
        await dao.setStakingContract(staking.address);
        
        // Transferir tokens de recompensa para o staking
        await ctbToken.transfer(staking.address, ethers.utils.parseEther("100000"));
        
        // Mintar tokens para os usuários
        await ctbToken.mint(user1.address, ethers.utils.parseEther("10000"));
        await ctbToken.mint(user2.address, ethers.utils.parseEther("5000"));
        
        // Fazer stake para os usuários (para ter peso de voto)
        const stakeAmount = ethers.utils.parseEther("1000");
        await ctbToken.connect(user1).approve(staking.address, stakeAmount);
        await staking.connect(user1).stake(stakeAmount);
        
        await ctbToken.connect(user2).approve(staking.address, stakeAmount);
        await staking.connect(user2).stake(stakeAmount);
    });

    describe("Propostas", function () {
        it("Deve criar uma nova proposta", async function () {
            const description = "Aumentar recompensa de staking";
            const target = owner.address;
            const callData = "0x";
            
            await dao.connect(user1).createProposal(description, target, callData);
            
            const count = await dao.proposalCount();
            expect(count).to.equal(1);
        });

        it("Deve armazenar os detalhes da proposta corretamente", async function () {
            const description = "Teste de proposta";
            const target = owner.address;
            const callData = "0x";
            
            await dao.connect(user1).createProposal(description, target, callData);
            
            const proposal = await dao.getProposalDetails(0);
            expect(proposal[0]).to.equal(description);
            expect(proposal[1]).to.equal(user1.address);
        });
    });

    describe("Votação", function () {
        beforeEach(async function () {
            const description = "Proposta para votação";
            const target = owner.address;
            const callData = "0x";
            await dao.connect(user1).createProposal(description, target, callData);
            
            await ethers.provider.send("evm_increaseTime", [15]);
            await ethers.provider.send("evm_mine");
        });

        it("Deve permitir votar a favor", async function () {
            await dao.connect(user1).vote(0, true);
            const proposal = await dao.getProposalDetails(0);
            expect(ethers.utils.formatEther(proposal[4])).to.equal("1000.0");
        });

        it("Deve permitir votar contra", async function () {
            await dao.connect(user2).vote(0, false);
            const proposal = await dao.getProposalDetails(0);
            expect(ethers.utils.formatEther(proposal[5])).to.equal("1000.0");
        });

        it("Não deve permitir votar duas vezes", async function () {
            await dao.connect(user1).vote(0, true);
            await expect(
                dao.connect(user1).vote(0, true)
            ).to.be.revertedWith("DAO: already voted");
        });
        
        it("Deve calcular o poder de voto baseado no stake", async function () {
            const votingPower = await dao.getVotingPower(user1.address);
            expect(ethers.utils.formatEther(votingPower)).to.equal("1000.0");
        });
    });
});