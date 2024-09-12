//* This problem is essentially Word Break, but with EVERY word in the dictionary
//*     - We are trying to find which words in the dict that we can make using words in the dict
//* Perform Word Break on every word
//*     - If it is possible to make it to the end of the ENTIRE string
//*     - Using words in the dictionary, then we push the string to the results array
//!         - AFTER trying each word, add it to the wordDict
//*         - This helps handle cases of "sonic", ["sonic"]
//*             - The result array contains words that have been CONCATENATED
//*             - In other words, two or more words join to create a word in the dictionary
//*         - By adding words only after trying them, we ENSURE words are concatenated
//! Sort the words in order of length (ascending)
//*     - LARGER words are created by CONCATENATING SMALLER WORDS
//*     - Thus, it only makes sense to test the smaller words first
//*         - By the time the larger words need testing, the smallest words are already in the dictionary

//* Apply Tabulation to avoid recursion overhead
//* Also use a Cache to avoid creating substrings in each iteration
function findAllConcatenatedWordsInADict(words) {
  function breakWord(word) {
    const n = word.length;

    //* dp[i] = Whether or not we can break the string up to index "i"
    const dp = new Array(n + 1).fill(false);

    //* It is always possible to break an empty string
    dp[0] = true;

    //* "i" is the CURRENT index we're trying (end of substring)
    //* "j" is the previous index (start of substring)
    for (let i = 1; i <= n; i++) {
      for (let j = 0; j < i; j++) {
        if (!dp[j]) continue;

        const substring = word.substring(j, i);

        if (wordDict.has(substring)) {
          dp[i] = true;
          break;
        }
      }
    }

    return dp[n];
  }

  const results = [];
  const wordDict = new Set();

  //* Ensures larger words are built with 2 or more smaller words
  words.sort((a, b) => a.length - b.length);

  //* Try to perform "Word Break" on every word
  for (const word of words) {
    if (breakWord(word)) {
      results.push(word);
    }

    //* This word can now be used to help build future words
    wordDict.add(word);
  }

  return results;
}

console.log(
  findAllConcatenatedWordsInADict([
    "cat",
    "cats",
    "catsdogcats",
    "dog",
    "dogcatsdog",
    "hippopotamuses",
    "rat",
    "ratcatdogcat",
  ])
); //* ["catsdogcats", "dogcatsdog", "ratcatdogcat"]

debugger;
console.log(findAllConcatenatedWordsInADict(["cat", "dog", "catdog"])); //* ["catdog"]
console.log(findAllConcatenatedWordsInADict(["son", "ic", "a", "e", "sonic"])); //* ["sonic"]
console.log(
  findAllConcatenatedWordsInADict(["a", "b", "c", "d", "ab", "ac", "ad"])
); //* ["ab", "ac", "ad"]

//* Time: O(m * n^3) - Where are "m" words and "n" is the length of the longest word
//* We are caching the results of each subproblem so we lose the exponential time complexity
//* This reduces the time complexity down to O(n^2)
//* We create a substring in each iteration, so O(n) in the worst case n * n^2 = n^3
//* It takes O(m log m) to sort, but this is dominated by the quadratic complexity

//* Space: O(n + m) - The depth of the recursion scales with the length of the longest word
//* In each iteration, we create a substring of length "n" in the worst case
//* The wordDict holds all "m" words in the worst case
//* Sorting uses O(m) space since there are "m" words
//* Since there are "n" indices in the worst case, there could be "n" keys/values in the memo object
//* The results array also stores up to "m" words in the worst case
