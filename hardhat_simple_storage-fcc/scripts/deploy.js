// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers, run, network } = require("hardhat");

async function main() {
  const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("deploying contract...");
  const simpleStorage = await simpleStorageFactory.deploy();
  await simpleStorage.waitForDeployment();
  console.log(`simple storage :=> ${await simpleStorage.getAddress()}`);

  await new Promise((res, rej) => setTimeout(res, 60000));
  if (network.config.chainId == 11155111 && process.env.ETHERSCAN_API_KEY) {
    // console.log('fdf');
    // await simpleStorage.waitForDeployment()
    await verify(await simpleStorage.getAddress(), []);
  }

  const currentValue = await simpleStorage.retrieve();
  console.log("current value", currentValue.toString());

  const transactionResponse = await simpleStorage.store('7');
  // await transactionResponse
  await transactionResponse.wait();
  const updateValue = await simpleStorage.retrieve();
  console.log("updated Value is:", updateValue.toString());
}

async function verify(contractAddress, args) {
  console.log("verifying contact...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (error) {
    console.log(error.message);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
