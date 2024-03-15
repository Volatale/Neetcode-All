function nextGreaterElement(nums1, nums2) {
  const map = new Map();
  const stack = []; //* Monotonically Decreasing

  //* Find the NGE of each element in nums2 and store in map
  for (let i = 0; i < nums2.length; i++) {
    while (stack.length > 0 && nums2[i] > stack[stack.length - 1]) {
      map.set(stack.pop(), nums2[i]);
    }

    stack.push(nums2[i]);
  }

  //* Answer each query in nums1
  for (let i = 0; i < nums1.length; i++) {
    nums1[i] = map[nums1[i]] || -1;
  }

  return nums1;
}

console.log(nextGreaterElement([4, 1, 2], [1, 3, 4, 2])); // [-1, 3, -1]
console.log(nextGreaterElement([2, 4], [1, 2, 3, 4])); // [3, -1]

//* Time: O(n + m) - Iterate through all of nums2 (which takes O(m) time)
//* The "while" loop can only activate once for each element in nums2, so that adds "m" time
//* Each element is added to the stack and removed from the stack at most once for each element
//* Then iterate through all of nums1 (which takes O(n) time)

//* Space: O(m) - Both the map and the stack scale (on average) with the number of elements in nums2
//* An input of [4, 3, 2, 1] means that the stack looks the same, so it would have 4 elements
//* In this case, the map would have 0 elements because the while loop is never triggered (every subsequent element is smaller)
