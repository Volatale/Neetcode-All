//! Don't use this version, it may result in an overflow

//* Instead of handling carries, we can simply add up the numbers in "num" and add "k" to it
//*     - Use place value (n = n * 10 + nums[i])
//* Then, we get the number of digits in num + k
//*     - Math.floor(Math.log10(integer)) + 1
//* Finally, we iterate backwards and build the "new" array
//* Why do we iterate backwards?
//* Because the formula to calculate a number regardless of numeral system is:
//*     - Digit * base ^ n
//*     - If we have 2421, then we need something like
//*         - (2 * 10^3) + (4 * 10^2) + (2 * 10^1) + (1 * 10^0)
//* We are starting from the leftmost digit(s) (the most SIGNIFICANT digits)
function addToArrayForm(num, k) {
  const result = [];

  //* Used to represent the value of num + k
  let integer = 0;

  //* Iterate through the array and get the digits at each place value
  for (let i = 0; i < num.length; i++) {
    integer = integer * 10 + num[i];
  }

  integer += k;

  //* Get the number of digits
  const digits = Math.floor(Math.log10(integer)) + 1;

  //* Build the new array (starting from the leftmost digit)
  for (let i = digits - 1; i >= 0; i--) {
    const divisor = 10 ** i; //* Isolate the current digit
    const digit = Math.floor(integer / divisor); //* Get the (current) leftmost digit
    result.push(digit);
    integer %= divisor; //* Remove the (current) leftmost digit
  }

  return result;
}

console.log(addToArrayForm([1, 2, 0, 0], 34)); //* [1, 2, 3, 4] (1200 + 34 = 1234)
console.log(addToArrayForm([2, 7, 4], 181)); //* [4, 5, 5] (274 + 181 = 455)
console.log(addToArrayForm([2, 1, 5], 806)); //* [1, 0, 2, 1] (215 + 806 = 1021)
console.log(addToArrayForm([9, 9, 9], 9)); //* [1, 0, 0, 8] (999 + 9 = 1008)

//* Time: O(num) - The time taken scales with "num" itself

//* Space: O(num + k) - If we have num = 1, and k = 9999, then the final array would have 5 slots
