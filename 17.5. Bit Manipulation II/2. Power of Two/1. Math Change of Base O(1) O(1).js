//* Use the change of base formula and check if n is a whole number at the end
//* It is essentially the same as checking the result of log2(n)
//*     - If the result is a whole number, we know it was a power of two
//! Remember, logarithms are an inverse
function isPowerOfTwo(n) {
  return n > 0 && (Math.log(n) / Math.log(2)) % 1 === 0;
}

console.log(isPowerOfTwo(1)); //* True
console.log(isPowerOfTwo(16)); //* True
console.log(isPowerOfTwo(3)); //* False
console.log(isPowerOfTwo(16)); //* True
console.log(isPowerOfTwo(128)); //* True
console.log(isPowerOfTwo(32)); //* True
console.log(isPowerOfTwo(4)); //* True
console.log(isPowerOfTwo(20)); //* False

//* Time: O(1) - Modern CPUs can calculate logarithms in constant time

//* Space: O(1) - We don't use any space that will scale with the input size
