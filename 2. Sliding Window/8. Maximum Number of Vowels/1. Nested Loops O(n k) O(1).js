//* We need to return the maximum number of vowels in a substring of length "k"
//* In a brute force manner, we can simply use a nested for loop and count the number of vowel characters
//* Then, after each inner loop, check if we have a new maximum
function maxVowels(s, k) {
  let currMax = 0;

  const vowels = new Set(["a", "e", "i", "o", "u"]);

  for (let i = 0; i <= s.length - k; i++) {
    let vowelCount = 0;

    //* Iterate over the characters that would be in the substring (of length k)
    for (let j = i; j < i + k; j++) {
      if (vowels.has(s[j])) {
        vowelCount++;
      }
    }

    currMax = Math.max(currMax, vowelCount);
  }

  return currMax;
}

console.log(maxVowels("abc", 1)); //* 1
console.log(maxVowels("abciiidef", 3)); //* 3
console.log(maxVowels("aeiou", 2)); //* 2
console.log(maxVowels("leetcode", 3)); //* 2
console.log(maxVowels("aeiouaeiou", 10)); //* 10

//* Time: O(n * k) - For each outer loop, the inner loop iterates "k" times

//* Space: O(1) - The memory usage remains constant since there are always 5 vowel characters
