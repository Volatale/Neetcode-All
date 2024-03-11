function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  // There are only 26 characters in the alphabet

  const frequency = new Map();

  // Add the value
  for (let i = 0; i < s.length; i++) {
    frequency.set(s[i], (frequency.get(s[i]) || 0) + 1);
  }

  // Subtract the added value
  for (let i = 0; i < t.length; i++) {
    frequency.set(t[i], (frequency.get(t[i]) || 0) - 1);
  }

  //! If any of these values are !== 0, s and t are NOT anagrams
  for (let [key, value] of frequency) {
    if (value !== 0) return false;
  }

  return true;
}

console.log(isAnagram("sonic", "cinos")); // true
console.log(isAnagram("anagram", "nagaram")); // true
console.log(isAnagram("bob", "top")); // false
console.log(isAnagram("a", "a")); // true
console.log(isAnagram("racecar", "carrace")); // true

//* Time: O(n) - We return immediately if both strings vary in length
//* So we can guarantee that the first loop takes O(n) time where n = s.length

//* Space: O(k) - The space usage will scale with the number of unique characters
