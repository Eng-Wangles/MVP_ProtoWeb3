// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title OracleConsumer
 * @author Protocolo Descentralizado MVP
 * @notice Consulta preços em tempo real via Chainlink
 */
contract OracleConsumer is Ownable {
    
    AggregatorV3Interface internal priceFeed;
    
    // Dados armazenados
    struct PriceData {
        uint256 price;
        uint256 timestamp;
        uint80 roundId;
    }
    
    PriceData public latestPriceData;
    
    // Mapeamento para histórico (últimos 100 preços)
    mapping(uint256 => uint256) public priceHistory;
    uint256 public historyIndex;
    
    // Eventos
    event PriceUpdated(uint256 indexed roundId, uint256 price, uint256 timestamp);
    event PriceFeedChanged(address indexed newFeed);
    
    /**
     * @param _priceFeed Endereço do Chainlink Price Feed na Sepolia
     * ETH/USD: 0x694AA1769357215DE4FAC081bf1f309aDC325306
     */
    constructor(address _priceFeed) Ownable(msg.sender) {
        require(_priceFeed != address(0), "Oracle: invalid price feed");
        priceFeed = AggregatorV3Interface(_priceFeed);
    }
    
    /**
     * @dev Obtém o preço mais recente diretamente do Chainlink
     * @return price Preço atual (8 decimais)
     * @return decimals Número de decimais
     * @return updatedAt Timestamp da última atualização
     */
    function getLatestPrice() public view returns (uint256 price, uint8 decimals, uint256 updatedAt) {
        (uint80 roundId, int256 answer, , uint256 lastUpdated, ) = priceFeed.latestRoundData();
        require(answer > 0, "Oracle: invalid price");
        
        // Usar as variáveis para eliminar warnings
        roundId;
        lastUpdated;
        
        price = uint256(answer);
        decimals = priceFeed.decimals();
        updatedAt = lastUpdated;
        
        return (price, decimals, updatedAt);
    }
    
    /**
     * @dev Obtém o preço formatado com 18 decimais (padrão Ethereum)
     * @return price Preço com 18 decimais
     */
    function getFormattedPrice() public view returns (uint256) {
        (uint256 price, uint8 decimals, ) = getLatestPrice();
        // Converte para 18 decimais
        return price * (10 ** (18 - decimals));
    }
    
    /**
     * @dev Atualiza e armazena o preço mais recente (pode ser chamado por qualquer um)
     */
    function updateStoredPrice() external {
        (uint80 roundId, int256 answer, , uint256 updatedAt, ) = priceFeed.latestRoundData();
        require(answer > 0, "Oracle: invalid price");
        
        latestPriceData = PriceData({
            price: uint256(answer),
            timestamp: updatedAt,
            roundId: roundId
        });
        
        // Armazena no histórico (mantém últimos 100)
        priceHistory[historyIndex % 100] = uint256(answer);
        historyIndex++;
        
        emit PriceUpdated(roundId, uint256(answer), updatedAt);
    }
    
    /**
     * @dev Converte um valor em CTB para USD
     * @param ctbAmount Quantidade em CTB (18 decimais)
     * @return usdValue Valor em USD (com 18 decimais)
     */
    function convertCTBtoUSD(uint256 ctbAmount) external view returns (uint256) {
        (uint256 price, uint8 decimals, ) = getLatestPrice();
        // CTB tem 18 decimais, Chainlink tem 8 decimais
        // Ajusta para 18 decimais
        uint256 adjustedPrice = price * (10 ** (18 - decimals));
        return (ctbAmount * adjustedPrice) / 1e18;
    }
    
    /**
     * @dev Converte USD para CTB
     * @param usdAmount Valor em USD (18 decimais)
     * @return ctbAmount Quantidade em CTB (18 decimais)
     */
    function convertUSDtoCTB(uint256 usdAmount) external view returns (uint256) {
        (uint256 price, uint8 decimals, ) = getLatestPrice();
        uint256 adjustedPrice = price * (10 ** (18 - decimals));
        return (usdAmount * 1e18) / adjustedPrice;
    }
    
    /**
     * @dev Obtém o preço de um round específico (se disponível)
     * @param roundId ID do round
     */
    function getPriceByRoundId(uint80 roundId) external view returns (uint256) {
        (, int256 answer, , , ) = priceFeed.getRoundData(roundId);
        require(answer > 0, "Oracle: round not found");
        return uint256(answer);
    }
    
    /**
     * @dev Altera o feed de preços (apenas owner)
     * @param _newPriceFeed Novo endereço do Chainlink feed
     */
    function setPriceFeed(address _newPriceFeed) external onlyOwner {
        require(_newPriceFeed != address(0), "Oracle: invalid address");
        priceFeed = AggregatorV3Interface(_newPriceFeed);
        emit PriceFeedChanged(_newPriceFeed);
    }
    
    /**
     * @dev Retorna o endereço atual do price feed
     */
    function getPriceFeedAddress() external view returns (address) {
        return address(priceFeed);
    }
    
    /**
     * @dev Verifica se o contrato está ativo e respondendo
     */
    function isActive() external view returns (bool) {
        try this.getLatestPrice() returns (uint256, uint8, uint256) {
            return true;
        } catch {
            return false;
        }
    }
}