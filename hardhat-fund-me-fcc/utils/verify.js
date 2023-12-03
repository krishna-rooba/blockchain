const { run } = require("hardhat");
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

  module.exports = {verify};