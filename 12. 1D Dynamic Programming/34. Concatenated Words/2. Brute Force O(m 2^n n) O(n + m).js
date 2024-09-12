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
function findAllConcatenatedWordsInADict(words) {
  function breakWord(index, word) {
    //* Successfully built entire word
    if (index === word.length) return true;

    //* Try every character in the word
    for (let i = index; i < word.length; i++) {
      const substring = word.substring(index, i + 1);

      if (wordDict.has(substring) && breakWord(i + 1, word)) {
        return true;
      }
    }

    return false;
  }

  const results = [];
  const wordDict = new Set();

  //* Ensures larger words are built with 2 or more smaller words
  words.sort((a, b) => a.length - b.length);

  //* Try to perform "Word Break" on every word
  for (const word of words) {
    if (breakWord(0, word)) {
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

console.log(findAllConcatenatedWordsInADict(["cat", "dog", "catdog"])); //* ["catdog"]
console.log(findAllConcatenatedWordsInADict(["son", "ic", "a", "e", "sonic"])); //* ["sonic"]
console.log(
  findAllConcatenatedWordsInADict(["a", "b", "c", "d", "ab", "ac", "ad"])
); //* ["ab", "ac", "ad"]

//* Time: O(m * (2^n * n)) - Where "m" is the number of words and "n" is the length of the longest word
//* Similar to Word Break, at each index, we either break the word or continue
//* This leads to a branching factor of 2
//* Within each iteration of the loop, we create a substring, which could take O(n) in the worst case
//* The depth of the recursion tree scales with the length of the longest word
//* The sorting takes O(m log m) but this is dominated by the breakWord() function

//* Space: O(n + m) - The depth of the recursion scales with the length of the longest word
//* In each iteration, we create a substring of length "n" in the worst case
//* The wordDict holds all "m" words in the worst case
//* Sorting uses O(m) space since there are "m" words
//* The results array also stores up to "m" words in the worst case
