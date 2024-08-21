//* Symbols can only have 1 or 2 digits
//* So there are (at most) two calls at each step
//* Use memoizatin to avoid redundant work

//! Recurrence Relation: F(n) = F(n + 1) + F(n + 2)
//* F(n) = No. of Ways to decode string starting from index "n" to the end of the string

//! We have leading zeroes, so we should start from the LEFT and go RIGHT
//* There is no way to guarantee the correct result of we go right (n) to left (0)
function numDecodings(s) {
  function decode(i, memo) {
    if (i === s.length) return 1; //* Completed decoding
    if (s[i] === "0") return 0; //* Can't have leading zeroes

    //* Utilize memoized value
    if (memo.hasOwnProperty(i)) return memo[i];

    //* Handle "single" character case
    let ways = decode(i + 1, memo);

    //* Handle "double" character case
    if (i + 1 < s.length && s[i] <= "2" && s[i + 1] <= "6") {
      ways += decode(i + 2, memo);
    }

    memo[i] = ways;
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
