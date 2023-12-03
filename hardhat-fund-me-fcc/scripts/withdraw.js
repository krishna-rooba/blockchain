const { getNamedAccounts, ethers } = require("hardhat");
async function main() {
  const { deployer } = await getNamedAccounts();
  const fundMe = await ethers.getContract("FundMe", deployer);
  console.log("funding Contract...");
  const transactionResponse = await fundMe.withdraw({
    value: ethers.utils.parseEther("1"),
  });
  await transactionResponse.wait(1);
  console.log("funded");
}

main().then(()=>process.exit(0)).catch((e) => console.log(e));
