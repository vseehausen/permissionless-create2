import { expect } from "chai";
import hre from "hardhat";
import { deployFactory } from "../src/index.mjs";

describe("Factory", function () {
  const { ethers, network } = hre;

  describe("bootstrap", function () {
    let signer;
    before(function () {
      // Currently, Hardhat does not work with EIP-7702 transactions, so we need
      // to manually create communicate with the node. Skip this test if running
      // against on the Hardhat network.
      // <https://github.com/NomicFoundation/hardhat/issues/6578>
      if (network.name !== "localhost") {
        this.skip();
      }

      const provider = new ethers.JsonRpcProvider("http://localhost:8545");
      signer = ethers.Wallet.fromPhrase(
        "test test test test test test test test test test test junk",
        provider,
      );
    });

    it("should deploy the CREATE2 factory contract", async function () {
      const factory = await deployFactory(signer);

      const code = await ethers.provider.getCode(factory);
      expect(ethers.dataLength(code)).to.be.gt(0);
      expect(ethers.keccak256(code)).to.equal(
        "0x63c364dbfb4a0583975b3e5695fb053baaafcb090e0e6ae5ec2f436ea33eedbe",
      );
    });

    it("should deploy to the epected address", async function () {
      const factory = await deployFactory(signer);

      const constants = await ethers.deployContract("Constants");
      expect(factory).to.equal(await constants.ADDRESS());
    });

    it("should be idempotent", async function () {
      const factory1 = await deployFactory(signer);
      const factory2 = await deployFactory(signer);

      expect(factory1).to.equal(factory2);

      const bootstrap = await ethers.deployContract("Bootstrap");
      await expect(bootstrap.bootstrap()).to.not.be.reverted;
    });

    it("should allow CREATE2 deployments of contracts", async function () {
      const factory = await deployFactory(signer);

      const Bootstrap = await ethers.getContractFactory("Bootstrap");
      const { data: code } = await Bootstrap.getDeployTransaction();
      const salt = ethers.randomBytes(32);

      const data = ethers.concat([salt, code]);
      const [address] = ethers.AbiCoder.defaultAbiCoder().decode(
        ["address"],
        await signer.call({ to: factory, data }),
      );

      expect(address).to.equal(ethers.getCreate2Address(
        factory,
        salt,
        ethers.keccak256(code),
      ));
      expect(await ethers.provider.getCode(address)).to.equal("0x");

      const create = await signer.sendTransaction({ to: factory, data });
      await create.wait();
      const deployed = await ethers.provider.getCode(address);

      expect(ethers.dataLength(deployed)).to.be.gt(0);
    });
  });

  describe("constants", function () {
    it("should have correct constants", async function () {
      const constants = await ethers.deployContract("Constants");

      expect(await constants.ADDRESS()).to.equal(ethers.getCreate2Address(
        await constants.DEPLOYER(),
        ethers.toBeHex(await constants.SALT()),
        ethers.keccak256(await constants.INITCODE()),
      ));

      const [signer] = await ethers.getSigners();
      const tx = await signer.sendTransaction({ data: await constants.INITCODE() });
      const { contractAddress: factory } = await tx.wait();
      const code = await ethers.provider.getCode(factory);

      expect(await constants.RUNCODE()).to.equal(code);
      expect(await constants.CODEHASH()).to.equal(ethers.keccak256(code));
    });
  });

  describe("implementation", function () {
    it("should allow CREATE2 deployments of contracts", async function () {
      const constants = await ethers.deployContract("Constants");
      const [signer] = await ethers.getSigners();
      const tx = await signer.sendTransaction({ data: await constants.INITCODE() });
      const { contractAddress: factory } = await tx.wait();

      const Bootstrap = await ethers.getContractFactory("Bootstrap");
      const { data: code } = await Bootstrap.getDeployTransaction();
      const salt = ethers.randomBytes(32);

      const data = ethers.concat([salt, code]);
      const [address] = ethers.AbiCoder.defaultAbiCoder().decode(
        ["address"],
        await signer.call({ to: factory, data }),
      );

      expect(address).to.equal(ethers.getCreate2Address(
        factory,
        salt,
        ethers.keccak256(code),
      ));
      expect(await ethers.provider.getCode(address)).to.equal("0x");

      const create = await signer.sendTransaction({ to: factory, data });
      await create.wait();
      const deployed = await ethers.provider.getCode(address);

      expect(ethers.dataLength(deployed)).to.be.gt(0);
    });
  });
});
