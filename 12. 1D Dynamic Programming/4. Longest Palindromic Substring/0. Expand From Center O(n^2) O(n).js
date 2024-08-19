//* Palindromes are naturally symmetrical
//* So we can expand OUTWARD from the current character
//*     - That is, instead of going from the outside in
//* Use the two pointer technique to handle comparing two characters simultaneously
//* Palindromes can be both odd and even length
//*     - Even palindromes start at (i, i + 1) for left and right respectively
//!         - These handle cases like "abba" and "abb" (they even handle some odd palindromes)
//*     - Odd palindromes start at (i, i) for both left and right
function longestPalindrome(s) {
  //* Base Case
  if (s.length === 1) return s[0];

  let longest = s[0];

  //* Expand from every index to get every possible palindrome
  for (let i = 0; i < s.length - 1; i++) {
    const odd = expandFromCenter(s, i, i); //* Odd length palindrome
    const even = expandFromCenter(s, i, i + 1); //* Even length palind

    if (odd.length > longest.length) {
      longest = odd;
    }

    if (even.length > longest.length) {
      longest = even;
    }
  }

  return longest;
}

function expandFromCenter(s, left, right) {
  //* Remain in bounds, and only expand if the characters match
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left--;
    right++;
  }

  //* First is INCLUSIVE; thus we need to exclude it
  return s.substring(left + 1, right);
}

console.log(longestPalindrome("babad")); //* "bab" or "aba"
console.log(longestPalindrome("cbbd")); //* "bb"
console.log(longestPalindrome("cd")); //* "c" or "d"
console.log(longestPalindrome("a")); //* "a"
console.log(longestPalindrome("xay")); //* "a", "x" or "y"
console.log(longestPalindrome("abb")); //* "bb"

//* Time: O(n^2) - We use an O(n) for loop to get every index i from 0 to n - 1
//* Within each for loop, we perform an O(n) loop (in the worst case) to expand from the center

//* Space: O(n) or O(1) - We create a string of length "n" in the worst case
//* Imagine the entire string is a palindrome, then we'd return a string of length "n"
//* Whether or not s.substring() creates a NEW string depends on the language itself
