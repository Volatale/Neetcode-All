//* Remove the whitespace between each word using split
//* Create a map for the pattern, and for the string
//* Check for bi-directional isomorphism
//! JS goes up the prototype chain for keys if it doesn't find it on the current object
//! So we need to make sure we only check if and only if the keys exist on THESE objects
//! We can't just do map1[word] if "word" is "constructor", for example; constructor exists as a key upstream
//! Make sure that we check for enumerable OWN keys
//* Eventually there will be a mismatch in word vs char if they are not isomorphic
function wordPattern(pattern, s) {
  const words = s.split(" ");

  if (pattern.length !== words.length) return false;

  const map1 = {}; //* For the pattern
  const map2 = {}; //* For the string

  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    const word = words[i];

    if (
      (map1.hasOwnProperty(char) && map1[char] !== word) ||
      (map2.hasOwnProperty(word) && map2[word] !== char)
    ) {
      return false;
    }

    map1[char] = word;
    map2[word] = char;
  }

  return true;
}

console.log(wordPattern("ab", "dog cat")); // true
console.log(wordPattern("abba", "dog cat cat dog")); // true
console.log(wordPattern("abba", "dog cat cat fish")); // false
console.log(wordPattern("aaaa", "dog cat cat dog")); // false
console.log(wordPattern("abba", "dog dog dog dog")); // false
console.log(wordPattern("aaaa", "dog dog dog dog")); // true
console.log(wordPattern("abba", "dog constructor constructor dog")); // true

//* Time: O(n + m) - It takes O(m) time to iterate through "s" to perform the split()
//* Then it takes O(n) time to iterate through "pattern"
//* Both have to be done and can't be avoided, so O(n + m)

//* Space: O(min(n, m)) - In the worst case, every all characters in the pattern are unique, and so are the words
//* The space is mainly used by the two maps we use to form a bijection between the pattern and words
//* We create an array (using split) that scales in size with the length of "s" - O(m)
//* O(min(n, m)) dominates O(m)
