//* Apply a Sliding Window approach instead of brute forcing
//* We can track the frequency of characters that are within the window
//* Ultimately, our goal is to RETAIN the most frequent characters
//* But due to how a sliding window works, that isn't always possible
//*     - We have no choice in what enters or leaves the window; we merely maintain the invariant
//* However, we have an easy way to determine how many characters WITHIN the window are NOT the same
//* If we have something like "AABBA", and our window was the entire string
//*     - The most frequent character is 3 (A has 3 occurrences)
//* The window size is 5 (4 - 0 + 1 = 5)
//* Number of Chars in window that are NOT equal:
//*     - windowSize - maxFreq
//*     - 5 - 3 = 2
//*         - So we know there are TWO characters in the window that are NOT equal to "A"
//! In other words, that formula gives us the number of characters in the window that NEED TO BE FLIPPED
//*     - If the result is > k, then you know the current window is INVALID, and you need to shrink

//! Why not just use a regular dynamic sliding window? Because there are a lot of moving parts
//*     - Regardless of what we do, we need to track the characters that are within the window
//*     - If we had "ABC", and k = 1, then of course, we can make a substring of length 2
//*     - But we'd have to sum up the frequencies of characters that are in the window EVERY iteration to validate
//*         - Why? How else would we determine the number of characters that need to be flipped?
//*         - After removing a character, we now need to find out what the NEW max is, so it becomes more complicated
//*     - The formula would be something like (totalCharsInWindow - freqOfCurrChar = No. of Chars to Flip)
//*         - But this involves iterating and summing every other key/value pair, which is time consuming
//! Why does tracking the maxFreq element work?
//*     - Because we want to find the MAXIMUM length substring overall
//*     - If we manage to find a valid substring, and the maxLength increases
//*         - It is because there was a character that had a maxFreq >= the CURRENT maxFreq
//!         - In other words, it is impossible to find a BETTER maxLength if there isn't a character of AT LEAST maxFreq occurrences
//*     - "AABBA", k = 1
//*         - At index 2, maxFreq = 2 (because A has two occurrences)
//*             - windowSize - maxFreq = (3 - 2 = 1), and 1 <= k, so the substring is valid
//*             - maxLength would be 3
//*         - At index 3, maxFreq is STILL 2 (it just so happens that both A and B have 2 occurrences)
//*             - (4 - 2 > 1), so the window is INVALID, thus, we need to shrink
//*             - maxLength is 4 (there are characters with AT LEAST 2 occurrences)
//*     - Again, the best result so far will only ever increase if there is a character with at least maxFreq occurrences
//!         - Thus, we can safely leave maxFreq as is; it won't create a false positive result or anything like that
function characterReplacement(s, k) {
  //* We can flip the entire string s
  if (s.length === k) return s.length;

  //* Tracks frequency of characters in the window
  const freq = new Array(26).fill(0);
  let maxLength = 0;

  //* windowSize - maxFreq char in window = No. of Chars to flip
  let maxFreq = 0;

  //* Marks the start and end of the sliding window
  let start = 0;
  let end = 0;

  while (end < s.length) {
    //* Add the current char to the window
    freq[s[end].charCodeAt(0) - 65]++;

    //* We ideally want to keep the chars that are the most frequent
    maxFreq = Math.max(maxFreq, freq[s[end].charCodeAt(0) - 65]);

    //* windowSize - maxFreq = No. of Chars to flip (they aren't the same)
    while (end - start + 1 - maxFreq > k) {
      freq[s[start].charCodeAt(0) - 65]--;
      start++;
    }

    //* Substring is valid, so we have a potential new maxLength
    maxLength = Math.max(maxLength, end - start + 1);
    end++;
  }

  return maxLength;
}

console.log(characterReplacement("ABAB", 2)); //* 4
console.log(characterReplacement("AABABBA", 1)); //* 4
console.log(characterReplacement("ABCDEF", 0)); //* 1
console.log(characterReplacement("ABC", 3)); //* 3

//* Time: O(n) - In the worst case, each character is processed twice at most

//* Space: O(1) - We always create an array of 26 length
