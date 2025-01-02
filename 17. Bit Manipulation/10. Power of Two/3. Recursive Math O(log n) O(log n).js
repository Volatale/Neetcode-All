//* A power of 2 must be a WHOLE number
//* And it must ALSO be >= 1
//* Thus, any number that is <= 0 is automatically NOT a power of 2
//*     - So return false immediately in those cases
//! The only odd power of two is "1" itself
//*     - Thus, if n % 2 !== 0, the number is NOT a power of two and it never will be
//* If "n" is not divisible by 2, then we know "n" is not a power of two
//* At the end, if n === 1, then the original input was a pwoer of 2
//*     - Otherwise, the result of n / 2 would have been a decimal earlier on somewhere
function isPowerOfTwo(n) {
  if (n === 1) return true; //* "n" is a power of 2
  if (n <= 0 || n % 2 !== 0) return false; //* The input was not a power of 2

  return isPowerOfTwo(n / 2);
}

console.log(isPowerOfTwo(1)); //* True
console.log(isPowerOfTwo(16)); //* True
console.log(isPowerOfTwo(3)); //* False
console.log(isPowerOfTwo(16)); //* True
console.log(isPowerOfTwo(128)); //* True
console.log(isPowerOfTwo(32)); //* True
console.log(isPowerOfTwo(4)); //* True
console.log(isPowerOfTwo(20)); //* False

//* Time: O(log2 n) - The time taken scales logarithmically with the input size
//* The depth of the recursion stack scales with the size of the original input (n)

//* Space: O(log2 n) or O(1) - If TCO is possible, then the space usage is constant
//* Otherwise, the space usage scales with the size of "n"
