//* Try every possible number of jumps given by nums[i]
//* If nums[2] = 4
//*     - We can try 1, 2, 3 or 4 jumps forward from the current step
function canJump(nums) {
  function makeJumps(i) {
    //* Successfully made it to last index
    if (i === nums.length - 1) return true;

    //* Travelled too far (or can't move at all)
    if (i >= nums.length || nums[i] === 0) return false;

    //* Try number of jumps in range [1, nums[i]]
    for (let j = 1; j <= nums[i]; j++) {
      if (makeJumps(i + j)) {
        return true;
      }
    }

    //* Failed to get to index n - 1 from here
    return false;
  }

  return makeJumps(0);
}

console.log(canJump([2, 3, 1, 1, 4])); //* True
console.log(canJump([0])); //* True
console.log(canJump([3, 2, 1, 0, 4])); //* False
console.log(canJump([2, 1, 2, 0, 0])); //* True
console.log(canJump([0, 0, 0])); //* False

//* Time: O(max(nums) ^ n))
//* Branching factor scales with the length of the maximum number of jumps we can make (max(nums))
//* There are n possible jumps we can make, anything else goes out of bounds

//* Space O(n) - We can go "n" levels deep assuming every element is a 1
