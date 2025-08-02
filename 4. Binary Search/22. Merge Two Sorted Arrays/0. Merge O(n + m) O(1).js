//* We are given two int[] `nums1` and `nums` sorted in NON-DECREASING order
//* We are also given two int `m` and `n`, which represent the length of `nums1` and `nums2` respectively
//* The goal is to merge both arrays into a single, sorted array
//* `nums1` has a total length of (m + n) since we need to add every element into nums1
//* Handling this with a forward pass introduces complications and the need for swapping
//* So, to simply the approach we can perform a backward pass
//* Like with a regular approach to merge two sorted arrays, we have a variable that tracks the next value needed from each
//* But we also use a third variable that tracks the insertion position (into nums1)
//* Specifically:
//*     - left = (m - 1). Lets us track the next value in nums1
//*     - right = (n - 1). Lets us track the next value in nums2
//*     - i = (m + n - 1). Lets us determine the next index of insertion (into nums1)
//* The rest of the algorithm follows the usual approach
function merge(nums1, m, nums2, n) {
  let left = m - 1; //* Last element in nums1
  let right = n - 1; //* Last element in nums2
  let i = m + n - 1; //* Next insertion index

  while (left >= 0 && right >= 0) {
    if (nums1[left] >= nums2[right]) {
      nums1[i] = nums1[left];
      i--;
      left--;
    } else {
      nums1[i] = nums2[right];
      i--;
      right--;
    }
  }

  //* Handle any remaining elements in nums1 (nums2 is already finished)
  while (left >= 0) {
    nums1[i] = nums1[left];
    left--;
    i--;
  }

  //* Handle any remaining elements in nums2 (nums1 is already finished)
  while (right >= 0) {
    nums1[i] = nums2[right];
    right--;
    i--;
  }

  return nums1;
}

console.log(merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3)); //* [1, 2, 2, 3, 5, 6]
console.log(merge([1], 1, [], 0)); //* [1]
console.log(merge([0], 0, [1], 1)); //* [1]
console.log(merge([1, 2, 3], 3, [1, 2, 3], 3)); //* [1, 1, 2, 2, 3, 3]

//* Time: O(m + n) - The time taken scales with the total length of both arrays

//* Space: O(1) - The memory usage remains constant regardless of input size
