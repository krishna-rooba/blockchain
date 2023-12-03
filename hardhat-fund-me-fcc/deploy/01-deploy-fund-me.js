const {
  networkConfig,
  developmentChains,
} = require("../helper-hardhat-config");
const { network } = require("hardhat");
const { verify } = require("../utils/verify");
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  let ethUsdPriceFeedAddress;
  //   const address = "0x694AA1769357215DE4FAC081bf1f309aDC325306";
  if (developmentChains.includes(network.name)) {
    const ethUsAggregator = await deployments.get("MockV3Aggregator");
    ethUsdPriceFeedAddress = ethUsAggregator.address;
  } else {
    ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceAddress"];
  }
  const args = [ethUsdPriceFeedAddress];
  console.log("deployer",deployer);
  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: args, /// yaha pr priceFeed  ka address denge// hum constructor me argument pass kr rahe hai.
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1 
  });
//   console.log('fund data',fundMe);
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(fundMe.address,args);
  }
};

module.exports.tags = ["all", "fundme"];
