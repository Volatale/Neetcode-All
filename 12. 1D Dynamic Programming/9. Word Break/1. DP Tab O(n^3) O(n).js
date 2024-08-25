//* We essentially need to get to the end of the string
//*     - In which case, we can return true
//* Take substrings from the current index
//*     - If the substring exists in the dictionary, continue the search
//*     - Otherwise, we can't reach the end of the string

//* Apply Tabulation to avoid the recursion overhead
function wordBreak(s, wordDict) {
  const words = new Set(wordDict);
  const n = s.length;

  //* dp[i] = Whether or not it is possible to find words that take us to the i-th index
  const dp = new Array(n + 1).fill(false);

  //* We can always get to the 0-th index
  dp[0] = true;

  for (let i = 0; i <= n; i++) {
    //* No need to check further
    if (!dp[i]) continue;

    //* Check substrings
    for (let j = i + 1; j <= n; j++) {
      const substring = s.substring(i, j);

      //* We can get from index i to j
      if (words.has(substring)) {
        dp[j] = true;
      }
    }
  }

  return dp[n];
}

console.log(wordBreak("leetcode", ["leet", "code"])); //* True
console.log(wordBreak("applepenapple", ["apple", "pen"])); //* True
console.log(wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"])); //* False
console.log(wordBreak("catsanddog", ["cats", "dog", "sand", "and", "cat"])); //* True
console.log(wordBreak("sss", ["s"])); //* True
console.log(wordBreak("sonic", ["s", "o", "n", "i", "c"])); //* True
console.log(wordBreak("abc", ["a"])); //* False

//* Time: O(n^3) - We are memoizing the results of subproblems
//* We have a nested for loop, so O(n^2)
//* Then it takes O(n) in the worst case to generate the substring (of length n)

//* Space: O(n) - The depth of the recursion tree scales with the length of the input
//* At each step, we create a substring that, in the worst case, has a length of "n"
