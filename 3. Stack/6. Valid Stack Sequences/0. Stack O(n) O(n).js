//* We are given two arrays, and we essentially start with an empty stack
//* By pushing elements in array 1, and popping elements in array 2, we need to check validity
//* The goal is to check if there is some permutation of push/pop that is successful
//* Imagine we had [1, 2, 3] and [3, 2, 1]
//* The first element that gets popped is 3, which means it is dependent on 3 existing in the stack
//* In other words, the "popped" elements have a dependency on the "pushed" elements
//*     - "Popped" is a permutation of "pushed"
//! We can use a two pointer approach to track the progress through both arrays
//* Push the current element (since we have no choice)
//* Then, for popping, while the top of the stack is equivalent to popped[index], pop
//* If at the end, stack.length === 0, then we successfully pushed and popped every element
//*     - Thus we can say the stack sequence is valid
function validateStackSequences(pushed, popped) {
  const stack = [];
  let index = 0; //* Tracks index of next element to be popped

  for (let i = 0; i < pushed.length; i++) {
    stack.push(pushed[i]);

    //* Pop all of the elements with a dependency
    while (stack.length > 0 && stack[stack.length - 1] === popped[index]) {
      stack.pop();
      index++;
    }
  }

  //* If stack's length is 0, there is nothing left to pop
  return stack.length === 0;
}

console.log(validateStackSequences([1, 2, 3, 4, 5], [4, 5, 3, 2, 1])); //* True
console.log(validateStackSequences([1, 2, 3, 4, 5], [4, 3, 5, 1, 2])); //* False
console.log(validateStackSequences([5, 4, 3], [3, 4, 5])); //* True

//* Time: O(n) - The time taken scales with the length of the input (pushed.length === popped.length)

//* Space: O(n) - The stack size scales proportionally with n (in the worst case)
