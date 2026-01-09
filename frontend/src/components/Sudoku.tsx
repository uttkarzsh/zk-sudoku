import { useState, useRef } from "react";
import { FaGithub } from "react-icons/fa";
import { generatePuzzle } from "../sudoku/logic";
import GeneratePuzzle from "./GeneratePuzzle";
import Verify from "./Verify";

type Cell = number | null;

type VerifyStatus = 
  | "idle"
  | "proving"
  | "verifying"
  | "success"
  | "failure";

export default function Sudoku() {
  const [givenGrid, setGivenGrid] = useState<Cell[][]>(
    Array.from({ length: 4 }, () => Array<Cell>(4).fill(null))
  );

  const [grid, setGrid] = useState<Cell[][]>(
    Array.from({ length: 4 }, () => Array<Cell>(4).fill(null))
  );

  const [status, setStatus] = useState<VerifyStatus>("idle");

  const inputRefs = useRef<(HTMLInputElement | null)[][]>(
    Array.from({ length: 4 }, () => Array(4).fill(null))
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
  if (givenGrid[r][c] !== null && !e.key.startsWith("Arrow")) return;

  let nextR = r;
  let nextC = c;

  switch (e.key) {
    case "ArrowUp":
      nextR = Math.max(0, r - 1);
      break;
    case "ArrowDown":
      nextR = Math.min(3, r + 1);
      break;
    case "ArrowLeft":
      nextC = Math.max(0, c - 1);
      break;
    case "ArrowRight":
      nextC = Math.min(3, c + 1);
      break;
    default:
      break;
  }

  if (e.key.startsWith("Arrow")) {
    e.preventDefault();
    inputRefs.current[nextR][nextC]?.focus();
    return;
  }

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
    setGrid(puzzle.map(row => [...row]));
    setStatus("idle");  
  };

  const normalizeGrid = (grid: Cell[][]): number[][] =>
    grid.map(row => row.map(cell => cell ?? 0));

  const thickRight = (c: number) => c === 1;
  const thickBottom = (r: number) => r === 1;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-neutral-900 to-black">
      <div className="fixed top-6 right-6 z-50">
  <a
    href="https://github.com/uttkarzsh/zk-sudoku"
    target="_blank"
    rel="noopener noreferrer"
    className="
      flex items-center gap-2
      px-3 py-1.5
      text-xs
      border border-white/80
      text-white
      hover:bg-white hover:text-black
      transition-colors
    "
  >
    <FaGithub className="text-sm" />
    GitHub
  </a>
</div>
      <h1 className="
        text-3xl sm:text-4xl
        font-mono font-bold
        tracking-widest
        text-emerald-300
        mb-12
      ">
        ZK&nbsp;SUDOKU
      </h1>
      <div className="rounded-xl p-6 bg-neutral-800 shadow-2xl">
        <div className="grid grid-cols-4 border-2 border-neutral-200">
          {grid.map((row, r) =>
            row.map((cell, c) => (
              <input
                  ref={el => {inputRefs.current[r][c] = el}}
                  key={`${r}-${c}`}
                  value={cell ?? ""}
                  readOnly
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

      <div className="mt-6 flex items-center gap-4">
        <GeneratePuzzle onGenerate={handleGeneratePuzzle} />
        <Verify given= {normalizeGrid(givenGrid)} solution = {normalizeGrid(grid) } onStatus={setStatus}/>
      </div>
        {status !== "idle" && (
        <p className="mt-6 text-sm font-medium text-neutral-300">
          {status === "proving" && "Generating zero-knowledge proof…"}
          {status === "verifying" && "Verifying proof…"}
          {status === "success" && (
            <span className="text-emerald-400">
              Noir Gud. Proof Gud.
            </span>
          )}
          {status === "failure" && (
            <span className="text-red-400">
              Oh no... 
            </span>
          )}
        </p>
      )}
    </div>
  );
}