import { type Grid, type Cell } from "./types.ts";

const DIGITS = [1, 2, 3, 4];

export const isValidPlacement = (
  grid: Grid,
  r: number,
  c: number,
  val: number
): boolean => {
  if (grid[r].includes(val)) return false;
  if (grid.some(row => row[c] === val)) return false;

  const br = Math.floor(r / 2) * 2;
  const bc = Math.floor(c / 2) * 2;

  for (let i = br; i < br + 2; i++) {
    for (let j = bc; j < bc + 2; j++) {
      if (grid[i][j] === val) return false;
    }
  }

  return true;
};

const forwardCheck = (grid: Grid): boolean => {
  // rows
  for (let r = 0; r < 4; r++) {
    for (const v of DIGITS) {
      if (grid[r].includes(v)) continue;

      let possible = false;
      for (let c = 0; c < 4; c++) {
        if (grid[r][c] === null && isValidPlacement(grid, r, c, v)) {
          possible = true;
          break;
        }
      }

      if (!possible) return false;
    }
  }

  // columns
  for (let c = 0; c < 4; c++) {
    for (const v of DIGITS) {
      if (grid.some(row => row[c] === v)) continue;

      let possible = false;
      for (let r = 0; r < 4; r++) {
        if (grid[r][c] === null && isValidPlacement(grid, r, c, v)) {
          possible = true;
          break;
        }
      }

      if (!possible) return false;
    }
  }

  // boxes
  for (let br = 0; br < 4; br += 2) {
    for (let bc = 0; bc < 4; bc += 2) {
      for (const v of DIGITS) {
        let possible = false;

        for (let r = br; r < br + 2; r++) {
          for (let c = bc; c < bc + 2; c++) {
            if (grid[r][c] === v) {
              possible = true;
              break;
            }
            if (grid[r][c] === null && isValidPlacement(grid, r, c, v)) {
              possible = true;
              break;
            }
          }
          if (possible) break;
        }

        if (!possible) return false;
      }
    }
  }

  return true;
};

export const generatePuzzle = (): Grid => {
  const grid: Grid = Array.from({ length: 4 }, () => Array<Cell>(4).fill(null));

  const target = Math.floor(Math.random() * 2) + 3; // 3–4 clues
  let placed = 0;
  let attempts = 0;

  while (placed < target && attempts < 200) {
    attempts++;

    const r = Math.floor(Math.random() * 4);
    const c = Math.floor(Math.random() * 4);

    if (grid[r][c] !== null) continue;

    const shuffled = [...DIGITS].sort(() => Math.random() - 0.5);

    for (const v of shuffled) {
      if (!isValidPlacement(grid, r, c, v)) continue;

      grid[r][c] = v;

      if (forwardCheck(grid)) {
        placed++;
        break;
      }

      grid[r][c] = null;
    }
  }

  return grid;
};