//* We need to check if the input string is a palindrome
//* But that means we need to handle all of the non-alphanumeric characters
//*     - " " characters should be skipped
//*     - Uppercase characters should be converted to lowercase characters
//* A regular expression can handle that task for us
//* Then, we simply use the two pointer technique and check character equality from both ends simultaneously
//* If s[left] === s[right], then increment both and move to the next character
//* Otherwise, return false, because we know they are not equal
//! By using a Regex, we avoid modifying the input
function isPalindrome(s) {
  const isAlphanumeric = (char) => /[a-zA-Z0-9]/gi.test(char);

  //* The two pointers are initialized to opposite ends of the input
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    //* Skip all of the non-alphanumeric characters
    while (left < right && !isAlphanumeric(s[left])) left++;
    while (left < right && !isAlphanumeric(s[right])) right--;

    //* The input is not palindromic
    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;

    left++;
    right--;
  }

  //* The input is a palindrome
  return true;
}

console.log(isPalindrome("race a car")); //* False
console.log(isPalindrome("race car")); //* True
console.log(isPalindrome("bob")); //* True
console.log(isPalindrome("sonoS")); //* True
console.log(isPalindrome("soneS")); //* False
console.log(isPalindrome("A man, a plan, a canal: Panama")); //* True
console.log(isPalindrome(" ")); //* True

//* Time: O(n) - It takes O(n) to iterate over every character in the input
//* Converting a character to lowercase takes O(1) since it is done on a single character each time

//* Space: O(1) - The memory usage remains constant regardless of input size
