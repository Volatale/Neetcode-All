function intersection(nums1, nums2) {
  const result = new Set();

  //* Individually check if any of the elements also exist in the other array
  for (let i = 0; i < nums1.length; i++) {
    for (let j = 0; j < nums2.length; j++) {
      if (nums1[i] === nums2[j]) {
        result.add(nums1[i]);
      }
    }
  }

  return [...result];
}

console.log(intersection([1, 2, 2, 1], [2, 2])); //* [2]
console.log(intersection([4, 9, 5], [9, 4, 9, 4])); //* [9, 4]
console.log(intersection([1, 2, 3], [1, 2, 3])); //* [1, 2, 3]

//* Time: O(n * m) - For each element in nums1, we check if nums2 has the same element
//* The time taken by both loops scales with n AND m combined (rule of product)

//* Space: O(n) - In the worst case, all of the elements intersect
