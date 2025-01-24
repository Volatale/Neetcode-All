//* Instead of keeping all of the rows in memory
//* We can simply retain only the most recent row
//*     - The fact that this is possible implies a Dynamic Programming approach could work
function generate(rowIndex) {
  let triangle = [1];

  for (let row = 1; row <= rowIndex; row++) {
    //* The row always STARTS with a 1
    const newRow = [1];

    //* Populate the row by using the values from above
    for (let col = 1; col < row; col++) {
      const topLeft = triangle[col - 1];
      const top = triangle[col];

      newRow.push(topLeft + top);
    }

    //* And the row should always END with a 1
    newRow.push(1);
    triangle = newRow;
  }

  return triangle;
}

console.log(generate(3)); //* [1, 3, 3, 1]
console.log(generate(0)); //* [1]
console.log(generate(1)); //* [1, 1]

//* Time: O(numRows^2) - It takes O(numRows^2) to generate a Pascal Triangle
//* There are numRows rows, and within each row, we iterate one more time than the last row
//* So O(n * (n + 1) / 2) elements in total

//* Space: O(rowIndex) - The final row contains "rowIndex" elements
