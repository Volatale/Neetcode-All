//* Just check the previous element; if it is smaller, return THIS element
//* At SOME point this will be true because the element is guaranteed to exist within the array
function findMinimumInRotatedSortedArray(nums) {
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < nums[i - 1]) return nums[i];
  }

  //* Handles edge case of only 1 element (for loop never activates)
  return nums[0];
}

console.log(findMinimumInRotatedSortedArray([3, 4, 5, 1, 2])); //* 1
console.log(findMinimumInRotatedSortedArray([4, 5, 6, 7, 0, 1, 2])); //* 0
console.log(findMinimumInRotatedSortedArray([11, 13, 15, 17])); //* 11

//* Time: O(n) - Linear search takes O(n) time in the worst case

//* Space: O(1) - The space usage remains constant regardless of input size
