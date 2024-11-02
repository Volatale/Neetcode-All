//* Sum BOTH diagonals simultaneously
//* We only need a single iteration to handle both values at each index
//* Use the two pointers logic we can apply to check for palindromes
//*     - "i" is the "left" value, and "n - 1 - i" gives us the "right" value
//* If "n" is odd, we end up adding the middle value twice
//*     - So to handle that case, check if "n" is odd
//*     - If it is, subtract mat[mid][mid] from the sum
//*         - This allows us to only verify this case at the very end
function diagonalSum(mat) {
  //* There is only one number, so return that
  if (mat.length === 1) return mat[0][0];

  let n = mat.length;
  let sum = 0;

  //* Add both values at the same time for each "i"
  for (let i = 0; i < n; i++) {
    sum += mat[i][i] + mat[n - 1 - i][i];
  }

  //* If "n" is odd, we can't include the middle value twice, so subtract one occurrence
  if (n % 2 !== 0) {
    const mid = Math.floor((n - 1) / 2);
    sum -= mat[mid][mid];
  }

  return sum;
}

console.log(
  diagonalSum([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
); //* 25

console.log(
  diagonalSum([
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
  ])
); //* 8

console.log(diagonalSum([[5]])); //* 5

console.log(
  diagonalSum([
    [5, 10],
    [10, 15],
  ])
); //* 40

//* Time: O(n) - Even though we are given a matrix, we can handle both values for the diagonals simultaneously
//* So we only have to do "n" iterations (a single for loop) to calculate everything

//* Space: O(1) - The space complexity is constant since the memory usage does not scale with input size
