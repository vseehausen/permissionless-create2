// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

import {Factory} from "../Factory.sol";

contract Constants {
    address public constant DEPLOYER = Factory.DEPLOYER;
    bytes32 public constant SALT = Factory.SALT;
    address public constant ADDRESS = Factory.ADDRESS;
    bytes public constant INITCODE = Factory.INITCODE;
    bytes public constant RUNCODE = Factory.RUNCODE;
    bytes32 public constant CODEHASH = Factory.CODEHASH;
}
