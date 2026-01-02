
type Props = {
  onGenerate: () => void;
};

const GeneratePuzzle = ({ onGenerate }: Props) => {
  return (
    <button
        onClick={onGenerate}
        className="
            mt-6
            px-6 py-3
            rounded-lg
            bg-emerald-500
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
        Generate New Puzzle
    </button>
  )
}

export default GeneratePuzzle