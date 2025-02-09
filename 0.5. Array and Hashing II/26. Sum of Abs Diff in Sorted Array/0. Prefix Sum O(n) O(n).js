//* Instead of taking a brute force approach, we can instead use prefix sums
//* result[i] = The sum of absolute values of nums[i] vs every other element
//* Thus, all we really have to do is subtract nums[i] from every other element in the array
//* But we need to know how many elements exist on the left, and how many are on the right
//!     - This EXCLUDES the current index i
//* Get the total sum of the array
//* Then track the prefix sum of the elements on the left (excluding the current element)
//* rightSum = totalSum - nums[i] - leftSum
//*     - totalSum - nums[i] gives us the total WITHOUT this element
//*     - leftSum is the sum of elements on the left of this element
//* For example, [2, 3, 4]
//*     - The total sum is 9
//*     - If "i" = 2, then there are 0 elements on the left of index 0
//*         - Thus, the leftSum is 0
//*     - But the right sum is (9 - 2) = 7
//*         - Because 3 + 4 = 7
//* "i" tells us the number of elements that exist on the LEFT of this element
//* "n - i - 1" tells us the number of elements that exist on the RIGHT of this element
//* For index 0:
//*     leftSize * nums[i] - leftSum
//!         - Plus
//*     rightSum - rightSize * nums[i]
//* ((0 * 2) - 0) + (7 - (2 * 2))
//*     - 7 - 4 = 3
//* result[0] = 3
//* Essentially, we are subtracting nums[i] from every other element
//*     - We need to know how many elements exist on the left and right to be able to calculate this in one go
//*     - If there are 3 elements on the right, then we subtract nums[i] from all 3 elements
function getSumAbsoluteDifferences(nums) {
  //* result[i] = abs diff between nums[i] and all other elements
  const result = new Array(nums.length).fill(0);
  const n = nums.length;

  let totalSum = nums.reduce((acc, curr) => acc + curr, 0);
  let leftSum = 0; //* Prefix sum of elements up to current index

  for (let i = 0; i < nums.length; i++) {
    let rightSum = totalSum - nums[i] - leftSum; //* Sum of elements AFTER this one
    let leftSize = i; //* No. of Elements PRECEEDING this index
    let rightSize = n - i - 1; //* No. of Elements SUCCEEDING this index

    result[i] =
      leftSize * nums[i] - //* Total amount we need to subtract from the left elements
      leftSum +
      //* Plus sum of postfix on right - no. of elements on right
      rightSum -
      rightSize * nums[i]; //* Total amount we need to subtract from the right elements
    leftSum += nums[i];
  }

  return result;
}

console.log(getSumAbsoluteDifferences([2, 3, 5])); //* [4, 3, 5]
console.log(getSumAbsoluteDifferences([1, 4, 6, 8, 10])); //* [24, 15, 13, 15, 21]
console.log(getSumAbsoluteDifferences([2, 3, 4])); //* [3, 2, 3]

//* Time: O(n) - We are iterating through the entire array twice (at most), so the time taken is linear

//* Space: O(n) - The result array scales proportionally in size with the input size
