//* Use Two Pointers
//* The function applies the same logic as the merge portion of merge sort
//* We just do it in reverse
function mergeSortedArray(nums1, m, nums2, n) {
  let left = m - 1; //* Last index in nums1
  let right = n - 1; //* Last index in nums2

  let mergeIndex = m + n - 1; //* The index to place merged elements

  while (left >= 0 && right >= 0) {
    //* We need to move this element to the right
    if (nums1[left] > nums2[right]) {
      nums1[mergeIndex] = nums1[left];
      left--;
    } else {
      nums1[mergeIndex] = nums2[right];
      right--;
    }

    mergeIndex--;
  }

  //* To pick up the remaining elements that weren't added
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

//* Time: O(n + m) - If nums1 only had elements > elements in nums2,

//* Space: O(1) - We don't use any extra space other than constant space variables
