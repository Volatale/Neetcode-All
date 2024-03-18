//* Use a nested for loop
//* Find the NGE using a second for loop (j)
//* Then find which elements do not exist in the cache
//* If a key doesn't exist, there was no NGE for it
//* Therefore use -1 as the value
function nextGreaterElement(nums1, nums2) {
  const map = new Map();

  //* Find the NGE of each element in nums2; store them in the map
  for (let i = 0; i < nums2.length; i++) {
    for (let j = i + 1; j < nums2.length; j++) {
      //* If the value on the right > left
      if (nums2[j] > nums2[i]) {
        map.set(nums2[i], nums2[j]); //* NGE of nums2[i] === nums2[j]
        break;
      }
    }
  }

  //* Answer each query in nums1
  for (let i = 0; i < nums1.length; i++) {
    nums1[i] = map.get(nums1[i]) || -1;
  }

  return nums1;
}

console.log(nextGreaterElement([4, 1, 2], [1, 3, 4, 2])); // [-1, 3, -1]
console.log(nextGreaterElement([2, 4], [1, 2, 3, 4])); // [3, -1]

//* Time: O(n^2) - We have a for loop within a for loop; both depend on the size of nums2
//* Then, we have a final loop that allows us to traverse nums1 to answer each query
//* O(n^2 + n) -> O(n^2)

//* Space: O(k) - The space used by the map scales with the number of elements that have an NGE
