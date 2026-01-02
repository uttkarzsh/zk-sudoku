import { useState } from "react";
import { generatePuzzle } from "../sudoku/logic";
import GeneratePuzzle from "./GeneratePuzzle";
import Verify from "./Verify";

type Cell = number | null;

export default function Sudoku() {
    const [givenGrid, setGivenGrid] = useState<Cell[][]>(
  Array.from({ length: 4 }, () => Array<Cell>(4).fill(null))
);

  const [grid, setGrid] = useState<Cell[][]>(
    Array.from({ length: 4 }, () => Array<Cell>(4).fill(null))
  );

  const updateCell = (r: number, c: number, val: Cell) => {
    setGrid(prev =>
      prev.map((row, i) =>
        row.map((cell, j) =>
          i === r && j === c ? val : cell
        )
      )
    );
  };


  const handleKeyDown = (
  r: number,
  c: number,
  e: React.KeyboardEvent<HTMLInputElement>
) => {
  // 🔒 block editing of given cells
  if (givenGrid[r][c] !== null) return;

  if (e.key === "Backspace" || e.key === "Delete") {
    updateCell(r, c, null);
    return;
  }

  const n = Number(e.key);
  if (n >= 1 && n <= 4) {
    e.preventDefault();
    updateCell(r, c, n);
  }
};

  const handleGeneratePuzzle = () => {
  const puzzle = generatePuzzle();
  setGivenGrid(puzzle);
  setGrid(puzzle.map(row => [...row])); // deep copy
};

  const thickRight = (c: number) => c === 1;
  const thickBottom = (r: number) => r === 1;

  return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-neutral-900 to-black">
    <div className="rounded-xl p-6 bg-neutral-800 shadow-2xl">
      <div className="grid grid-cols-4 border-2 border-neutral-200">
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <input
                key={`${r}-${c}`}
                value={cell ?? ""}
                onKeyDown={e => handleKeyDown(r, c, e)}
                disabled={givenGrid[r][c] !== null}
                className={`
                    w-16 h-16
                    text-center text-2xl font-semibold
                    border border-neutral-600
                    caret-transparent
                    transition-colors
                    ${
                    givenGrid[r][c] !== null
                        ? "bg-neutral-700 text-neutral-300 cursor-not-allowed"
                        : "bg-neutral-900 text-neutral-100 hover:bg-neutral-800 focus:bg-neutral-700"
                    }
                    ${thickRight(c) ? "border-r-4 border-neutral-200" : ""}
                    ${thickBottom(r) ? "border-b-4 border-neutral-200" : ""}
                `}
            />
          ))
        )}
      </div>
    </div>

    {/* spacing between grid and button */}
    <div className="mt-6 flex items-center gap-4">
  <GeneratePuzzle onGenerate={handleGeneratePuzzle} />
  <Verify />
</div>
  </div>
);
}