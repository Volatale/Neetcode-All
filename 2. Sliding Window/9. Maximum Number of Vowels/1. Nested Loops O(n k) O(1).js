//* Take substrings of size "k"
//* Count the number of vowels in each substring
function maximumNumberOfVowels(s, k) {
  let maxVowels = 0;

  for (let i = 0; i <= s.length - k; i++) {
    let vowels = 0;

    //* Look ahead "k" characters (including the current one)
    for (let j = i; j < i + k; j++) {
      if (isVowel(s[j])) vowels++;
    }

    maxVowels = Math.max(maxVowels, vowels);
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
