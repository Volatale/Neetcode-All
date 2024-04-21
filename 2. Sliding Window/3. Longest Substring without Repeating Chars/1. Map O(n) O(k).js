//* Track the indices of the last occurrence of the character
//* If we find it, take the difference between end and start
//* That gives us the number of characters in the substring
//* Move start to the last occurrence of s[end] + 1 so we don't redo work
function longestSubstringWithoutRepeatingChars(s) {
  let start = 0;
  let end = 0;
  let maxLength = 0;

  const map = new Map(); //* Track last occurrence of char

  while (end < s.length) {
    //* Check if we have already found that character
    if (map.has(s[end])) {
      maxLength = Math.max(maxLength, end - start);
      start = Math.max(start, map.get(s[end]) + 1); //* Move start
    }

    map.set(s[end], end++);
  }

  //* If every character is unique, we never find the maxLength
  return Math.max(maxLength, end - start);
}

console.log(longestSubstringWithoutRepeatingChars("abcabcbb")); //* 3
console.log(longestSubstringWithoutRepeatingChars("bbbbb")); //* 1
console.log(longestSubstringWithoutRepeatingChars("pwwkew")); //* 3

//* Time: O(n) - We have to process every element in the string
//* So the time taken scales with the input size

//* Space: O(k) - In the worst case, we store every unique character within the map
