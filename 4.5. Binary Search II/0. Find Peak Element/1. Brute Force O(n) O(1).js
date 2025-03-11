//* In a linear fashion, iterate through the entire array
//* Find the first element that is greater than both of its neighbors
function findPeakElement(nums) {
  for (let i = 0; i < nums.length; i++) {
    if (
      (i - 1 < 0 || nums[i] > nums[i - 1]) &&
      (i + 1 === nums.length || nums[i] > nums[i + 1])
    ) {
      return i;
    }
  }
}

console.log(findPeakElement([1, 2, 3, 4])); //* 3
console.log(findPeakElement([1, 2, 3, 1])); //* 2
console.log(findPeakElement([1, 2, 1, 3, 5, 6, 4])); //* 1
console.log(findPeakElement([5])); //* 0
console.log(findPeakElement([3, 2])); //* 0
console.log(findPeakElement([5, 6, 5])); //* 1

//* Time: O(n) - Ultimately, we may have to iterate over the entire array

//* Space: O(1) - The memory usage remains constant regardless of input size
