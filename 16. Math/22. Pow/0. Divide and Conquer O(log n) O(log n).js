//* We "could" use Math.pow(), but that wouldn't pass the interview
//* Take a look at how exponents actually work and how they can be formed
//* For example:
//*     - 2^5
//*         - 2^2 * 2^3
//*         - 2^4 * 2
//*         - 2 * 2 * 2 * 2 * 2
//! There are lots of ways we can build up to exponential numbers
//* If we have 2^4, instead of literally calculating 2^4
//*     - We can instead just multiply 2^2 by itself
//*     - Remember, 2^2 * 2^2 === 2^4
//! Apply a divide and conquer approach
//*     - But remember to handle the case where "n" is odd
//*     - Within each call, divide "n" by 2
//*         - Eventually n will be odd, which means we need to handle the "extra" power
//*         - 2^5 = (2^2 * 2^2 * 2)
//*         - So on the final stack frame, we multiply 2^4 by n
//*             - This gives us 2^4 * 2 = 2^5
//! Negative exponents are handled using reciprocals
//*     - 2^-5 = 1 / 2^5
//*         - The exponent becomes positive, and we divide 1 by the new form
//*     - 2^-4 = 1 / 2^4 = 1 / 16
function pow(x, n) {
  function calc(x, n) {
    //* 0^n is always 0
    if (x === 0) return 0;

    //* n^0 is always 1
    if (n === 0) return 1;

    //* Divide "n" by 2 and multiply the result by itself
    //* This allows us to avoid having two branches per level
    let result = calc(x, Math.floor(n / 2));
    result = result * result; //* 2^4 = 2^2 * 2^2

    //* If "n" is odd, we need to multiply by "x" more more time
    //* 2^5 = 2^4 * n
    return n % 2 === 1 ? x * result : result;
  }

  //* Take the absolute value (handles negative exponents)
  const result = calc(x, Math.abs(n));

  //* Negative exponents are handled using the reciprocal (2^-3 = 1 / 2^3)
  return n >= 0 ? result : 1 / result;
}

console.log(pow(2.0, 10)); //* 1024.00000
console.log(pow(2.1, 3)); //* 9.26100
console.log(pow(2.0, -2)); //* 0.25000
console.log(pow(2.0, 7)); //* 128
console.log(pow(3, 4)); //* 81
console.log(pow(2, 5)); //* 81

//* Time: O(log n) - The number of recursive calls made scales with log2(n)

//* Space: O(log n) - Since we are using recursion, there are O(log n) stack frames
