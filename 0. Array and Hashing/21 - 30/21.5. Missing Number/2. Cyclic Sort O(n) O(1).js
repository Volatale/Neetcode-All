//* Use Cyclic Sort
//*     - Array
//*     - Stability isn't needed
//*     - Given a range of values [0, n]
//*     - O(n) time complexity
function missingNumber(nums) {
  //* Cyclic Sort
  for (let i = 0; i < nums.length; i++) {
    let num = nums[i];

    while (nums[num - 1] !== i) {
      [nums[num - 1], num] = [num, nums[num - 1]];
    }
  }

  //* Check for missing / out of place element
  for (let i = 0; i <= nums.length; i++) {
    if (nums[i - 1] !== i) return i;
  }
}

console.log(missingNumber([3, 0, 1])); // 2
console.log(missingNumber([0, 1])); // 2
console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1])); // 8

//* Time: O(n) - It takes O(n) for the cyclic sort phase of the function to finish
//* Despite a nested while loop, the while loop only operates ONCE per element (if at all)
//* Then, we have another for loop that also scales with the input size, like the original for loop

//* Space: O(1) - The space usage remains constant; we only ever use constant space variables
