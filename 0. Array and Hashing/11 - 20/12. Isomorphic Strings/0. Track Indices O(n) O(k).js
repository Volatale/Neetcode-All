//* Two strings are "isomorphic" if the characters in "s" can be replaced to get "t"
//* All of the occurrences of a character must be replaced with another character
//*     - We also need to maintain the relative ordering of characters
//* For example, with "egg" and "add":
//*     - All of the "e" become "a"
//*     - All of the "g" become "d"
//! There is no need to actually (literally) modify any characters
//* We can simply map each (current) character in s and t to a number (simultaneously)
//* If the current characters do not map to the same number, the strings cannot be isomorphic
//* In "bar" and "taa"
//*     - b : 1, t : 1
//*     - a : 2, a : 2
//*     - r doesn't exist (undefined), but "a" : 2
//*         - So the strings are non-isomorphic
function isIsomorphic(s, t) {
  const charMap = {}; //* Tracks char mappings in "s"
  const charMapII = {}; //* Tracks char mappings in "t"

  //* Each char maps to i + 1: if they don't match, s[i] and t[i] are not isomorphic
  for (let i = 0; i < s.length; i++) {
    if (charMap[s[i]] !== charMapII[t[i]]) return false;

    charMap[s[i]] = i + 1;
    charMapII[t[i]] = i + 1;
  }

  //* "s" and "t" are isomorphic
  return true;
}

console.log(isIsomorphic("egg", "add")); //* True
console.log(isIsomorphic("foo", "bar")); //* False
console.log(isIsomorphic("sonic", "mario")); //* True
console.log(isIsomorphic("_", "w")); //* True
console.log(isIsomorphic("bar", "taa")); //* False
console.log(isIsomorphic("bbbaaaba", "aaabbbba")); //* False

//* Time: O(n) - The time taken scales with the length of "s" (since s.length === t.length)

//* Space: O(1) - The character range is any valid ASCII character; there are 256 in total
//* So the "true" memory usage scales with the number of unique characters in both s and t
//* But the maximum is bounded by 256
