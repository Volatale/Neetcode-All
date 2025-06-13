//* In one operation, we can replace up to "k" characters with any uppercase English character
//* Logically speaking, it makes sense to overwrite as many characters as possible at any given point
//* We should track the maximum frequency of any character in the substring
//*     - Why? Because the length of the longest can only increase, so this won't have a negative effect on the result
//! Keep the characters that are the most frequent if possible
//*     - This lets us flip a SMALLER amount of characters (thereby keeping the value of "k" high for as long as possible)
//* The longer the value of "k" remains high, the longer the length of the longest string will be
//* We can use a base 26 array to track the frequency of characters
//* Other than that, we should use a sliding window approach
//*     - Ensure that every window remains valid by shrinking whenever the invariant is broken
//* In this case, the invariant is broken if the number of flips we can do is 0 (k = 0) AND the current character needs flipping
//* Checking if the invariant is broken:
//*     - (end - start + 1) gives us the number of characters in the substring
//*     - maxFreq is the number of characters we DON'T want to replace
//*     - Therefore, no. of characters we MUST flip = (end - start + 1) - maxfreq
//* If (end - start + 1) - maxFreq > k
//!     - Then the window is invalid, because we need to replace too many characters
function characterReplacement(s, k) {
  //* A - A = index 0 = (65 - 65)
  const freq = new Array(26).fill(0);
  let start = 0;
  let end = 0;

  //* Frequency of the characters we DO NOT want to delete
  let maxFreq = 0;
  let longest = 0;

  while (end < s.length) {
    //* Update frequency of new character
    freq[s[end].charCodeAt(0) - 65]++;

    //* Potentially update max frequency character overall
    maxFreq = Math.max(maxFreq, freq[s[end].charCodeAt(0) - 65]);

    //* Total chars - chars we DON'T want to delete = number of characters that need replacing
    while (end - start + 1 - maxFreq > k) {
      freq[s[start++].charCodeAt(0) - 65]--;
    }

    //* Check if we have a new longest substring
    longest = Math.max(longest, end - start + 1);
    end++;
  }

  return longest;
}

console.log(characterReplacement("AB", 0)); //* 2
console.log(characterReplacement("ABAB", 2)); //* 4
console.log(characterReplacement("AABABBA", 1)); //* 4

//* Time: O(n) - It takes O(26) (O(1)) to create the frequency array
//* Then, it takes O(n) to iterate over all of the characters in the string

//* Space: O(1) - The memory usage remains constant regardless of input size
