const networkConfig = {
    11155111:{
        name:"sepolia",
        ethUsdPriceAddress:"0x694AA1769357215DE4FAC081bf1f309aDC325306"
    },
    137:{
        name:"polygon",
        ethUsdPriceAddress:"0xf9680d99d6c9589e2a93a78a04a279e509205945"
    }
}

const developmentChains = ["hardhat","localhost"]

const DECIMALS = 0
const INITAIL_ANSWER = 20000000

module.exports = {
    networkConfig,
    developmentChains,
    INITAIL_ANSWER,
    DECIMALS
}