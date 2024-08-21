//* Symbols can only have 1 or 2 digits
//* So there are (at most) two calls at each step
//* Use Recursion to break the subproblems down

//! Recurrence Relation: F(n) = F(n + 1) + F(n + 2)
//* F(n) = No. of Ways to decode string starting from index "n" to the end of the string

//! We have leading zeroes, so we should start from the LEFT and go RIGHT
//* There is no way to guarantee the correct result of we go right (n) to left (0)
function numDecodings(s) {
  function decode(index) {
    if (index === s.length) return 1; //* Completed decoding
    if (s[index] === "0") return 0; //* Can't have leading zeroes

    let ways = 0;

    //* Take substrings starting from "index" to i
    for (let i = index; i < Math.min(i + 2, s.length); i++) {
      const substring = s.substring(index, i + 1);
      const num = parseInt(substring);

      //* Ensure the number is within bounds
      if (num <= 26) {
        ways += decode(i + 1);
      }
    }

    return ways;
  }

  if (s.length === 0 || s[0] === "0") return 0;

  return decode(0);
}

console.log(numDecodings("12")); //* 2
console.log(numDecodings("226")); //* 3
console.log(numDecodings("06")); //* 0
console.log(numDecodings("123")); //* 3
console.log(numDecodings("5232")); //* 2
console.log(numDecodings("10010202")); //* 0
console.log(numDecodings("111111111111111111111111111111111111111111111")); //* 1836311903

//* Time: O(2^n) - A digit can either be 1 or 2 characters long
//* So each call leads to two more calls in the worst case

//* Space: O(n) - A substring in this problem can only have a length of "2" at most
//* The depth of our recursion tree is "n" since we increase "i" by 1 each call
