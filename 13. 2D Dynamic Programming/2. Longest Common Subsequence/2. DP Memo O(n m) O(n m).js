//* A subsequence is just an ordered subset
//*     - For a subset, we have a CHOICE whether or not to include the current element
//*     - Given this logic, we just keep track of two positions (one for each input)
//* There are 2 cases to handle:
//*     - If both characters match, just progress both indices at once
//*     - Otherwise, take progress them both individually, and take the MAXIMUM of both paths

//* Apply memoization to avoid redundant work
//*     - memo[i][j] = Longest Common Substring ending at index i (text1) and index j (text2)
function longestCommonSubsequence(text1, text2) {
  function findLCS(i, j, memo) {
    //* Base Case: Hit last character
    if (i === text1.length || j === text2.length) {
      return 0;
    }

    //* Utilize memoized value
    const key = `${i}-${j}`;
    if (memo.hasOwnProperty(key)) return memo[key];

    if (text1[i] === text2[j]) {
      //* Found match at this level, progress both states
      return (memo[key] = findLCS(i + 1, j + 1, memo) + 1);
    } else {
      //* Try both paths, but don't add one, we didn't find a match at this level
      return (memo[key] = Math.max(
        findLCS(i + 1, j, memo),
        findLCS(i, j + 1, memo)
      ));
    }
  }

  return findLCS(0, 0, {});
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

//* Time: O(n * m) - We are memoizing the results of each subproblem
//* There are n possible indices for text1 and m possible indices for text2
//* Since we have two non-constant parameters, we get n * m possible unique states

//* Space: O(n * m) - Since there are n * m unique states, there could also be an equal number of keys/values
//* The depth of the recursion tree scales with the maximum length string
