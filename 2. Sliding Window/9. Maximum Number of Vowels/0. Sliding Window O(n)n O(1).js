//* We need substrings of length k, so use a sliding window of size k
//* If s[end] is a vowel, then increment "vowels"
//* When the size of the window is greater than k, remove the leftmost character from the window
//* It may have been a vowel; if it was, decrement "vowels"
function maximumNumberOfVowels(s, k) {
  let start = 0;
  let end = 0;

  let maxVowels = 0;
  let vowels = 0;

  while (end < s.length) {
    if (isVowel(s[end])) vowels++;

    //* If there are more than k elements in the window
    if (end - start + 1 > k) {
      if (isVowel(s[start])) vowels--;
      start++;
    }

    maxVowels = Math.max(maxVowels, vowels);
    end++;
  }

  return maxVowels;
}

//* Switches are very fast, and use less space than a set
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

console.log(maximumNumberOfVowels("abc", 1)); //* 1
console.log(maximumNumberOfVowels("abciiidef", 3)); //* 3
console.log(maximumNumberOfVowels("aeiou", 2)); //* 2
console.log(maximumNumberOfVowels("leetcode", 3)); //* 2
console.log(maximumNumberOfVowels("aeiouaeiou", 10)); //* 10

//* Time: O(n * k) - For each outer loop, the inner loop iterates "k" times

//* Space: O(1) - We don't use any extra space that scales with input size
