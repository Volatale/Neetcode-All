//* Instead of using a stack, we can just use variables
//* The stack is only used to track the current depth
//*     - But we can accomplish the same thing using a single variable
function maxDepth(str) {
  if (str.length === 0) return 0;

  let currDepth = 0;
  let maxDepth = 0;

  //* Iterate to find all of the "(" and ")"; ignore all other chars
  for (const char of str) {
    if (char === "(") {
      currDepth++;
      maxDepth = Math.max(maxDepth, currDepth);
    } else if (char === ")") {
      currDepth--;
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
//* Incrementing and decrementing take O(1) each

//* Space: O(1) - We are using constant space; our variables do not scale with the input size
