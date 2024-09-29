//* A square is made up of 4 sides
//*     - But in our case we need to remain in the bounds
//!     - Cells that have a "0" do not count, so a "0" cell is another base case
//* Area of Square = a^2, where "a" is a side
//*     - This is why we return side * side (side^2)
//* We add one because we need to count the current cell
//*     [1] would mean all 3 calls return 0, then, 0 + 1 gives us an area of 1
//* We have 3 choices in where we want to move at each cell
//*     - Move right
//*     - Move down-right
//*     - Move down
//! There is no way to travel BACK UP
//*     - In other words, the matrix does NOT allow for cyclic movement
//*     - Therefore we could apply dynamic programming to reduce redundant work
function maximalSquare(matrix) {
  function findArea(row, col) {
    //* Either out of bounds or we found a 0
    if (!isValid(row, col) || matrix[row][col] === "0") return 0;

    return (
      //* Move in all 3 directions and take the minimum and add 1 (this cell)
      Math.min(
        findArea(row, col + 1), //* Right
        findArea(row + 1, col + 1), //* Down-right
        findArea(row + 1, col + 1) //* Down
      ) + 1
    );
  }

  function isValid(row, col) {
    return row >= 0 && col >= 0 && row < n && col < m;
  }

  const n = matrix.length;
  const m = matrix[0].length;

  let maxSide = 0;

  //* Try finding the path from every cell
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < m; col++) {
      if (matrix[row][col] === "1") {
        const side = findArea(row, col);
        maxSide = Math.max(maxSide, side);
      }
    }
  }

  //* Area of square = a^2 where "a" is a side
  return maxSide * maxSide;
}

console.log(maximalSquare([["1"]])); //* 1

console.log(
  maximalSquare([
    ["1", "1"],
    ["1", "1"],
  ])
); //* 4

console.log(maximalSquare([["0"]])); //* 0

console.log(
  maximalSquare([
    ["1", "0"],
    ["1", "0"],
  ])
); //* 1

console.log(
  maximalSquare([
    ["0", "0", "0"],
    ["0", "0", "0"],
  ])
); //* 0

console.log(
  maximalSquare([
    ["1", "1", "1"],
    ["1", "1", "1"],
    ["1", "1", "1"],
  ])
); //* 9

//* Time: O(n * m * 3^(min(n,m))) - We perform DFS starting from every valid ("1") cell
//* Each call generates 3 more calls in the worst case (because every cell could be a "1")
//* The maximum possible square side length is limited by the smaller of the two dimensions (n, m)
//* Thus, the height of the recursion tree scales with the minimum of the two dimensions

//* Space: O(min(n,m)) - The height of the recursion tree scales with the minimum of the two dimensions
