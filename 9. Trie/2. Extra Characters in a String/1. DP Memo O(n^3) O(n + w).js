function minExtraChar(s, dictonary) {
  function dfs(index) {
    if (index === s.length) return 0; //* Base Case; at the end of the string
    if (memo.hasOwnProperty(index)) return memo[index]; //* Utilize memoization

    //* "+ 1" because this is an additional character we SKIP
    let extraChars = dfs(index + 1) + 1;

    //* Get every PREFIX starting at "index"
    for (let i = index; i < s.length; i++) {
      if (words.has(s.substring(index, i + 1))) {
        extraChars = Math.min(extraChars, dfs(i + 1));
      }
    }

    memo[index] = extraChars; //* Set up memoization
    return extraChars;
  }

  //* Convert to set for Θ(1) lookup
  const words = new Set(dictonary);
  const memo = {};

  return dfs(0);
}

console.log(minExtraChar("abca", ["a", "b", "c"]));
console.log(minExtraChar("abcdef", ["abc", "bcdef"]));
console.log(minExtraChar("leetscode", ["leet", "code", "leetcode"]));
console.log(minExtraChar("sayhelloworld", ["hello", "world"]));

//* Time: O(n^3) - We call "dfs" "n" times without using the memoized values
//* Within each call, we do a loop that also scales with n (in the worst case)
//* The loop contains a substring call, which can take O(n) in the worst case as well
//* O(n * n * n) === O(n^3)

//* Space: O(n + w) - The depth of the recursion is "n"; we move forward by 1 index each call
//* Since this is 1D DP, the memo object stores "n" keys where each key is an "index" in "s"
//* The space used by the substring is transient; it only exists briefly and is not stored on each stack frame
//* "w" represents the space used for the set (in other words, w === dictionary.length)
