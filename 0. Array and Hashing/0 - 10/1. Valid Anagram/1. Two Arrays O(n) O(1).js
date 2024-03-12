function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  // There are only 26 characters in the alphabet
  const freq1 = new Array(26).fill(0);
  const freq2 = new Array(26).fill(0);

  // Get the frequencies of each character
  for (let i = 0; i < s.length; i++) {
    const char1 = s[i].charCodeAt(0) - 97; // 97 represents the offset ("a")
    const char2 = t[i].charCodeAt(0) - 97;

    freq1[char1]++;
    freq2[char2]++;
  }

  // Check if the frequencies of each char are the same
  for (let i = 0; i < freq1.length; i++) {
    if (freq1[i] !== freq2[i]) return false;
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
//* The second loop will take O(26), or O(1) in the worst case

//* Space: O(26) - The space usage will always remain constant (26)
