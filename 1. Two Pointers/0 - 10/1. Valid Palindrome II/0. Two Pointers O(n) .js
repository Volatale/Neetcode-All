//* Two Pointers to check two characters at once
//* Iterate until we find characters that DO NOT match
//* Try skipping the current character on the left
//* If that doesn't work, try skipping the character on the right
//* If either works, then return true because a valid palindrome exists
//* If BOTH fail, return false because if outer characters can't be equal
//*     - The entire string is not a palindrome
function validPalindromeII(s) {
  //* Two Pointers - We need to check both sides at once
  let left = 0;
  let right = s.length - 1;

  while (left <= right) {
    if (s[left] !== s[right]) {
      return (
        isPalindrome(s, left + 1, right) || //* Try skipping left char
        isPalindrome(s, left, right - 1) //* Try skipping right char
      );
    }

    //* Progress the window
    left++;
    right--;
  }

  return true;
}

//* O(n)
function isPalindrome(s, left, right) {
  while (left <= right) {
    if (s[left++] !== s[right--]) return false;
  }

  return true;
}

console.log(validPalindromeII("aba")); //* True
console.log(validPalindromeII("abca")); //* True
console.log(validPalindromeII("abc")); //* False
console.log(validPalindromeII("a")); //* True
console.log(validPalindromeII("ac")); //* False

//* Time: O(n) - The time taken to iterate through every character scales with "n"
//* It takes O(n) to check for a palindrome in the worst case
//* We call isPalindrome TWICE at most (not once for each invalid match)

//* Space: O(1) - We use no extra space other than two constant space variables
