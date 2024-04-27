//* Use a map to track the number of occurrences of each character
//* We can't use a set here because we want "2" distinct characters
//* "aabc" would result in "a" being delete from the set
//* But then the start pointer wouldn't be incremented enough, so it would be false
function longestSubstringWithAtMostTwoDistinctChars(s) {
  //* Sliding Window
  let start = 0;
  let end = 0;

  let maxLength = 0;
  const distincts = new Map();

  while (end < s.length) {
    //* Add an occurrence
    distincts.set(s[end], (distincts.get(s[end]) || 0) + 1);

    while (distincts.size > 2) {
      //* Remove an occurrence
      distincts.set(s[start], distincts.get(s[start]) - 1);

      //* If there are no occurrences left, delete the character
      if (distincts.get(s[start]) === 0) {
        distincts.delete(s[start]);
      }

      start++;
    }

    //* end - start + 1 gives us the window size
    maxLength = Math.max(maxLength, end - start + 1);
    end++;
  }

  return maxLength;
}

console.log(longestSubstringWithAtMostTwoDistinctChars("eceba")); //* 3
console.log(longestSubstringWithAtMostTwoDistinctChars("ccaabbb")); //* 5
console.log(longestSubstringWithAtMostTwoDistinctChars("xyze")); //* 2
console.log(longestSubstringWithAtMostTwoDistinctChars("o")); //* 1

//* Time: O(n) - We iterate over the entire input once, so the time taken scales with "n"

//* Space: O(1) - The map can only contain 3 elements at once
//* O(3) simplifies to O(1)
