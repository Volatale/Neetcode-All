//* Simply convert the number into a string
//* Then compare each opposite index at the same time
function isPalindrome(x) {
  const string = x.toString();

  //* Check if the string is a palindrome
  for (let i = 0; i < string.length / 2; i++) {
    if (string[i] !== string[string.length - 1 - i]) return false;
  }

  //* The input was a palindrome
  return true;
}

console.log(isPalindrome(121)); //* True
console.log(isPalindrome(-121)); //* False
console.log(isPalindrome(10)); //* False
console.log(isPalindrome(150)); //* False
console.log(isPalindrome(555)); //* True
console.log(isPalindrome(9)); //* True
console.log(isPalindrome(10)); //* False

//* Time: O(n) - It takes O(n) to convert the input into a string
//* Then, we perform a for loop that iterates n / 2 times (O(n))

//* Space: O(n) - We need to create a string of "n" length
//* Each digit is converted to a number
