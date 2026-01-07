//SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IVerifier} from "./Verifier.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Sudoku {

    IVerifier public immutable s_verifier;
    IERC20 public immutable usdc;
    address public immutable owner;

    error Sudoku__InvalidGuess();
    error Sudoku__InsufficientUSDC();
    error Sudoku__WhoAreYou();
    error Sudoku__USDCFundFailed();
    error Sudoku__USDCTransferFailed();

    constructor(IVerifier _verifier){
        s_verifier = IVerifier(_verifier);
        usdc = IERC20(0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238); //Sepolia USDC
        owner = msg.sender;
    }

    function correctGuess(bytes calldata _proof, bytes32[] calldata _publicInputs) public {
        if(!s_verifier.verify(_proof, _publicInputs)){
            revert Sudoku__InvalidGuess();
        }
        if(usdc.balanceOf(address(this)) <= 1000){
            revert Sudoku__InsufficientUSDC();
        }
        bool ok = usdc.transfer(msg.sender, 1000);
        if(!ok){
            revert Sudoku__USDCTransferFailed();
        }
    }

}