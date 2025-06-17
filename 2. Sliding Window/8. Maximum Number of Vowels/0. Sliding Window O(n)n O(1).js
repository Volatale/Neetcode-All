//* The goal is to return the maximum number of vowels in a substring of length "k"
//* We could do this in a brute force manner and simply check every substring of length k
//* However, this is inefficient since we do a lot of repeated work
//* Instead, the optimal thing to do is to use a sliding window approach
//* We only ever need to process substrings of length "k", so use a fixed length sliding window
//* If the character entering the window is a vowel, increment the vowel count
//* If the character leaving the window is a vowel, decrement the vowel count
//* Every other character can be ignored
function maxVowels(s, k) {
  //* Pointers for the sliding window boundaries
  let start = 0;
  let end = 0;

  let vowelCount = 0;
  let vowelMax = 0;

  while (end < s.length) {
    if (isVowel(s[end])) vowelCount++;

    //* There are more than "k" elements in the window
    if (end - start + 1 > k) {
      if (isVowel(s[start])) vowelCount--;
      start++;
    }

    vowelMax = Math.max(vowelMax, vowelCount);
    end++;
  }

  return vowelMax;
}

function isVowel(char) {
  switch (char.charCodeAt(0)) {
    case 97:
    case 101:
    case 105:
    case 111:
    case 117:
      return true;
    default:
      return false;
  }
}

console.log(maxVowels("abc", 1)); //* 1
console.log(maxVowels("abciiidef", 3)); //* 3
console.log(maxVowels("aeiou", 2)); //* 2
console.log(maxVowels("leetcode", 3)); //* 2
console.log(maxVowels("aeiouaeiou", 10)); //* 10

//* Time: O(n) - We iterate over all of the characters twice at most

//* Space: O(1) - The memory usage remains constant since there are always 5 vowel characters
