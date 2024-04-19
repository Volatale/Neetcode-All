//* Sort the array so we can use two pointers
//* We want to alternate between pushing values
//* Push left, then push right
//* This ensures that the values on the left and right are < nums[i]
//* Since the above is true, the average of the left and right won't ever be = nums[i]
function rearrangeArray(nums) {
  //* Sort the array so we can skip alternate indices
  nums.sort((a, b) => a - b);

  const result = [];

  //* Two Pointers
  let left = 0;
  let right = nums.length - 1;

  while (result.length !== nums.length) {
    result.push(nums[left++]);

    if (left <= right) {
      result.push(nums[right--]);
    }
  }

  return result;
}

console.log(rearrangeArray([1, 2, 3, 4, 5])); //* [1, 5, 2, 4, 3]
console.log(rearrangeArray([6, 2, 0, 9, 7])); //* [0, 9, 2, 7, 6]

//* Time: O(n log n) - Sorting the array takes O(n log n)
//* Then we have an O(n) while loop, but this is dominated by the sorting

//* Space: O(n) - We create a new array that has the same size as the input
