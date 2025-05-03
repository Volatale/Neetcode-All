//* We need to answer "next greater element" queries
//*     - The results array has a length that scales with nums1.length
//* Instead of directly finding the pairs (i, j), we can take a different approach
//* Since we need to find the NGE of each element in nums1
//* A monotonic stack is an applicable data structure
//* Keep pushing elements onto the stack until we find one > the element on top
//* At that point, the NGE of nums[i] = stack[stack.length - 1]
//* Why does this work?
//*     - Each element can only have one next greater element, hence we pop from the stack
//*     - However, the same element can be the next greater elements for MULTIPLE values
//* Imagine we have a series of monotonically decreasing values, followed by 10 like [5, 4, 3, 2, 1, 10]
//*     - Then 10 is the NGE of all of the prior elements (5, 4, 3, 2, 1)
//* So essentially, anything in the stack is an element we have yet to find the NGE for
function nextGreaterElement(nums1, nums2) {
  const results = [];
  const stack = []; //* Monotonically decreasing stack
  const NGE = {}; //* nums[i] : Next Greater Element

  //* Find the NGE for every element in nums2, and store it in the map
  for (let i = 0; i < nums2.length; i++) {
    while (stack.length > 0 && nums2[i] > stack[stack.length - 1]) {
      NGE[stack.pop()] = nums2[i];
    }

    stack.push(nums2[i]);
  }

  //* Answer all of the queries (nums1)
  for (let i = 0; i < nums1.length; i++) {
    results[i] = NGE[nums1[i]] || -1;
  }

  return results;
}

console.log(nextGreaterElement([4, 1, 2], [1, 3, 4, 2])); //* [-1, 3, -1]
console.log(nextGreaterElement([2, 4], [1, 2, 3, 4])); //* [3, -1]
console.log(nextGreaterElement([1, 2, 3], [1, 2, 3, 4])); //* [2, 3, 4]
console.log(nextGreaterElement([1], [1])); //* [-1]
console.log(nextGreaterElement([1, 2, 3, 4], [1, 0, 2, 3, 4])); //* [-1]

//* Time: O(m) - We first iterate through nums2, which takes O(m)
//* Then, we iterate through nums1, which takes O(n)
//* However, nums1 is a subset of nums2, so n <= m

//* Space: O(m) - The memory usage in the worst case, scales with the size of nums2
