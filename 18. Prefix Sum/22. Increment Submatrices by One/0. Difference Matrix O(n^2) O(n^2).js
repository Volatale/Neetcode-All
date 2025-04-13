//* For each query, do the following:
//*     - Add 1 to every element in the submatrix with the top-left corner (row1, col1)
//*     - And the bottom-right corner (row2, col2)
//* So put literally, simply add 1 to every element in the range
//*     - We are essentially performing range queries
//* We only need to return the matrix AFTER performing every query
//* Thus, we can just use the difference array technique

function rangeAddQueries(n, queries) {
  const diff = new Array(n + 1).fill(0).map(() => new Array(n + 1).fill(0));

  //* Diff Array =  diff[left] += val, diff[right + 1] -= val
  //* Just apply the same concept to a 2D matrix
  for (const [r1, c1, r2, c2] of queries) {
    diff[r1][c1] += 1; //* Top-left

    if (r2 + 1 < n) diff[r2 + 1][c1] -= 1; //* Bottom Left
    if (c2 + 1 < n) diff[r1][c2 + 1] -= 1; //* Top-right
    if (r2 + 1 < n && c2 + 1 < n) diff[r2 + 1][c2 + 1] += 1; //* Bottom-right
  }

  //* Calculate the prefix matrix
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (row > 0) diff[row][col] += diff[row - 1][col]; //* Top
      if (col > 0) diff[row][col] += diff[row][col - 1]; //* Left
      if (row > 0 && col > 0) diff[row][col] -= diff[row - 1][col - 1]; //* Top-left
    }
  }

  return diff.slice(0, n).map((row) => row.slice(0, n));
}

console.log(
  rangeAddQueries(3, [
    [1, 1, 2, 2],
    [0, 0, 1, 1],
  ])
); //* [[1, 1, 0], [1, 2, 1], [0, 1, 1]]

console.log(rangeAddQueries(2, [[0, 0, 1, 1]])); //* [[1, 1], [1, 1]]

//* Time: O(n^2) - There are "q" queries, all of which can be completed in O(1) time
//* However, calculating the prefix matrix takes O(n^2)

//* Space: O(n^2) - The memory usage scales with the input size (n)
