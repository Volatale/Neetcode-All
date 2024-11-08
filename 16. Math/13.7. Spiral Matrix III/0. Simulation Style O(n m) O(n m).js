//* We can travel in the same direction TWICE
//*     - Track the number of times we have consecutively traveled in the same direction
//*     - When this number reaches 2, we reset the count and increase the STEP count
//* Every two moves we make, we need to move ONE extra cell to avoid revisiting a cell on the next move
//*     - 1 -> 1 -> 2 -> 2 -> 3 -> 3 -> 4 -> 4 -> 5 -> 5 -> 6 -> 6
//*     - This is the natural progression of moves
//* Change directions afer EVERY move
function spiralMatrixIII(rows, cols, rStart, cStart) {
  function isInBounds(row, col) {
    return row >= 0 && col >= 0 && row < rows && col < cols;
  }

  //* There is only one cell
  if (rows === 1 && cols === 1) return [[0, 0]];

  const cells = [[rStart, cStart]];
  const totalCells = rows * cols;

  const directions = [
    [0, 1], //* Right (0)
    [1, 0], //* Down (1)
    [0, -1], //* Left (2)
    [-1, 0], //* Up (3)
  ];

  let dir = 0; //* Start by moving right
  let stepCount = 1; //* Applied to the directions above
  let row = rStart;
  let col = cStart;
  let moves = 0; //* When this reaches 2, change directions

  while (cells.length < totalCells) {
    //* We can only move TWICE in the same direction
    for (let step = 0; step < stepCount; step++) {
      const [r, c] = directions[dir];
      row += r;
      col += c;

      //* Only push cells that are in bounds
      if (isInBounds(row, col)) {
        cells.push([row, col]);
      }
    }

    moves++;

    //* Start the counter again and increase the step count
    if (moves === 2) {
      moves = 0;
      stepCount++;
    }

    //* We change direction after every move
    dir = (dir + 1) % 4;
  }

  return cells;
}

console.log(spiralMatrixIII(1, 4, 0, 0));
console.log(spiralMatrixIII(5, 6, 1, 4));
console.log(spiralMatrixIII(1, 1, 0, 0));

//* Time: O(n * m) - Ultimately, we end up exploring every cell and then some
//* The number of iterations scales with the number of rows and columns we have
//* The loop only terminates when we have explored every possible (valid) cell

//* Space: O(n * m) - The cells array's size scales proportionally with the number of rows and columns
//* The directions array always uses O(4) space, but this is a constant amount
