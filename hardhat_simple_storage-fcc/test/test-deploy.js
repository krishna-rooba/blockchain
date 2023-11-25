const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("SimpleStorage", () => {
  let simpleStorageFactory;
  let simpleStorage;
  beforeEach(async () => {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it("should start with a favorite Number of 0", async () => {
    const exprected = "0";
    const currentValue = await simpleStorage.retrieve();
    // expect // dawa krna
    // assert  // realty
    assert.equal(currentValue.toString(), exprected);
    expect(currentValue.toString()).to.equal(exprected);
  });
  it("should update when we call store", async () => {
    const expected = "7";
    const transactionResponse = await simpleStorage.store(expected);
    await transactionResponse.wait(1);
    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), expected);
    expect(currentValue.toString()).to.equal(expected);
  });

});
