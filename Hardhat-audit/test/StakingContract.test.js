const { expect } = require("chai");

describe("StakingContract", function () {
    let ctbToken, staking;
    let owner, user1, user2;

    beforeEach(async function () {
        [owner, user1, user2] = await ethers.getSigners();
        
        const CTBToken = await ethers.getContractFactory("CTBToken");
        ctbToken = await CTBToken.deploy();
        await ctbToken.deployed();
        
        const Staking = await ethers.getContractFactory("StakingContract");
        staking = await Staking.deploy(ctbToken.address, ctbToken.address);
        await staking.deployed();
        
        await ctbToken.transfer(staking.address, ethers.utils.parseEther("100000"));
        await ctbToken.mint(user1.address, ethers.utils.parseEther("10000"));
        await ctbToken.mint(user2.address, ethers.utils.parseEther("5000"));
    });

    describe("Stake", function () {
        it("Deve permitir stakear tokens", async function () {
            const amount = ethers.utils.parseEther("100");
            await ctbToken.connect(user1).approve(staking.address, amount);
            await staking.connect(user1).stake(amount);
            
            const info = await staking.getUserInfo(user1.address);
            expect(ethers.utils.formatEther(info[0])).to.equal("100.0");
        });

        it("Deve permitir stake acima do mínimo", async function () {
            const minStake = await staking.MIN_STAKE_AMOUNT();
            const amount = minStake;
            await ctbToken.connect(user1).approve(staking.address, amount);
            await staking.connect(user1).stake(amount);
            
            const info = await staking.getUserInfo(user1.address);
            expect(ethers.utils.formatEther(info[0])).to.equal(ethers.utils.formatEther(amount));
        });

        it("Não deve permitir stake acima do máximo", async function () {
            const amount = ethers.utils.parseEther("2000000");
            await ctbToken.connect(user1).approve(staking.address, amount);
            await expect(
                staking.connect(user1).stake(amount)
            ).to.be.revertedWith("Staking: amount above maximum");
        });
    });

    describe("Withdraw", function () {
        beforeEach(async function () {
            const amount = ethers.utils.parseEther("500");
            await ctbToken.connect(user1).approve(staking.address, amount);
            await staking.connect(user1).stake(amount);
        });

        it("Deve permitir retirar stake", async function () {
            const withdrawAmount = ethers.utils.parseEther("200");
            await staking.connect(user1).withdraw(withdrawAmount);
            
            const info = await staking.getUserInfo(user1.address);
            expect(ethers.utils.formatEther(info[0])).to.equal("300.0");
        });

        it("Não deve permitir retirar mais do que tem em stake", async function () {
            const withdrawAmount = ethers.utils.parseEther("1000");
            await expect(
                staking.connect(user1).withdraw(withdrawAmount)
            ).to.be.revertedWith("Staking: insufficient staked balance");
        });
    });

    describe("ClaimRewards", function () {
        beforeEach(async function () {
            const amount = ethers.utils.parseEther("1000");
            await ctbToken.connect(user1).approve(staking.address, amount);
            await staking.connect(user1).stake(amount);
            
            await ethers.provider.send("evm_increaseTime", [60]);
            await ethers.provider.send("evm_mine");
        });

        it("Deve acumular recompensas com o tempo", async function () {
            const info = await staking.getUserInfo(user1.address);
            expect(ethers.utils.formatEther(info[1])).to.not.equal("0.0");
        });

        it("Deve permitir reivindicar recompensas", async function () {
            const beforeBalance = await ctbToken.balanceOf(user1.address);
            await staking.connect(user1).claimReward();
            const afterBalance = await ctbToken.balanceOf(user1.address);
            expect(afterBalance).to.be.gt(beforeBalance);
        });
    });

    describe("TotalStaked", function () {
        it("Deve calcular o total staked corretamente", async function () {
            const amount1 = ethers.utils.parseEther("100");
            const amount2 = ethers.utils.parseEther("200");
            
            await ctbToken.connect(user1).approve(staking.address, amount1);
            await staking.connect(user1).stake(amount1);
            
            await ctbToken.connect(user2).approve(staking.address, amount2);
            await staking.connect(user2).stake(amount2);
            
            const total = await staking.totalStaked();
            expect(ethers.utils.formatEther(total)).to.equal("300.0");
        });
    });
});