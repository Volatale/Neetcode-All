//* Instead of looping or using recursion, we can use math
//* log3(n) can tell us what to raise "x" to to reach n
//*     - log3(16) = 2, because 16 / 4 = 4, then 4 / 4 = 1
//*         - There are 2 divisions we can perform before reaching 1
//*     - 4^2 = 16 (x), log3(16) = 2 (exponent)
//* We know that "n" cannot be negative (or 0)
//* And we also know negative exponents cannot be part of the equation
//*     - b^-n = 1 / b^n

//* Change of Base Formula:
//! log(n) / log(3) won't work because of precision errors
//* We have to use log10 instead of the natural logarithm (log)
function isPowerOfThree(n) {
  //* n can't be negative, or 0, and must be an integer
  //* If log3(n) is a WHOLE number, "n" is a power of 3
  return n > 0 && (Math.log10(n) / Math.log10(3)) % 1 === 0;
}

console.log(isPowerOfThree(27)); //* True
console.log(isPowerOfThree(81)); //* True
console.log(isPowerOfThree(3)); //* True
console.log(isPowerOfThree(4)); //* False
console.log(isPowerOfThree(0)); //* False
console.log(isPowerOfThree(243)); //* True
console.log(isPowerOfThree(16)); //* False

//* Time: O(1) - We are directly computing logarithms

//* Space: O(1) - The space usage remains constant regardless of input size
