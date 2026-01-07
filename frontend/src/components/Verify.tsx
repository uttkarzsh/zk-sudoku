import { useWriteContract } from "wagmi";
import { abi } from "../abi";

type Props = {
  given: number[][],
  solution: number[][]
}

function fieldToBytes32(field: string): `0x${string}` {
  const hex = BigInt(field).toString(16);
  return `0x${hex.padStart(64, "0")}`;
}

const Verify = ({given, solution}: Props) => {
  const writeContract = useWriteContract();

  const handleSubmit = async () => {
  
    const res = await fetch("http://localhost:3001/prove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({given, solution }),
      });

    if (!res.ok) {
        throw new Error("Request failed");
    }
    
    const data = await res.json();

    console.log(data.proof);
    console.log(data.publicInputs.map(fieldToBytes32));
    
    try {
    writeContract.mutate({
      abi, 
      address: `0x6fC33849beE06e8153b5071d5ab097A6ccEAaE55`,
      functionName: "correctGuess",
      args: [data.proof, data.publicInputs.map(fieldToBytes32)]
    });

    console.log("yay");
    } catch(error){
      console.error;
    }
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