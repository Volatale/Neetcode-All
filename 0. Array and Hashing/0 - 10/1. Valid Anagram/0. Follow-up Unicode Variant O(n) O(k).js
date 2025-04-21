//* We can check for anagrams by checking the frequency of every character
//*     - If "a" exists in s with a frequency of 2
//*       and "a" exists in t with a frequency of 1
//*         - Then we know t is not an anagram of s
//* Since this followup assumes Unicode, the range of character codes could be in the range [0, 150,000]
//* An array of length 150,000 is not necessarily feasible to store in memory
//*     - Thus we should use a hashtable/map instead
//* A map reduces the space complexity of isAnagram and also the time complexity of the second for loop to O(k)
//*     - In our case, k <= n; in the worst case, every character (and there are n characters) is unique
//* Iterate through both "s" and "t" simultaneously and increment/decrement the current character respectively
//* If freq[i] !== 0, there is a frequency disparity between s and t
//*     - Thus, we can say "t" is not an anagram of "s"
function isAnagram(s, t) {
  //* Can't possibly be an anagram
  if (s.length !== t.length) return false;

  //* char : freq, tells us the frequency of each character
  const freq = {};

  //* Increment the current character for s, and decrement for t
  for (let i = 0; i < s.length; i++) {
    freq[s[i].charCodeAt(0) - 97] = (freq[s[i].charCodeAt(0) - 97] || 0) + 1;
    freq[t[i].charCodeAt(0) - 97] = (freq[t[i].charCodeAt(0) - 97] || 0) - 1;
  }

  //* If freq[char] !== 0, then there is a frequency disparity
  for (let char of Object.keys(freq)) {
    if (freq[char] !== 0) return false;
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

//* Space: O(k) - The object's size scales with the number of unique characters in both strings (k)
