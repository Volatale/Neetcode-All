//* Use Two Pointers
//* The function applies the same logic as the merge portion of merge sort
//* We just do it in reverse
function mergeSortedArray(nums1, m, nums2, n) {
  let left = m - 1;
  let right = n - 1;

  let mergeIndex = m + n - 1;

  while (left >= 0 && right >= 0) {
    if (nums1[left] > nums2[right]) {
      nums1[mergeIndex] = nums1[left];
      left--;
    } else {
      nums1[mergeIndex] = nums2[right];
      right--;
    }

    mergeIndex--;
  }

  while (right >= 0) {
    nums1[mergeIndex] = nums2[right];
    right--;
    mergeIndex--;
  }

  return nums1;
}

console.log(mergeSortedArray([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3)); //* [1, 2, 2, 3, 5, 6]
console.log(mergeSortedArray([1], 1, [], 0)); //* [1]
console.log(mergeSortedArray([0], 0, [1], 1)); //* [1]

//* Time: O(n + m) - The while loop does n + m iterations

//* Space: O(1) - We don't use any extra space
