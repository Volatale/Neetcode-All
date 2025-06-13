//* We need to find the length of the longest substring that does not contain DUPLICATE characters
//* The frequency of duplicate characters will always greater than 1
//* So all we really have to do is track the frequency of all of the characters in the current substring
//* In a brute force manner, we can use a set to track the characters in the current substring
//*     - If we are at a character that is already in the set, break out of the inner loop
function lengthOfLongestSubstring(s) {
  if (s.length === 0) return 0;

  //* Tracks the chars in the current substring
  const chars = new Set();
  let longest = 0;

  for (let i = 0; i < s.length; i++) {
    chars.clear();

    for (let j = i; j < s.length; j++) {
      if (!chars.has(s[j])) {
        chars.add(s[j]);
      } else {
        break; //* Duplicate character found
      }
    }

    longest = Math.max(longest, chars.size);
  }

  return longest;
}

console.log(lengthOfLongestSubstring("abcabcbb")); //* 3
console.log(lengthOfLongestSubstring("bbbbb")); //* 1
console.log(lengthOfLongestSubstring("pwwkew")); //* 3

//* Time: O(n^2) - The time taken scales quadratically with the input size

//* Space: O(n) - In the worst case, every character is unique, so the set has "n" size
