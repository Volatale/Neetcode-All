//* Use a set to track the characters within the substring
//* This saves us from having to create substrings - we can also clear in O(1) time
//* Use set.size as a way to track how many distinct characters we have in the substring
function longestSubstringKDistinctChars(s, k) {
  const distincts = new Set();
  let maxLength = 0;

  //* Creating a new set each iteration is a higher overhead
  for (let i = 0; i < s.length; i++) {
    distincts.clear();
    let length = 0;

    //* Try to find non-distinct chars
    for (let j = i; j < s.length; j++) {
      if (distincts.has(s[j])) {
        length++;
      } else if (distincts.size < k) {
        distincts.add(s[j]);
        length++;
      } else {
        break;
      }
    }

    maxLength = Math.max(maxLength, length);
  }

  return maxLength;
}

console.log(longestSubstringKDistinctChars("eceba", 2)); //* 3
console.log(longestSubstringKDistinctChars("aba", 2)); //* 3
console.log(longestSubstringKDistinctChars("bba", 1)); //* 2
console.log(longestSubstringKDistinctChars("aqwwer", 4)); //* 5

//* Time: O(n^2) - We have a nested for loop, both of which scale with the input size
//* In the absolute worst case, the entire string is the same char and k = 1 etc

//* O(k) - The set will only contain at most "k" distinct characters
//* Even if the string is something like "abcdefg", if "k" is 1, then the set only contains 1 element
