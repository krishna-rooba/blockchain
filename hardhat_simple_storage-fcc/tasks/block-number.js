const {task} = require('hardhat/config')

task('block-number','Print the block number').setAction(
    async(taskArgs,hre)=>{
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`current block Number ${blockNumber}`);
    }
)

module.exports = {

} 