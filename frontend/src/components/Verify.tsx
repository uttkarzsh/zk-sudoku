import { useWriteContract } from "wagmi";
import { generateProof } from "../sudoku/generateProof";
import { abi } from "../abi";

type Props = {
  given: number[][],
  solution: number[][]
}

export function uint8ArrayToHex(buffer: Uint8Array): string {
  const hex: string[] = [];

  buffer.forEach(function (i) {
    let h = i.toString(16);
    if (h.length % 2) {
      h = "0" + h;
    }
    hex.push(h);
  });

  return hex.join("");
}

function fieldToBytes32(field: string): `0x${string}` {
  const hex = BigInt(field).toString(16);
  return `0x${hex.padStart(64, "0")}`;
}

const Verify = ({given, solution}: Props) => {
  const writeContract = useWriteContract();

  const handleSubmit = async () => {
    const {proof, publicInputs} = await generateProof(given, solution);

    await writeContract.mutate({
      abi, 
      address: `0x78e29C00d96a5609f6D8CDb538972863178AaB8b`,
      functionName: "correctGuess",
      args: [uint8ArrayToHex(proof), publicInputs.map(fieldToBytes32)]
    });

    console.log("yay");
  }


  return (
    <button
    onClick={handleSubmit}
      className="
        mt-6
        px-6 py-3
        rounded-lg
        bg-emerald-300
        text-black font-semibold
        tracking-wide
        shadow-md
        transition-all duration-150
        hover:bg-emerald-400
        hover:shadow-lg
        active:scale-95
        focus:outline-none
        focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-neutral-900
      "
    >
      Verify Solution
    </button>
  )
}

export default Verify