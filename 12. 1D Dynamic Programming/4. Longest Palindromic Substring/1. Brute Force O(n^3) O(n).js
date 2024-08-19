//* In a brute force manner, generate every substring
//* For every substring, check if it is a palindrome
//* If the length of the substring > longest so far, overwrite the value
function longestPalindrome(s) {
  let longest = "";

  //* Get every substring and check all of their lengths
  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      const substring = s.substring(i, j + 1);

      if (isPalindrome(substring) && substring.length > longest.length) {
        longest = substring;
      }
    }
  }

  return longest;
}

function isPalindrome(word) {
  for (let i = 0, j = word.length - 1; i < j; i++, j--) {
    if (word[i] !== word[j]) return false;
  }

  return true;
}

console.log(longestPalindrome("babad")); //* "bab" or "aba"
console.log(longestPalindrome("cbbd")); //* "bb"
console.log(longestPalindrome("cd")); //* "c" or "d"
console.log(longestPalindrome("a")); //* "a"
console.log(longestPalindrome("xay")); //* "a", "x" or "y"
console.log(longestPalindrome("abb")); //* "bb"

//* Time: O(n^3) - We have a nested for loop to get every substring
//* Within the inner for loop, it takes O(n) (in the worst case) to get the substring
//* Then it takes O(n) to check if that substring is a palindrome

//* Space: O(n) - The substring we create can be at most O(n) length
