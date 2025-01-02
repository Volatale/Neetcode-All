//* A power of 2 must be a WHOLE number
//* And it must ALSO be >= 1
//* Thus, any number that is <= 0 is automatically NOT a power of 2
//*     - So return false immediately in those cases
//* If "n" is not divisible by 2, then we know "n" is not a power of two
//* At the end, if n === 1, then the original input was a pwoer of 2
//*     - Otherwise, the result of n / 2 would have been a decimal earlier on somewhere
function isPowerOfTwo(n) {
  //* 2^0 = 1, so anything less is NOT a power of 2
  if (n <= 0) return false;

  //* Keep dividing n by 2 while we can
  while (n % 2 === 0) {
    n /= -2;
  }

  //* If "n" is 1, the input was a power of two
  return n === 1;
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
//* The number of divisions (by 2) that are performed scales with the size of the input

//* Space: O(1) - We are not using any additional space that scales with the input size
