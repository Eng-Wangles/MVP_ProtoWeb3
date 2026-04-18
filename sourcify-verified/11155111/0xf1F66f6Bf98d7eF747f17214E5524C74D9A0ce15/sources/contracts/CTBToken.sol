// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title CTBToken
 * @author Wangles Moreira Soares
 * @notice Token de utilidade e governança do protocolo
 */
contract CTBToken is ERC20, ERC20Burnable, Ownable {
    
    // Limites de segurança
    uint256 public constant MAX_SUPPLY = 100_000_000 * 10**18; // 100 milhões
    uint256 public constant MAX_MINT_AMOUNT = 1_000_000 * 10**18; // 1 milhão por transação
    
    // Eventos personalizados
    event TokensMinted(address indexed to, uint256 amount);
    event TokensBurned(address indexed from, uint256 amount);
    
    constructor() ERC20("ContributeToken", "CTB") Ownable(msg.sender) {
        // Mint inicial de 1 milhão de tokens para o deployer
        uint256 initialSupply = 1_000_000 * 10**18;
        _mint(msg.sender, initialSupply);
        emit TokensMinted(msg.sender, initialSupply);
    }
    
    /**
     * @dev Função de mint com controle de limite máximo
     * @param to Endereço que receberá os tokens
     * @param amount Quantidade de tokens a serem mintados
     */
    function mint(address to, uint256 amount) external onlyOwner {
        require(amount > 0, "CTBToken: amount must be greater than 0");
        require(amount <= MAX_MINT_AMOUNT, "CTBToken: exceeds max mint amount");
        require(totalSupply() + amount <= MAX_SUPPLY, "CTBToken: would exceed max supply");
        
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }
    
    /**
     * @dev Sobrescreve a função de transfer para adicionar validações
     */
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        require(to != address(0), "CTBToken: transfer to zero address");
        require(amount > 0, "CTBToken: transfer amount must be greater than 0");
        require(balanceOf(_msgSender()) >= amount, "CTBToken: insufficient balance");
        
        return super.transfer(to, amount);
    }
    
    /**
     * @dev Sobrescreve transferFrom com validações adicionais
     */
    function transferFrom(address from, address to, uint256 amount) public virtual override returns (bool) {
        require(to != address(0), "CTBToken: transfer to zero address");
        require(amount > 0, "CTBToken: transfer amount must be greater than 0");
        require(balanceOf(from) >= amount, "CTBToken: insufficient balance");
        
        return super.transferFrom(from, to, amount);
    }
}