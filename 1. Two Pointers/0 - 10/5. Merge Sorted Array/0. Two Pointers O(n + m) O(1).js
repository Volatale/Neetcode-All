//* We need to merge two separate arrays into a single, sorted array
//*     - Both arrays are sorted in non-decreasing order
//*     - And the arrays can contain duplicates
//* Ultimately, since the end result must also be sorted, the order of elements is important
//* We can use a two pointer approach and process two numbers simultaneously
//! The key thing to note is that we are merging into nums1
//*     - nums1.length = n + m
//*     - nums2.length = n
//* We cannot iterate left to right because we'd be overwriting values we still depend on
//* So instead, we should process each element in descending order
//* In this variation of merge arrays, the only array that "could" have remaining elements is nums2
//* We cannot merge nums1 into itself, so logically, that means element
function merge(nums1, m, nums2, n) {
  //* Each index represents the next number that should be pushed to the result
  let left = m - 1;
  let right = n - 1;

  //* The index where the next element should be placed
  let mergeIndex = m + n - 1;

  while (left >= 0 && right >= 0) {
    if (nums1[left] > nums2[right]) {
      nums1[mergeIndex] = nums1[left];
      left--;
    } else {
      nums1[mergeIndex] = nums2[right];
      right--;
    }

    //* This index is now sorted
    mergeIndex--;
  }

  //* Handle the remaining elements
  while (right >= 0) {
    nums1[mergeIndex] = nums2[right];
    right--;
    mergeIndex--;
  }
}

//* Time: O(n + m) - Ultimately, we iterate through (n + m) elements

//* Space: O(1) - The memory usage remains constant regardless of input size
