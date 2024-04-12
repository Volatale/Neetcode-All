//* Just check if nums1[i] exists in nums2[i]
function arrayIntersection(nums1, nums2) {
  const result = new Set();

  for (let i = 0; i < nums1.length; i++) {
    for (let j = 0; j < nums2.length; j++) {
      if (nums1[i] === nums2[j]) {
        result.add(nums1[i]);
      }
    }
  }

  return [...result];
}

console.log(arrayIntersection([1, 2, 2, 1], [2, 2])); //* [2]
console.log(arrayIntersection([4, 9, 5], [9, 4, 9, 8, 4])); //* [4, 9]
console.log(arrayIntersection([1], [1])); //* [1]
console.log(arrayIntersection([5], [6])); //* []

//* Time: O(n * m) - There are "n" outer iterations, and "m" inner iterations for every outer iteration
//* Adding to a set is Θ(1) on average

//* Space: O(n) - In the worst case, every element in both inputs exists in the other
//* So we add every element to the set
