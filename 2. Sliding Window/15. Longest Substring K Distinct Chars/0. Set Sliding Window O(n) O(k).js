//* Given a string, find the length of the LONGEST substring that contains AT MOST `k` DISTINCT characters
//* Since we care about unique characters, and the frequency of these characters, we should use a frequency map
//*     - A set would help, but wouldn't give us all of the information we need
//*     - We'd still have no way of knowing when we should delete a character
//* Since we need a window (substring) of characters, we can use a sliding window approach
//* The window invariant states that there should be <= k distinct characters within the window
//* If this invariant is ever broken, we'll shrink the window on the left until it becomes valid
//* Simply track the length of the longest valid window, and that is our answer
function longestSubstringKDistinctChars(s, k) {
  const distincts = new Set();
  let maxLength = 0;

  //* Pointers to mark the start/end of the sliding window
  let start = 0;
  let end = 0;

  while (end < s.length) {
    //* Add the character to the window
    distincts.add(s[end]);

    //* Ensure the window invariant is fulfilled
    while (distincts.size > k) {
      distincts.delete(s[start++]);
    }

    //* Record the length of the longest window
    maxLength = Math.max(maxLength, end - start + 1);
    end++;
  }

  return maxLength;
}

console.log(longestSubstringKDistinctChars("eceba", 2)); //* 3
console.log(longestSubstringKDistinctChars("aba", 2)); //* 3
console.log(longestSubstringKDistinctChars("bba", 1)); //* 2
console.log(longestSubstringKDistinctChars("aqwwer", 4)); //* 5

//* Time: O(n) - The time taken scales with the length of the input string

//* Space: O(k) - The set's size never grows beyond "k + 1", so the space complexity scales with k
