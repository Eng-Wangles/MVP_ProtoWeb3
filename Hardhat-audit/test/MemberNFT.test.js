const { expect } = require("chai");

describe("MemberNFT", function () {
    let memberNFT;
    let owner;

    before(async function () {
        [owner] = await ethers.getSigners();
        const MemberNFT = await ethers.getContractFactory("MemberNFT");
        memberNFT = await MemberNFT.deploy();
        await memberNFT.deployed();  // ← mudou de waitForDeployment para deployed
    });

    it("Deve ter o nome correto", async function () {
        expect(await memberNFT.name()).to.equal("MemberNFT");
    });

    it("Deve ter o símbolo correto", async function () {
        expect(await memberNFT.symbol()).to.equal("MBRNFT");
    });

    it("Deve ter preço de mint definido", async function () {
        const price = await memberNFT.mintPrice();
        expect(ethers.utils.formatEther(price)).to.equal("0.01");
    });
});