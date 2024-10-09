//* Instead of starting on the left
//*     - Start AT the goal
//* If we can make it to (or beyond) the goal from the current position
//*     - Then we can "move" the goal
//* If goal is 0 at the end, we can make it from 0 to n - 1
function canJump(nums) {
  if (nums.length === 0) return false;

  let goal = nums.length - 1;

  for (let i = nums.length - 1; i >= 0; i--) {
    //* We can make it to the goal from here
    if (nums[i] + i >= goal) {
      goal = i; //* So "i" is our new goal
    }
  }

  //* If goal === 0, we can make it from index 0 to n- 1
  return goal === 0 ? true : false;
}

console.log(canJump([2, 3, 1, 1, 4])); //* True
console.log(canJump([0])); //* True
console.log(canJump([3, 2, 1, 0, 4])); //* False
console.log(canJump([2, 1, 2, 0, 0])); //* True
console.log(canJump([0, 0, 0])); //* False
console.log(canJump([5, 0, 0, 0, 0, 0])); //* True

//* Time: O(n) - We iterate through the entire array once in the worst case
//* If every element is a 1, we have to try every step ([1, 1, 1])

//* Space: O(1) - We are only using constant space variables
