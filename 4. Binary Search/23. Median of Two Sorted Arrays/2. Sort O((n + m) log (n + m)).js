//* We are given two SORTED arrays `nums1` and `nums2` of size `m` and `n` respectively
//* The goal is to return the MEDIAN of the two arrays
//*     - If (m + n) is ODD, then simply return the middle element
//*     - If (m + n) is EVEN, we need to return the average of the two middle elements
//* In a brute force manner, we can simply combine both arrays and sort
//* Then, finding the median is a constant time affair
function findMedianSortedArrays(nums1, nums2) {
  //* Avoid modifying the input array(s)
  const result = [...nums1, ...nums2].sort((a, b) => a - b);
  const n = result.length;

  return n & 1
    ? result[Math.floor(n / 2)]
    : (result[n / 2 - 1] + result[n / 2]) / 2;
}

console.log(findMedianSortedArrays([1, 3], [2])); //* 2
console.log(findMedianSortedArrays([1, 2], [3, 4])); //* 2.5
console.log(findMedianSortedArrays([], [3, 4])); //* 3.5
console.log(findMedianSortedArrays([9], [])); //* 9

//* Time: O((n + m) log (n + m))

//* Space: O(n + m) - We create an auxillary array of length n + m, and we also use the sort function
//* If the sorting algorithm chosen is merge sort, then we use O(n + m) space here too
