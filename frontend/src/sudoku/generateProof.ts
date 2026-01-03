import { Noir, type CompiledCircuit } from "@noir-lang/noir_js";
import { UltraHonkBackend } from "@aztec/bb.js";
import initNoirC from "@noir-lang/noirc_abi";
import initACVM from "@noir-lang/acvm_js";
import acvm from "@noir-lang/acvm_js/web/acvm_js_bg.wasm?url";
import noirc from "@noir-lang/noirc_abi/web/noirc_abi_wasm_bg.wasm?url";
import circuit from "./../../../circuits/target/circuits.json";

// Initialize WASM modules once
let initialized = false;

async function initWasm() {
  if (!initialized) {
    await Promise.all([
      initACVM(fetch(acvm)), 
      initNoirC(fetch(noirc))
    ]);
    initialized = true;
  }
}

export async function generateProof(given: number[][], solution: number[][]): Promise<{ proof: Uint8Array, publicInputs: string[] }> {
    // Initialize WASM first
    await initWasm();
    
    const noir = new Noir(circuit as CompiledCircuit);
    const backend = new UltraHonkBackend(circuit.bytecode);
    
    const inputs = { given: given, solution: solution };

    const { witness } = await noir.execute(inputs);

    const { proof, publicInputs } = await backend.generateProof(witness);

    return {proof, publicInputs};
}