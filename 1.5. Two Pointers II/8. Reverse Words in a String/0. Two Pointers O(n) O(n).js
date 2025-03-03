//* Since we need to reverse the string, it makes sense to iterate backwards
//* We can use two pointers
//*     - right marks the END of the current word
//*     - left marks the START of the current word (it usually points to whitespace)
//* Then, if string.length > 0, we know we need to add a space before appending the current word
//* After adding the current word using s.slice, we set right = left
function reverseWords(s) {
  let string = "";

  //* Iterate backwards to avoid reversing
  let right = s.length - 1;

  while (right >= 0) {
    //* Skip trailing whitespace
    while (right >= 0 && s[right] === " ") right--;

    //* We are out of bounds - no more characters
    if (right < 0) break;

    let left = right;

    //* Find the START of the current word (could be " " or out of bounds)
    while (left >= 0 && s[left] !== " ") left--;

    //* Process the word (and add empty space if needed)
    if (string.length > 0) string += " ";
    string += s.slice(left + 1, right + 1);

    //* Skip to the start of the
    right = left;
  }

  return string;
}

console.log(reverseWords("the sky is blue")); //* "blue is sky the"
console.log(reverseWords("the  sky is  blue")); //* "blue is sky the"
console.log(reverseWords("  hello world   ")); //* "world hello"
console.log(reverseWords("a good   example")); //* "example good a"
console.log(reverseWords("sonic")); //* "sonic"

//* Time: O(n) - We iterate through every character, so the time taken scales with s.length

//* Space: O(n) - In the worst case, the resulting string has a length equal to s.length
