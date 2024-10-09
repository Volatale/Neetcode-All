//* Track the maximum index we can travel to
//* We can move FROM this index (i) ahead [1, nums[i]] spaces
//*     - For example, if index 0 is 4
//*     - We can move to index [1, 2, 3, 4]
//* i + nums[i] gives us the number of steps ahead we can jump
//* We don't actually care about the individual number itself
//*     - It is essentially just an upperbound on where we can move to
//* If index 2 is [2], we can move to (at max), index 4 (2 + 2)
//*     - The first 2 is where we CURRENTLY are, and index 4 is the max we can move to
function canJump(nums) {
  if (nums.length === 0) return false;

  const n = nums.length;
  let maxIndex = 0; //* Max step we can travel to
  let i = 0; //* Current step we are on

  while (i <= maxIndex) {
    //* Potentially find a new maximum index
    maxIndex = Math.max(maxIndex, i + nums[i]);
    i++;

    //* Made it to the final index
    if (maxIndex >= n - 1) return true;
  }

  //* Failed to make it to the final index
  return false;
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
