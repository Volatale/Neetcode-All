//* Given an input string, we need to reverse the order of the words
//* All of the words are separated by spaces
//* Strings in JavaScript are immutable, so we need to convert the string into an array
//* We can use the split() function to remove all of the leading/trailing whitespace
//* Then, we can simply use a two pointer approach to reverse everything in-place
//* One pointer marks the first index of the word
//* And the other marks the last index of the word
//! Multiple whitespace should be reduced to single whitespace
function reverseWords(s) {
  let string = [];

  //* Iterate backwards to avoid reversing
  let right = s.length - 1;

  while (right >= 0) {
    //* Skip trailing whitespace
    while (right >= 0 && s[right] === " ") right--;

    //* We are out of bounds, thus there are no more characters
    if (right < 0) break;

    //* Used to find the START of this word
    let left = right;

    //* Move `left` to the first index of this word
    while (left >= 0 && s[left] !== " ") left--;

    //* Process the word and add empty space if necessary
    if (string.length > 0) string.push(" ");
    string.push(s.slice(left + 1, right + 1));

    //* Move the right pointer
    right = left;
  }

  return string.join("");
}

console.log(reverseWords("the sky is blue")); //* "blue is sky the"
console.log(reverseWords("the  sky is  blue")); //* "blue is sky the"
console.log(reverseWords("  hello world   ")); //* "world hello"
console.log(reverseWords("a good   example")); //* "example good a"
console.log(reverseWords("sonic")); //* "sonic"
