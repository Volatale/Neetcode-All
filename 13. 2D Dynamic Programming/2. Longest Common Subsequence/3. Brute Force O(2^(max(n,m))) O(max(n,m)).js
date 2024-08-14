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
  function LCS(i, j) {
    if (i === 0 || j === 0) return 0; //* About to go out of bounds

    if (text1[i - 1] === text2[j - 1]) {
      //* The characters match, so progress both at once
      return LCS(i - 1, j - 1) + 1;
    } else {
      //* The characters didn't match here, so try both paths
      return Math.max(LCS(i - 1, j), LCS(i, j - 1));
    }
  }

  return LCS(text1.length, text2.length);
}

console.log(longestCommonSubsequence("abcde", "ace")); //* 3
console.log(longestCommonSubsequence("abc", "abc")); //* 3
console.log(longestCommonSubsequence("abc", "def")); //* 0
console.log(
  longestCommonSubsequence(
    "abcdefghijklmnopqrstuvwxyz",
    "zyxwutssrqrqponmlkjihfedcba"
  )
); //* 2

//* Time: O(2^(max(n,m))) - Where "n" is text1 length and "m" is text2 length
//* In the worst case, none of the characters match and both are equal length
//* Each call would generate two extra calls since none match

//* Space: O(max(n, m)) - We reduce i or j by 1 each call (or both)
//* So in the worst case, the depth of the recursion tree is O(max(n, m))
//* Where "n" is the length of text1 and "m" is the length of text2
