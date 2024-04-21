//* Use a set for Θ(1) lookup
//* The set also represents our window of elements
//* If we find a character that already exists within the window
//* Then we need to remove the duplicates from the set
//* But the order we remove elements in needs to be relative to the input order
//* So we delete(nums[left++])
//* That is what the second pointer is for
function longestSubstringWithoutRepeatingChars(s) {
  let start = 0; //* Represents the left anchor
  let end = 0;
  let maxLength = 0;

  const set = new Set();

  while (end < s.length) {
    //* Remove all elements going left -> right until duplicate is non-existant
    while (set.has(s[end])) {
      set.delete(s[start++]);
    }

    set.add(s[end++]);
    maxLength = Math.max(maxLength, end - start);
  }

  return maxLength;
}

console.log(longestSubstringWithoutRepeatingChars("abcabcbb")); //* 3
console.log(longestSubstringWithoutRepeatingChars("bbbbb")); //* 1
console.log(longestSubstringWithoutRepeatingChars("pwwkew")); //* 3

//* Time: O(n) - We have to process every element in the string
//* So the time taken scales with the input size

//* Space: O(k) - In the worst case, we store every unique character within the map
