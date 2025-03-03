//* First, we trim on the left and right to remove the leading/trailing whitespace
//* Splitting via the regex "/\s+/" lets us match ANY amount of whitespace (1 or more)
//* Then, we can simply reverse the string and join the string back using singular spaces
function reverseWords(s) {
  return s.trim().split(/\s+/).reverse().join(" ");
}

console.log(reverseWords("the sky is blue")); //* "blue is sky the"
console.log(reverseWords("the  sky is  blue")); //* "blue is sky the"
console.log(reverseWords("  hello world   ")); //* "world hello"
console.log(reverseWords("a good   example")); //* "example good a"
console.log(reverseWords("sonic")); //* "sonic"

//* Time: O(n) - In the worst case, the time taken scales with the input size

//* Space: O(n) - In JS, strings are immutable, so we create a few copies, plus an ephemeral array
