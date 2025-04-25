function twoSum(nums, target) {
  //* We found value at index "i" (val : i)
  const seen = {};

  for (let i = 0; i < nums.length; i++) {
    //* Since we have nums[i], we want to find its complement
    const complement = target - nums[i];

    //* Check if we already found the complement at an earlier index
    if (seen.hasOwnProperty(complement)) {
      return [seen[complement], i];
    }

    //* We have found "value" at index "i"
    seen[nums[i]] = i;
  }
}

console.log(twoSum([2, 7, 11, 15], 9)); //* [0, 1]
console.log(twoSum([1, 5, 1], 2)); //* [0, 2]
console.log(twoSum([3, 2, 4], 6)); //* [1, 2]
console.log(twoSum([3, 3], 6)); //* [0, 1]

//* Time: O(n) - The time taken in the worst case scales with the size of the input
//* The indices we need could be at the very end of the array, which means we have to iterate through the whole array

//* Space: O(n) - The number of keys we store in the obj scales with the size of the input
//* If the keys we need exist at the very end of the array, we need to store all of the prior keys within the obj
