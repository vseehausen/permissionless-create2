// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.29;

/// @notice CREATE2 Deployment Factory
/// @dev The factory itself is implemented in EVM assembly (see 'Factory.evm')
///      and this library exports constants for use in Solidity.
library Factory {
    address internal constant DEPLOYER = 0x962560A0333190D57009A0aAAB7Bfa088f58461C;
    bytes32 internal constant SALT = hex"0000000000000000000000000000000000000000000000000000000000057a67";
    address internal constant ADDRESS = 0xC0DE8E984dF1846E6AdE500972641ce0a9669e1b;

    bytes internal constant INITCODE = hex"7860205f3581360380835f375f34f58060145790fd5b5f525ff35f5260196007f3";
    bytes internal constant RUNCODE = hex"60205f3581360380835f375f34f58060145790fd5b5f525ff3";
    bytes32 internal constant CODEHASH = hex"f3ee84f262524054463f2deab3d163dd9217d59231bd95b3b39df74b998cda6e";
}
