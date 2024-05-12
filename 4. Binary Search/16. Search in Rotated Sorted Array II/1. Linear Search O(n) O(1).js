//* Just do a linear search and try to find the element
//* If it doesn't exist, return false since it doesn't exist in the array
function searchInRotatedSortedArrayII(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) return true;
  }

  return false;
}

console.log(searchInRotatedSortedArrayII([2, 5, 6, 0, 0, 1, 2], 0)); //* True
console.log(searchInRotatedSortedArrayII([2, 5, 6, 0, 0, 1, 2], 3)); //* False
console.log(searchInRotatedSortedArrayII([0, 0, 0, 3], 1)); //* False
console.log(searchInRotatedSortedArrayII([0, 0, 0, 3], 3)); //* True
console.log(searchInRotatedSortedArrayII([4, 5, 1, 2, 3], 3)); //* True
console.log(searchInRotatedSortedArrayII([4, 5, 1, 2, 3, 4], 4)); //* True
console.log(searchInRotatedSortedArrayII([1], 1)); //* True
console.log(searchInRotatedSortedArrayII([1, 0], 0)); //* True
console.log(searchInRotatedSortedArrayII([1, 0, 1, 1, 1], 0)); //* True

//* Time: O(log n) - Binary search halves the search space each iteration
//* All of the operations done within the loop are constant time

//* Space: O(1) - The space usage remains constant regardless of the input size

//* Time: O(n) - We do a linear search through the input
//* So the time taken scales with the size of the input

//* Space: O(1) - The space usage remains the same regardless of the input size
