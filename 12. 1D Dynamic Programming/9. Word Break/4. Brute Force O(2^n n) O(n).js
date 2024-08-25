//* We essentially need to get to the end of the string
//*     - In which case, we can return true
//* Take substrings from the current index
//*     - If the substring exists in the dictionary, continue the search
//*     - Otherwise, we can't reach the end of the string
function wordBreak(s, wordDict) {
  function breakWord(index) {
    //* Base case has been hit
    if (index === s.length) return true;

    //* Explore every substring from this stack frame
    for (let i = index; i < s.length; i++) {
      const substring = s.substring(index, i + 1);

      //* Pruning: only explore VALID paths
      if (words.has(substring) && breakWord(i + 1)) {
        return true; //* Don't explore other paths
      }
    }

    //* No valid segmentation found from this index
    return false;
  }

  const words = new Set(wordDict);
  return breakWord(0);
}

console.log(wordBreak("leetcode", ["leet", "code"])); //* True
console.log(wordBreak("applepenapple", ["apple", "pen"])); //* True
console.log(wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"])); //* false
console.log(wordBreak("catsanddog", ["cats", "dog", "sand", "and", "cat"])); //* true
console.log(wordBreak("sss", ["s"])); //* true
console.log(wordBreak("sonic", ["s", "o", "n", "i", "c"])); //* true
console.log(wordBreak("abc", ["a"])); //* False

//* Time: O(2^n * n) - There are 2^n possible ways to partition the string into valid substrings
//* Each partitioning involves an O(n) substring check

//* Space: O(n) - The depth of the recursion tree scales with the length of the input
//* At each step, we create a substring that, in the worst case, has a length of "n"
//* If we assume an engine has BAD memory management, the space usage is actually O(n^2)
//*     - In this case, there are n^2 substrings in total and they all exist on the stack at once
