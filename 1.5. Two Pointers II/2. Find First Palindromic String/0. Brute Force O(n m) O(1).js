//* We need to return the first palindromic string in a string[]
//* The "first" implies that we should iterate through the array from left-to-right
//* We can check if a string is palindromic using the two pointer technique
//* Simply iterate from both ends of the string at once
//*     - If both are equal, move both pointers inwards
//*     - Otherwise, the string is definitely not a palindrome
function firstPalindrome(words) {
  //* There are no words, so therefore there are no palindromic strings
  if (words.length === 0) return "";

  //* Perform a palindrome check on every string in the array
  for (let word of words) {
    if (isPalindrome(word)) return word;
  }

  //* The array does not contain a palindrome
  return "";
}

function isPalindrome(word) {
  for (let i = 0, j = word.length - 1; i < j; i++, j--) {
    if (word[i] !== word[j]) return false;
  }

  return true;
}

console.log(firstPalindrome(["abc", "car", "ada", "racecar", "cool"])); //* "ada"
console.log(firstPalindrome(["notapalindrome", "racecar"])); //* "racecar"
console.log(firstPalindrome(["def", "ghi"])); //* ""

//* Time: O(n m) - The input array has length `n`
//* And the time taken to check for a palindrome scales with the length of the string
//* We take `m` to be the length of the longest string

//* Space: O(1) - The memory usage remains constant regardless of input size
