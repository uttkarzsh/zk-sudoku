export const abi = [
    {
      "type": "constructor",
      "inputs": [
        {
          "name": "_verifier",
          "type": "address",
          "internalType": "contract IVerifier"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "correctGuess",
      "inputs": [
        { "name": "_proof", "type": "bytes", "internalType": "bytes" },
        {
          "name": "_publicInputs",
          "type": "bytes32[]",
          "internalType": "bytes32[]"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "owner",
      "inputs": [],
      "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "s_verifier",
      "inputs": [],
      "outputs": [
        { "name": "", "type": "address", "internalType": "contract IVerifier" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "usdc",
      "inputs": [],
      "outputs": [
        { "name": "", "type": "address", "internalType": "contract IERC20" }
      ],
      "stateMutability": "view"
    },
    { "type": "error", "name": "Sudoku__InsufficientUSDC", "inputs": [] },
    { "type": "error", "name": "Sudoku__InvalidGuess", "inputs": [] },
    { "type": "error", "name": "Sudoku__USDCFundFailed", "inputs": [] },
    { "type": "error", "name": "Sudoku__USDCTransferFailed", "inputs": [] },
    { "type": "error", "name": "Sudoku__WhoAreYou", "inputs": [] }
  ]