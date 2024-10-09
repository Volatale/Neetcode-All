//* Try every possible number of jumps given by nums[i]
//* If nums[2] = 4
//*     - We can try 1, 2, 3 or 4 jumps forward from the current step

//* Memoize the results of each subproblem
function canJump(nums) {
  function makeJumps(i, memo) {
    //* Successfully made it to last index
    if (i === nums.length - 1) return true;

    //* Travelled too far (or can't move at all)
    if (i >= nums.length || nums[i] === 0) return false;

    //* Utilize memoized value
    if (memo.hasOwnProperty(i)) return memo[i];

    //* Try number of jumps in range [1, nums[i]]
    for (let j = 1; j <= nums[i]; j++) {
      if (makeJumps(i + j, memo)) {
        return (memo[i] = true);
      }
    }

    //* Failed to get to index n - 1 from here
    return (memo[i] = false);
  }

  return makeJumps(0, {});
}

console.log(canJump([2, 3, 1, 1, 4])); //* True
console.log(canJump([0])); //* True
console.log(canJump([3, 2, 1, 0, 4])); //* False
console.log(canJump([2, 1, 2, 0, 0])); //* True
console.log(canJump([0, 0, 0])); //* False

//* Time: O(n^2)) - For each of the "n" indices, we could explore all "n" jumps

//* Space O(n) - We have "n" different keys to cache
//* We can go "n" levels deep assuming every element is a 1
