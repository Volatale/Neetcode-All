//* We need to check if "s" can become a palindrome after deleting AT MOST one character
//*     - Which means the string could already be a palindrome (without a deletion)
//* In this case, instead of deleting, we can simply skip a character
//* So for each character, try skipping it and seeing if it would result in a palindrome
//* To check for a palindrome, we can simply use a two pointer approach
//*     - Each of the two pointers is initialized to opposite sides of the input (0 and n - 1)
//*     - If s[left] !== s[right], then we know "s" is not a palindrome
//* Except in our case, we only need to skip characters that we know don't match
//* So iterate from both ends simultaneously until s[left] !== s[right]
//*     - Then, try checking for a palindrome from "left + 1"
//*     - And also try checking for a palindrome from "right - 1"
//! If neither skipping the current character from EITHER perspective works
//*     - Then we know that "s" cannot possibly be a palindrome
function validPalindrome(s) {
  //* Both pointers are initialized to opposite ends
  let left = 0;
  let right = s.length - 1;

  while (left <= right) {
    if (s[left] !== s[right]) {
      //* We need to skip the current character from either perspective
      return (
        isPalindrome(s, left + 1, right) || isPalindrome(s, left, right - 1)
      );
    }

    //* The characters matched, so move to the next
    left++;
    right--;
  }

  //* "s" is a palindrome
  return true;
}

function isPalindrome(s, left, right) {
  while (left <= right) {
    if (s[left++] !== s[right--]) {
      return false;
    }
  }

  //* Found a palindrome
  return true;
}

console.log(validPalindrome("aba")); //* True
console.log(validPalindrome("abca")); //* True
console.log(validPalindrome("abc")); //* False
console.log(validPalindrome("a")); //* True
console.log(validPalindrome("ac")); //* True

//* Time: O(n) - It takes O(n) to check if a string is palindromic
//* If two characters don't match, at most, we process each character twice

//* Space: O(1) - The memory usage remains constant regardless of input size
