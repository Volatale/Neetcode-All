//* We are given "n" as an input, and we need to know if it is a power of 4
//*     - Realistically, we can keep dividing "n" by 4 until we reach a base case
//! Negative exponents are not part of the problem
//*     - 4^-1 would be 1 / 4
//*     - b^-n = 1 / b^n
//*         - The base becomes the denominator
//*         - And exponents become positive
//* If n <= 0, OR, n is a decimal
//*     - We know that the input was not a power of 4
//* Otherwise, keep dividing "n" by 4 until we reach 1
function isPowerOfFour(n) {
  //* Base Case - Impossible to be a power of four
  if (n <= 0 || n % 1 !== 0) return false;

  //* "n" is a power of 4
  if (n === 1) return true;

  return isPowerOfFour(n / 4);
}

console.log(isPowerOfFour(16)); //* True
console.log(isPowerOfFour(5)); //* False
console.log(isPowerOfFour(1)); //* True
console.log(isPowerOfFour(0)); //* False
console.log(isPowerOfFour(-32)); //* False
console.log(isPowerOfFour(256)); //* True

//* Time: O(log n) - We divide "n" by 4 recursively until "n" equals 1

//* Space: O(1) - Assuming the language has tail call optimization, the space usage is constant
