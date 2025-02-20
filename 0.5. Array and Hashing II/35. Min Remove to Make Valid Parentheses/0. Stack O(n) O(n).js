//* Generally, parentheses questions involve stacks
//* We need to know which indices LEAD to invalid parentheses
//* It is a bad idea to just push "(" and ")" to the stack in this case
//* We can't know ahead of time whether or not skipping THIS index is smart
//*     - Since this is not a Dynamic Programming approach, we can't reverse our decision
//* So we simply want to mark characters as INVALID the moment the parentheses becomes invalid
//*     - In other words, we'll be greedy and just track what we currently have
//* If char === "(", then we need to find a closer to match with
//* Else if char === ")", we need to do some checks
//!     - If stack.length is 0, we found an EXTRA ")" that had no prior "("
//*         - Which means its inclusion creates an invalid parentheses, so skip it
//*     - If stack.length > 0, then we found a ")" to match with a prior "("
//*         - So pop() from the stack, this parentheses is no longer necessary
//* Else if char === ")", this index needs to be skipped
//* Then, any index still remaining in the stack needs to be skipped
//* Iterate through the string in reverse and skip any indices that are in the stack
//! If there are multiple choices to remove, we can ALWAYS remove the last one
//*     - We can't assume there are any "(" that succeed the current position
//*     - However, if there IS, then any PRECEEDING "(" can ALSO match the later ")"
//*         - So removing the latest ")" gives us the most flexibility
function minRemoveToMakevalid(s) {
  const stack = [];
  const string = new Array(s.length).fill("");

  //* Find the indices that contain invalid parentheses
  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (char === "(") {
      //* Need to find a closing parentheses for this index
      stack.push(i);
    } else if (
      //* Balanced this parentheses
      char === ")" &&
      stack.length > 0 &&
      s[stack[stack.length - 1]] === "("
    ) {
      stack.pop();
    } else if (char === ")") {
      //* This index needs to be skipped (imbalanced parentheses)
      stack.push(i);
    }
  }

  //* Build the string, but skip the indices that exist in the stack
  //* Loop backwards to avoid reversing the array (we have a stack)
  for (let i = s.length - 1; i >= 0; i--) {
    const char = s[i];

    //* Skip the indices that exist in the stack (they create invalid parentheses)
    if (stack.length > 0 && i === stack[stack.length - 1]) {
      stack.pop();
    } else {
      string[i] = char;
    }
  }

  return string.join("");
}

console.log(minRemoveToMakevalid("lee(t(c)o)de)")); //* "lee(t(c)o)de"
console.log(minRemoveToMakevalid("a)b(c)d")); //* "ab(c)d"
console.log(minRemoveToMakevalid(")))(((")); //* ""
console.log(minRemoveToMakevalid(")()(")); //* "()"
console.log(minRemoveToMakevalid(")))(())(((")); //* "(())"

//* Time: O(n) - Iterating over the input takes O(n), and we do this twice

//* Space: O(n) - In the worst case, we don't remove any characters from the input
//* Which means both the stack and return have the same length as the input
