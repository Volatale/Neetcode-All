function findAnagrams(s, p) {
  if (s.length < p.length) return [];

  let start = 0;
  let end = 0;

  const anagrams = [];

  const freq1 = new Array(26).fill(0);
  const freq2 = new Array(26).fill(0);

  //* Get first window
  for (let i = 0; i < p.length; i++) {
    freq1[s[i].charCodeAt(0) - 97]++;
    freq2[p[i].charCodeAt(0) - 97]++;
    end++;
  }

  if (checkEquality(freq1, freq2)) anagrams.push(start);

  //* Sliding Window
  while (end < s.length) {
    let startChar = s[start].charCodeAt(0) - 97;
    let endchar = s[end].charCodeAt(0) - 97;

    if (freq1[startChar] > 0) freq1[startChar]--;

    freq1[endchar]++;

    //* Move Window Along
    start++;
    end++;

    if (checkEquality(freq1, freq2)) anagrams.push(start);
  }

  return anagrams;
}

function checkEquality(arr1, arr2) {
  for (let i = 0; i < 26; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
}

console.log(findAnagrams("cbaebabacd", "abc")); //* [0, 6]
console.log(findAnagrams("abab", "ab")); //* [0, 1, 2]
