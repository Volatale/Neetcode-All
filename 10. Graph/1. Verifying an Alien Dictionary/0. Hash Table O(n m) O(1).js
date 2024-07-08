//* Create the ordering and save it using a map
//*     - char is the key, index is the value
//*     - "w" : 0 means that "w" is the 0th character in the alphabet (0-indexed)
//*     - "a" : 5 means  that "a" is the 5th character in the alphabet (0-indexed)
//* Then, iterate through the words in pairs
//* For each pair, iterate through both individual words
//*     - We want to find the first differing character
//*     - There is no need to compare characters AFTER this
//*         - One word will be lexicographically smaller or larger than the other with just 1 difference
//* If j < word2.length, word2 is a PREFIX of word1
//*     - Which tells us to return false immediately
//!     - Comparing an empty string to [a-z] would always result in "" < [a-z]
function isAlienSorted(words, order) {
  //* Get the ordering of each character
  const orderIndex = {};
  for (let i = 0; i < order.length; i++) {
    orderIndex[order[i]] = i; //* Char is key, order is index
  }

  //* Compare every adjacent pair of words (words.length - 1 to avoid out of bounds)
  //* Find the first differing char; compare the lexicographical ordering
  for (let i = 0; i < words.length - 1; i++) {
    const word1 = words[i];
    const word2 = words[i + 1];

    //* Compare each character of both words
    for (let j = 0; j < word1.length; j++) {
      //* word2 is a PREFIX of word1, which is not allowed; word2 should come BEFORE word1
      if (j === word2.length) return false;

      //* Found the differing character
      if (word1[j] !== word2[j]) {
        //* Word2 comes lexicographically before word1
        if (orderIndex[word2[j]] < orderIndex[word1[j]]) return false;
        break;
      }
    }
  }

  return true;
}

console.log(isAlienSorted(["hello", "leetcode"], "hlabcdefgijkmnopqrstuvwxyz"));
console.log(
  isAlienSorted(["word", "world", "row"], "worldabcefghijkmnpqstuvxyz")
);
console.log(isAlienSorted(["apple", "app"], "abcdefghijklmnopqrstuvwxyz"));

//* Time: O(n * m) - Where "n" is the length of words
//* "m" is the length of the longest word in words
//* For every word in words (n), we iterate over every character in the word (m)
//* It takes O(26) to populate the orderIndex object

//* Space: O(26) -> O(1) - The length of "order" is always 26
//* So there will always be 26 keys / values in the orderIndex object
