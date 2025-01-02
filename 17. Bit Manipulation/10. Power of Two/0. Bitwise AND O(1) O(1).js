//* We can solve the problem using bit manipulation if we make some observations
//*     - Binary inherently operates using powers of 2 (so it is efficient)
//* All powers of 2 have a SINGLE set bit
//* All numbers that IMMEDIATELY PRECEDE a power of 2 has "n" set bits
//*     - Where "n" is the corresponding power of 2 that it precedes
//*     - For example, 8 = 2^3, and 7 has exactly (3) set bits
//* So we can tell if a number is a power of two using Bitwise AND
//*     - 8 & 7 === 0
//* The general formula would be:
//*     - n > 0 && n & (n - 1) === 0
//* Why n > 0?
//*     - The smallest power of 2 that exists is 1
//*     - So naturally, anything LESS than 1 is automatically invalid
function isPowerOfTwo(n) {
  //* 8 (1000) & 7 (0111) = 0 (0000), so 8 is a power of two
  //* 14 (1110) & 13 (1101) = 12 (1100), so 14 is NOT a power of 2
  return n > 0 && (n & (n - 1)) === 0;
}

console.log(isPowerOfTwo(1)); //* True
console.log(isPowerOfTwo(16)); //* True
console.log(isPowerOfTwo(3)); //* False
console.log(isPowerOfTwo(16)); //* True
console.log(isPowerOfTwo(128)); //* True
console.log(isPowerOfTwo(32)); //* True
console.log(isPowerOfTwo(4)); //* True
console.log(isPowerOfTwo(20)); //* False

//* Time: O(1) - Technically bit manipulation's time complexity depends on the CPU itself
//* But modern CPUs can handle bitwise operations instantaneously, so we assume constant time

//* Space: O(1) - We don't use any space that will scale with the input size
