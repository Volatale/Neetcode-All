//* All in all, we want to generate every row
//* There are "n" rows in total, and each starts and begins with a 1
//*     - Except the first row, which is just [1]
//* The ith element (starting at index 1, up to n - 1 where n is the row length)
//*     - Is equal to the element to our top left + the element to our top right
function generate(numRows) {
  if (numRows === 1) return [[1]];

  const triangle = [[1]];

  for (let row = 1; row < numRows; row++) {
    //* The row always STARTS with a 1
    const newRow = [1];

    //* Populate the row by using the values from above
    for (let col = 1; col < row; col++) {
      const topLeft = triangle[row - 1][col - 1];
      const top = triangle[row - 1][col];

      newRow.push(topLeft + top);
    }

    //* And the row should always END with a 1
    newRow.push(1);
    triangle.push(newRow);
  }

  return triangle;
}

console.log(generate(5)); //* [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
console.log(generate(1)); //* [[1]]
console.log(generate(3)); //* [[1],[1,1],[1,2,1]]

//* Time: O(numRows^2) - It takes O(numRows^2) to generate a Pascal Triangle
//* There are numRows rows, and within each row, we iterate one more time than the last row
//* So O(n * (n + 1) / 2) elements in total

//* Space: O(numRows^2) - There are n * (n + 1) / 2 elements in total, which is exponential
