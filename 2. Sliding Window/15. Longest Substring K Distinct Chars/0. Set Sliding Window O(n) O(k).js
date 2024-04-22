//* Sliding Window so we can track the length of the window
//* A set can be used to track the distinct characters within the window
//* This saves us from having to create substrings
//* Use set.size check the number of distinct characters in the substring
function longestSubstringKDistinctChars(s, k) {
  const chars = new Set();

  //* Sliding Window
  let start = 0;
  let end = 0;

  let maxLength = 0;

  while (end < s.length) {
    chars.add(s[end]);

    //* Size represents the number of unique characters in the substring
    while (chars.size > k) {
      chars.delete(s[start++]);
    }

    maxLength = Math.max(maxLength, end - start + 1);
    end++;
  }

  return maxLength;
}

console.log(longestSubstringKDistinctChars("eceba", 2)); //* 3
console.log(longestSubstringKDistinctChars("aaabbba", 2)); //* 7
console.log(longestSubstringKDistinctChars("aba", 2)); //* 3
console.log(longestSubstringKDistinctChars("bba", 1)); //* 2
console.log(longestSubstringKDistinctChars("aqwwer", 4)); //* 5
console.log(longestSubstringKDistinctChars("a", 0)); //* 0

//* Time: O(n) - It takes O(n) time to iterate through each character in the string
//* We are using a set, so we have Θ(1) lookup for characters within the substring

//* O(k) - The set will only contain at most "k" distinct characters
//* Even if the string is something like "abcdefg", if "k" is 1, then the set only contains 1 element at most
