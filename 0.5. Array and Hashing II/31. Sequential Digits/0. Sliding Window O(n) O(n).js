//* We can ONLY add numbers within the boundary
//* Thus, we should determine how many digits exist in both low and high
//*     - Any number that has a SMALLER amount of digits than low
//*     - Or, a larger amount of digits than high is invalid
//* Ultimately, we can use a sliding window approach
//* There are only 9 digits we can use "123456789" in that exact order
//* Thus, every (valid) sequential number is some substring of the above
function sequentialDigits(low, high) {
  const result = [];
  const digits = "123456789"; //* The only digits we can use

  const minDigits = Math.floor(Math.log10(low)) + 1;
  const maxDigits = Math.floor(Math.log10(high)) + 1;

  //* Apply a sliding window approach (try substrings of "digits")
  for (let len = minDigits; len <= maxDigits; len++) {
    for (let start = 0; start + len <= digits.length; start++) {
      const num = parseInt(digits.substring(start, start + len));

      //* Ensure it is within the boundary (inclusive)
      if (low <= num && num <= high) {
        result.push(num);
      }
    }
  }

  return result;
}

console.log(sequentialDigits(100, 300));
console.log(sequentialDigits(1000, 13000));
console.log(sequentialDigits(100, 123));

//* Time: O(n) - We are bounded by the number of digits (10), which is constant

//* Space: O(n) - Also bounded by the number of digits
