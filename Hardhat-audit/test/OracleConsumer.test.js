const { expect } = require("chai");

describe("OracleConsumer", function () {
    let oracle;
    let owner;
    
    const SEPOLIA_ETH_USD_FEED = "0x694AA1769357215DE4FAC081bf1f309aDC325306";

    before(async function () {
        [owner] = await ethers.getSigners();
        
        const Oracle = await ethers.getContractFactory("OracleConsumer");
        oracle = await Oracle.deploy(SEPOLIA_ETH_USD_FEED);
        await oracle.deployed();
    });

    describe("Configuração", function () {
        it("Deve ter o price feed configurado", async function () {
            const feed = await oracle.getPriceFeedAddress();
            expect(feed.toLowerCase()).to.equal(SEPOLIA_ETH_USD_FEED.toLowerCase());
        });

        it("Deve ter o owner correto", async function () {
            expect(await oracle.owner()).to.equal(owner.address);
        });
    });

    describe("Preços", function () {
        it("Deve ter o contrato implantado", async function () {
            expect(oracle.address).to.be.properAddress;
        });
    });
});