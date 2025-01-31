//* Sort both arrays to ensure we can easily check for intersecting elements
//* Then, use the two pointer approach
//* If nums1[i] < nums2[j], then increment i
//*     - The current element does not intersect, so move on
//*     - nums1[i + 1] still has a chance to intersect with nums2[j]
//* If nums1[i] > nums2[j], increment j
//*     - "j" is pointing to a number that is too small to intersect
//*     - nums1[i] "could" still intersect with nums2[j], but we need to check larger numbers
//* If nums1[i] === nums2[j], then the numbers are intersecting
//*     - So we increment both "i" and "j" (we no longer need to check these indices)
function intersection(nums1, nums2) {
  const result = new Set();

  //* Sort the arrays so we can use a two pointer approach
  nums1.sort((a, b) => a - b);
  nums2.sort((a, b) => a - b);

  //* Two Pointers
  let i = 0;
  let j = 0;

  //* Find intersecting numbers
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] < nums2[j]) {
      i++;
    } else if (nums1[i] > nums2[j]) {
      j++;
    } else {
      result.add(nums1[i]);
      i++;
      j++;
    }
  }

  return [...result];
}

console.log(intersection([1, 2, 2, 1], [2, 2])); //* [2]
console.log(intersection([4, 9, 5], [9, 4, 9, 4])); //* [9, 4]
console.log(intersection([1, 2, 3], [1, 2, 3])); //* [1, 2, 3]

//* Time: O(n log n + m log m) - We are sorting both arrays, and both can have different lengths

//* Space: O(n + m) - In the worst case, both inputs are identical, so the result will have "n" elements
//* Assuming merge sort is used, it takes O(n) and O(m) to sort both arrays
