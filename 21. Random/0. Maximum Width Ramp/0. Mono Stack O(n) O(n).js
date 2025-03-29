//* Use a monotonically decreasing stack
//* Why? In [6, 0, 8, 2, 1, 5]
//*     - Why would we start a ramp at 8 instead of 6?
//*     - 6 is a SMALLER number than 8
//*         - Thus it has a HIGHER chance of finding a number GREATER than it to the right
//*         - 8 has LESS of a chance to find a number greater
//*     - Thus, any ramp that includes 6 will ALSO include 8, thus there is no need to start at 8
//* We need to pre-emptively add all of the ramp starter INDICES to the stack
//*     - These elements represent the START (i) of the ramp
//* Then, iterate through the array BACKWARDS
//*     - If we find an element >= whatever is on top of the stack
//*     - Compute i - stack.pop() (remember, the stack holds indices, not actual values)
//*         - This gives us the ramp starting at the index on the stack, and ending at the current "i"
//* This logic works because if we have a VALID window of elements
//*     - Any smaller window WITHIN this valid window will ALSO be valid
//*     - Hence there is no need to recalculate those ramps
function maxWidth(nums) {
  //* If there are only 2 values, the max width ramp we can have is 1
  if (nums.length === 2) return nums[0] <= nums[1] ? 1 : 0;

  let maxRamp = 0;

  //* Monotonically decreasing stack - contains indices of ramp STARTER candidates
  const stack = [];

  //* Add ramp starter candidate indices to stack (elements < top of stack)
  for (let i = 0; i < nums.length; i++) {
    if (stack.length === 0 || nums[i] < nums[stack[stack.length - 1]]) {
      stack.push(i);
    }
  }

  //* Calculate the ramp sizes (stack contains START index of ramp, "i" = END index of ramp)
  for (let i = nums.length - 1; i >= 0; i--) {
    while (stack.length > 0 && nums[i] >= nums[stack[stack.length - 1]]) {
      maxRamp = Math.max(maxRamp, i - stack.pop());
    }
  }

  return maxRamp;
}

console.log(maxWidth([6, 0, 8, 2, 1, 5])); //* 4
console.log(maxWidth([9, 8, 1, 0, 1, 9, 4, 0, 4, 1])); //* 7
console.log(maxWidth([1, 2, 3, 4, 5])); //* 4
console.log(maxWidth([3, 2, 1])); //* 0
console.log(maxWidth([5, 8, 1, 0, 3, 4, 5, 0])); //* 6

//* Time: O(n) - We have to iterate over the input to add the ramp starter candidate indices to the array
//* Then we have to iterate over it again (in reverse) to calculate the length of each possible ramp

//* Space: O(n) - The stack can potentially grow to "n" length
