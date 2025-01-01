//* T contains every character that exists in s, plus one extra
//*     - Our goal is to find the EXTRA character
//* The characters that have an equivalent number of occurrences in both will always be EVEN
//*     - And the character that occurs an extra time will always be ODD
//* So all we really have to do is get the frequency of every character in both strings
//*     - Then, find the character that has an odd number of occurrences
function findTheDifference(s, t) {
  const maxLength = Math.max(s.length, t.length);
  const frequency = new Array(26).fill(0); //* Tracks the frequency of each character

  //* Get the frequency of each character
  for (let i = 0; i < maxLength; i++) {
    if (i < s.length) {
      frequency[s[i].charCodeAt(0) - 97]++;
    }

    if (i < t.length) {
      frequency[t[i].charCodeAt(0) - 97]++;
    }
  }

  //* Find the character that has an odd number of occurrences
  for (let i = 0; i < 26; i++) {
    if (frequency[i] & 1) {
      return String.fromCharCode(i + 97);
    }
  }
}

console.log(findTheDifference("abcd", "abcde")); //* "e"
console.log(findTheDifference("", "y")); //* "y"
console.log(findTheDifference("a", "ab")); //* "b"
console.log(findTheDifference("x", "")); //* "x"
console.log(findTheDifference("qwerty", "ytrgewq")); //* "g"

//* Time: O(t.length) - "t" contains every character that "s" has + 1
//* Therefore, we can say t.length > s.length

//* Space: O(1) - The frequency array is always size 26 regardless of input size
