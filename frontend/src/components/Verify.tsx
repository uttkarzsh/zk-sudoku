type Props = {
  given: number[][];
  solution: number[][];
  onStatus: (s: "proving" | "verifying" | "success" | "failure") => void;
};

const Verify = ({ given, solution, onStatus }: Props) => {
  const handleSubmit = async () => {
    try {
      onStatus("proving");
      const res = await fetch("https://zk-sudoku-prover.onrender.com/prove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ given, solution }),
      });

      if (!res.ok) throw new Error("Prover failed");

      const data = await res.json();
      onStatus("verifying");
      const verification = await fetch("https://zk-sudoku-verifier.onrender.com/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proof: data.proof,
          publicInputs: data.publicInputs,
        }),
      });

      if (!verification.ok) throw new Error("Verifier failed");

      const result = await verification.json();

      onStatus(result.result ? "success" : "failure"); 
    } catch (err) {
      console.error(err);
      onStatus("failure");
    }
  };

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
  );
};

export default Verify;