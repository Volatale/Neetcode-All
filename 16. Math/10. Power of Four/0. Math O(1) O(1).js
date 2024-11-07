//* Instead of looping or using recursion, we can use math
//* log4(n) can tell us what to raise "x" to to reach n
//*     - log4(16) = 2, because 16 / 4 = 4, then 4 / 4 = 1
//*         - There are 2 divisions we can perform before reaching 1
//*     - 4^2 = 16 (x), log4(16) = 2 (exponent)
//* We know that "n" cannot be negative (or 0)
//* And we also know negative exponents cannot be part of the equation
//*     - b^-n = 1 / b^n

//! Apply the Change of Base formula to convert log4(n)
//* log_b(x) = log_e(x) / log_e(b)
function isPowerOfFour(n) {
  //* n can't be negative, or 0, and must be an integer
  //* If log4(n) is a WHOLE number, "n" is a power of 4
  return n > 0 && (Math.log(n) / Math.log(4)) % 1 === 0;
}

console.log(isPowerOfFour(16)); //* True
console.log(isPowerOfFour(5)); //* False
console.log(isPowerOfFour(1)); //* True
console.log(isPowerOfFour(0)); //* False
console.log(isPowerOfFour(-32)); //* False
console.log(isPowerOfFour(256)); //* True

//* Time: O(1) - We are directly computing logarithms

//* Space: O(1) - The space usage remains constant regardless of input size
