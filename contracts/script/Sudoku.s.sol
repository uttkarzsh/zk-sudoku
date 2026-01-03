//SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { Script, console } from "forge-std/Script.sol";
import { Sudoku } from "./../src/Sudoku.sol";
import { HonkVerifier } from "./../src/Verifier.sol";

contract DeploySudoku is Script{
    function run() external {
        vm.startBroadcast();

        HonkVerifier verifier = new HonkVerifier();
        Sudoku sudoku = new Sudoku(verifier);

        console.log("Verifier deployed at: ", address(verifier));
        console.log("Sudoku deployed at: ", address(sudoku));

        vm.stopBroadcast();
    }

}