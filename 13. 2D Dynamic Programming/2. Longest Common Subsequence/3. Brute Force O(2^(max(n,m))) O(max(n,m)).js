//* A subsequence is just an ordered subset
//*     - For a subset, we have a CHOICE whether or not to include the current element
//*     - Given this logic, we just keep track of two positions (one for each input)
//* There are 2 cases to handle:
//*     - If both characters match, just progress both indices at once
//*     - Otherwise, take progress them both individually, and take the MAXIMUM of both paths
function longestCommonSubsequence(text1, text2) {
  function findLCS(i, j) {
    //* Base Case: Hit last character
    if (i === text1.length || j === text2.length) {
      return 0;
    }

    if (text1[i] === text2[j]) {
      //* Found match at this level, progress both states
      return findLCS(i + 1, j + 1) + 1;
    } else {
      //* Try both paths, but don't add one, we didn't find a match at this level
      return Math.max(findLCS(i + 1, j), findLCS(i, j + 1));
    }
  }

  return findLCS(0, 0);
}

console.log(longestCommonSubsequence("abcde", "ace")); //* 3
console.log(longestCommonSubsequence("aaaaa", "a")); //* 1
console.log(longestCommonSubsequence("abc", "abc")); //* 3
console.log(longestCommonSubsequence("xyz", "huj")); //* 0
console.log(
  longestCommonSubsequence(
    "abcdefghijklmnopqrstuvwxyz",
    "zyxwutsrqrqponmlkjihfedcba"
  )
); //* 2

//* Time: O(2^max(n,m)) - Where "n" is text1.length and "m" is text2.length
//* In the worst case, none of the characters ever match
//* So we have extra calls for each individual call
//* The depth of the recursion tree scales with the maximum of n and m

//* Space: O(max(n,m)) - In the worst case, we are only progressing one index
//* So the other one lags behind
