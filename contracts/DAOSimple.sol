// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title IStaking
 * @author Wangles Moreira Soares
 * @dev Interface mínima do contrato de Staking
 */
interface IStaking {
    function getUserInfo(address user) external view returns (uint256 amount, uint256 rewards, uint256 lastStakeTime);
    function totalStaked() external view returns (uint256);
}

/**
 * @title DAOSimple
 * @author Wangles Moreira Soares
 * @notice Sistema de governança simplificado com peso do voto baseado em STAKE
 */
contract DAOSimple is Ownable, ReentrancyGuard {
    
    IERC20 public governanceToken;
    address public stakingContract;
    
    struct Proposal {
        uint256 id;
        string description;
        address proposer;
        uint256 startTime;
        uint256 endTime;
        uint256 forVotes;
        uint256 againstVotes;
        uint256 quorum;
        bool executed;
        bool passed;
        address target;
        bytes callData;
    }
    
    uint256 public votingPeriod = 3 minutes;
    uint256 public votingDelay = 10 seconds;
    uint256 public quorumPercentage = 1;
    uint256 public proposalCount;
    
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    mapping(uint256 => mapping(address => uint256)) public voteWeight;
    
    event ProposalCreated(uint256 indexed id, address indexed proposer, string description, uint256 startTime, uint256 endTime);
    event VoteCast(uint256 indexed id, address indexed voter, bool support, uint256 weight);
    event ProposalExecuted(uint256 indexed id, bool passed);
    event VotingPeriodUpdated(uint256 newPeriod);
    event QuorumPercentageUpdated(uint256 newPercentage);
    
    constructor(address _governanceToken) Ownable(msg.sender) {
        require(_governanceToken != address(0), "DAO: invalid token address");
        governanceToken = IERC20(_governanceToken);
    }
    
    /**
     * @dev Retorna poder de voto baseado APENAS no saldo em stake
     */
    function getVotingPower(address _voter) public view returns (uint256) {
        if (stakingContract == address(0)) {
            return 0;
        }
        
        // Chamada para o contrato de staking
        (bool success, bytes memory data) = stakingContract.staticcall(
            abi.encodeWithSignature("getUserInfo(address)", _voter)
        );
        
        if (success && data.length >= 96) { // 3 * 32 bytes = 96
            // Decodificar os 3 valores
            (uint256 stakedAmount, , ) = abi.decode(data, (uint256, uint256, uint256));
            return stakedAmount;
        }
        
        return 0;
    }
    
    /**
     * @dev Calcula o quorum baseado no total staked
     */
    function getTotalStaked() public view returns (uint256) {
        if (stakingContract == address(0)) {
            return 0;
        }
        
        (bool success, bytes memory data) = stakingContract.staticcall(
            abi.encodeWithSignature("totalStaked()")
        );
        
        if (success && data.length >= 32) {
            return abi.decode(data, (uint256));
        }
        
        return 0;
    }
    
    /**
     * @dev Cria uma nova proposta
     */
    function createProposal(
        string memory _description,
        address _target,
        bytes memory _callData
    ) external nonReentrant returns (uint256) {
        require(bytes(_description).length > 0, "DAO: description cannot be empty");
        require(_target != address(0), "DAO: invalid target address");
        
        uint256 proposalId = proposalCount++;
        uint256 startTime = block.timestamp + votingDelay;
        uint256 endTime = startTime + votingPeriod;
        
        uint256 totalStaked = getTotalStaked();
        uint256 quorum = (totalStaked * quorumPercentage) / 100;
        
        proposals[proposalId] = Proposal({
            id: proposalId,
            description: _description,
            proposer: msg.sender,
            startTime: startTime,
            endTime: endTime,
            forVotes: 0,
            againstVotes: 0,
            quorum: quorum,
            executed: false,
            passed: false,
            target: _target,
            callData: _callData
        });
        
        emit ProposalCreated(proposalId, msg.sender, _description, startTime, endTime);
        return proposalId;
    }
    
    /**
     * @dev Vota em uma proposta
     */
    function vote(uint256 _proposalId, bool _support) external nonReentrant {
        Proposal storage proposal = proposals[_proposalId];
        
        require(block.timestamp >= proposal.startTime, "DAO: voting not started");
        require(block.timestamp <= proposal.endTime, "DAO: voting ended");
        require(!hasVoted[_proposalId][msg.sender], "DAO: already voted");
        
        uint256 votingPower = getVotingPower(msg.sender);
        require(votingPower > 0, "DAO: no staked tokens to vote");
        
        hasVoted[_proposalId][msg.sender] = true;
        voteWeight[_proposalId][msg.sender] = votingPower;
        
        if (_support) {
            proposal.forVotes += votingPower;
        } else {
            proposal.againstVotes += votingPower;
        }
        
        emit VoteCast(_proposalId, msg.sender, _support, votingPower);
    }
    
    /**
     * @dev Executa uma proposta aprovada
     */
    function executeProposal(uint256 _proposalId) external nonReentrant {
        Proposal storage proposal = proposals[_proposalId];
        
        require(block.timestamp > proposal.endTime, "DAO: voting still active");
        require(!proposal.executed, "DAO: proposal already executed");
        
        uint256 totalVotes = proposal.forVotes + proposal.againstVotes;
        require(totalVotes >= proposal.quorum, "DAO: quorum not reached");
        
        bool passed = proposal.forVotes > proposal.againstVotes;
        proposal.passed = passed;
        proposal.executed = true;
        
        if (passed) {
            (bool success, ) = proposal.target.call(proposal.callData);
            require(success, "DAO: execution failed");
        }
        
        emit ProposalExecuted(_proposalId, passed);
    }
    
    /**
     * @dev Retorna detalhes de uma proposta
     */
    function getProposalDetails(uint256 _proposalId) external view returns (
        string memory description,
        address proposer,
        uint256 startTime,
        uint256 endTime,
        uint256 forVotes,
        uint256 againstVotes,
        uint256 quorum,
        bool executed,
        bool passed,
        address target
    ) {
        Proposal storage proposal = proposals[_proposalId];
        return (
            proposal.description,
            proposal.proposer,
            proposal.startTime,
            proposal.endTime,
            proposal.forVotes,
            proposal.againstVotes,
            proposal.quorum,
            proposal.executed,
            proposal.passed,
            proposal.target
        );
    }
    
    /**
     * @dev Verifica se um usuário já votou
     */
    function hasUserVoted(uint256 _proposalId, address _voter) external view returns (bool) {
        return hasVoted[_proposalId][_voter];
    }
    
    /**
     * @dev Atualiza período de votação
     */
    function setVotingPeriod(uint256 _newPeriod) external onlyOwner {
        require(_newPeriod >= 1 minutes && _newPeriod <= 7 days, "DAO: invalid period");
        votingPeriod = _newPeriod;
        emit VotingPeriodUpdated(_newPeriod);
    }
    
    /**
     * @dev Atualiza percentual de quorum
     */
    function setQuorumPercentage(uint256 _newPercentage) external onlyOwner {
        require(_newPercentage >= 1 && _newPercentage <= 100, "DAO: invalid percentage");
        quorumPercentage = _newPercentage;
        emit QuorumPercentageUpdated(_newPercentage);
    }
    
    /**
     * @dev Configura contrato de staking
     */
    function setStakingContract(address _stakingContract) external onlyOwner {
        require(_stakingContract != address(0), "DAO: invalid staking address");
        stakingContract = _stakingContract;
    }
    
    /**
     * @dev Retorna o total staked
     */
    function getTotalStakedReference() external view returns (uint256) {
        return getTotalStaked();
    }
}