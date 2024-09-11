//* We need to generate EVERY possible valid solution
//*     - Therefore backtracking is probably the way forward
//* Generate every substring at every level
//*     - Any substring that exists in wordDict (or rather, our set) can progress the state
function wordBreak(s, wordDict) {
  function breakWord(index, curr) {
    if (index === s.length) {
      results.push(curr.join(" "));
      return;
    }

    //* Try every word as a candidate
    for (let i = index; i < s.length; i++) {
      const substring = s.substring(index, i + 1);

      if (words.has(substring)) {
        curr.push(substring); //* Explore candidate
        breakWord(i + 1, curr);
        curr.pop(); //* Un-explore candidate
      }
    }
  }

  const results = [];
  const words = new Set(wordDict);

  breakWord(0, []);

  return results;
}

console.log(wordBreak("catsanddog", ["cat", "cats", "and", "sand", "dog"]));
console.log(
  wordBreak("pineapplepenapple", [
    "apple",
    "pen",
    "applepen",
    "pine",
    "pineapple",
  ])
);
console.log(wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"]));

//* Time: O(2^n * n) - At each index, we have two options
//* Break the string (if it is valid), or don't break; continue expanding substrings
//* Within each call, we get the substring of (index, i + 1), which takes O(n) in the worst case
//* There are 2^n possible ways to break the string

//* Space: O(2^n * n) - There are 2^n possible ways to break the string
//* Each of these strings can potentially be a string of length "n"
//* The depth of the recursion tree scales with "n"
