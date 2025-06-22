//* Given an encoded string, we need to decode it
//* The encoding is that if we have a number "k" followed by [encodedString]
//*     - The "encodedString" is repeated "k" times
//* The "encodedString" will never contain any digits, but they can be nested
//* Essentially, this is a parentheses problem
//! Parentheses problems should either be handled via recursion, or an explicit stack
//* We need to track a few things:
//*     - The string of characters that are found (within the current nesting level)
//*     - The number of repetitions that need to happen
//*         - Note that "k" can be a multi-digit number, so place value must be handled
//* If we encounter a character, add it to the current encoded string
//* If we encounter a digit, add its place value in the repetition count variable
//* Upon encountering a "[", we have a new level of nesting
//*     - Push the current encoded string, and the repeated count onto the stack (so we can revisit it later)
//* Upon encountering a "]", we are decreasing the level of nesting
//*     - Pop both the repeat count and the encoded string and concatenate the repeated version onto the global string
function decodeString(s) {
  const isNumeric = (input) => /[0-9]/gi.test(input);

  const stack = [];
  let currString = "";
  let currNum = 0;

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (char === "[") {
      //* Store the state of the current string
      stack.push(currString);
      stack.push(currNum);

      //* Fresh variables to track the new nested level
      currString = "";
      currNum = 0;
    } else if (char === "]") {
      //* Get the previous string so we can add `this` string to it
      const repeatCount = stack.pop();
      const prevString = stack.pop();

      currString = prevString + currString.repeat(repeatCount);
    } else if (isNumeric(char)) {
      //* Handle place value; there could be multiple consecutive digits
      currNum = currNum * 10 + parseInt(char);
    } else {
      //* Add the character to the current encoded string
      currString += char;
    }
  }

  return currString;
}

console.log(decodeString("3[a]2[bc]")); //* aaabcbc
console.log(decodeString("3[a2[c]]")); //* accaccacc
console.log(decodeString("2[abc]3[cd]ef")); //* abcabccdcdcdef

//* Time: O(nk) - There are "n" characters in the input string, which means "n" characters to process
//* However, we are using the `repeat()` function, which has a time complexity of "k" in our case

//* Space: O(n) - The memory usage scales with the number of characters in the input string
