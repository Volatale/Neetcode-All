//* Given two strings, we need to check if s2 contains a PERMUTATION of s1
//* A permutation is essentially just some ordering of elements (in this case, characters)
//* To check for permutations in strings, we can simply check for the frequency
//!     - A permutation in a string is analogous to an anagram
//* In a brute force manner, we can get the frequency of characters in s1
//* Then, for every substring in s2, we can check if the frequencies match
//*     - If they do, then we now that s2 contains a permutation of s1
function checkInclusion(s1, s2) {
  //* There is no possibility of s2 containing a permutation of s1
  if (s2.length < s1.length) return false;

  let start = 0;
  let end = 0;

  //* Base 26 arrays ("a" - "a" === 97 - 97 === 0)
  const freq1 = new Array(26).fill(0);
  const freq2 = new Array(26).fill(0);

  //* Generate both windows at once
  for (let i = 0; i < s1.length; i++) {
    freq1[s1[i].charCodeAt(0) - 97]++;
    freq2[s2[i].charCodeAt(0) - 97]++;
    end++;
  }

  //* Immediately check if the frequencies are the same
  if (isAnagram(freq1, freq2)) return true;

  while (end < s2.length) {
    freq2[s2[end++].charCodeAt(0) - 97]++;

    //* Remove leftmost char from window (it is leaving window)
    freq2[s2[start++].charCodeAt(0) - 97]--;

    //* Check if the frequencies are the same
    if (isAnagram(freq1, freq2)) return true;
  }

  return false;
}

function isAnagram(arr1, arr2) {
  for (let i = 0; i < 26; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
}

console.log(checkInclusion("ab", "bloba")); //* True
console.log(checkInclusion("icson", "sonic")); //* True
console.log(checkInclusion("zw", "wz")); //* True
console.log(checkInclusion("w", "z")); //* False
console.log(checkInclusion("law", "lae")); //* False

//* Time: O(n * 26) - It takes O(26) to check for an anagram, and it takes O(n) to iterate through s1

//* Space: O(1) - The memory usage remains constant regardless of input size (of either string)
//* The frequency arrays are always 26 length
