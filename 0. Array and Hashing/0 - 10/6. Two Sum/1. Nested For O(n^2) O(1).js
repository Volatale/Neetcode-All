//* In the most brute force manner, simply use two nested for loops
//* There are two indices (i, j), whose values store two numbers that sum to target
function twoSum(nums, target) {
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
}

console.log(twoSum([2, 7, 11, 15], 9)); //* [0, 1]
console.log(twoSum([1, 5, 1], 2)); //* [0, 2]
console.log(twoSum([3, 2, 4], 6)); //* [1, 2]
console.log(twoSum([3, 3], 6)); //* [0, 1]

//* Time: O(n^2) - We have two nested for loops, so the time taken scales with the input size squared

//* Space: O(1) - The memory usage remains constant regardless of the input size
