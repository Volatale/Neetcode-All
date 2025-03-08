//* In a brute force manner, we can try every possible substring
//* Track the cumulative cost of the current substring
//* If the cost is ever > maxCost, the current substring is invalid
//*     - So we should immediately break out of the inner loop
function equalSubstring(s, t, maxCost) {
  let longest = 0;

  for (let i = 0; i < s.length; i++) {
    let cost = 0; //* Tracks cost of current substring

    for (let j = i; j < s.length; j++) {
      //* "a" - "a" === (97 - 97) === 0
      cost += Math.abs(s[j].charCodeAt(0) - t[j].charCodeAt(0));

      //* This is an invalid substring
      if (cost > maxCost) break;

      //* Potentially update the best so far
      longest = Math.max(longest, j - i + 1);
    }
  }

  return longest;
}

console.log(equalSubstring("abcd", "bcdf", 3)); //* 3
console.log(equalSubstring("abcd", "cdef", 3)); //* 1
console.log(equalSubstring("abcd", "acde", 0)); //* 1

//* Time: O(n^2) - We have nested for loops, both of which scale with s.length (n)

//* Space: O(1) - The memory usage remains constant regardless of input size
