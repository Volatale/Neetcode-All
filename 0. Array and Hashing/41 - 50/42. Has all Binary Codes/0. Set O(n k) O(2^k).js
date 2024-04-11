//* Use a set to guarantee we don't count the same binary code twice
//* We know there HAS to be 2 ** k in the set MAX, because sets prevent dupilcates
//* Iterate through the string, and grab substrings of size k
function hasAllBinaryCodes(s, k) {
  const codes = new Set();

  for (let i = 0; i <= s.length - k; i++) {
    let substring = s.substring(i, i + k);
    codes.add(substring);
  }

  return codes.size === 1 << k;
}

console.log(hasAllBinaryCodes("00110", 2)); //* True
console.log(hasAllBinaryCodes("00110110", 2)); //* True
console.log(hasAllBinaryCodes("000110011100101110111", 3)); //* True
console.log(hasAllBinaryCodes("0110", 1)); //* True
console.log(hasAllBinaryCodes("0110", 2)); //* False

//* Time: O(n * k) - The outer loop scales proportionally with "n" (the input length)
//* The substring function takes O(k) time to finish

//* Space O(2^k) - We are still generating all possible binary codes in the worst case
//* Take "0110": that would be "0" and "1", so the set would have {"0", "1"}
