import { Noir, type CompiledCircuit } from "@noir-lang/noir_js";
import { UltraHonkBackend } from "@aztec/bb.js";
import circuit from "../circuits/target/circuits.json";
import { writeFile } from "node:fs/promises";

async function getVerifier(){
    const noir = new Noir(circuit as CompiledCircuit);
    const backend = new UltraHonkBackend(circuit.bytecode, { threads: 1});

    const vk = await backend.getVerificationKey({keccak: true});

    const verifier = await backend.getSolidityVerifier(vk, {keccak: true});

    writeFile("./../contracts/src/Verifier.sol", verifier);
    console.log("solidity verifier generated");
}

getVerifier();