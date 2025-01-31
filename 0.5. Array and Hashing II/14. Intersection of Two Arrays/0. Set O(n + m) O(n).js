//* Add all the elements of one of the arrays to a set
//*     - We "could" use an array, but lookups in an array take O(n)
//*     - Whereas set lookups are Θ(1) (which could technically degrade to O(n))
//* Then, iterate over the other array and check if the current element exists in the set
//*     - If it exists in the values set, then nums2[i] also exists in nums1
//*     - Which means this value can be added to the result
//* The result is a set because the "intesecting" elements must be unique
//*     - A set allows for tracking unique elements
function intersection(nums1, nums2) {
  const result = new Set(); //* The elements in the result must be unique
  const values = new Set(nums1); //* Get all the elements that exist in nums1

  //* Add any element that also exists in nums1 to the result
  for (let i = 0; i < nums2.length; i++) {
    if (values.has(nums2[i])) {
      result.add(nums2[i]);
    }
  }

  return [...result];
}

console.log(intersection([1, 2, 2, 1], [2, 2])); //* [2]
console.log(intersection([4, 9, 5], [9, 4, 9, 4])); //* [9, 4]
console.log(intersection([1, 2, 3], [1, 2, 3])); //* [1, 2, 3]

//* Time: O(n + m) - Iterating over nums1 takes O(n), and iterating over nums2 takes O(m)
//* The arrays are not guaranteed to have the same length

//* Space: O(n) - In the worst case, nums1 has no duplicates, so the values set uses O(n) space
//* Then, the result set and the returned array both use O(n) individually (at most)
