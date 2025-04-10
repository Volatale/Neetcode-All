//* In a brute force manner, generate every possible pair (i, j)
//* Then simply check if the sum of the two elements (nums[i], nums[j]) < target
function countPairs(nums, target) {
  let pairs = 0;

  //* Generate every possible pair of indices (i, j)
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      //* Check if the current (i, j) pair is valid
      if (nums[i] + nums[j] < target) {
        pairs++;
      }
    }
  }

  return pairs;
}

console.log(countPairs([1, 2, 3, 7], 6)); //* 3
console.log(countPairs([-1, 1, 2, 3, 1], 2)); //* 3
console.log(countPairs([-6, 2, 5, -2, -7, -1, 3], -2)); //* 10

//* Time: O(n^2) - We have a pair of nested for loops, both of which scale with "n"

//* Space: O(1) - The memory usage remains constant regardless of the input size
