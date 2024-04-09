//* We are given two strings, and we need to find "p" in "s"
//* So we know it has to be a substring searching problem
//* Get the frequency of characters in "p", and do t he same for "s" up to p.length
//* Then just keep a fixed window size of p.length and check for anagrams along the way
function findAllAnagrams(s, p) {
  if (s.length < p.length) return [];

  const results = [];

  //* Base 26 (a - z)
  const freq1 = new Array(26).fill(0);
  const freq2 = new Array(26).fill(0);

  //* Window Range
  let start = 0;
  let end = 0;

  //* Create initial window
  for (let i = 0; i < p.length; i++) {
    freq1[s[i].charCodeAt(0) - 97]++;
    freq2[p[i].charCodeAt(0) - 97]++;
    end++;
  }

  //* Check if the initial window is an anagram
  if (isAnagram(freq1, freq2)) results.push(start);

  while (end < s.length) {
    const startChar = s[start].charCodeAt(0) - 97;
    const endChar = s[end].charCodeAt(0) - 97;

    //* You can't have negative occurrences of a character
    if (freq1[startChar] > 0) freq1[startChar]--;

    freq1[endChar]++;

    //* Progress the window
    start++;
    end++;

    if (isAnagram(freq1, freq2)) results.push(start);
  }

  return results;
}

function isAnagram(arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
}

console.log(findAllAnagrams("cbaebabacd", "abc")); //* [0, 6]
console.log(findAllAnagrams("abab", "ab")); //* [0, 1, 2]
console.log(findAllAnagrams("cacvc", "c")); //* [0, 2, 4]

//* Time: O(n) - It takes O(p) time to iterate over "p" to get the first window
//* Then it takes O(n) time (s.length) to iterate over s
//* Checking for anagrams takes O(26) -> O(1) time, so constant time

//* Space: O(26) -> O(1) - The input is limited to lowercase alphabet
//* The frequency arrays will always use the same amount of space regardless of input size
