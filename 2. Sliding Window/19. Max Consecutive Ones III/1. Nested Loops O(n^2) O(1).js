//* Test every subarray, and only record the maximum lengths
//* Track the number of 0s we have encountered within THIS subarray
//* If that number is > k, the subarray is invalid
function maxConsecutiveOnesIII(nums, k) {
  let maxOnes = 0;

  for (let i = 0; i < nums.length; i++) {
    let zeroes = 0; //* Track the number of 0s

    for (let j = i; j < nums.length; j++) {
      if (nums[j] === 0) {
        zeroes++;
      }

      //* You can't have more than k 0s in your subarray
      if (zeroes > k) {
        break;
      }

      maxOnes = Math.max(maxOnes, j - i + 1);
    }
  }

  return maxOnes;
}

console.log(maxConsecutiveOnesIII([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2)); //* 6
console.log(
  maxConsecutiveOnesIII(
    [0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1],
    3
  )
); //* 10
console.log(maxConsecutiveOnesIII([0, 0, 0, 1, 0, 0, 0], 0)); //* 1
console.log(maxConsecutiveOnesIII([0, 0], 0)); //* 0

//* Time: O(n^2) - There are 2 nested for loops, both of which depend on "n"

//* Space: O(1) - We only use constant space variables
