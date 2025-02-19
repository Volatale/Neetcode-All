//* string s, (, ) and lowercase english

//* Remove the MINIMUM number of parenthesis ( )
//* Such that the resulting parentheses is valid

//* Where AB = valid parentheses string
//* ()
//* (AB)
//* ((AB))
//* ()()()
//* (AB)() etc

//* parentheses problem = Stack

//* Assume the entire string is valid
//* Return a substring starting from 0 to n - 1
//* Gradually decrease the range on the right side (index--)

function minRemoveToMakevalid(s) {
  const stack = [];
  const string = []; // Final result
  let index = s.length - 1; // To avoid the necessity to reverse() at the end

  // Find indeces of mismatched parentheses (skip alphanumeric characters)
  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (char === "(") {
      stack.push(i);
    } else if (
      char === ")" &&
      stack.length > 0 &&
      s[stack[stack.length - 1]] === "(" // The top could be a mismatched ")", so we can't say its balanced
    ) {
      stack.pop();
    } else if (char === ")") {
      // This index will be skipped
      stack.push(i);
    }
  }

  // Rebuild string, but skip the indices still in the stack
  // Loop backwards to avoid reversing at the end
  for (let i = s.length - 1; i >= 0; i--) {
    const char = s[i];

    if (stack.length > 0 && i === stack[stack.length - 1]) {
      stack.pop();
      index--;
    } else {
      string[index] = char;
      index--;
    }
  }

  return string.join("");
}
