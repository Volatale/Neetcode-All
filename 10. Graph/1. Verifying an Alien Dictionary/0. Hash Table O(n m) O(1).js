//* Create the ordering and save it using a map
//*     - char is the key, index is the value
//*     - "w" : 0 means that "w" is the 0th character in the alphabet (0-indexed)
//*     - "a" : 5 means  that "a" is the 5th character in the alphabet (0-indexed)
//* Then, iterate through the words in pairs
//* For each pair, iterate through both individual words
//*     - We want to find the first differing character
//*         - There is no need to compare characters AFTER this
//*         - One word will be lexicographically smaller or larger than the other with just 1 difference
//* If j < word2.length, word2 is a PREFIX of word1
//*     - Which tells us to return false immediately
//!     - Comparing an empty string to [a-z] would always result in "" < [a-z]
function alienDictionary(words, order) {
  const alphabet = {};

  //* [char] = index
  for (let i = 0; i < order.length; i++) {
    alphabet[order[i]] = i;
  }

  //* Take pairs of words and compare them
  for (let i = 0; i < words.length - 1; i++) {
    if (isLarger(words[i], words[i + 1], alphabet)) return false;
  }

  //* All words are sorted lexicographically
  return true;
}

function isLarger(s1, s2, alphabet) {
  for (let i = 0; i < s1.length && i < s2.length; i++) {
    //* Found the first differing character
    if (s1[i] !== s2[i]) {
      return alphabet[s1[i]] > alphabet[s2[i]];
    }
  }

  //* If s1 is a PREFIX of s2, s1 is lexicographically SMALLER
  //* So naturally, the reverse is true as well, "abc" < "abcd"
  return s1.length > s2.length;
}

console.log(
  alienDictionary(["hello", "leetcode"], "hlabcdefgijkmnopqrstuvwxyz")
);

console.log(alienDictionary(["hello", "helloa"], "hlabcdefgijkmnopqrstuvwxyz")); //* True

console.log(
  alienDictionary(["word", "world", "row"], "worldabcefghijkmnpqstuvxyz")
);
console.log(alienDictionary(["apple", "app"], "abcdefghijklmnopqrstuvwxyz"));

//* Time: O(n * m) - "n" is words.length, "m" is the length of the longest word in words
//* We iterate through every word in words and compare the lexicographical ordering
//* Building the alphabet takes O(26) since it will always be 26 length

//* Space: O(1) - The space used by the alphabet object is constant (26)
