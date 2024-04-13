//* Just check if nums1[i] exists in nums2[i]
function arrayIntersection(nums1, nums2) {
  const result = new Set();
  const values = new Set(nums1); //* Add all nums1's values to the set

  for (let i = 0; i < nums2.length; i++) {
    if (values.has(nums2[i])) {
      result.add(nums2[i]);
    }
  }

  return [...result];
}

console.log(arrayIntersection([1, 2, 2, 1], [2, 2])); //* [2]
console.log(arrayIntersection([4, 9, 5], [9, 4, 9, 8, 4])); //* [4, 9]
console.log(arrayIntersection([1], [1])); //* [1]
console.log(arrayIntersection([5], [6])); //* []

//* Time: O(n + m) - It takes O(n) time to add every element to values

//* Space: O(n) - The space used the values set is bounded by nums1's length
//* The result array cannot go above that size either
