//* In order to solve this problem efficiently, we need to make a lot of observations
//* When finding the median, we need to handle both the even and odd array length cases
//*     - If n + m is ODD, then we simply return the middle element
//*     - If n + m is EVEN, we take the average of the two middle elements
//! The two arrays are sorted, which implies we can perform binary search somehow
//* Since we aren't looking for a specific VALUE, we can instead look at the possible index space
//! Imagine we had a combined array; we need to split the array up into partitions
//* But how do we do that? If we had a combined (sorted) array, the median would exist at the middle index (or indices)
//* K = Math.floor((n + m) / 2)
//*     - This tells us how many elements should exist on the COMBINED (sorted) LEFT partition
//* If we had [1, 3], [2, 4, 6]
//*     - Then K = 2 ((2 + 3) / 2 === 2)
//*     - The combined (sorted) array is [1, 2, 3, 4, 6]
//*         - Obviously we can tell that the median here is 3, but how do we actually guarantee that for all cases?
//! We need "cut" points such that we can ensure there are "k" elements on the left combined (across both arrays)
//*     - We'll use `i` and `j` to indicate those cut points
//* When cutting, we are cutting BETWEEN indices - imagine we have [1, 2]
//*     - We can cut at index 0: [] [1, 2]
//*     - We can cut at index 1: [1], [2]
//*     - Or we can cut at index 2: [1, 2], []
//! The goal is to choose an `i` index such that (i + j === k)
//*     - Since the sum of i and j must equal k, we can ensure that j is DEPENDENT on i
//*         - i = ?
//*         - j = k - i
//*     - Then, if (i + j === k), we know our choice was valid
//* For example:
//*     - [1, 3], [2, 4, 6]
//*         - if i = 1, then we get [1], [3] for array 1
//*     - and k = 2, so j = 2 - 1 = 1
//*         - i = 1
//*         - j = 1
//*         - [2], [4, 6]
//*     - There are two (k) elements total in the left partitions across both arrays
//*         - [1, 2], [3, 4, 6]
//! Since we know we need to binary search, our `mid` values are:
//*     - i = left + ((right - left) >> 1) -> `nums1`
//*     - j = k - i -> `nums2`
//! Why do we only need to perform binary search on a single array?
//*     - Because we know that j is dependent on i; if i changes, so will j
//! Another observation is that the LARGEST element in the left partitions is the one right before the current cut
//*     - This applies for BOTH cuts (i - 1) and (j - 1)
//* Lastly, we need to check if our "intervals" overlap so we can determine the direction to search in
//* We can use a "valid partition condition" approach:
//*     - aLeft <= bRight && bLeft <= aRight
//*         - Which is analogous to...
//*     - aStart <= bEnd && bStart <= aEnd
//!         - Which, in interval problems, allows us to check for overlaps
//* Why do we use that formula?
//*     - It lets us check if the maximum of the lefts is smaller than or equal to the minimum of the rights
//*     - If that is NOT the case, then we know we need to move some pointers
//* if aLeft > bRight (aStart > bEnd)
//*     - Then right = i - 1
//*     - i is too large, so we need to search the left
//* else, bLeft > aRight (bEnd > aStart)
//*     - Then left = i + 1
//*     - i is too small, so we need to search the right
//! Ideally, we always want to binary search on the SMALLER of the two arrays
//*     - This prevents out of bounds indexing, as well as reduces the overall search space
//*     - Hence, at the very start of the function we recursively call to handle that case
function findMedianSortedArrays(nums1, nums2) {
  //* Ensures we always binary search on the SMALLER array
  if (nums1.length > nums2.length) {
    return findMedianSortedArrays(nums2, nums1);
  }

  //* K = TOTAL no. of elements in left partitions (across both arrays)
  const T = nums1.length + nums2.length;
  const k = Math.floor(T / 2);

  //* We are searching over the full "cut space" in nums1 (including the nth index)
  let left = 0;
  let right = nums1.length;

  while (left <= right) {
    //* Cut boundaries (mid points) -> There should be `k` elements on the left (i + j = k)
    const i = left + ((right - left) >> 1); //* left partition cut point (mid)
    const j = k - i; //* right partition cut point (mid 2); dependent on i

    //* Valid partition condition variables
    const aLeft = i > 0 ? nums1[i - 1] : -Infinity;
    const aRight = i < nums1.length ? nums1[i] : Infinity;
    const bLeft = j > 0 ? nums2[j - 1] : -Infinity;
    const bRight = j < nums2.length ? nums2[j] : Infinity;

    // if (Math.max(aLeft, bLeft) <= Math.min(aRight, bRight)) {
    if (aLeft <= bRight && bLeft <= aRight) {
      if (T & 1) {
        return Math.min(aRight, bRight);
      } else {
        return (Math.max(aLeft, bLeft) + Math.min(aRight, bRight)) / 2;
      }
    } else if (aLeft > bRight) {
      right = i - 1; //* i is too big, so move left
    } else {
      left = i + 1; //* i is too small, so move right
    }
  }
}

console.log(findMedianSortedArrays([1, 3], [2])); //* 2
console.log(findMedianSortedArrays([1, 3], [2, 4, 6])); //* 3
console.log(findMedianSortedArrays([1, 2], [3, 4])); //* 2.5
console.log(findMedianSortedArrays([1, 2], [])); //* 1.5
console.log(findMedianSortedArrays([], [4, 4])); //* 4
console.log(findMedianSortedArrays([20], [10])); //* 15

//* Time: O(log(min(n,m))) - We perform a binary search on the SMALLEST of the two arrays
//* We assume that to be nums1, but if nums2 is smaller, we recursively call and perform the BS on that one instead
//* Thus, the true time complexity scales with the minimum of the two input arrays
//* The search space is effectively halved within each while loop iteration

//* Space: O(1) - The memory usage remains constant regardless of input size
