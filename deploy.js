const ethers = require("ethers");
const fs = require("fs");
// HTTP://127.0.0.1:7545

async function main() {
  const provider = new ethers.providers.JsonRpcProvider("http://0.0.0.0:7545");
  console.log(provider);
  const wallet = new ethers.Wallet(
    "0xac5f7bc67ae9e5adb672489ddc713116e44f616ea311f05814982c06b9cf8f3f",
    provider
  );
  console.log(wallet);
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf-8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("deploy , Please wait...");
  const contract = await contractFactory.deploy(); // stop here : to wait for contract to deploy
  //   console.log(contract);
  const transactionRecipt = await contract.deployTransaction.wait(1);
  //   console.log(transactionRecipt);
  console.log("deploy transaction:=>", await contract.deployTransaction);
}

main();
