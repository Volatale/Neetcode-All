//* We are given an integer array sorted in NON-DECREASING order
//* The goal is to return an array of the squares of each number sorted in non-decreasing order
//! Observe that squaring a negative number results in a positive
//* Thus, even if we have negative numbers, we can't ASSUME they'll remain in the left portion of the array
//* If we had an array like [-4, 1, 4], then we'd get:
//*     - [16, 1, 16], which is not sorted
//* Additionally, the leftmost and rightmost elements represent the absolutes (the minimum and maximum possible value range)
//*     - Every other element will fit within this range somewhere
//* Therefore, a two pointer approach can be used to determine what the "next" smallest element should be
//* Instead of actually squaring each element, we can take the absolute value
//*     - (-1)^2 will return 1
//*     - But so will taking the absolute value of the element
//! Iterate backwards, because as was stated above, we could potentially start with the LARGEST elements
//*     - If we are comparing -3 and 4, then we get 9 and 16. 16 is the largest, so it should go last
//*     - Every other element (within this index range) will be smaller than 16 since the other extreme (-3) is
function sortedSquares(nums) {
  const result = new Array(nums.length).fill(0);

  //* The smallest/largest possible values exist in the first and last indices
  let left = 0;
  let right = nums.length - 1;

  //* Iterate backwards to ensure we find the LARGEST element(s) first
  for (let i = nums.length - 1; i >= 0; i--) {
    if (Math.abs(nums[left]) < Math.abs(nums[right])) {
      result[i] = nums[left] * 2;
      left++;
    } else {
      result[i] = nums[right] * 2;
      right--;
    }
  }

  return result;
}

//* Time: O(n) - It takes O(n) to create the auxillary array
//* It also takes O(n) to iterate through the input array

//* Space: O(n) - The memory usage scales with the input size (n)
