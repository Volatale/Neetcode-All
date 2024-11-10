//* Build the input number in reverse (starting from zero)
//* Then, compare the input and reversed number at the end
//* If they are equal, the input was a palindrome number
function isPalindrome(x) {
  //* Negative numbers are not palindromes
  if (x < 0) return false;

  let num = x;
  let reversed = 0;

  while (num > 0) {
    reversed = reversed * 10 + (num % 10); //* Get the first digit of the input
    num = Math.floor(num / 10); //* Get rid of the last digit
  }

  //* Check if both numbers are the same when read in either direction
  return reversed === x;
}

console.log(isPalindrome(121)); //* True
console.log(isPalindrome(-121)); //* False
console.log(isPalindrome(10)); //* False
console.log(isPalindrome(150)); //* False
console.log(isPalindrome(555)); //* True
console.log(isPalindrome(9)); //* True
console.log(isPalindrome(10)); //* False

//* Time: O(log10(n)) - We are dividing the input by 10 each iteration
//* There are "d" digits to handle; each division reduces the number of digits by 1

//* Space: O(1) - The only space we are using is used to create a number
//* So the space usage does not scale with the input size
