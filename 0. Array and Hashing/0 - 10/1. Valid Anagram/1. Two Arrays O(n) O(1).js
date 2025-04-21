//* We can check for anagrams by checking the frequency of every character
//*     - If "a" exists in s with a frequency of 2
//*       and "a" exists in t with a frequency of 1
//*         - Then we know t is not an anagram of s
//* We know there are only 26 possible characters (lowercase English characters)
//* So we should use a base 26 array where [0] corresponds to "a" and [25] corresponds to "z"
//* Iterate through both "s" and "t" simultaneously and increment/decrement the current character respectively
function isAnagram(s, t) {
  //* Can't possibly be an anagram
  if (s.length !== t.length) return false;

  //* [0] corresponds to "a" and [25] corresponds to [25]
  const freq = new Array(26).fill(0);

  //* Increment the current character for s, and decrement for t
  for (let i = 0; i < s.length; i++) {
    freq[s[i].charCodeAt(0)]++;
    freq[t[i].charCodeAt(0)]--;
  }

  //* If freq[i] !== 0, then there is a frequency disparity
  for (let i = 0; i < freq.length; i++) {
    if (freq[i] !== 0) return false;
  }

  //* t is an anagram of s
  return true;
}

console.log(isAnagram("sonic", "cinos")); // true
console.log(isAnagram("anagram", "nagaram")); // true
console.log(isAnagram("bob", "top")); // false
console.log(isAnagram("a", "a")); // true
console.log(isAnagram("racecar", "carrace")); // true

//* Time: O(n) - We iterate through the entire strings (both simultaneously)

//* Space: O(1) - The array will always have a length of 26 regardless of input size
