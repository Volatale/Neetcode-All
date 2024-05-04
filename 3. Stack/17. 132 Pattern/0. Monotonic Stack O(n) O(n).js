//* Use a monotonically decreasing stack
//* Iterate in reverse because we want to find the next greater element of "2" in "132"
//* Lets say you have [1, 6, 5, 4, 3, 2, 1]
//* Every time you pop when you find the NGE, second increases in value
//* This means that the range of values we can use to test for "1" in "132" increases
//* If second = 5, and you popped a 10, then now second is 10
//* Which means any value AFTER the "3" in "132" < 10 can be used as our "1" in "132"
//* At the start of each iteration, check if you have a value < second
//* Any value that fits that criteria ALSO fits the "1" in "132" criteria, so return true
//* This is why second starts as -Infinity, because you could get a false positive otherwise
function find132Pattern(nums) {
  if (nums.length < 3) return false;

  //* Monotonically Decreasing Stack
  const stack = [];

  //* When we pop, we want to find an element that is LESS than this (this is "2" in "132")
  let second = -Infinity;

  //* Loop backward because we want to maximize the chance of finding the "1" later
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] < second) return true; //* "1" in "132"

    //* Find the next greater element
    while (stack.length > 0 && nums[i] > stack[stack.length - 1]) {
      second = stack.pop();
    }

    stack.push(nums[i]);
  }

  return false;
}

console.log(find132Pattern([1, 2, 3, 4])); //* False
console.log(find132Pattern([3, 1, 4, 2])); //* True
console.log(find132Pattern([-1, 3, 2, 0])); //* True
console.log(find132Pattern([1, 4, 5])); //* False
console.log(find132Pattern([1, 3, 2])); //* True

//* Time: O(n) - At worst, we push and pop each element twice each
//* So that would be O(2n), but we drop constants in Big O Notation -> O(n)

//* Space: O(n) - In the worst case, we have an array like [1, 4, 5]
//* None of these elements trigger the while loop, thus none are popped
//* The stack contains "n" elements, which is proportional to the input size
