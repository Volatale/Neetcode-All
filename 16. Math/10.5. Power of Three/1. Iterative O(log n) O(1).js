//* We are given "n" as an input, and we need to know if it is a power of 3
//*     - Realistically, we can keep dividing "n" by 3 until we reach a base case
//! Negative exponents are not part of the problem
//*     - 3^-1 would be 1 / 3
//*     - b^-n = 1 / b^n
//*         - The base becomes the denominator
//*         - And exponents become positive
//* If n <= 0, OR, n is a decimal
//*     - We know that the input was not a power of 3
//* Otherwise, keep dividing "n" by 3 until we reach 1
function isPowerOfThree(n) {
  //* Base Case - Impossible to be a power of four
  if (n <= 0 || n % 1 !== 0) return false;

  //* Keep dividing "n" by 3 until we hit 0
  while (n % 3 === 0) {
    n /= 3;
  }

  return n === 1;
}

console.log(isPowerOfThree(27)); //* True
console.log(isPowerOfThree(81)); //* True
console.log(isPowerOfThree(3)); //* True
console.log(isPowerOfThree(4)); //* False
console.log(isPowerOfThree(0)); //* False
console.log(isPowerOfThree(243)); //* True
console.log(isPowerOfThree(16)); //* False

//* Time: O(log n) - We divide "n" by 3 repeatedly until "n" equals 1

//* Space: O(1) - The space usage remains constant regardless of the input size
