//* A power of 2 must be a WHOLE number
//* And it must also be >= 1
//* A number being a power of two means it must divide evenly by 2
//* So if "n" is not divisible by 2
//*     - The input was not a power of two
//* If at the end, n == 1, then the input was a power of two
//*     - Otherwise, "n" would have become a decimal at some point earlier
function isPowerOfTwo(n) {
  if (n <= 0) return false;

  //* Keep dividing n by 2 while we can
  while (n % 2 === 0) {
    n /= 2;
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

//* Time: O(log2 n) - The function scales logarithmically with n; there are log2(n) divisions to reach 1

//* Space: O(1) - We don't use any space that will scale with the input size
