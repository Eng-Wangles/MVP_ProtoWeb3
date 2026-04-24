**THIS CHECKLIST IS NOT COMPLETE**. Use `--show-ignored-findings` to show all the results.
Summary
 - [incorrect-exp](#incorrect-exp) (1 results) (High)
 - [divide-before-multiply](#divide-before-multiply) (9 results) (Medium)
 - [reentrancy-no-eth](#reentrancy-no-eth) (2 results) (Medium)
 - [unused-return](#unused-return) (4 results) (Medium)
 - [shadowing-local](#shadowing-local) (1 results) (Low)
 - [missing-zero-check](#missing-zero-check) (1 results) (Low)
 - [reentrancy-benign](#reentrancy-benign) (2 results) (Low)
 - [timestamp](#timestamp) (3 results) (Low)
 - [assembly](#assembly) (33 results) (Informational)
 - [pragma](#pragma) (1 results) (Informational)
 - [dead-code](#dead-code) (1 results) (Informational)
 - [solc-version](#solc-version) (6 results) (Informational)
 - [low-level-calls](#low-level-calls) (4 results) (Informational)
 - [naming-convention](#naming-convention) (19 results) (Informational)
 - [redundant-statements](#redundant-statements) (2 results) (Informational)
 - [too-many-digits](#too-many-digits) (6 results) (Informational)
 - [unindexed-event-address](#unindexed-event-address) (2 results) (Informational)
 - [constable-states](#constable-states) (1 results) (Optimization)
 - [immutable-states](#immutable-states) (3 results) (Optimization)
 - [var-read-using-this](#var-read-using-this) (1 results) (Optimization)
## incorrect-exp
Impact: High
Confidence: Medium
 - [ ] ID-0
[Math.mulDiv(uint256,uint256,uint256)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L206-L277) has bitwise-xor operator ^ instead of the exponentiation operator **: 
	 - [inverse = (3 * denominator) ^ 2](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L259)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L206-L277


## divide-before-multiply
Impact: Medium
Confidence: Medium
 - [ ] ID-1
[Math.mulDiv(uint256,uint256,uint256)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L206-L277) performs a multiplication on the result of a division:
	- [low = low / twos](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L247)
	- [result = low * inverse](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L274)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L206-L277


 - [ ] ID-2
[Math.invMod(uint256,uint256)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L317-L363) performs a multiplication on the result of a division:
	- [quotient = gcd / remainder](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L339)
	- [(gcd,remainder) = (remainder,gcd - remainder * quotient)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L341-L348)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L317-L363


 - [ ] ID-3
[Math.mulDiv(uint256,uint256,uint256)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L206-L277) performs a multiplication on the result of a division:
	- [denominator = denominator / twos](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L244)
	- [inverse *= 2 - denominator * inverse](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L268)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L206-L277


 - [ ] ID-4
[Math.mulDiv(uint256,uint256,uint256)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L206-L277) performs a multiplication on the result of a division:
	- [denominator = denominator / twos](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L244)
	- [inverse = (3 * denominator) ^ 2](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L259)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L206-L277


 - [ ] ID-5
[Math.mulDiv(uint256,uint256,uint256)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L206-L277) performs a multiplication on the result of a division:
	- [denominator = denominator / twos](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L244)
	- [inverse *= 2 - denominator * inverse](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L266)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L206-L277


 - [ ] ID-6
[Math.mulDiv(uint256,uint256,uint256)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L206-L277) performs a multiplication on the result of a division:
	- [denominator = denominator / twos](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L244)
	- [inverse *= 2 - denominator * inverse](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L267)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L206-L277


 - [ ] ID-7
[Math.mulDiv(uint256,uint256,uint256)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L206-L277) performs a multiplication on the result of a division:
	- [denominator = denominator / twos](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L244)
	- [inverse *= 2 - denominator * inverse](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L264)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L206-L277


 - [ ] ID-8
[Math.mulDiv(uint256,uint256,uint256)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L206-L277) performs a multiplication on the result of a division:
	- [denominator = denominator / twos](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L244)
	- [inverse *= 2 - denominator * inverse](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L263)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L206-L277


 - [ ] ID-9
[Math.mulDiv(uint256,uint256,uint256)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L206-L277) performs a multiplication on the result of a division:
	- [denominator = denominator / twos](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L244)
	- [inverse *= 2 - denominator * inverse](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L265)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L206-L277


## reentrancy-no-eth
Impact: Medium
Confidence: Medium
 - [ ] ID-10
Reentrancy in [StakingContract.stake(uint256)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/StakingContract.sol#L107-L120):
	External calls:
	- [require(bool,string)(stakingToken.transferFrom(msg.sender,address(this),amount),Staking: transfer failed)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/StakingContract.sol#L113)
	State variables written after the call(s):
	- [totalStaked += amount](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/StakingContract.sol#L117)
	[StakingContract.totalStaked](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/StakingContract.sol#L23) can be used in cross function reentrancies:
	- [StakingContract.getStats()](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/StakingContract.sol#L160-L170)
	- [StakingContract.rewardPerToken()](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/StakingContract.sol#L72-L77)
	- [StakingContract.totalStaked](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/StakingContract.sol#L23)
	- [user.amount += amount](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/StakingContract.sol#L115)
	[StakingContract.userInfo](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/StakingContract.sol#L41) can be used in cross function reentrancies:
	- [StakingContract.earned(address)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/StakingContract.sol#L83-L105)
	- [StakingContract.getUserInfo(address)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/StakingContract.sol#L147-L158)
	- [StakingContract.userInfo](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/StakingContract.sol#L41)
	- [user.lastStakeTime = block.timestamp](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/StakingContract.sol#L116)
	[StakingContract.userInfo](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/StakingContract.sol#L41) can be used in cross function reentrancies:
	- [StakingContract.earned(address)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/StakingContract.sol#L83-L105)
	- [StakingContract.getUserInfo(address)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/StakingContract.sol#L147-L158)
	- [StakingContract.userInfo](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/StakingContract.sol#L41)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/StakingContract.sol#L107-L120


 - [ ] ID-11
Reentrancy in [MemberNFT.mintNFT()](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/MemberNFT.sol#L63-L85):
	External calls:
	- [_safeMint(msg.sender,tokenId)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/MemberNFT.sol#L70)
		- [retval = IERC721Receiver(to).onERC721Received(operator,from,tokenId,data)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/token/ERC721/utils/ERC721Utils.sol#L33-L47)
		- [ERC721Utils.checkOnERC721Received(_msgSender(),address(0),to,tokenId,data)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#L289)
	State variables written after the call(s):
	- [hasMinted[msg.sender] = true](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/MemberNFT.sol#L73)
	[MemberNFT.hasMinted](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/MemberNFT.sol#L26) can be used in cross function reentrancies:
	- [MemberNFT.hasMinted](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/MemberNFT.sol#L26)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/MemberNFT.sol#L63-L85


## unused-return
Impact: Medium
Confidence: Medium
 - [ ] ID-12
[OracleConsumer.getPriceByRoundId(uint80)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/OracleConsumer.sol#L121-L125) ignores return value by [(None,answer,None,None,None) = priceFeed.getRoundData(roundId)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/OracleConsumer.sol#L122)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/OracleConsumer.sol#L121-L125


 - [ ] ID-13
[OracleConsumer.getLatestPrice()](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/OracleConsumer.sol#L48-L61) ignores return value by [(roundId,answer,None,lastUpdated,None) = priceFeed.latestRoundData()](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/OracleConsumer.sol#L49)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/OracleConsumer.sol#L48-L61


 - [ ] ID-14
[OracleConsumer.updateStoredPrice()](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/OracleConsumer.sol#L76-L91) ignores return value by [(roundId,answer,None,updatedAt,None) = priceFeed.latestRoundData()](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/OracleConsumer.sol#L77)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/OracleConsumer.sol#L76-L91


 - [ ] ID-15
[OracleConsumer.isActive()](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/OracleConsumer.sol#L147-L153) ignores return value by [() = this.getLatestPrice()](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/OracleConsumer.sol#L148-L152)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/OracleConsumer.sol#L147-L153


## shadowing-local
Impact: Low
Confidence: High
 - [ ] ID-16
[MemberNFT.burnNFT(uint256).owner](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/MemberNFT.sol#L128) shadows:
	- [Ownable.owner()](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/access/Ownable.sol#L56-L58) (function)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/MemberNFT.sol#L128


## missing-zero-check
Impact: Low
Confidence: Medium
 - [ ] ID-17
[DAOSimple.getVotingPower(address)._voter](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L66) lacks a zero-check on :
		- [(success,data) = stakingContract.staticcall(abi.encodeWithSignature(getUserInfo(address),_voter))](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L72-L74)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L66


## reentrancy-benign
Impact: Low
Confidence: Medium
 - [ ] ID-18
Reentrancy in [MemberNFT.mintNFT()](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/MemberNFT.sol#L63-L85):
	External calls:
	- [_safeMint(msg.sender,tokenId)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/MemberNFT.sol#L70)
		- [retval = IERC721Receiver(to).onERC721Received(operator,from,tokenId,data)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/token/ERC721/utils/ERC721Utils.sol#L33-L47)
		- [ERC721Utils.checkOnERC721Received(_msgSender(),address(0),to,tokenId,data)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#L289)
	State variables written after the call(s):
	- [_setTokenURI(tokenId,uri)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/MemberNFT.sol#L77)
		- [_tokenURIs[tokenId] = _tokenURI](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol#L52)
	- [memberLevel[tokenId] = 1](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/MemberNFT.sol#L72)
	- [userTokens[msg.sender].push(tokenId)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/MemberNFT.sol#L74)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/MemberNFT.sol#L63-L85


 - [ ] ID-19
Reentrancy in [MemberNFT.mintFree(address)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/MemberNFT.sol#L91-L104):
	External calls:
	- [_safeMint(to,tokenId)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/MemberNFT.sol#L95)
		- [retval = IERC721Receiver(to).onERC721Received(operator,from,tokenId,data)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/token/ERC721/utils/ERC721Utils.sol#L33-L47)
		- [ERC721Utils.checkOnERC721Received(_msgSender(),address(0),to,tokenId,data)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#L289)
	State variables written after the call(s):
	- [_setTokenURI(tokenId,uri)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/MemberNFT.sol#L101)
		- [_tokenURIs[tokenId] = _tokenURI](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol#L52)
	- [hasMinted[to] = true](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/MemberNFT.sol#L97)
	- [memberLevel[tokenId] = 1](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/MemberNFT.sol#L96)
	- [userTokens[to].push(tokenId)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/MemberNFT.sol#L98)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/MemberNFT.sol#L91-L104


## timestamp
Impact: Low
Confidence: Medium
 - [ ] ID-20
[DAOSimple.vote(uint256,bool)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L144-L164) uses timestamp for comparisons
	Dangerous comparisons:
	- [require(bool,string)(block.timestamp >= proposal.startTime,DAO: voting not started)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L147)
	- [require(bool,string)(block.timestamp <= proposal.endTime,DAO: voting ended)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L148)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L144-L164


 - [ ] ID-21
[DAOSimple.executeProposal(uint256)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L169-L188) uses timestamp for comparisons
	Dangerous comparisons:
	- [require(bool,string)(block.timestamp > proposal.endTime,DAO: voting still active)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L172)
	- [require(bool,string)(! proposal.executed,DAO: proposal already executed)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L173)
	- [require(bool,string)(totalVotes >= proposal.quorum,DAO: quorum not reached)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L176)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L169-L188


 - [ ] ID-22
[StakingContract.withdraw(uint256)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/StakingContract.sol#L122-L132) uses timestamp for comparisons
	Dangerous comparisons:
	- [require(bool,string)(user.amount >= amount,Staking: insufficient staked balance)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/StakingContract.sol#L125)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/StakingContract.sol#L122-L132


## assembly
Impact: Informational
Confidence: High
 - [ ] ID-23
[SafeCast.toUint(bool)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol#L1157-L1161) uses assembly
	- [INLINE ASM](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol#L1158-L1160)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol#L1157-L1161


 - [ ] ID-24
[StorageSlot.getAddressSlot(bytes32)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/StorageSlot.sol#L66-L70) uses assembly
	- [INLINE ASM](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/StorageSlot.sol#L67-L69)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/StorageSlot.sol#L66-L70


 - [ ] ID-25
[Math.tryModExp(bytes,bytes,bytes)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L451-L473) uses assembly
	- [INLINE ASM](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L463-L472)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L451-L473


 - [ ] ID-26
[StorageSlot.getUint256Slot(bytes32)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/StorageSlot.sol#L93-L97) uses assembly
	- [INLINE ASM](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/StorageSlot.sol#L94-L96)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/StorageSlot.sol#L93-L97


 - [ ] ID-27
[Bytes._unsafeReadBytesOffset(bytes,uint256)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Bytes.sol#L326-L331) uses assembly
	- [INLINE ASM](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Bytes.sol#L328-L330)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Bytes.sol#L326-L331


 - [ ] ID-28
[ERC721Utils.checkOnERC721Received(address,address,address,uint256,bytes)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/token/ERC721/utils/ERC721Utils.sol#L25-L49) uses assembly
	- [INLINE ASM](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/token/ERC721/utils/ERC721Utils.sol#L43-L45)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/token/ERC721/utils/ERC721Utils.sol#L25-L49


 - [ ] ID-29
[Math.log2(uint256)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L619-L658) uses assembly
	- [INLINE ASM](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L655-L657)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L619-L658


 - [ ] ID-30
[Strings.toChecksumHexString(address)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Strings.sol#L108-L126) uses assembly
	- [INLINE ASM](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Strings.sol#L113-L115)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Strings.sol#L108-L126


 - [ ] ID-31
[StorageSlot.getBooleanSlot(bytes32)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/StorageSlot.sol#L75-L79) uses assembly
	- [INLINE ASM](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/StorageSlot.sol#L76-L78)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/StorageSlot.sol#L75-L79


 - [ ] ID-32
[StorageSlot.getBytes32Slot(bytes32)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/StorageSlot.sol#L84-L88) uses assembly
	- [INLINE ASM](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/StorageSlot.sol#L85-L87)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/StorageSlot.sol#L84-L88


 - [ ] ID-33
[Bytes.replace(bytes,uint256,bytes,uint256,uint256)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Bytes.sol#L154-L172) uses assembly
	- [INLINE ASM](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Bytes.sol#L167-L169)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Bytes.sol#L154-L172


 - [ ] ID-34
[Panic.panic(uint256)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Panic.sol#L50-L56) uses assembly
	- [INLINE ASM](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Panic.sol#L51-L55)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Panic.sol#L50-L56


 - [ ] ID-35
[Bytes.splice(bytes,uint256,uint256)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Bytes.sol#L117-L129) uses assembly
	- [INLINE ASM](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Bytes.sol#L123-L126)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Bytes.sol#L117-L129


 - [ ] ID-36
[StorageSlot.getInt256Slot(bytes32)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/StorageSlot.sol#L102-L106) uses assembly
	- [INLINE ASM](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/StorageSlot.sol#L103-L105)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/StorageSlot.sol#L102-L106


 - [ ] ID-37
[Bytes.toNibbles(bytes)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Bytes.sol#L210-L245) uses assembly
	- [INLINE ASM](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Bytes.sol#L211-L244)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Bytes.sol#L210-L245


 - [ ] ID-38
[Strings._unsafeWriteBytesOffset(bytes,uint256,bytes1)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Strings.sol#L526-L531) uses assembly
	- [INLINE ASM](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Strings.sol#L528-L530)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Strings.sol#L526-L531


 - [ ] ID-39
[StorageSlot.getBytesSlot(bytes)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/StorageSlot.sol#L138-L142) uses assembly
	- [INLINE ASM](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/StorageSlot.sol#L139-L141)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/StorageSlot.sol#L138-L142


 - [ ] ID-40
[Strings.escapeJSON(string)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Strings.sol#L461-L505) uses assembly
	- [INLINE ASM](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Strings.sol#L468-L470)
	- [INLINE ASM](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Strings.sol#L499-L502)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Strings.sol#L461-L505


 - [ ] ID-41
[Math.mulDiv(uint256,uint256,uint256)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L206-L277) uses assembly
	- [INLINE ASM](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L229-L236)
	- [INLINE ASM](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L242-L251)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L206-L277


 - [ ] ID-42
[Math.mul512(uint256,uint256)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L37-L46) uses assembly
	- [INLINE ASM](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L41-L45)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L37-L46


 - [ ] ID-43
[StorageSlot.getStringSlot(bytes32)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/StorageSlot.sol#L111-L115) uses assembly
	- [INLINE ASM](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/StorageSlot.sol#L112-L114)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/StorageSlot.sol#L111-L115


 - [ ] ID-44
[Strings.toString(uint256)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Strings.sol#L42-L60) uses assembly
	- [INLINE ASM](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Strings.sol#L47-L49)
	- [INLINE ASM](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Strings.sol#L52-L54)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Strings.sol#L42-L60


 - [ ] ID-45
[Strings._unsafeReadBytesOffset(bytes,uint256)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Strings.sol#L513-L518) uses assembly
	- [INLINE ASM](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Strings.sol#L515-L517)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Strings.sol#L513-L518


 - [ ] ID-46
[StorageSlot.getStringSlot(string)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/StorageSlot.sol#L120-L124) uses assembly
	- [INLINE ASM](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/StorageSlot.sol#L121-L123)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/StorageSlot.sol#L120-L124


 - [ ] ID-47
[Math.tryMul(uint256,uint256)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L73-L84) uses assembly
	- [INLINE ASM](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L76-L80)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L73-L84


 - [ ] ID-48
[Bytes.slice(bytes,uint256,uint256)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Bytes.sol#L86-L98) uses assembly
	- [INLINE ASM](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Bytes.sol#L93-L95)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Bytes.sol#L86-L98


 - [ ] ID-49
[Math.tryMod(uint256,uint256)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L102-L110) uses assembly
	- [INLINE ASM](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L105-L108)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L102-L110


 - [ ] ID-50
[Math.tryDiv(uint256,uint256)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L89-L97) uses assembly
	- [INLINE ASM](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L92-L95)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L89-L97


 - [ ] ID-51
[StorageSlot.getBytesSlot(bytes32)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/StorageSlot.sol#L129-L133) uses assembly
	- [INLINE ASM](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/StorageSlot.sol#L130-L132)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/StorageSlot.sol#L129-L133


 - [ ] ID-52
[Math._zeroBytes(bytes)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L478-L490) uses assembly
	- [INLINE ASM](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L482-L484)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L478-L490


 - [ ] ID-53
[Math.tryModExp(uint256,uint256,uint256)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L411-L435) uses assembly
	- [INLINE ASM](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L413-L434)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L411-L435


 - [ ] ID-54
[Bytes.concat(bytes[])](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Bytes.sol#L183-L203) uses assembly
	- [INLINE ASM](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Bytes.sol#L194-L196)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Bytes.sol#L183-L203


 - [ ] ID-55
[Math.add512(uint256,uint256)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L25-L30) uses assembly
	- [INLINE ASM](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L26-L29)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L25-L30


## pragma
Impact: Informational
Confidence: High
 - [ ] ID-56
7 different versions of Solidity are used:
	- Version constraint ^0.8.0 is used by:
		-[^0.8.0](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol#L2)
	- Version constraint ^0.8.20 is used by:
		-[^0.8.20](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/access/Ownable.sol#L4)
		-[^0.8.20](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol#L4)
		-[^0.8.20](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol#L4)
		-[^0.8.20](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/token/ERC721/utils/ERC721Utils.sol#L4)
		-[^0.8.20](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Context.sol#L4)
		-[^0.8.20](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Panic.sol#L4)
		-[^0.8.20](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Pausable.sol#L4)
		-[^0.8.20](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/ReentrancyGuard.sol#L4)
		-[^0.8.20](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/StorageSlot.sol#L5)
		-[^0.8.20](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/introspection/ERC165.sol#L4)
		-[^0.8.20](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L4)
		-[^0.8.20](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol#L5)
		-[^0.8.20](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/SignedMath.sol#L4)
		-[^0.8.20](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/CTBToken.sol#L2)
		-[^0.8.20](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L2)
		-[^0.8.20](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/OracleConsumer.sol#L2)
		-[^0.8.20](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/StakingContract.sol#L2)
	- Version constraint >=0.4.16 is used by:
		-[>=0.4.16](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/interfaces/IERC165.sol#L4)
		-[>=0.4.16](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol#L4)
		-[>=0.4.16](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/introspection/IERC165.sol#L4)
	- Version constraint >=0.6.2 is used by:
		-[>=0.6.2](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/interfaces/IERC4906.sol#L4)
		-[>=0.6.2](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/interfaces/IERC721.sol#L4)
		-[>=0.6.2](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol#L4)
		-[>=0.6.2](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol#L4)
		-[>=0.6.2](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol#L4)
		-[>=0.6.2](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol#L4)
	- Version constraint >=0.8.4 is used by:
		-[>=0.8.4](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/interfaces/draft-IERC6093.sol#L4)
	- Version constraint ^0.8.24 is used by:
		-[^0.8.24](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#L4)
		-[^0.8.24](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol#L4)
		-[^0.8.24](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol#L4)
		-[^0.8.24](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Bytes.sol#L4)
		-[^0.8.24](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Strings.sol#L4)
		-[^0.8.24](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/MemberNFT.sol#L2)
	- Version constraint >=0.5.0 is used by:
		-[>=0.5.0](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol#L4)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol#L2


## dead-code
Impact: Informational
Confidence: Medium
 - [ ] ID-57
[MemberNFT._increaseBalance(address,uint128)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/MemberNFT.sol#L203-L208) is never used and should be removed

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/MemberNFT.sol#L203-L208


## solc-version
Impact: Informational
Confidence: High
 - [ ] ID-58
Version constraint >=0.5.0 contains known severe issues (https://solidity.readthedocs.io/en/latest/bugs.html)
	- DirtyBytesArrayToStorage
	- ABIDecodeTwoDimensionalArrayMemory
	- KeccakCaching
	- EmptyByteArrayCopy
	- DynamicArrayCleanup
	- ImplicitConstructorCallvalueCheck
	- TupleAssignmentMultiStackSlotComponents
	- MemoryArrayCreationOverflow
	- privateCanBeOverridden
	- SignedArrayStorageCopy
	- ABIEncoderV2StorageArrayWithMultiSlotElement
	- DynamicConstructorArgumentsClippedABIV2
	- UninitializedFunctionPointerInConstructor
	- IncorrectEventSignatureInLibraries
	- ABIEncoderV2PackedStorage.
It is used by:
	- [>=0.5.0](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol#L4)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol#L4


 - [ ] ID-59
Version constraint >=0.4.16 contains known severe issues (https://solidity.readthedocs.io/en/latest/bugs.html)
	- DirtyBytesArrayToStorage
	- ABIDecodeTwoDimensionalArrayMemory
	- KeccakCaching
	- EmptyByteArrayCopy
	- DynamicArrayCleanup
	- ImplicitConstructorCallvalueCheck
	- TupleAssignmentMultiStackSlotComponents
	- MemoryArrayCreationOverflow
	- privateCanBeOverridden
	- SignedArrayStorageCopy
	- ABIEncoderV2StorageArrayWithMultiSlotElement
	- DynamicConstructorArgumentsClippedABIV2
	- UninitializedFunctionPointerInConstructor_0.4.x
	- IncorrectEventSignatureInLibraries_0.4.x
	- ExpExponentCleanup
	- NestedArrayFunctionCallDecoder
	- ZeroFunctionSelector.
It is used by:
	- [>=0.4.16](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/interfaces/IERC165.sol#L4)
	- [>=0.4.16](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol#L4)
	- [>=0.4.16](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/introspection/IERC165.sol#L4)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/interfaces/IERC165.sol#L4


 - [ ] ID-60
Version constraint ^0.8.20 contains known severe issues (https://solidity.readthedocs.io/en/latest/bugs.html)
	- VerbatimInvalidDeduplication
	- FullInlinerNonExpressionSplitArgumentEvaluationOrder
	- MissingSideEffectsOnSelectorAccess.
It is used by:
	- [^0.8.20](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/access/Ownable.sol#L4)
	- [^0.8.20](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol#L4)
	- [^0.8.20](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol#L4)
	- [^0.8.20](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/token/ERC721/utils/ERC721Utils.sol#L4)
	- [^0.8.20](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Context.sol#L4)
	- [^0.8.20](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Panic.sol#L4)
	- [^0.8.20](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Pausable.sol#L4)
	- [^0.8.20](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/ReentrancyGuard.sol#L4)
	- [^0.8.20](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/StorageSlot.sol#L5)
	- [^0.8.20](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/introspection/ERC165.sol#L4)
	- [^0.8.20](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L4)
	- [^0.8.20](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol#L5)
	- [^0.8.20](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/SignedMath.sol#L4)
	- [^0.8.20](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/CTBToken.sol#L2)
	- [^0.8.20](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L2)
	- [^0.8.20](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/OracleConsumer.sol#L2)
	- [^0.8.20](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/StakingContract.sol#L2)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/access/Ownable.sol#L4


 - [ ] ID-61
Version constraint >=0.8.4 contains known severe issues (https://solidity.readthedocs.io/en/latest/bugs.html)
	- FullInlinerNonExpressionSplitArgumentEvaluationOrder
	- MissingSideEffectsOnSelectorAccess
	- AbiReencodingHeadOverflowWithStaticArrayCleanup
	- DirtyBytesArrayToStorage
	- DataLocationChangeInInternalOverride
	- NestedCalldataArrayAbiReencodingSizeValidation
	- SignedImmutables.
It is used by:
	- [>=0.8.4](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/interfaces/draft-IERC6093.sol#L4)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/interfaces/draft-IERC6093.sol#L4


 - [ ] ID-62
Version constraint ^0.8.0 contains known severe issues (https://solidity.readthedocs.io/en/latest/bugs.html)
	- FullInlinerNonExpressionSplitArgumentEvaluationOrder
	- MissingSideEffectsOnSelectorAccess
	- AbiReencodingHeadOverflowWithStaticArrayCleanup
	- DirtyBytesArrayToStorage
	- DataLocationChangeInInternalOverride
	- NestedCalldataArrayAbiReencodingSizeValidation
	- SignedImmutables
	- ABIDecodeTwoDimensionalArrayMemory
	- KeccakCaching.
It is used by:
	- [^0.8.0](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol#L2)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol#L2


 - [ ] ID-63
Version constraint >=0.6.2 contains known severe issues (https://solidity.readthedocs.io/en/latest/bugs.html)
	- MissingSideEffectsOnSelectorAccess
	- AbiReencodingHeadOverflowWithStaticArrayCleanup
	- DirtyBytesArrayToStorage
	- NestedCalldataArrayAbiReencodingSizeValidation
	- ABIDecodeTwoDimensionalArrayMemory
	- KeccakCaching
	- EmptyByteArrayCopy
	- DynamicArrayCleanup
	- MissingEscapingInFormatting
	- ArraySliceDynamicallyEncodedBaseType
	- ImplicitConstructorCallvalueCheck
	- TupleAssignmentMultiStackSlotComponents
	- MemoryArrayCreationOverflow.
It is used by:
	- [>=0.6.2](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/interfaces/IERC4906.sol#L4)
	- [>=0.6.2](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/interfaces/IERC721.sol#L4)
	- [>=0.6.2](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol#L4)
	- [>=0.6.2](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol#L4)
	- [>=0.6.2](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol#L4)
	- [>=0.6.2](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol#L4)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/interfaces/IERC4906.sol#L4


## low-level-calls
Impact: Informational
Confidence: High
 - [ ] ID-64
Low level call in [DAOSimple.getTotalStaked()](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L88-L102):
	- [(success,data) = stakingContract.staticcall(abi.encodeWithSignature(totalStaked()))](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L93-L95)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L88-L102


 - [ ] ID-65
Low level call in [MemberNFT._sendETH(address,uint256)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/MemberNFT.sol#L55-L58):
	- [(success,None) = to.call{value: amount}()](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/MemberNFT.sol#L56)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/MemberNFT.sol#L55-L58


 - [ ] ID-66
Low level call in [DAOSimple.getVotingPower(address)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L66-L83):
	- [(success,data) = stakingContract.staticcall(abi.encodeWithSignature(getUserInfo(address),_voter))](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L72-L74)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L66-L83


 - [ ] ID-67
Low level call in [DAOSimple.executeProposal(uint256)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L169-L188):
	- [(success,None) = proposal.target.call(proposal.callData)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L183)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L169-L188


## naming-convention
Impact: Informational
Confidence: High
 - [ ] ID-68
Parameter [StakingContract.setRewardRate(uint256)._rewardRate](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/StakingContract.sol#L172) is not in mixedCase

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/StakingContract.sol#L172


 - [ ] ID-69
Parameter [DAOSimple.setVotingPeriod(uint256)._newPeriod](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L230) is not in mixedCase

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L230


 - [ ] ID-70
Parameter [StakingContract.setOracle(address)._oracle](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/StakingContract.sol#L205) is not in mixedCase

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/StakingContract.sol#L205


 - [ ] ID-71
Parameter [OracleConsumer.setPriceFeed(address)._newPriceFeed](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/OracleConsumer.sol#L131) is not in mixedCase

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/OracleConsumer.sol#L131


 - [ ] ID-72
Parameter [DAOSimple.createProposal(string,address,bytes)._description](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L108) is not in mixedCase

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L108


 - [ ] ID-73
Parameter [DAOSimple.getVotingPower(address)._voter](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L66) is not in mixedCase

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L66


 - [ ] ID-74
Parameter [StakingContract.toggleOracle(bool)._useOracle](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/StakingContract.sol#L215) is not in mixedCase

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/StakingContract.sol#L215


 - [ ] ID-75
Parameter [DAOSimple.vote(uint256,bool)._proposalId](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L144) is not in mixedCase

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L144


 - [ ] ID-76
Parameter [DAOSimple.setStakingContract(address)._stakingContract](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L248) is not in mixedCase

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L248


 - [ ] ID-77
Parameter [DAOSimple.getProposalDetails(uint256)._proposalId](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L193) is not in mixedCase

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L193


 - [ ] ID-78
Parameter [DAOSimple.createProposal(string,address,bytes)._target](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L109) is not in mixedCase

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L109


 - [ ] ID-79
Parameter [MemberNFT.setMintPrice(uint256)._newPrice](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/MemberNFT.sol#L170) is not in mixedCase

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/MemberNFT.sol#L170


 - [ ] ID-80
Parameter [StakingContract.setRewardMultiplier(uint256)._newMultiplier](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/StakingContract.sol#L224) is not in mixedCase

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/StakingContract.sol#L224


 - [ ] ID-81
Parameter [DAOSimple.createProposal(string,address,bytes)._callData](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L110) is not in mixedCase

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L110


 - [ ] ID-82
Parameter [DAOSimple.executeProposal(uint256)._proposalId](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L169) is not in mixedCase

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L169


 - [ ] ID-83
Parameter [DAOSimple.vote(uint256,bool)._support](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L144) is not in mixedCase

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L144


 - [ ] ID-84
Parameter [DAOSimple.hasUserVoted(uint256,address)._voter](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L223) is not in mixedCase

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L223


 - [ ] ID-85
Parameter [DAOSimple.hasUserVoted(uint256,address)._proposalId](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L223) is not in mixedCase

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L223


 - [ ] ID-86
Parameter [DAOSimple.setQuorumPercentage(uint256)._newPercentage](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L239) is not in mixedCase

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L239


## redundant-statements
Impact: Informational
Confidence: High
 - [ ] ID-87
Redundant expression "[roundId](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/OracleConsumer.sol#L53)" in[OracleConsumer](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/OracleConsumer.sol#L12-L155)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/OracleConsumer.sol#L53


 - [ ] ID-88
Redundant expression "[lastUpdated](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/OracleConsumer.sol#L54)" in[OracleConsumer](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/OracleConsumer.sol#L12-L155)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/OracleConsumer.sol#L54


## too-many-digits
Impact: Informational
Confidence: Medium
 - [ ] ID-89
[Bytes.toNibbles(bytes)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Bytes.sol#L210-L245) uses literals with too many digits:
	- [chunk_toNibbles_asm_0 = 0x00000000ffffffff00000000ffffffff00000000ffffffff00000000ffffffff & chunk_toNibbles_asm_0 << 32 | chunk_toNibbles_asm_0](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Bytes.sol#L226-L229)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Bytes.sol#L210-L245


 - [ ] ID-90
[Math.log2(uint256)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L619-L658) uses literals with too many digits:
	- [r = r | byte(uint256,uint256)(x >> r,0x0000010102020202030303030303030300000000000000000000000000000000)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L656)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/math/Math.sol#L619-L658


 - [ ] ID-91
[Bytes.reverseBytes32(bytes32)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Bytes.sol#L258-L272) uses literals with too many digits:
	- [value = ((value >> 32) & 0x00000000FFFFFFFF00000000FFFFFFFF00000000FFFFFFFF00000000FFFFFFFF) | ((value & 0x00000000FFFFFFFF00000000FFFFFFFF00000000FFFFFFFF00000000FFFFFFFF) << 32)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Bytes.sol#L265-L267)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Bytes.sol#L258-L272


 - [ ] ID-92
[Bytes.toNibbles(bytes)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Bytes.sol#L210-L245) uses literals with too many digits:
	- [chunk_toNibbles_asm_0 = 0x0000000000000000ffffffffffffffff0000000000000000ffffffffffffffff & chunk_toNibbles_asm_0 << 64 | chunk_toNibbles_asm_0](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Bytes.sol#L222-L225)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Bytes.sol#L210-L245


 - [ ] ID-93
[Bytes.reverseBytes16(bytes16)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Bytes.sol#L275-L286) uses literals with too many digits:
	- [value = ((value & 0xFFFFFFFF00000000FFFFFFFF00000000) >> 32) | ((value & 0x00000000FFFFFFFF00000000FFFFFFFF) << 32)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Bytes.sol#L282-L284)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Bytes.sol#L275-L286


 - [ ] ID-94
[Bytes.reverseBytes32(bytes32)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Bytes.sol#L258-L272) uses literals with too many digits:
	- [value = ((value >> 64) & 0x0000000000000000FFFFFFFFFFFFFFFF0000000000000000FFFFFFFFFFFFFFFF) | ((value & 0x0000000000000000FFFFFFFFFFFFFFFF0000000000000000FFFFFFFFFFFFFFFF) << 64)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Bytes.sol#L268-L270)

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Bytes.sol#L258-L272


## unindexed-event-address
Impact: Informational
Confidence: High
 - [ ] ID-95
Event [Pausable.Unpaused(address)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Pausable.sol#L28) has address parameters but no indexed parameters

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Pausable.sol#L28


 - [ ] ID-96
Event [Pausable.Paused(address)](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Pausable.sol#L23) has address parameters but no indexed parameters

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/node_modules/@openzeppelin/contracts/utils/Pausable.sol#L23


## constable-states
Impact: Optimization
Confidence: High
 - [ ] ID-97
[DAOSimple.votingDelay](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L44) should be constant 

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L44


## immutable-states
Impact: Optimization
Confidence: High
 - [ ] ID-98
[DAOSimple.governanceToken](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L25) should be immutable 

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/DAOSimple.sol#L25


 - [ ] ID-99
[StakingContract.rewardToken](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/StakingContract.sol#L18) should be immutable 

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/StakingContract.sol#L18


 - [ ] ID-100
[StakingContract.stakingToken](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/StakingContract.sol#L17) should be immutable 

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/StakingContract.sol#L17


## var-read-using-this
Impact: Optimization
Confidence: High
 - [ ] ID-101
The function [OracleConsumer.isActive()](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/OracleConsumer.sol#L147-L153) reads [() = this.getLatestPrice()](https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/OracleConsumer.sol#L148-L152) with `this` which adds an extra STATICCALL.

https://github.com/Eng-Wangles/MVP_ProtoWeb3/blob/main/contracts/OracleConsumer.sol#L147-L153


