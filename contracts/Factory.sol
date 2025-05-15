// SPDX-License-Identifier: MIT
pragma solidity 0.8.29;

/// @notice CREATE2 Deployment Factory
/// @dev The factory itself is implemented in EVM assembly (see 'Factory.evm')
///      and this library exports constants for use in Solidity.
library Factory {
    address constant internal DEPLOYER = 0x962560A0333190D57009A0aAAB7Bfa088f58461C;
    uint256 constant internal SALT = 0xa976fb05b72fe6875529bc5b18496fad777d53e8eb16c54055cc12b627562fae;
    address constant internal ADDRESS = 0xC0DEaE38FCa6f6AbC6D21c0E7F7AfDeADfC6c1db;

    bytes constant internal INITCODE =
        hex"601f8060095f395ff35f35602036038060205f375f34f5806021573d5f5f3e5ffd5b5f5260205ff3";
    bytes constant internal RUNCODE = hex"5f35602036038060205f375f34f5806021573d5f5f3e5ffd5b5f5260205ff3";
    bytes32 constant internal CODEHASH = 0x7b4d24fb1909cd31452b566739584d0695e9292a53b4c4b5b8bc25e1a2595691;
}
