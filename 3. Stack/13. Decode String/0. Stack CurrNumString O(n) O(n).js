//* currNum represents the number of times we need to repeat the string
//* currString represents what we have in total
//* Whenever we encounter a "[", push currNum and currString to the stack
//* This resembles a recursive call because we need to solve the subproblems FIRST
//* Reset both to their defaults pushing both
//* If you encounter a "]", pop the top two elements
//* Then, concatenate the prevString with the repeated currString using prevNum
//* If you found a number (something that isn't NaN), we want to add this to the currNum
//* But we are told "k" ranges from [1, 300], so we need to handle more digits
//* Take 294:
//* 0 * 10 + 2 = 2
//* 2 * 10 + 9 = 29
//* 29 * 10 + 4 = 249, so we want to multiply by 10 each time
function decodeString(s) {
  const stack = [];

  //* Represents what we have for THIS group of brackets
  let currString = "";
  let currNum = 0;

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    //* Resembles a recursive call -> solve the subproblems first
    if (char === "[") {
      stack.push(currString);
      stack.push(currNum);

      //* Reset these so we can start fresh in the next subproblem
      currString = "";
      currNum = 0;
    } else if (char === "]") {
      const prevNum = stack.pop();
      const prevString = stack.pop();

      currString = prevString + currString.repeat(prevNum);
    } else if (!isNaN(char)) {
      currNum = currNum * 10 + parseInt(char);
    } else {
      currString += char; //* It is just a regular char
    }
  }

  return currString;
}

console.log(decodeString("3[a]2[bc]")); //* aaabcbc
console.log(decodeString("3[a2[c]]")); //* accaccacc
console.log(decodeString("2[abc]3[cd]ef")); //* abcabccdcdcdef

//* Time: O(n) - We process each element in the input twice at most
//* So O(2n) simplifies to O(n)

//* Space: O(n) - The size of the output scales with the input size on average
//* It really depends on what the max of "K" is
//* You could have "300[a]", then the output would be "a" * 300
//* But if it was "5[ab3[x]]" then it is "abxxxabxxxabxxxabxxxabxxx" so it is hard to analyze
//* So maybe max(k) * n? The above has 25 characters; 5^2 = 25?
