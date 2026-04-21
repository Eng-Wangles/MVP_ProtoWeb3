// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title MemberNFT
 * @author Wangles Moreira Soares
 * @notice NFT que representa membros ativos do protocolo
 */
contract MemberNFT is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable, ReentrancyGuard {
    using Strings for uint256;
    
    // Limites e configurações
    uint256 private _nextTokenId;
    uint256 public constant MAX_SUPPLY = 10000;
    uint256 public mintPrice = 0.01 ether;
    bool public publicMintEnabled = true;
    
    // Mapeamentos adicionais
    mapping(address => bool) public hasMinted;
    mapping(uint256 => uint256) public memberLevel;
    mapping(address => uint256[]) public userTokens;
    
    // Eventos
    event NFTMinted(address indexed to, uint256 indexed tokenId, uint256 level);
    event MemberLevelUpgraded(uint256 indexed tokenId, uint256 newLevel);
    event MintPriceUpdated(uint256 newPrice);
    event PublicMintToggled(bool enabled);
    
    constructor() ERC721("MemberNFT", "MBRNFT") Ownable(msg.sender) {}
    
    /**
     * @dev Verifica se um token existe (função auxiliar)
     * @param tokenId ID do token a ser verificado
     */
    function _exists(uint256 tokenId) internal view returns (bool) {
        return _ownerOf(tokenId) != address(0);
    }
    
    function _baseURI() internal pure override returns (string memory) {
        return "https://api.protocolo.com/nft/";
    }
    
    /**
     * @dev Função segura para enviar ETH usando call
     * @param to Endereço do destinatário
     * @param amount Quantidade em wei
     */
    function _sendETH(address to, uint256 amount) internal {
        (bool success, ) = to.call{value: amount}("");
        require(success, "MemberNFT: ETH transfer failed");
    }
    
    /**
     * @dev Função pública para mint de NFT pagando em ETH
     */
    function mintNFT() external payable nonReentrant {
        require(publicMintEnabled, "MemberNFT: public mint disabled");
        require(!hasMinted[msg.sender], "MemberNFT: address already minted");
        require(_nextTokenId < MAX_SUPPLY, "MemberNFT: max supply reached");
        require(msg.value >= mintPrice, "MemberNFT: insufficient payment");
        
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        
        memberLevel[tokenId] = 1;
        hasMinted[msg.sender] = true;
        userTokens[msg.sender].push(tokenId);
        
        string memory uri = string(abi.encodePacked(_baseURI(), tokenId.toString(), ".json"));
        _setTokenURI(tokenId, uri);
        
        emit NFTMinted(msg.sender, tokenId, 1);
        
        // Devolve troco se houver (usando call em vez de transfer)
        if (msg.value > mintPrice) {
            _sendETH(msg.sender, msg.value - mintPrice);
        }
    }
    
    /**
     * @dev Mint gratuito (apenas owner)
     * @param to Endereço que receberá o NFT
     */
    function mintFree(address to) external onlyOwner nonReentrant {
        require(_nextTokenId < MAX_SUPPLY, "MemberNFT: max supply reached");
        
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        memberLevel[tokenId] = 1;
        hasMinted[to] = true;
        userTokens[to].push(tokenId);
        
        string memory uri = string(abi.encodePacked(_baseURI(), tokenId.toString(), ".json"));
        _setTokenURI(tokenId, uri);
        
        emit NFTMinted(to, tokenId, 1);
    }
    
    /**
     * @dev Atualiza nível do membro
     * @param tokenId ID do token
     * @param newLevel Novo nível (1-3)
     */
    function upgradeMemberLevel(uint256 tokenId, uint256 newLevel) external nonReentrant {
        require(ownerOf(tokenId) == msg.sender || owner() == msg.sender, "MemberNFT: not owner");
        require(newLevel >= 1 && newLevel <= 3, "MemberNFT: invalid level");
        require(newLevel > memberLevel[tokenId], "MemberNFT: new level must be higher");
        
        memberLevel[tokenId] = newLevel;
        emit MemberLevelUpgraded(tokenId, newLevel);
    }
    
    /**
     * @dev Queima um NFT
     * @param tokenId ID do token a ser queimado
     */
    function burnNFT(uint256 tokenId) external nonReentrant {
        require(ownerOf(tokenId) == msg.sender, "MemberNFT: not owner");
        
        // Remove do mapeamento userTokens antes de queimar
        address owner = msg.sender;
        uint256[] storage tokens = userTokens[owner];
        for (uint256 i = 0; i < tokens.length; i++) {
            if (tokens[i] == tokenId) {
                tokens[i] = tokens[tokens.length - 1];
                tokens.pop();
                break;
            }
        }
        
        _burn(tokenId);
    }
    
    /**
     * @dev Retorna todos os tokens de um usuário
     * @param user Endereço do usuário
     */
    function getTokensByUser(address user) external view returns (uint256[] memory) {
        return userTokens[user];
    }
    
    /**
     * @dev Retorna o nível de um membro
     * @param tokenId ID do token
     */
    function getMemberLevel(uint256 tokenId) external view returns (uint256) {
        require(_exists(tokenId), "MemberNFT: token does not exist");
        return memberLevel[tokenId];
    }
    
    /**
     * @dev Verifica se um token existe (pública)
     * @param tokenId ID do token
     */
    function tokenExists(uint256 tokenId) external view returns (bool) {
        return _exists(tokenId);
    }
    
    /**
     * @dev Altera preço do mint (apenas owner)
     * @param _newPrice Novo preço em wei
     */
    function setMintPrice(uint256 _newPrice) external onlyOwner {
        mintPrice = _newPrice;
        emit MintPriceUpdated(_newPrice);
    }
    
    /**
     * @dev Ativa/desativa mint público
     * @param enabled Estado do mint público
     */
    function togglePublicMint(bool enabled) external onlyOwner {
        publicMintEnabled = enabled;
        emit PublicMintToggled(enabled);
    }
    
    /**
     * @dev Retira fundos do contrato (apenas owner)
     */
    function withdraw() external onlyOwner nonReentrant {
        uint256 balance = address(this).balance;
        require(balance > 0, "MemberNFT: no funds to withdraw");
        _sendETH(owner(), balance);
    }
    
    // ========== FUNÇÕES SOBRESCRITAS OBRIGATÓRIAS ==========
    
    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }
    
    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }
    
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}