// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

/// @notice CREATE2 Deployment Factory
/// @dev The factory itself is implemented in EVM assembly (see 'Factory.evm')
///      and this library exports constants for use in Solidity.
library Factory {
    address internal constant DEPLOYER = 0x962560A0333190D57009A0aAAB7Bfa088f58461C;
    bytes32 internal constant SALT = hex"d817eb709c5a0c86d13fbe0f8b653c3d5e16a37b6bac4ac6406bf5f7d09d6eb6";
    address internal constant ADDRESS = 0xC0DEa6bB18fdb0182EE3a77e30e684A8FA5a450E;

    bytes internal constant INITCODE =
        hex"601f8060095f395ff35f35602036038060205f375f34f5806018573d5f5f3e5ffd5b5f5260205ff3";
    bytes internal constant RUNCODE = hex"5f35602036038060205f375f34f5806018573d5f5f3e5ffd5b5f5260205ff3";
    bytes32 internal constant CODEHASH = hex"63c364dbfb4a0583975b3e5695fb053baaafcb090e0e6ae5ec2f436ea33eedbe";
}
