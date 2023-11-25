const ethers = require("ethers");
require('dotenv').config()
const fs = require("fs");

async function main() {
  //provider 
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL_ALCHEMY);
  
  // create wallet for gas or signer transaction
  const wallet = new ethers.Wallet(
    process.env.META_MASK_PRIVATE_KEY_SEPOLIA_TEST,
    provider
  );
  /// console.log(wallet);
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf-8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("deploy , Please wait...");
  const contract = await contractFactory.deploy(); // stop here : to wait for contract to deploy
  const transactionRecipt = await contract.deployTransaction.wait(1);
  /// geting contract deploy address
  console.log(`Contract Address => ${contract.address}`);
  
  /// read transactions
  const currentFavNumber = await contract.retrieve()
  console.log('currentFavNumber is=>',currentFavNumber.toString());
  
  /// write transaction 
  const storefunctionIncontract = await contract.store('7')
  const storeFunctionRecipt = await storefunctionIncontract.wait();
  
  /// read transaction 
  const getFavNumber = await contract.retrieve()
  console.log('modified FavNumber is =>',getFavNumber.toString());
   
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
