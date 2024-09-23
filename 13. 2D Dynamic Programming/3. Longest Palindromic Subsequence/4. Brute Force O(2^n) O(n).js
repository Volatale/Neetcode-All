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
function longestPalindromicSubsequence(s) {
  function findLPS(i, j) {
    if (i > j) return 0; //* No match
    if (i === j) return 1; //* Found a match on final character(s)

    if (s[i] === s[j]) {
      //* Found 2 matching characters, progress in BOTH directions
      return 2 + findLPS(i + 1, j - 1);
    }

    //* Keep the optimal choice
    return Math.max(findLPS(i + 1, j), findLPS(i, j - 1));
  }

  return findLPS(0, s.length - 1);
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

//* Time: O(2^n) - In the worst case, every call generates 2 branches if the characters never match
//* Therefore the branching factor is 2, and the height of the recursion tree scales with s.length

//* Space: O(n) - The height of the recursion tree scales with the length of the input
//* If one pointer passes the other, we immediately return, so we'll be at most "n" levels deep
