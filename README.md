# ZK Sudoku

A simple demonstration of a **full stack zero-knowledge Sudoku verifier**.

The app lets you solve a **4×4 Sudoku puzzle** and prove that your solution is correct **without revealing the solution itself**, using zero-knowledge proofs.

🔗 [**Live demo**](https://zksudoku.netlify.app)

---

## Features

- Interactive **4×4 Sudoku** puzzle
- Random puzzle generation
- **Prover backend** generates a zero-knowledge proof of correctness.
- **Verifier backend** verifies the proof independently of the prover backend.
- The solution is never revealed to the verifier backend. 

---

## How it works 

1. The frontend displays a 4×4 Sudoku puzzle.
2. You fill in the solution.
3. The solution is sent to a [**prover backend**](https://github.com/uttkarzsh/zk-sudoku/tree/73c664c296e502b0479bb5fa03edd9cbe5850c64/server/prover), which:
   - Generates a witness
   - Produces a zero-knowledge proof
4. The proof and public inputs are sent to a [**verifier backend**](https://github.com/uttkarzsh/zk-sudoku/tree/73c664c296e502b0479bb5fa03edd9cbe5850c64/server/verifier), which:
   - Verifies the proof
   - Returns whether the solution is valid
5. The frontend displays the result.

---

## Notes
 - This is only a learning / demo project, not production-ready.
 - The circuit is written in **Noir**, and proofs are generated using **UltraHonk** through **Barretenberg**.
 - The focus is on understanding the end-to-end zk workflow, not optimization.
