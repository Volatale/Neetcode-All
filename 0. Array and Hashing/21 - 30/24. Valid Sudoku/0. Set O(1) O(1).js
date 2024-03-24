function isValidSudoku(board) {
  const seen = new Set();

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cellValue = board[row][col];

      //* Only operate on numbers, ignore unfilled spaces
      if (cellValue === ".") continue;

      const rowKey = `${cellValue}-row-${row}`;
      const colKey = `${cellValue}-col-${col}`;

      //* 8 // 3 = 2         7 // 3 = 2         [2][2] would target the last subgrid
      //* 5 / 3 = 1          1 / 3 = 0          [1][0] would target the 4th subgrid
      const r = Math.floor(row / 3);
      const c = Math.floor(col / 3);
      const subgridKey = `${cellValue}-subgrid-${r}${c}`;

      //* If any of these numbers were already found in previous "same" rows, columns or subgrids, the board is not valid
      if (seen.has(rowKey) || seen.has(colKey) || seen.has(subgridKey))
        return false;

      //* Mark it as seen
      seen.add(rowKey);
      seen.add(colKey);
      seen.add(subgridKey);
    }
  }

  return true;
}

console.log(
  isValidSudoku([
    ["5", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"],
  ])
); // True

console.log(
  isValidSudoku([
    ["8", "8", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"],
  ])
); // False

//* Time: O(1) - Both loops have 9 iterations, so the time taken does not scale with the input at all
//* The input is guaranteed to be of 9 length, and the inner arrays have 9 length too

//* Space: O(1) - There can be at most 9 rows, 9 columns and 9 subgrids
//* In the worst case, there are 81 keys in the set, which scales to O(1)
