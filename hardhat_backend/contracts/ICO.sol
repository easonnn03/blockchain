// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract ICO is Pausable, Ownable {
    IERC20 public token;
    uint public price = 1 ether;
    uint public totalTokensSold;

    constructor(address _tokenAddress) Ownable(msg.sender) {
        token = IERC20(_tokenAddress);
    }

    event TokensBought(address indexed buyer, uint256 amount, uint256 cost);
    event JewelleryPurchased(address indexed buyer, uint256 tokenAmount, uint256 cost);

    function buyToken() external payable whenNotPaused {
        uint256 weiAmount = msg.value;
        uint256 numberOfToken = weiAmount / price * 10 ** 18;
        require(numberOfToken > 0, "Amount must be greater than zero");
        require(msg.sender != owner(), "Owner cannot use this function");

        token.transferFrom(owner(), msg.sender, numberOfToken);
        totalTokensSold += numberOfToken;
    
        emit TokensBought(msg.sender, numberOfToken, weiAmount);
    }

    function getBalance() external view returns (uint) {
        return token.balanceOf(msg.sender);
    }

    function decimals() public pure returns (uint8) {
        return 18;
    }

    function getTotalTokensSold() external view returns (uint) {
        return totalTokensSold;
    }

    function getAllowance() external view returns (uint) {
        return token.allowance(owner(), address(this));
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function withdrawal() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}