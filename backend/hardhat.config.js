require("@nomicfoundation/hardhat-ethers");
require("dotenv").config(); // Load environment variables from .env

module.exports = {
  solidity: "0.8.0", // Set your Solidity version
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",  // Local Hardhat network URL
      accounts: [`0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d`]  // Use private key from .env file
    }
  }
};