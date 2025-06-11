//* Given two strings `s` and `p`, we need to return the start indices of all p's anagrams in `s`
//* Naturally, anagram-style questions are easily handled by frequency maps
//* This is fundamentally a substring searching problem
//* We can use two base 26 arrays ([0] = "a" and [25] = "z")
//* A sliding window approach allows us to scan windows of characters
//* Why a sliding window? Because we know that every valid substring will be of p.length
//* Generate the anagram frequency for `p`
//* Then, move the sliding window through `s` and check for the valid substrings
//* We are specifically looking for windows of size `p.length`
//*     - So there is no need to repeatedly shrink the window using a while loop
//*     - The moment that we remove the leftmost character, the window will no longer be valid
function findAnagrams(s, p) {
  const results = [];

  //* Stores the exact frequency of characters we need to find in `s`
  const pFreq = new Array(26).fill(0);
  const sFreq = new Array(26).fill(0);

  //* Pointers to mark the start/end of the sliding window
  let start = 0;
  let end = 0;

  //* Get the frequency of characters in `p`
  for (let i = 0; i < p.length; i++) {
    pFreq[p[i].charCodeAt(0) - 97]++;
  }

  while (end < s.length) {
    //* Add the character to the window (substring)
    sFreq[s[end].charCodeAt(0) - 97]++;

    //* If there are at least `p.length` characters in the window
    if (end - start + 1 === p.length) {
      if (isAnagram(sFreq, pFreq)) results.push(start);

      //* Remove the character from the window (substring)
      sFreq[s[start++].charCodeAt(0) - 97]--;
    }

    end++;
  }

  return results;
}

//* There are only 26 characters in the lowercase alphabet, so this takes O(26) -> O(1)
function isAnagram(arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
}

console.log(findAnagrams("cbaebabacd", "abc")); //* [0, 6]
console.log(findAnagrams("abab", "ab")); //* [0, 1, 2]
console.log(findAnagrams("sonic", "sonic")); //* [0]

//* Time: O(n + m) - The time takens scales with the lengths of both `s` and `p`
//* It always takes O(26) -> O(1) to check for anagrams

//* Space: O(26) -> O(1) - The memory usage remains constant regardless of input size
