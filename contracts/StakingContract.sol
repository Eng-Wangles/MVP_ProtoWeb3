// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "./OracleConsumer.sol";

/**
 * @title StakingContract
 * @author Wangles Moreira Soares
 * @notice Contrato para staking do token CTB com recompensas
 */
contract StakingContract is Ownable, ReentrancyGuard, Pausable {
    
    IERC20 public stakingToken;
    IERC20 public rewardToken;
    
    uint256 public rewardRate;
    uint256 public lastUpdateTime;
    uint256 public rewardPerTokenStored;
    uint256 public totalStaked;
    
    uint256 public constant MIN_STAKE_AMOUNT = 1 * 10**18;
    uint256 public constant MAX_STAKE_AMOUNT = 1_000_000 * 10**18;
    uint256 public constant MAX_REWARD_RATE = 100 * 10**18;

    // Oracle
    OracleConsumer public oracle;
           uint256 public rewardMultiplier = 1e18;
              bool public useOracle = false;
    
    struct UserInfo {
        uint256 amount;
        uint256 rewardPerTokenPaid;
        uint256 rewards;
        uint256 lastStakeTime;
    }
    
    mapping(address => UserInfo) public userInfo;
    
    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);
    event RewardRateUpdated(uint256 newRate);
    event OracleSet(address indexed oracle);
    event RewardMultiplierUpdated(uint256 newMultiplier);
    event UseOracleToggled(bool enabled);
    
    constructor(address _stakingToken, address _rewardToken) Ownable(msg.sender) {
        require(_stakingToken != address(0), "Staking: invalid staking token");
        require(_rewardToken != address(0), "Staking: invalid reward token");
        
        stakingToken = IERC20(_stakingToken);
        rewardToken = IERC20(_rewardToken);
        rewardRate = 1 * 10**18;
    }
    
    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;
        
        if (account != address(0)) {
            UserInfo storage user = userInfo[account];
            user.rewards = earned(account);
            user.rewardPerTokenPaid = rewardPerTokenStored;
        }
        _;
    }
    
    function rewardPerToken() public view returns (uint256) {
        if (totalStaked == 0) {
            return rewardPerTokenStored;
        }
        return rewardPerTokenStored + ((block.timestamp - lastUpdateTime) * rewardRate * 1e18 / totalStaked);
    }
    
    /**
    * @dev Calcula recompensa acumulada de um usuário
    * @param account Endereço do usuário
    */
    function earned(address account) public view returns (uint256) {
        UserInfo storage user = userInfo[account];
        uint256 baseReward = ((user.amount * (rewardPerToken() - user.rewardPerTokenPaid)) / 1e18) + user.rewards;
        
        // Se o oráculo estiver ativado, ajusta a recompensa baseada no preço
        if (useOracle && address(oracle) != address(0)) {
            try oracle.getFormattedPrice() returns (uint256 price) {
                // Previne divisão por zero
                if (price == 0) {
                    return baseReward;
                }
                // Quanto maior o preço do CTB, menor a recompensa emitida
                // Isso mantém o valor das recompensas estável em USD
                uint256 adjustedReward = (baseReward * rewardMultiplier) / price;
                return adjustedReward;
            } catch {
                // Se o oráculo falhar, usa recompensa base
                return baseReward;
            }
        }
        
        return baseReward;
    }
    
    function stake(uint256 amount) external nonReentrant whenNotPaused updateReward(msg.sender) {
        require(amount >= MIN_STAKE_AMOUNT, "Staking: amount below minimum");
        require(amount <= MAX_STAKE_AMOUNT, "Staking: amount above maximum");
        require(stakingToken.balanceOf(msg.sender) >= amount, "Staking: insufficient balance");
        
        UserInfo storage user = userInfo[msg.sender];
        require(stakingToken.transferFrom(msg.sender, address(this), amount), "Staking: transfer failed");
        
        user.amount += amount;
        user.lastStakeTime = block.timestamp;
        totalStaked += amount;
        
        emit Staked(msg.sender, amount);
    }
    
    function withdraw(uint256 amount) external nonReentrant updateReward(msg.sender) {
        UserInfo storage user = userInfo[msg.sender];
        require(amount > 0, "Staking: amount must be greater than 0");
        require(user.amount >= amount, "Staking: insufficient staked balance");
        
        user.amount -= amount;
        totalStaked -= amount;
        require(stakingToken.transfer(msg.sender, amount), "Staking: transfer failed");
        
        emit Withdrawn(msg.sender, amount);
    }
    
    function claimReward() external nonReentrant updateReward(msg.sender) {
        UserInfo storage user = userInfo[msg.sender];
        uint256 reward = user.rewards;
        
        require(reward > 0, "Staking: no rewards to claim");
        require(rewardToken.balanceOf(address(this)) >= reward, "Staking: insufficient reward balance");
        
        user.rewards = 0;
        require(rewardToken.transfer(msg.sender, reward), "Staking: reward transfer failed");
        
        emit RewardPaid(msg.sender, reward);
    }
    
    function getUserInfo(address user) external view returns (
        uint256 stakedAmount,
        uint256 pendingRewards,
        uint256 lastStakeTime
    ) {
        UserInfo storage userData = userInfo[user];
        return (
            userData.amount,
            earned(user),
            userData.lastStakeTime
        );
    }
    
    function getStats() external view returns (
        uint256 totalStakedAmount,
        uint256 currentRewardRate,
        uint256 rewardPerTokenValue
    ) {
        return (
            totalStaked,
            rewardRate,
            rewardPerToken()
        );
    }
    
    function setRewardRate(uint256 _rewardRate) external onlyOwner {
        require(_rewardRate <= MAX_REWARD_RATE, "Staking: rate exceeds maximum");
        
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;
        rewardRate = _rewardRate;
        
        emit RewardRateUpdated(_rewardRate);
    }
    
    function addRewardTokens(uint256 amount) external onlyOwner nonReentrant {
        require(amount > 0, "Staking: amount must be greater than 0");
        require(rewardToken.transferFrom(msg.sender, address(this), amount), "Staking: transfer failed");
    }
    
    function withdrawRewardTokens(uint256 amount) external onlyOwner nonReentrant {
        require(amount > 0, "Staking: amount must be greater than 0");
        require(rewardToken.balanceOf(address(this)) >= amount, "Staking: insufficient balance");
        require(rewardToken.transfer(owner(), amount), "Staking: transfer failed");
    }
    
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
    * @dev Configura o oráculo (apenas owner)
    * @param _oracle Endereço do contrato OracleConsumer
    */
    function setOracle(address _oracle) external onlyOwner {
        require(_oracle != address(0), "Staking: invalid oracle address");
        oracle = OracleConsumer(_oracle);
        emit OracleSet(_oracle);
    }

    /**
    * @dev Ativa/desativa o uso do oráculo
    * @param _useOracle true para usar oráculo, false para usar recompensa padrão
    */
    function toggleOracle(bool _useOracle) external onlyOwner {
        useOracle = _useOracle;
        emit UseOracleToggled(_useOracle);
    }

    /**
    * @dev Atualiza o multiplicador de recompensa
    * @param _newMultiplier Novo multiplicador
    */
    function setRewardMultiplier(uint256 _newMultiplier) external onlyOwner {
        require(_newMultiplier > 0, "Staking: multiplier must be > 0");
        rewardMultiplier = _newMultiplier;
        emit RewardMultiplierUpdated(_newMultiplier);
    }

}