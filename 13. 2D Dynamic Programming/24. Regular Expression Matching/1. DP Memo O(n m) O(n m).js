//* This problem is similar to Longest Common Subsequence, with extra conditions
//! If we find a star, we can either USE the star, or DON'T use the star
//*     - Using the star means "j" shouldn't move
//*         - We need to be able to repeat this character as many times as we want
//*     - NOT using the star means we skip to j + 2 (because j + 1 is the star itself)
//* Otherwise, check for a regular match (where s[i] === p[j]) or (p[j] === ".")
//*     - In which case, we just progress both pointers
//* If there is STILL no match, there will never be a match
//*     - Return false

//* Apply memoization to avoid redundant work
//*     - We have 2D state (i, j)
function isMatch(s, p) {
  function findMatch(i, j) {
    //* Base Case: Matched the entire pattern
    if (i >= s.length && j >= p.length) return true;

    //* Base Case: "s" isn't done matching, but there are no more candidates in "p"
    if (j >= p.length) return false;

    //* Boolean that tells us if we found a match
    const match = i < s.length && (s[i] === p[j] || p[j] === ".");

    //* Case 1: Check for stars
    if (j + 1 < p.length && p[j + 1] === "*") {
      return (
        findMatch(i, j + 2) || //* Try NOT using star
        (match && findMatch(i + 1, j)) //* Use star (don't inc j), but only if we found a match
      );
    }

    //* Case 2: Found regular match
    if (match) {
      return findMatch(i + 1, j + 1);
    }

    //* There is no match regardless of what we do
    return false;
  }

  return findMatch(0, 0);
}

console.log(isMatch("abc", "abc")); //* True (exact match)
console.log(isMatch("aaa", "a*")); //* True (greedy match)
console.log(isMatch("ueowqlsmxcjks", ".*")); //* True (universal match)
console.log(isMatch("aa", "a")); //* False
console.log(isMatch("aaaabbbbcccc", "a*b*c*")); //* True
console.log(isMatch("xxxzzzyyy", "x*y*z*")); //* False
console.log(isMatch("aab", "c*a*b")); //* True

//* Time: O(n * m) - We are memoizing the results of each subproblem
//* There are "n" possible values for "i" and "m" possible values for "m"
//* Rule of product: n * m unique subproblems

//* Space: O(n * m) - Since there are n * m unique subproblems, there are n * m keys/values to cache
//* The height of the recursion tree scales with "s"
