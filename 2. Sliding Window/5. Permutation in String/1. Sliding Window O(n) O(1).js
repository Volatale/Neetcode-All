//* The question is essentially asking for an Anagram of s1 that exists in s2
//* A "permutation" can be considered a different order of something
//* Thus, a permutation and an anagram are effectively the same in this context
function permutationInString(s1, s2) {
  if (s2.length < s1.length) return false; //* A permutation is impossible

  //* Sliding Window
  let start = 0;
  let end = 0;

  //* Base 26 Arrays ("a" = 97. "a" - "a" = 0)
  const freq1 = new Array(26).fill(0);
  const freq2 = new Array(26).fill(0);

  //* Get the frequency of s1
  for (let i = 0; i < s1.length; i++) {
    freq1[s1[i].charCodeAt(0) - 97]++;
  }

  while (end < s2.length) {
    freq2[s2[end].charCodeAt(0) - 97]++; //* Add the new char to the window

    //* If there are enough characters in the window
    if (end - start + 1 === s1.length) {
      if (isAnagram(freq1, freq2)) return true;

      freq2[s2[start++].charCodeAt(0) - 97]--; //* Remove leftmost char from the window
    }

    end++;
  }

  return false;
}

//* O(26)
function isAnagram(arr1, arr2) {
  for (let i = 0; i < 26; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
}

console.log(permutationInString("ab", "bloba")); //* true
console.log(permutationInString("icson", "sonic")); //* true
console.log(permutationInString("zw", "wz")); //* true
console.log(permutationInString("w", "z")); //* false
console.log(permutationInString("law", "lae")); //* false

//* Time: O(s1 + s2) - We have to process each character in both strings
//* We also have an O(26) call in isAnagram, but this always takes the same amount of time

//* Space: O(26) -> O(1) - We have two frequency arrays that always have 26 indices
//* They do not scale in size with either input, so the function uses constant space
