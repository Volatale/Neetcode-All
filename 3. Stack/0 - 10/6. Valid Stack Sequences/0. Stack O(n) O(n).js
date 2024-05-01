//* Use the stack to represent what is pushed
//* While the top of the stack === popped[i], pop the stack
//* If the stack's length is 0 at the end, then we popped everything successfully
function validateStackSequences(pushed, popped) {
  const stack = [];

  //* Tracks popped index
  let index = 0;

  for (let i = 0; i < pushed.length; i++) {
    stack.push(pushed[i]);

    //* Keep popping while the top element matches popped[index]
    while (
      stack.length > 0 && //* Only if you actually have something to pop
      popped[index] === stack[stack.length - 1]
    ) {
      stack.pop();
      index++;
    }
  }

  //* Stack might not be empty by the time we leave the for loop
  return stack.length === 0;
}

console.log(validateStackSequences([1, 2, 3, 4, 5], [4, 5, 3, 2, 1]));
console.log(validateStackSequences([1, 2, 3, 4, 5], [4, 3, 5, 1, 2])); //*
console.log(validateStackSequences([5, 4, 3], [3, 4, 5])); //* True

//* Time: O(n) - At most we push and pop all elements twice
//* So the time taken scales with the size of the inputs
//* Both arrays have an equal length

//* Space: O(n) - At worst, every element is stored in the stack
//* Push = [1, 2, 3, 4, 5] -> [5, 4, 3, 2, 1]
