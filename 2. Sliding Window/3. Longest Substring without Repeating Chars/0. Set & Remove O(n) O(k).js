//* We need to find the length of the longest substring that does not contain DUPLICATE characters
//* The frequency of duplicate characters will always greater than 1
//* So all we really have to do is track the frequency of all of the characters in the current substring
//* Instead of using nested for loops, we simply need to recognise that we are tracking a RANGE of characters
//* We can use a sliding window approach here since the invariant holds true
//* There should not be any duplicate characters within the window
//* In the event that this invariant is NOT true, shrink the window on the left till it is a valid window
function lengthOfLongestSubstring(s) {
  if (s.length === 0) return 0;

  //* Tracks chars in the current window
  const chars = new Set();

  //* Pointers for the sliding window
  let start = 0;
  let end = 0;
  let longest = 0;

  while (end < s.length) {
    //* Remove all of the duplicate characters from the window
    while (chars.has(s[end])) {
      chars.delete(s[start++]);
    }

    //* Add the character to the window (we know its not a duplicate now)
    chars.add(s[end++]);
    longest = Math.max(longest, end - start);
  }

  return longest;
}

console.log(lengthOfLongestSubstring("abcabcbb")); //* 3
console.log(lengthOfLongestSubstring("bbbbb")); //* 1
console.log(lengthOfLongestSubstring("pwwkew")); //* 3

//* Time: O(n) - We have to process every element in the string
//* So the time taken scales with the input size

//* Spaec: O(k) - In the worst case, every character is unique
//* So the set's size can become "n", but here, "k" means the number of unique characters.
