//* We need to answer "next greater element" queries
//*     - The results array has a length that scales with nums1.length
//* Find an (i, j) pair such that nums[i] === nums[j]
//* Then, find the next greater element of nums[j]
//* So in other words, find hte next greater element of every element in nums1
//*     - The relative order of nums2 is important
function nextGreaterElement(nums1, nums2) {
  //* nums[i] : Next Greater Element
  const NGE = {};
  const results = [];

  //* Find the next greater element for each "i" in nums2
  for (let i = 0; i < nums2.length; i++) {
    for (let j = i + 1; j < nums2.length; j++) {
      //* Ensure nums[j] > nums[i]
      if (nums2[j] > nums2[i]) {
        //* Next Greater Element of nums2[i] is nums2[j]
        NGE[nums2[i]] = nums2[j];
        break;
      }
    }
  }

  //* Answer every query in nums1
  for (let i = 0; i < nums1.length; i++) {
    results[i] = NGE[nums1[i]] || -1;
  }

  return results;
}

console.log(nextGreaterElement([4, 1, 2], [1, 3, 4, 2])); //* [-1, 3, -1]
console.log(nextGreaterElement([2, 4], [1, 2, 3, 4])); //* [3, -1]
console.log(nextGreaterElement([1, 2, 3], [1, 2, 3, 4])); //* [2, 3, 4]
console.log(nextGreaterElement([1], [1])); //* [-1]

//* Time: O(n^2) - We have a nested for loop, and in the worst case, nums1.length === nums2.length
//* Thus, the time taken by the nested for loop is quadratic in the worst case

//* Space: O(m) - The memory usage scales with nums2.length
