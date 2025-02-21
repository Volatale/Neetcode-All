//* The array contains "n" elements
//! All of the elements are in the range [1, n]
//* Thus we can say:
//*     - All of the elements are positive
//*     - If we had an array like [1, 2, 3], we can "safely" index via nums[i] - 1
//* We can simply set the number at each index to its negative
//* But before that, we check if the number at the current index is ALREADY negative
//*     - If it is, then the current element has a duplicate; push it to the result array
//* For example, lets say we have nums = [1, 1, 2, 2]
//*     - i = 0: index = (1 - 1 = 0)
//*         - Is nums[0] < 0 ? No
//*         - nums[0] = -nums[0] (-1)
//*     - i = 1: index = (1 - 1 = 0)
//*         - Is nums[0] < 0 ? Yes, so we have a duplicate
//*             - We revisited the same index, and it was negative
//*             - This indicates we already found a 1
//*         - Push Math.abs(0 + 1)
//*             - Why add 1? Because an INDEX is offset by -1, so add 1 to fix it
//*     - The same holds true for the other indices
//* Essentially, just set every element to negative
//* And if we revisit this index again later, we know it has a duplicate somewhere
//! Why does this work? Solely because all the numbers are in the range [1, n]
//*     - If the numbers included 0, then (0 - 1 = -1), and -1 is an out of bounds index
//*     - Hence this technique wouldn't work
function findDuplicates(nums) {
  //* There are no duplicates
  if (nums.length <= 1) return [];

  const duplicates = [];

  //* nums[i] is in the range [1, n], so we can safely index by subtracting 1 from nums[i]
  for (let i = 0; i < nums.length; i++) {
    const index = Math.abs(nums[i]) - 1;

    //* If nums[index] is negative, we found a duplicate
    if (nums[index] < 0) {
      //* nums[index] is negative, and offset by 1, so add 1 to fix it
      duplicates.push(Math.abs(index + 1));
    }

    //* If we revisit this index, we have a duplicate
    nums[index] = -nums[index];
  }

  return duplicates;
}

console.log(findDuplicates([4, 3, 2, 7, 8, 2, 3, 1])); //* [2, 3]
console.log(findDuplicates([1, 1, 2])); //* [1]
console.log(findDuplicates([1])); //* []

//* Time: O(n) - The time taken scales with the input size - we iterate through the entire array

//* Space: O(1) - The auxillary space is excluded, so we are using constant space
