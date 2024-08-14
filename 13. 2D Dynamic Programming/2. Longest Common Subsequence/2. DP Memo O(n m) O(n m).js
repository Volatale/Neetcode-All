//* Start from the entire string
//* At each step, remove 1 character from consideration
//* If either word has no characters left (would be going out of bounds)
//*     - Return 0, the LCS of an empty string is 0
//* If the characters in both words match at the current indices
//*     - Progress BOTH indices (states) at once and add 1
//*     - We add 1 because we found a successful match
//* Otherwise, no characters match
//*     - Ignore the current character in text1, and then do the same for text2

//* Recurrence Relation: if i || j === 0, return 0
//* If text1[i-1] === text2[j-1] return LCS + 1, progress both states at once
//* Else return Math.max(LCS(i-1, j), LCS(i, j-1))
function longestCommonSubsequence(text1, text2) {
  function LCS(i, j, memo) {
    if (i === 0 || j === 0) return 0; //* About to go out of bounds

    const key = `${i}-${j}`;
    if (memo.hasOwnProperty(key)) return memo[key];

    if (text1[i - 1] === text2[j - 1]) {
      //* The characters match, so progress both at once
      memo[key] = LCS(i - 1, j - 1, memo) + 1;
      return memo[key];
    } else {
      //* The characters didn't match here, so try both paths
      memo[key] = Math.max(LCS(i - 1, j, memo), LCS(i, j - 1, memo));
      return memo[key];
    }
  }

  return LCS(text1.length, text2.length, {});
}

console.log(longestCommonSubsequence("abcde", "ace")); //* 3
console.log(longestCommonSubsequence("abc", "abc")); //* 3
console.log(longestCommonSubsequence("abc", "def")); //* 0
console.log(
  longestCommonSubsequence(
    "abcdefghijklmnopqrstuvwxyz",
    "zyxwutsrqrqponmlkjihfedcba"
  )
); //* 2

//* Time: O(n * m) - We have two non-constant variables, i and j
//* Which means there are (n + 1) rows and (m + 1) columns
//* The number of states scales with n * m

//* Space: O(n * m) - The number of states scales with n * m
//* The depth of the recursion tree scales with max(n, m)
//* Where "n" is text1 length and "m" is text2 length
//* In the worst case, no characters match at all
