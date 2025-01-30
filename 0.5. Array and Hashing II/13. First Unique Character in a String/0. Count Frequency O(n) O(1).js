//* We want to find the index of the first character with no duplicate
//* So iterate through the string and get the frequency of each character
//* Then, iterate through the string again
//*     - If the frequency of the current character is 1, return i
//*     - The current character does not have a duplicate
//* Iterating from the left here ensures we find the FIRST non-repeating character
function firstUniqChar(s) {
  //* There are no characters at all
  if (s.length === 0) return -1;

  //* Base 26 Array (0 = "a", 1 = "b" etc)
  const freq = new Array(26).fill(0);

  //* Get frequency of characters
  for (let i = 0; i < s.length; i++) {
    freq[s[i].charCodeAt(0) - 97]++;
  }

  //* Iterate through string again, return first char with 1 frequency
  for (let i = 0; i < s.length; i++) {
    if (freq[s[i].charCodeAt(0) - 97] === 1) {
      return i;
    }
  }

  //* There isn't a non-repeating character
  return -1;
}

console.log(firstUniqChar("leetcode")); //* 0
console.log(firstUniqChar("sonic")); //* 0
console.log(firstUniqChar("aaa")); //* -1
console.log(firstUniqChar("loveleetcode")); //* 2
console.log(firstUniqChar("aabb")); //* -1

//* Time: O(n) - We have to iterate over the input string, so the time taken scales with "n"
//* It takes O(26) to create the frequency array, but this is a constant factor

//* Space: O(1) - The frequency array always has a length of 26, so the memory used is constant
//* If the charset were to become larger, we should use a hashtable, which makes the memory usage O(k)
//* Where "k" is the number of unique characters in the input string
