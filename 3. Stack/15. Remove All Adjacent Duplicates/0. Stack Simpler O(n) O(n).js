//* We want to know the most recently found elements - that entails the use of a stack
//* We basically have to track the state of the string the whole way though
//* Track what the top of the stack is BEFORE pushing the new element
//* If prev === top of the stack (after the push), you found an adjacent duplicate
function removeAllAdjacentDuplicates(s) {
  //* Used to track the most recently seen elements
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    //* If the top element is the same as the current, just pop
    if (stack.length > 0 && stack[stack.length - 1] === s[i]) {
      stack.pop();
    } else {
      stack.push(s[i]); //* They don't match, so push
    }
  }

  //* Convert the "stack" to a string
  return stack.join("");
}

console.log(removeAllAdjacentDuplicates("abbaca")); //* "ca"
console.log(removeAllAdjacentDuplicates("azxxzy")); //* "ay"
console.log(removeAllAdjacentDuplicates("aabbcc")); //* ""
console.log(removeAllAdjacentDuplicates("yx")); //* "yx"
console.log(removeAllAdjacentDuplicates("paapo")); //* "o"
console.log(removeAllAdjacentDuplicates("aaaaaa")); //* ""
console.log(removeAllAdjacentDuplicates("abaabawo")); //* "wo"

//* Time: O(n) - We have to iterate through the entire array once
//* It takes α(1) time to push to an array, and O(1) to pop

//* Space: O(n) - In the worst case, every element is unique
//* So we would push everything, and never pop at all
