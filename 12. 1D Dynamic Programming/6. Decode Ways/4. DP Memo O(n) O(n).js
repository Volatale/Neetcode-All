//* Symbols can only have 1 or 2 digits
//* So there are (at most) two calls at each step
//* Use Memoization to avoid redundant work

//! Recurrence Relation: F(n) = F(n + 1) + F(n + 2)
//* F(n) = No. of Ways to decode string starting from index "n" to the end of the string

//! We have leading zeroes, so we should start from the LEFT and go RIGHT
//* There is no way to guarantee the correct result of we go right (n) to left (0)
function numDecodings(s) {
  function decode(index, memo) {
    if (index === s.length) return 1; //* Completed decoding
    if (s[index] === "0") return 0; //* Can't have leading zeroes

    //* Utilize memoized value
    if (memo.hasOwnProperty(index)) return memo[index];

    let ways = 0;

    //* Take substrings starting from "index" to i + 2
    for (let i = index; i < Math.min(i + 2, s.length); i++) {
      const substring = s.substring(index, i + 1);
      const num = parseInt(substring);

      //* Ignore leading zeroes
      if (substring.length > 1 && substring[0] === "0") continue;
      if (substring.length > 2) break; //* Symbols can only be 1 or 2 digits

      //* Ensure the number is within bounds
      if (num <= 26) {
        ways += decode(i + 1, memo);
      }
    }

    memo[index] = ways;
    return ways;
  }

  return decode(0, {});
}

console.log(numDecodings("12")); //* 2
console.log(numDecodings("226")); //* 3
console.log(numDecodings("06")); //* 0
console.log(numDecodings("123")); //* 3
console.log(numDecodings("5232")); //* 2
console.log(numDecodings("10010202")); //* 0
console.log(numDecodings("111111111111111111111111111111111111111111111")); //* 1836311903

//* Time: O(n) - We memoize subproblems - this is 1D DP so there is only 1 dimension
//* Thus, memoization reduces the time complexity down to O(n)

//* Space: O(n) - There are "n" unique subproblems that may need to be memozied
//* So in the worst case, the memo object stores "n" keys
//* The depth of the recursion tree scales with the length of the input
