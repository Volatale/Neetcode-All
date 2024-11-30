//* Try every possible substring we can create
//* Use a set to track the characters that we have found in this substring
function lengthOfLongestSubstring(s) {
  //* String is empty, thus the length is 0
  if (s.length === 0) return 0;

  let longest = 0;

  for (let i = 0; i < s.length; i++) {
    const set = new Set();

    for (let j = i; j < s.length; j++) {
      if (!set.has(s[j])) {
        //* Extend substring
        set.add(s[j]);
      } else {
        //* We found a duplicate character - stop extending this substring
        break;
      }
    }

    longest = Math.max(longest, set.size);
  }

  return longest;
}

console.log(lengthOfLongestSubstring("abcabcbb")); //* 3
console.log(lengthOfLongestSubstring("bbbbb")); //* 1
console.log(lengthOfLongestSubstring("pwwkew")); //* 3

//* Time: O(n^2) - We have a nested loop, both of which scale with the input size
//* So the time taken scales quadratically

//* Space: O(n) - In the worst case, every character is unique, so the set stores "n" characters
