//* Apply a BFS-like approach to explore all 8 neighbors of the current cell
//* We also need to track the number of cells that are within bounds in each "surrounding search"
//* For each cell, we need to calculate the average
//*     - Add the surrounding cells to the sum
//*     - Increment the number of "included" cells (this is the divisor of average)
//*     - matrix[row][col] = Math.floor(sum / cells)

//! Bit Manipulation version
//* Generally speaking, a number can be represented by 32-bits
//* We can store the "averaged" value in the NEXT 8 bits
//*     - Each cell can hold a value in the range [0, 255]
//*     - So all we have to do is store the averaged number like this:
//*         - img[row][col] = img[row][col] ^ (Math.floor(sum / cells) << 8)
//*         - The left shift by 8 "dodges" the "initial" value that was in that cell
///*        - Then, to access ONLY the initial value, we can do img[row][col] % 256
//* At the very end, for every cell, we need to right shift by 8 to knock off the "inital value" in that cell
function imageSmoother(img) {
  function inBounds(row, col) {
    return row >= 0 && row < ROWS && col >= 0 && col < COLS;
  }

  const directions = [
    [-1, -1], //* Up-left
    [0, -1], //* Up
    [1, -1], //* Up-right
    [-1, 0], //* Left
    [0, 0], //* Center
    [1, 0], //* Right
    [-1, 1], //* Down-left
    [0, 1], //* Down
    [1, 1], //* Right
  ];

  const ROWS = img.length;
  const COLS = img[0].length;

  //* Iterate over every cell in the input and sum each direction
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      let sum = 0;
      let cells = 0;

      //* Check the surrounding cells and sum them
      for (const [r, c] of directions) {
        const newRow = row + r;
        const newCol = col + c;

        //* 2^8 = 256 in binary, similar to how n % 10 = last digit in decimal
        if (inBounds(newRow, newCol)) {
          sum += img[newRow][newCol] & 255; //* We only want the last 8 bits
          cells++;
        }
      }

      //* Store the "averaged" number within the NEXT 8 bits
      //* Left shift by 8 to dodge the previous bits, ^ or | combines bits
      img[row][col] = img[row][col] ^ (Math.floor(sum / cells) << 8);
    }
  }

  //* Right shift every number by 8 to get the filtered values
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      img[row][col] >>= 8;
    }
  }

  return img;
}

console.log(
  imageSmoother([
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ])
); //* [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

console.log(
  imageSmoother([
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25],
  ])
); //* [[4, 4, 5, 6, 7], [6, 7, 8, 9, 9], [11, 12, 13, 14, 14], [16, 17, 18, 19, 19], [19, 19, 20, 21, 22]];

console.log(
  imageSmoother([
    [100, 200, 100],
    [200, 50, 200],
    [100, 200, 100],
  ])
); //* [[137, 141, 137], [141, 138, 141], [137, 141, 137]]

console.log(imageSmoother([[1, 2, 3]])); //* [[1, 2, 2]]

//* Time: O(n * m) - We have to iterate over every row/column position
//* Within each inner iteration, we have an O(9) loop to check the neighboring positions
//* But O(9 * n * m ) simplifies to O(n * m)

//* Space: O(1) - We are storing the initial value for each cell AND the averaged cell in place
