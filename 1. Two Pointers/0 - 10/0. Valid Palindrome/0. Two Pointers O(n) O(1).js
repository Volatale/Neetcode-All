//* Use a Regular Expression to check for alphanumeric characters
//* Use two pointers to track the left and right character
//* If we find a non-alphanumeric on either side, skip it
//* Once you have an alphanumeric character on both sides, convert that character to lowercase
//* Then check if they are the same; if not, return false
function validPalindrome(s) {
  const isAlphaNumeric = (char) => /[a-zA-Z0-9]/gi.test(char);

  //* Two Pointers
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    //* Skip non-alphanumeric characters
    while (left < right && !isAlphaNumeric(s[left])) {
      left++;
    }

    //* We check for right < left because the above may
    while (left < right && !isAlphaNumeric(s[right])) {
      right--;
    }

    //* O(1) time since we only check ONE character per call
    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;

    left++;
    right--;
  }

  return true;
}

console.log(validPalindrome("race a car")); //* False
console.log(validPalindrome("race car")); //* True
console.log(validPalindrome("bob")); //* True
console.log(validPalindrome("sonoS")); //* True
console.log(validPalindrome("soneS")); //* False
console.log(validPalindrome("A man, a plan, a canal: Panama")); //* True
console.log(validPalindrome(" ")); //* True

//* Time: O(n) - It takes O(n) time to iterate through the whole string
//* It takes O(1) time to convert 1 char to lowercase, and also O(1) to check for alphanumeric characters

//* Space: O(1) - We don't use any extra space other than constant space variables
