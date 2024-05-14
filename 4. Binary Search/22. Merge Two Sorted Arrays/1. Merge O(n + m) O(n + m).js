//* Merge both arrays, and get the middle value(s) of the merged array
//* If the array is odd length, then just return the middle element
//* Otherwise, it has to be even, so return the average of both elements
function medianOfTwoSortedArrays(nums1, nums2) {
  //* Merge the arrays so we can grab the middle element(s)
  const result = mergeArrays(nums1, nums2);

  const length = result.length;

  //* If the length is odd, just return the middle element
  if (length & 1) {
    return result[Math.floor(length / 2)];
  }

  //* We have TWO middle elements, take the average of both
  const leftMid = result[Math.floor(length / 2) - 1];
  const rightMid = result[Math.floor(length / 2)];

  return (leftMid + rightMid) / 2;
}

//* O(n + m) - Uses merge logic from Merge Sort
function mergeArrays(nums1, nums2) {
  const result = [];

  let left = 0;
  let right = 0;

  while (left < nums1.length && right < nums2.length) {
    //* Push the smaller ones first
    if (nums1[left] <= nums2[right]) {
      result.push(nums1[left++]);
    } else {
      result.push(nums2[right++]);
    }
  }

  //* Pickup the remaining elements
  while (left < nums1.length) {
    result.push(nums1[left++]);
  }

  while (right < nums2.length) {
    result.push(nums2[right++]);
  }

  return result;
}

console.log(medianOfTwoSortedArrays([0], [-1, 1])); //* 0 (0 is the middle element)
console.log(medianOfTwoSortedArrays([1, 2], [3, 4])); //* 2.5 (2 + 5) / 2 = 2.5
console.log(medianOfTwoSortedArrays([1, 2], [2, 4])); //* 2 (2 + 2) / 2 = 2
console.log(medianOfTwoSortedArrays([], [1])); //* 1 (1 is the only element)
console.log(medianOfTwoSortedArrays([5], [])); //* 5 (5 is the only element)

//* Time: O(n + m) - To build the merged array, we iterate over every element in both arrays
//* If the aray has an odd length, no extra operations are required
//* Else, the array is even, so we need to compute the average of the two middle elements
//* That takes O(1) time, however, so it doesn't effect the overall time complexity

//* Space: O(n + m) - The merged array holds the values of both arrays
//* So it scales with the size of both n AND m combined
