const { expect } = require("chai");

describe("CTBToken", function () {
    let ctbToken;
    let owner, addr1;

    before(async function () {
        [owner, addr1] = await ethers.getSigners();
        const CTBToken = await ethers.getContractFactory("CTBToken");
        ctbToken = await CTBToken.deploy();
        await ctbToken.deployed();  // ← mudou de waitForDeployment para deployed
    });

    it("Deve ter o nome correto", async function () {
        expect(await ctbToken.name()).to.equal("ContributeToken");
    });

    it("Deve ter o símbolo correto", async function () {
        expect(await ctbToken.symbol()).to.equal("CTB");
    });

    it("Deve ter 1 milhão de tokens iniciais", async function () {
        const balance = await ctbToken.balanceOf(owner.address);
        expect(ethers.utils.formatEther(balance)).to.equal("1000000.0");
    });

    it("Deve permitir transferência", async function () {
        await ctbToken.transfer(addr1.address, ethers.utils.parseEther("100"));
        const balance = await ctbToken.balanceOf(addr1.address);
        expect(ethers.utils.formatEther(balance)).to.equal("100.0");
    });
});