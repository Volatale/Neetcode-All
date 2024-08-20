//* A symbol can either be 1 or 2 length
//* So at each step we have 2 choices
//! We also need to ignore leading zeroes

//! Recurrence Relation: F(n) = F(n + 1) + F(n + 2) (push DP)
//! or, F(n) = F(n - 1) + F(n - 2) (pull DP)
//* F(n) = No. of Ways to decode string starting from index "n" to the end of the strin

function numDecodings(s) {
  //* Base Cases
  if (s.length === 0 || s[0] === "0") return 0;

  const n = s.length;

  //* dp[i] = No. of Ways to decode string of length "i"
  const dp = new Array(n + 1).fill(0);

  //* Seed Values: exactly 1 way to decode a string of length 0 and length 1 respectively
  dp[0] = 1;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    //* Handle single char case
    if (s[i - 1] > "0") {
      dp[i] += dp[i - 1];
    }

    //* Handle double char case (ensure > 0 && <= 26)
    if (s[i - 2] === "1" || (s[i - 2] === "2" && s[i - 1] <= "6")) {
      dp[i] += dp[i - 2];
    }
  }

  return dp[n];
}

console.log(numDecodings("1")); //* 1
console.log(numDecodings("10")); //* 1
console.log(numDecodings("12")); //* 2
console.log(numDecodings("226")); //* 3
console.log(numDecodings("06")); //* 0
console.log(numDecodings("123")); //* 3
console.log(numDecodings("5232")); //* 2
console.log(numDecodings("10010202")); //* 0
console.log(numDecodings("2611055971756562")); //* 4
console.log(numDecodings("111111111111111111111111111111111111111111111")); //* 1836311903

//* Time: O(n) - It takes O9n) to create the DP array
//* Then we perform an O(n) for loop

//* Space: O(n) - The DP array's size scales with "n"
