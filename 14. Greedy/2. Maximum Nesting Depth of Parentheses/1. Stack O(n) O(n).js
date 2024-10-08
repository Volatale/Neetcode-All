//* Parentheses questions are usually suited for stacks
//* We are always given a VALID parentheses string
//*     - So we don't have to worry about edge cases
//! Ignore every other type of character
//*     - They don't help us at all
//* The stack's length tells us how deeply nested we currently are
//*     - So track the global maximum
//* Potentially update the max after every "push"
//*     - We KNOW the string is going to be valid
//*     - So we can pre-emptively assume a correct result
//* If we encounter a "(", push
//* Else if ")", pop
function maxDepth(str) {
  if (str.length === 0) return 0;

  const depth = []; //* Length of depth gives us the max nesting depth
  let maxDepth = 0;

  //* Iterate to find all of the "(" and ")"; ignore all other chars
  for (const char of str) {
    if (char === "(") {
      depth.push("(");
      maxDepth = Math.max(maxDepth, depth.length);
    } else if (char === ")" && depth.length > 0) {
      depth.pop();
    }
  }

  return maxDepth;
}

console.log(maxDepth("(1+(2*3)+((8)/4))+1")); //* 3
console.log(maxDepth("(((())(())))")); //* 4
console.log(maxDepth("(1)+((2))+(((3)))")); //* 3
console.log(maxDepth("()(())((()()))")); //* 3
console.log(maxDepth("()")); //* 1
console.log(maxDepth("(())")); //* 2
console.log(maxDepth("()()()")); //* 1

//* Time: O(n) - Iterating through the entire array takes O(n)
//* Pushing to an array is amortized constant time and popping is always O(1)

//* Space: O(n) - If we had "((()))", the stack would grow to n / 2 size in the worst case
//* We are always given a VALID parenthese string
//* In Big O Notation, we drop constants, so O(n / 2) becomes O(n)
