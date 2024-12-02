//* Try every possible pair and see if it forms a bad pair
function countBadPairs(nums) {
  //* We need two or more elements to make a pair
  if (nums.length <= 1) return 0;

  let pairs = 0;

  //* Try every possible pair
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      //* Found a valid bad pair
      if (j - i !== nums[j] - nums[i]) {
        pairs++;
      }
    }
  }

  return pairs;
}

console.log(countBadPairs([4, 1, 3, 3])); //* 5
console.log(countBadPairs([1, 2, 3, 4, 5])); //* 0
console.log(countBadPairs([1])); //* 0
console.log(countBadPairs([2, 1])); //* 1

//* Time: O(n^2) - We have a nested for loop, both of which scale with the input size
//* So the time taken scales quadratically

//* Space: O(1) - No additional space that scales with the input size is being used
