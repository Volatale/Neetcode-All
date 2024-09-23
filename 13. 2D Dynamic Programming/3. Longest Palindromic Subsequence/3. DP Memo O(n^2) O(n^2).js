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
//* Apply memoization to avoid redundant work
//*     - We have two non-constant variables
//*     - Thus, we can say we have 2D state
function longestPalindromicSubsequence(s) {
  function findLPS(i, j, memo) {
    if (i > j) return 0; //* No match
    if (i === j) return 1; //* Found a match on final character(s)

    //* Utilize memoized value
    const key = `${i}-${j}`;
    if (memo.hasOwnProperty(key)) return memo[key];

    if (s[i] === s[j]) {
      //* Found 2 matching characters, progress in BOTH directions
      return (memo[key] = 2 + findLPS(i + 1, j - 1, memo));
    }

    //* Keep the optimal choice
    return (memo[key] = Math.max(
      findLPS(i + 1, j, memo),
      findLPS(i, j - 1, memo)
    ));
  }

  return findLPS(0, s.length - 1, {});
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

//* Time: O(n^2) - We are memoizing the results of each subproblem
//* There are "n" possible values for "i" and "n" possible values for "n"
//* So in total (rule of product), we get n * n = n^2

//* Space: O(n^2) - Since there are n^2 unique subproblems, there are also n^2 unique keys/values
//* The height of the recursion tree scales with the length of the input
//* If one pointer passes the other, we immediately return, so we'll be at most "n" levels deep
