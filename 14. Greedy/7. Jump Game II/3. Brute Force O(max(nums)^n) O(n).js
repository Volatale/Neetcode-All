//* Try making every possible jump from every position
//* nums[i] gives us the MAXIMUM jump we can make
//*     - But we can make anywhere from [1, nums[i]] jumps from each position
//* We have no idea which number is best at each index
//*     - Thus there is no heuristic we can apply
//* Using a brute force approach, we can just try every possible move
//*     - And then take the "minimum" (optimal) choice
function jump(nums) {
  function makeJumps(i) {
    //* We made it to the end
    if (i === nums.length - 1) return 0;

    //* Travelled too far
    if (i >= nums.length) return Infinity;

    let minJumps = Infinity;

    //* Try making every number of jumps in range [1:nums[i]]
    for (let j = 1; j <= nums[i]; j++) {
      //* Add 1 to include THIS jump
      minJumps = Math.min(minJumps, makeJumps(i + j) + 1);
    }

    return minJumps;
  }

  return makeJumps(0);
}

console.log(jump([2, 3, 1, 1, 4])); //* 2
console.log(jump([0])); //* 0
console.log(jump([3, 2, 0, 0])); //* 1
console.log(jump([1, 1, 1])); //* 2
console.log(jump([7, 0, 9, 6, 9, 6, 1, 7, 9, 0, 1, 2, 9, 0, 3])); //* 2

//* Time: O(max(nums)^n) - The branching factor scales with the max number in nums
//* The height of the recursion tree scales with "n" itself

//* Space: O(n) - The height of the recursion tree scales with "n"
