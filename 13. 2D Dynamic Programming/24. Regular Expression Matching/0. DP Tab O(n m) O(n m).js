//* This problem is similar to Longest Common Subsequence, with extra conditions
//! If we find a star, we can either USE the star, or DON'T use the star
//*     - Using the star means "j" shouldn't move
//*         - We need to be able to repeat this character as many times as we want
//*     - NOT using the star means we skip to j + 2 (because j + 1 is the star itself)
//* Otherwise, check for a regular match (where s[i] === p[j]) or (p[j] === ".")
//*     - In which case, we just progress both pointers
//* If there is STILL no match, there will never be a match
//*     - Return false

//* Apply tabulation to avoid redundant work
//*     - We have 2D state (i, j)
function isMatch(s, p) {
  const n = s.length;
  const m = p.length;

  //* dp[i][j] = Whether or not we can match s (up to i) using pattern p (up to j)
  const dp = new Array(n + 1).fill(0).map(() => new Array(m + 1).fill(false));

  //* An empty string always matches an empty pattern
  dp[n][m] = true;

  //* Iterate BACKWARDS
  for (let i = n; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      //* Either match characters literally or with a wildcard
      const match = i < n && (s[i] === p[j] || p[j] === ".");

      //* Case 1: Check for stars
      if (j + 1 < m && p[j + 1] === "*") {
        dp[i][j] =
          dp[i][j + 2] || //* Don't use star
          (match && dp[i + 1][j]); //* Use star
      }

      //* Case 2: Regular match
      else if (match) {
        dp[i][j] = dp[i + 1][j + 1]; //* Progress both
      }
    }
  }

  return dp[0][0];
}

console.log(isMatch("aaa", "a*")); //* True
console.log(isMatch("abc", "abc")); //* True (exact match)
console.log(isMatch("aaa", "a*")); //* True (greedy match)
console.log(isMatch("ueowqlsmxcjks", ".*")); //* True (universal match)
console.log(isMatch("aa", "a")); //* False
console.log(isMatch("aaaabbbbcccc", "a*b*c*")); //* True
console.log(isMatch("xxxzzzyyy", "x*y*z*")); //* False
console.log(isMatch("aab", "c*a*b")); //* True

//* Time: O(n * m) - We are caching the results of each subproblem
//* There are "n" possible values for "i" and "m" possible values for "m"
//* Rule of product: n * m unique subproblems

//* Space: O(n * m) - Since there are n * m unique subproblems, there are n * m keys/values to cache
