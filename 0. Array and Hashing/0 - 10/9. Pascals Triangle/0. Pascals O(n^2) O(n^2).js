//* Start with a result of [[1]] to represent the first row (it will always be 1)
//* We can assume that the first index and last index will always be 1
//* This makes it easier to handle out of bounds errors
//* The inner loop starts at col = 1 to guaranteed that we never out of bounds
//* It also ends 1 before the last index in the row to leave room for the trailing 1
function pascalsTriangle(numRows) {
  const result = [[1]];

  for (let row = 1; row < numRows; row++) {
    const newRow = [1]; //* The first number is ALWAYS 0

    //* We can safely look up-left because the edge case was handled above
    //* [row-1][col] will always exist because this row has 1 more element than the last
    for (let col = 1; col < row; col++) {
      const topLeft = result[row - 1][col - 1];
      const top = result[row - 1][col];

      newRow.push(topLeft + top);
    }

    newRow.push(1); //* The last number is ALWAYS 0
    result.push(newRow);
  }

  return result;
}

console.log(pascalsTriangle(1)); // [[1]]
console.log(pascalsTriangle(3)); // [[ 1 ], [ 1, 1 ], [ 1, 2, 1 ]]
console.log(pascalsTriangle(5)); // [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]

//* Time: O(n^2) - There are n rows, and n columns
//* The number of inner loops is effectively tied to the input
//* "row" is tied to numRows (the input), and col is tied to "row"

//* Space: O(n^2) - Once again, there are "n" rows, with "n" columns in the result array
