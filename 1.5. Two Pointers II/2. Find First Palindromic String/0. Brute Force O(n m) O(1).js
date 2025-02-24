//* Use a two pointer approach to check whether each word is a palindrome
//* We have no choice but to brute force
function firstPalindrome(words) {
  for (let i = 0; i < words.length; i++) {
    if (isPalindrome(words[i])) return words[i];
  }

  //* Assume no palindrome exists
  return "";
}

function isPalindrome(word) {
  let left = 0;
  let right = word.length - 1;

  while (left < right) {
    if (word[left] !== word[right]) return false;
    left++, right--;
  }

  return true;
}

console.log(firstPalindrome(["abc", "car", "ada", "racecar", "cool"])); //* "ada"
console.log(firstPalindrome(["notapalindrome", "racecar"])); //* "racecar"
console.log(firstPalindrome(["def", "ghi"])); //* ""

//* Time: O(n * m) - The length of words is "n" and the length of the longest word is "m"

//* Space: O(1) - The memory used remains constant regardless of input size
