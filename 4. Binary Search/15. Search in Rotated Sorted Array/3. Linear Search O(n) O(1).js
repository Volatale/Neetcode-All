//* Just do a linear search and try to find the element
//* If it doesn't exist, return - 1 since it doesn't exist in the array
function searchInRotatedSortedArray(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) return i;
  }

  return -1;
}

console.log(searchInRotatedSortedArray([4, 5, 6, 7, 0, 1, 2], 0)); //* 4
console.log(searchInRotatedSortedArray([4, 5, 6, 7, 0, 1, 2], 3)); //* -1
console.log(searchInRotatedSortedArray([1], 0)); //* -1
console.log(searchInRotatedSortedArray([3, 1, 2], 2)); //* 2
console.log(searchInRotatedSortedArray([55, 50, 51, 52, 53, 54], 50)); //* 1

//* Time: O(n) - We do a linear search through the input
//* So the time taken scales with the size of the input

//* Space: O(1) - The space usage remains the same regardless of the input size
