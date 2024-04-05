//* The stack is used to track the number of unbalanced parentheses
//* If we encounter a "[", we push it to the stack (we have 1 extra parentheses to balance)
//* Else if we encounter a "]", if stack.length > 1 (which means we still have parentheses to balance)
//*     - We found a "]", which means we can balance that parentheses
//*     - So pop something from the stack
//* Since we know half of the elements are "[" and the other half are "]"
//* We know that we will have to do stack.length / 2 swaps where "n" is the length of the string
//* But if the stack's length is odd, 3 // 2 = 1, but we know we need 2 swaps
//* So Math.floor((stack.length + 1) / 2) to account for odd stack lengths
function minSwapsToMakeBalanced(s) {
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "[") {
      stack.push("[");
    } else if (stack.length > 0) {
      stack.pop();
    }
  }

  return Math.floor((stack.length + 1) / 2);
}

console.log(minSwapsToMakeBalanced("")); //* 0
console.log(minSwapsToMakeBalanced("][][")); //* 1
console.log(minSwapsToMakeBalanced("][")); //* 1
console.log(minSwapsToMakeBalanced("[]")); //* 0
console.log(minSwapsToMakeBalanced("]]][[[")); //* 2
console.log(minSwapsToMakeBalanced("]]]][[[[")); //* 2
console.log(minSwapsToMakeBalanced("]]]]][[[[[")); //* 3

//* Time: O(n) - It takes O(n) time to iterate through the whole string
//* Pushing and Popping at O(1) time

//* Space: O(n) - The only thing we store in the stack are "[" characters
//* The string is made up of half "[" and half "]"
//* At worst, n / 2 elements will be in the stack, so the space usage scales with input size
