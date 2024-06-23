//* Sort the array and take the corresponding element
//* If sorted in ascending order -> get the kth element from the end
//* If its sorted in descending order -> get the k-1th element
function findKthLargest(nums, k) {
  return nums.sort((a, b) => b - a)[k - 1];
}

function findKthLargest(nums, k) {
  return nums.sort((a, b) => a - b)[nums.length - k];
}

console.log(findKthLargest([1, 2, 3], 2)); //* 2
console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2)); //* 5
console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)); //* 4
console.log(findKthLargest([5, -10], 1)); //* 5

//* Time: O(n log n) - It takes O(n log n) on average to sort

//* Space: O(1) to O(log n) to O(n)
//* It really depends on the sorting algorithm used under the hood
