const { deployments, ethers, getNamedAccounts } = require("hardhat");
const { assert, expect } = require("chai");

describe("FundMe", async function () {
  let fundMe;
  let deployer;
  let MockV3Aggregator;
  let sendValue = ethers.utils.parseEther("0.01"); //1 eth
  beforeEach(async function () {
    //deploy our fundMe contract
    // using Hardhat-deploy
    // const accounts = await ethers.getSigner()
    // const accountZero = accounts[0]
    deployer = (await getNamedAccounts()).deployer;
    await deployments.fixture(["all"]);
    fundMe = await ethers.getContract("FundMe", deployer);
    MockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer);
  });

  describe("constructor", async function () {
    it("sets the aggregator address correctly", async function () {
      const response = await fundMe.priceFeed();
      console.log("response =>", response);
      console.log("MockV3Aggregator.address =>", MockV3Aggregator.address);
      assert.equal(response, MockV3Aggregator.address);
    });
  });

  //   describe("fund", async () => {
  //     it("fails if you don't send enough ETH", async () => {
  //       await expect(fundMe.fund()).to.be.revertedWith(
  //         "You need to spend more ETH!"
  //       );
  //     });
  //     it("updated the amount funded data structure", async () => {
  //       console.log(sendValue.toString());
  //       await fundMe.fund({ value: sendValue });
  //       const response = await fundMe.addressToAmountFunded(deployer);
  //       assert.equal(response.toString(), sendValue.toString());
  //     });
  //     it("adds funder to array of funders", async function () {
  //       await fundMe.fund({ value: sendValue });
  //       const funder = await fundMe.funders([0]);
  //       assert.equal(funder, deployer);
  //     });
  //   });
  //   console.log("fundMe", fundMe);
  describe("withdraw", async () => {
    // console.log(fundMe);
    // beforeEach(async () => {
    //     const account = await ethers.getSigner()
    //     console.log('ac',account);
    //   await fundMe.connect(account.address).fund({ value: sendValue })
    // //   await expect(
    //     fundMe.connect(account[0]).fund({ value: sendValue })
    // //   ).to.be.revertedWith("You need to spend more ETH!");
    // });
    it("withdraw Eth form a single founder", async () => {
      //arrange
      const startingFundMeBalance = await fundMe.provider.getBalance(
        fundMe.address
      );
      const startingDeployerBalance = await fundMe.provider.getBalance(
        deployer
      );
      //act
      const transactionResponse = await fundMe.withdraw();
      const transactionRecipt = await transactionResponse.wait(1);
      const { gasUsed, effectiveGasPrice } = transactionRecipt;
      const endingFundMeBalance = await fundMe.provider.getBalance(
        fundMe.address
      );
      const endingDeployerBalance = await fundMe.provider.getBalance(deployer);
      //assert
      assert.equal(endingFundMeBalance, 0);
      //   assert.equal(
      //     startingFundMeBalance.add(startingDeployerBalance).toString(),
      //     endingDeployerBalance.add(gasCost).toString()
      //   );
    });
    // it("allows us to withdraw with multiple funders", async () => {
    //   const account = await ethers.getSigner();
    //   for (let i = 1; i < 6; i++) {
    //     const fundMeConnectionContract = await fundMe.connect(account[i]);
    //     await fundMeConnectionContract.fund({ value: sendValue });
    //   }
    //   const startingFundMeBalance = await fundMe.provider.getBalance(
    //     fundMe.address
    //   );
    //   const startingDeployerBalance = await fundMe.provider.getBalance(
    //     deployer
    //   );
    //   //   act
    //   const transactionResponse = await fundMe.withdraw();
    //   const transactionRecipt = await transactionResponse.wait(1);
    //   const { gasUsed, effectiveGasPrice } = transactionRecipt;
    //   const endingFundMeBalance = await fundMe.provider.getBalance(
    //     fundMe.address
    //   );
    //   const endingDeployerBalance = await fundMe.provider.getBalance(deployer);
    //   //assert
    //   assert.equal(endingFundMeBalance, 0);
    // //   await expect(fundMe.funders(0)).to.be.reverted
    // });
  });
});
