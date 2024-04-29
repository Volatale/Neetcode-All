//* Take subarrays of size "k"
//* Check the max in those windows
//* Add each max to the output array
function slidingWindowMaximum(nums, k) {
  const result = [];

  //* Iterate over the entire array
  for (let i = 0; i <= nums.length - k; i++) {
    let maxSum = nums[i];

    //* Look ahead "k" numbers
    for (let j = i; j < i + k; j++) {
      maxSum = Math.max(maxSum, nums[j]);
    }

    result.push(maxSum);
  }

  return result;
}

console.log(slidingWindowMaximum([1, 3, -1, -3, 5, 3, 6, 7], 3)); //* [3, 3, 5, 5, 6, 7]
console.log(slidingWindowMaximum([1, 2, 3], 1)); //* [1, 2, 3]
console.log(slidingWindowMaximum([1, 3, -1], 3)); //* [3]

//* Time: O(n * k) - For every outer loop, there are "k" inner loops
//* Push adds an element to the end of the array in O(1) time

//* Space: O(k) - The space usage scales with "k", not "n"
//* If we have an array like [1, 2, 3, 4, 5], and k = 1
//* That gives us [1, 2, 3, 4, 5] as the output
//* If k = 2, then we get [2, 4]
//* Then if k = 3, then we get [3]
//* All of these are different output lengths that scale with "k"
//* Even when "n" stays the same
