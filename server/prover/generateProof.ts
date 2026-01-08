import { Noir, type CompiledCircuit } from "@noir-lang/noir_js";
import { UltraHonkBackend } from "@aztec/bb.js";
import circuit from "../../circuits/target/circuits.json";

export async function generateProof(given: number[][], solution: number[][]): Promise<{proof: Uint8Array, publicInputs: string[]}>{
    const noir = new Noir(circuit as CompiledCircuit);
    const backend = new UltraHonkBackend(circuit.bytecode, { threads: 1});

    const inputs = {
        given: given,
        solution: solution
    }

    const {witness} = await noir.execute(inputs);

    const {proof, publicInputs} = await backend.generateProof(witness, {keccak: true});
    console.log(publicInputs);

    return {proof, publicInputs}
}