require("@nomicfoundation/hardhat-toolbox");
// require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
require("./tasks/block-number");
require("hardhat-gas-reporter");
require('solidity-coverage')

/** @type import('hardhat/config').HardhatUserConfig */
const url = process.env.RPC_SEPOLIYA_URL;
const wallet_private_key = process.env.WALLET_PRIVATE_KEY_SOPOLIYA;
const etherscan_api_key = process.env.ETHERSCAN_API_KEY;
const coinmarketcap_api_key = process.env.COINMARKETCAP_API_KEY;
// console.log(wallet_private_key,wallet_private_key,etherscan_api_key);
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: url,
      accounts: [wallet_private_key],
      chainId: 11155111,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      // accounts: automatic pick local account which is provide by hardhat
      chainId: 31337,
    },
  },
  solidity: "0.8.7",
  etherscan: {
    apiKey: etherscan_api_key,
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: false,
    currency: "USD",
    coinmarketcap: coinmarketcap_api_key,
    token:"MATIC"
  },
};
