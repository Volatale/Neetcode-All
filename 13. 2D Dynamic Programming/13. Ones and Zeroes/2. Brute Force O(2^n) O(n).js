//* The problem involves subsets
//*     - Naturally, finding the OPTIMAL subset requires computing EVERY possible subset
//*     - At each step, we either INCLUDE the current element or we EXCLUDE it
//* There is no heuristic we can use to determine the (locally) optimal decision
//*     - And we need the globally optimal result, so we need to apply a brute force approach
//! Precompute the frequency of each element's numbers
//*     - Otherwise, we need to do a loop of "m" length within each call
//*         - Where "m" is the length of the longest string in strs ()
//*         - This would increase the time complexity to O(2^n * m) from O(2^n)
function findMaxForm(strs, m, n) {
  function findSubset(i, zeroes, ones) {
    //* Base Case: Out of bounds, or can't fit more of either number
    if (i === strs.length || (zeroes === 0 && ones === 0)) return 0;

    let largest = 0;

    //* Case 1: Include current string
    const str = freq[strs[i]];

    const zeroesLeft = zeroes - str[0];
    const onesLeft = ones - str[1];

    //* Ensure we don't have to few zeroes or ones remaining
    if (zeroesLeft >= 0 && onesLeft >= 0) {
      largest = Math.max(largest, findSubset(i + 1, zeroesLeft, onesLeft) + 1);
    }

    //* Case 2: Exclude current string
    largest = Math.max(largest, findSubset(i + 1, zeroes, ones));

    return largest;
  }

  //* Precompute the frequency of every string
  const freq = {};

  for (const str of strs) {
    const count = [0, 0];

    for (let i = 0; i < str.length; i++) {
      if (str[i] === "0") {
        count[0]++;
      } else {
        count[1]++;
      }
    }

    freq[str] = count;
  }

  return findSubset(0, m, n);
}

console.log(findMaxForm(["10", "0001", "111001", "1", "0"], 5, 3)); //* 4
console.log(findMaxForm(["10", "0", "1"], 1, 1)); //* 2
console.log(findMaxForm(["1", "0", "1"], 1, 2)); //* 3
console.log(findMaxForm(["1000"], 30, 30)); //* 1
console.log(findMaxForm(["1", "1", "1"], 1, 3)); //* 3
console.log(findMaxForm(["101", "1", "0", "10", "1", "10101"], 2, 3)); //* 4

//* Time: O(2^n) - At each step we have two choices: include or exclude the current element
//* The height of the recursion tree scales with "n" (the number of elements in strs)
//* It takes O(n * m) to count the frequency of every element in strs (but this is dominated by the O(2^n))

//* Space: O(n) - The frequency map has "n" keys / values, and each value is an array of length 2
//* The height of the recursion tree scales with the number of strings
