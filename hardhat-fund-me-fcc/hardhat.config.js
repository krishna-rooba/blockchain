require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config()
require("solidity-coverage")
require("hardhat-deploy")

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
      chainId: 11155111,
      accounts: [wallet_private_key],
      blockConfirmations: 6,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      // accounts: automatic pick local account which is provide by hardhat
      chainId: 31337,
    },
  },
  // solidity: "0.8.8",
  solidity: {
    compilers: [{ version: "0.8.8" }, { version: "0.6.6" }],
  },
  etherscan: {
    apiKey: etherscan_api_key,
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: false,
    currency: "USD",
    // coinmarketcap: coinmarketcap_api_key,
    token: "MATIC",
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    user: {
      default: 1,
    },
  },
};
