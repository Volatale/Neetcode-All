//* Replace any non-alphanumeric character with ""
//* Then just check for a palindrome
function validPalindrome(s) {
  s = s.replace(/[^a-z0-9]/gi, "").toLowerCase();

  for (let i = 0; i < s.length / 2; i++) {
    if (s[i] !== s[s.length - i - 1]) return false;
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
//* It also takes O(n) to convert the string to lowercase, and again for replacing non-alphanumeric chars

//* Space: O(n) - We technically create a "new" string in JS since strings are immutable
