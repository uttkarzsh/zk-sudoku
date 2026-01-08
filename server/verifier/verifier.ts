import circuit from "./../../circuits/target/circuits.json"
import { UltraHonkBackend } from "@aztec/bb.js";

export async function verifySudoku(proof: Uint8Array, publicInputs: string[]): Promise<boolean>{
    const backend = new UltraHonkBackend(circuit.bytecode, {threads: 1});
    const isValid: boolean = await backend.verifyProof({proof, publicInputs}, {keccak: true});

    return isValid
}