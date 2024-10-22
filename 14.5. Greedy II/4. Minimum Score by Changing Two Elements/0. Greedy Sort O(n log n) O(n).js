//* To minimize the sum, we can just do n - n
//*     - So two of the elements should be equal
//* Then, all we have to do is minimize the maximum sum
//! But we need to ensure we keep the duplication logic for the minimum too
//*     - Turn the two LARGEST elements into the 3rd largest
//*     - Turn the two SMALLEST elements into the 3rd smallest
//*     - Or, Largest element = 2nd largest, Smallest = 2nd Smallest
//*         - Any of these three allows us to retain the duplication logic
//*         - And the maximum RANGE of elements has decreased
//*     - Take the MINIMUM of all of these variations
//! There is no need to actually modify the array at all
function minimizeSum(nums) {
  //* Sort the array so we can easily access minimum and maximum
  nums.sort((a, b) => a - b);

  const n = nums.length;
  const case1 = nums[n - 3] - nums[0]; //* The 2 largest become 3rd largest
  const case2 = nums[n - 1] - nums[2]; //* The 2 smallest become 3rd smallest
  const case3 = nums[n - 2] - nums[1]; //* Largest becomes 2nd largest, smallest becomes 2nd smallest

  return Math.min(case1, case2, case3);
}

console.log(minimizeSum([1, 4, 7, 8, 5])); //* 3
console.log(minimizeSum([1, 2, 3, 4])); //* 1
console.log(minimizeSum([1, 4, 3])); //* 0

//* Time: O(n log n) - We have to sort the array, which takes O(n log n)
//* Then, we perform O(1) calculations, and call min, which will always take 3 arguments

//* Space: O(n) - Sorting generally uses O(n) memory due to merge sort
