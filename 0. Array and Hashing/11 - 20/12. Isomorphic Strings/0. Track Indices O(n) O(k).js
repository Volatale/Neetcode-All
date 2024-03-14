//* Create two maps, these strings need to be bidirectionally isomorphic
//* Iterate over each string (they both have the same length)
//* Check if map[s[i]] returns the same value as mapII[t[i]]
//*     - If they don't, you know the strings are NOT isomorphic
//*     - In the case where "o" returned 2, and then "r" (which doesn't exist in map 2) returned undefined
//*     - You know that we are missing a character somewhere
//* In each iteration, set the the key to be s[i] or t[i] and then the value to i + 1
function isIsomorphic(s, t) {
  const map = {};
  const mapII = {};

  for (let i = 0; i < s.length; i++) {
    if (map[s[i]] !== mapII[t[i]]) return false; //! If the values are different, the strings are NOT isomorphic

    map[s[i]] = i + 1;
    mapII[t[i]] = i + 1;
  }

  return true;
}

console.log(isIsomorphic("egg", "add")); // true
console.log(isIsomorphic("foo", "bar")); // false (t doesn't exist, therefore returns undefined)
console.log(isIsomorphic("sonic", "mario")); // true
console.log(isIsomorphic("", "")); // true
console.log(isIsomorphic("_", "w")); // true
console.log(isIsomorphic("bar", "taa")); // false
console.log(isIsomorphic("bbbaaaba", "aaabbbba")); // false

//* Time: O(n) - The time taken scales with the length of the input string(s)
//* Both strings have an equal length, so "n" represents the length of either

//* Space: O(k) - K represents the number of UNIQUE characters in "s" and "t"
