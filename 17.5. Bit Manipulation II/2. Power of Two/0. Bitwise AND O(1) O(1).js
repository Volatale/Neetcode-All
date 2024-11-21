//* Powers of 2 in binary have exactly 1 set bit
//* Numbers that precede powers of two have exactly "k" set bits
//*     - Where "k" is the kth power of two
//* For example
//*     - 8 in binary is 1000 (1 set bit)
//*         - 8 = 2^3, so k = 3 here
//*     - 7 in binary is 0111 (3 set bits)
//*     -   1000
//*     - & 0111 = 0, so we know "n" (8) was a power of 2
//* 14 = 1110 in binary
//* 13 = 1101
//*     -   1110
//*     - & 1101
//*     - = 1100, which does NOT equal 0, so 14 is NOT a power of 2
function isPowerOfTwo(n) {
  //* 8 (1000) & 7 (0111) = 0, so 8 is a power of two
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
