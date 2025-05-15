require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  paths: {
    artifacts: "build/hardhat/artifacts",
    cache: "build/hardhat/cache",
  },
  solidity: {
    version: "0.8.29",
    settings: {
      evmVersion: "prague",
      optimizer: {
        enabled: true,
        runs: 1,
      },
      viaIR: true,
    },
  },
};
