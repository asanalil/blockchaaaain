require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ethers');

module.exports = {
  solidity: '0.8.0',
  networks: {
    hardhat: {
    },
    sepolia: {
      url: "https://sepolia.rpc",
      accounts: [`YOUR_PRIVATE_KEY`]
    },
  },
};
