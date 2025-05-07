//* Given a string pattern and string s, we need to check if s follows the same pattern
//* In this case "follow" means a full match:
//*     - Each letter in pattern maps to exactly one unique word in s
//*     - Each unique word in s maps to exactly one letter in pattern
//*     - No two letters map the same word, and no two words map to the same letter
//* In other words, we need to perform a two-way mapping between letters in pattern and words in s
//* Use maps to store the mapping between letters and words
//* This can be reduced to checking if the two strings are isomorphic
//*     - In other words, checking if they have the same structure
//*     - For example, "egg" and "add" are isomorphic, but "foo" and "bar" are not
function wordPattern(pattern, s) {
  //* Get all of the words in s
  const words = s.split(" ");

  //* It is impossible for the two strings to be isomorphic
  if (pattern.length !== words.length) return false;

  //* These maps are used to track the mappings
  const sToP = {};
  const pToS = {};

  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    const word = words[i];

    //* The character/word is already mapped to something else
    if (
      (sToP.hasOwnProperty(char) && sToP[char] !== word) ||
      (pToS.hasOwnProperty(word) && pToS[word] !== char)
    ) {
      return false;
    }

    //* Create the mapping between character and word
    sToP[char] = word;
    pToS[word] = char;
  }

  //* The two strings are isomorphic
  return true;
}

console.log(wordPattern("ab", "dog cat")); //* True
console.log(wordPattern("abba", "dog cat cat dog")); //* True
console.log(wordPattern("abba", "dog cat cat fish")); //* False
console.log(wordPattern("aaaa", "dog cat cat dog")); //* False
console.log(wordPattern("abba", "dog dog dog dog")); //* False
console.log(wordPattern("aaaa", "dog dog dog dog")); //* True
console.log(wordPattern("abba", "dog constructor constructor dog")); //* True

//* Time: O(n + m) - In the worst case, "s" and "pattern" are not the same length
//* Thus, it takes O(m) to split "s" into words, and O(n) to iterate through pattern

//* Space: O(n) - The memory used by the two maps is O(n) since by that point we know the have equal length
//* The memory used by the split() function is O(m), but m <= n
