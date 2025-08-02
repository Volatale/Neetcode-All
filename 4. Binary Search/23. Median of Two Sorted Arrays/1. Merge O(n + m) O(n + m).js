//* We are given two SORTED arrays `nums1` and `nums2` of size `m` and `n` respectively
//* The goal is to return the MEDIAN of the two arrays
//*     - If (m + n) is ODD, then simply return the middle element
//*     - If (m + n) is EVEN, we need to return the average of the two middle elements
//* In a brute force manner, we can simply combine both arrays and sort
//* Then, finding the median is a constant time affair
//* Alternatively, we can handle the sorting ourselves using the "merge two sorted arrays" approach
//*     - This works because the arrays are already sorted, so we can apply two pointers
function findMedianSortedArrays(nums1, nums2) {
  const sortedArr = merge(nums1, nums2);
  const n = sortedArr.length;

  return n & 1
    ? sortedArr[Math.floor(n / 2)]
    : (sortedArr[n / 2 - 1] + sortedArr[n / 2]) / 2;
}

function merge(nums1, nums2) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] <= nums2[j]) {
      result.push(nums1[i++]);
    } else {
      result.push(nums2[j++]);
    }
  }

  while (i < nums1.length) {
    result.push(nums1[i++]);
  }

  while (j < nums2.length) {
    result.push(nums2[j++]);
  }

  return result;
}

console.log(findMedianSortedArrays([1, 3], [2])); //* 2
console.log(findMedianSortedArrays([1, 2], [3, 4])); //* 2.5
console.log(findMedianSortedArrays([], [3, 4])); //* 3.5
console.log(findMedianSortedArrays([9], [])); //* 9

//* Time: O(m + n) - The time taken scales with the time needed to merge both arrays (m and n)
//* Finding the median is a constant time operation

//* Space: O(n + m) - We create an auxillary array of length n + m
