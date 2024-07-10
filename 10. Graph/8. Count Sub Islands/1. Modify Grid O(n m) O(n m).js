//* Iterate through the matrices until grid2 === 1 and grid1 === 0
//* DFS into grid2 and turn the cells into 0s
//* Then iterate one more time through grid 2 and DFS again
//* Track the number of sub islands we can find
function countSubIslands(grid1, grid2) {
  function dfs(row, col) {
    if (!inBounds(row, col, ROWS, COLS) || grid2[row][col] === 0) return;

    grid2[row][col] = 0;

    for (let [r, c] of directions) {
      dfs(row + r, col + c);
    }
  }

  const ROWS = grid1.length;
  const COLS = grid1[0].length;

  const directions = [
    [-1, 0], //* Up
    [0, 1], //* Right
    [1, 0], //* Down
    [0, -1], //* Left
  ];

  let subIslands = 0;

  //* Remove all of the non-common sub islands
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (grid2[row][col] === 1 && grid1[row][col] === 0) {
        dfs(row, col);
      }
    }
  }

  //* Count the sub islands
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (grid2[row][col] === 1) {
        dfs(row, col);
        subIslands++;
      }
    }
  }

  return subIslands;
}

function inBounds(row, col, ROWS, COLS) {
  return row >= 0 && col >= 0 && row < ROWS && col < COLS;
}

console.log(
  countSubIslands(
    [
      [1, 1, 1],
      [0, 0, 1],
      [0, 1, 1],
    ],
    [
      [0, 1, 1],
      [0, 0, 0],
      [0, 0, 1],
    ]
  )
);

console.log(
  countSubIslands(
    [
      [1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1],
      [0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 1, 0, 1, 1],
    ],
    [
      [1, 1, 1, 0, 0],
      [0, 0, 1, 1, 1],
      [0, 1, 0, 0, 0],
      [1, 0, 1, 1, 0],
      [0, 1, 0, 1, 0],
    ]
  )
); //* 3

console.log(
  countSubIslands(
    [
      [1, 0, 1, 0, 1],
      [1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1],
      [1, 0, 1, 0, 1],
    ],
    [
      [0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1],
      [0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0],
      [1, 0, 0, 0, 1],
    ]
  )
); //* 2

//* Time: O(n * m) - We iterate through the entire array (n * m)
//* At worst we call DFS n * m times since we process each cell once at most

//* Space: O(n * m) - The depth of the call stack is n * m in the worst case
