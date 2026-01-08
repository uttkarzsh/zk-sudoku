import { useState } from "react";


type Props = {
  given: number[][],
  solution: number[][]
}

const Verify = ({given, solution}: Props) => {
  const [solved, setSolved] = useState<boolean | null>(null);
  const handleSubmit = async () => {
try{
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


    const verification = await fetch("http://localhost:3002/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({proof: data.proof, publicInputs: data.publicInputs}),
    })

    if (!verification.ok) {
    throw new Error("Request failed for ver server");
  }

    const result = await verification.json();
    setSolved(result.result);
    console.log(solved);
} catch(error){
  console.error(error);
}
  }


  return (
    <>
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
      <p className="text-white">Your solution is {solved === null ? "not entered " : solved? "correct" : "incorrect"} </p>
    </>
  )
}

export default Verify