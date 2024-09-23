//* A subsequence is an ordered subset
//*     - In a subset, we have a CHOICE whether to include the current element or not
//*     - For our case, we can only "include" (or count) the current element(s) if they match
//! Use a Brute Force approach + Two Pointers
//*     - Start both pointers on opposite sides
//*     - If the characters match (s[i] === s[j]), then we know these are fine
//*         - Progress BOTH points in their respective directions
//*     - Otherwise, try progressing both characters, but not at the same time
//*         - Take the maximum of both paths (since we want the LONGEST palindromic subsequence)
//* Why brute force?
//*     - There is no guarantee that skipping a character just because it doesn't match is a good idea
//*         - Based on that logic, skipping the "b" in "aaabaaa" is a good idea
//*         - But if we can predict the future, we know that choosing to keep the "b" results in the optimal result
//!             - Thus, we shouldn't make a greedy (locally optimal) choice

//! Recurrence Relation: F(i, j) = F(i + 1, j + 1) OR max(F(i + 1, j),F(i, j + 1))
//* Apply tabulation to avoid recursion overhead
//*     - We have two non-constant variables
//*     - Thus, we can say we have 2D state
//* Optimize space by only keeping two rows in memory at once
function longestPalindromicSubsequence(s) {
  if (s.length === 0) return 0;

  const n = s.length;

  //* dp[i][j] = Length of the longest palindrome subsequence between indices i and j
  let dp = new Array(n).fill(0);
  let prevRow = new Array(n).fill(0);

  //* Reliance on [i + 1] means the "below" subproblem must be computed first
  //* "j = i + 1" ensures we never go out of bounds on the left
  for (let i = n - 1; i >= 0; i--) {
    //* A character on its own is always a palindrome of length 1
    dp[i] = 1;

    for (let j = i + 1; j < n; j++) {
      if (s[i] === s[j]) {
        //* Found 2 matching characters, progress in BOTH directions
        dp[j] = prevRow[j - 1] + 2;
      } else {
        //* Keep the optimal choice
        dp[j] = Math.max(prevRow[j], dp[j - 1]);
      }
    }

    const temp = dp;
    dp = prevRow;
    prevRow = temp;
  }

  //* Length of longest palindromic substring starting at index 0 and n - 1
  return prevRow[n - 1];
}

console.log(longestPalindromicSubsequence("bab")); //* 3
console.log(longestPalindromicSubsequence("bbbab")); //* 4
console.log(longestPalindromicSubsequence("abcde")); //* 1
console.log(longestPalindromicSubsequence("a")); //* 1
console.log(longestPalindromicSubsequence("aaabbbeeebbbaaa")); //* 15
console.log(longestPalindromicSubsequence("ayuuea")); //* 4
console.log(
  longestPalindromicSubsequence("fkldwwaldalsdkowgjwoaasdjkoigejiopajf")
); //* 15

//* Time: O(n^2) - We are caching the results of each subproblem
//* There are "n" possible values for "i" and "n" possible values for "n"
//* So in total (rule of product), we get n * n = n^2

//* Space: O(n) - We only need to keep the current and previous row in memory
//* So the space usage now solely depends on "n"
