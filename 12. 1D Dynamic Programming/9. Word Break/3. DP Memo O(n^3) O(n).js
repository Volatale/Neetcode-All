//! This is a Dynamic Programming Problem
//*     - Optimal Substructure exists because we only need to find ONE path to the final index
//*         - The moment we find that, we can stop all searches (return true on every stack frame)
//*     - There are overlapping subproblems because
function wordBreak(s, wordDict) {
  function breakWord(index, memo) {
    //* Base case has been hit
    if (index === s.length) return true;

    //* Utilize memoized value
    if (memo.hasOwnProperty(index)) return memo[index];

    //* Explore every substring from this stack frame
    for (let i = index; i < s.length; i++) {
      const substring = s.substring(index, i + 1);

      //* Pruning: only explore VALID paths
      if (words.has(substring) && breakWord(index + substring.length, memo)) {
        memo[index] = true;
        return true; //* Don't explore other paths
      }
    }

    //* No valid segmentation found from this index
    memo[index] = false;
    return false;
  }

  const words = new Set(wordDict);
  return breakWord(0, {});
}

console.log(wordBreak("leetcode", ["leet", "code"])); //* True
console.log(wordBreak("applepenapple", ["apple", "pen"])); //* True
console.log(wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"])); //* false
console.log(wordBreak("catsanddog", ["cats", "dog", "sand", "and", "cat"])); //* true
console.log(wordBreak("sss", ["s"])); //* true
console.log(wordBreak("sonic", ["s", "o", "n", "i", "c"])); //* true
console.log(wordBreak("abc", ["a"])); //* False

//* Time: O(n^3) - We are memoizing the results of subproblems
//* There are "n" possible indices, within each call we have an O(n) loop (in the worst case)
//* And within each iteration, we create a substring that can be of length "n" in the worst case
//* O(n) * O(n) * O(n) = O(n^3)

//* Space: O(n) - The depth of the recursion tree scales with the length of the input
//* At each step, we create a substring that, in the worst case, has a length of "n"
//* If we assume an engine has BAD memory management, the space usage is actually O(n^2)
//*     - In this case, there are n^2 substrings in total and they all exist on the stack at once
