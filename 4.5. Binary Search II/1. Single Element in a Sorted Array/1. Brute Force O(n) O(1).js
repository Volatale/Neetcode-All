//* Find the only element not equal to either of its adjacent neighbors
function singleNonDuplicate(nums) {
  //* Search every index looking for an element not equal to either neighbor
  for (let i = 0; i < nums.length; i++) {
    if (
      (i - 1 < 0 || nums[i - 1] !== nums[i]) &&
      (i + 1 === nums.length || nums[i] !== nums[i + 1])
    ) {
      return nums[i];
    }
  }
}

console.log(singleNonDuplicate([1, 2, 2])); //* 1
console.log(singleNonDuplicate([1, 1, 2, 3, 3])); //* 2
console.log(singleNonDuplicate([1, 1, 2, 3, 3, 4, 4, 8, 8])); //* 2
console.log(singleNonDuplicate([3, 3, 7, 7, 10, 11, 11])); //* 10
console.log(singleNonDuplicate([50, 51, 51, 52, 52])); //* 50
console.log(singleNonDuplicate([0, 0, 1, 2, 2])); //* 1

//* Time: O(n) - In the worst case, we have to iterate over every element in the array

//* Space: O(1) - The memory usage remains constant regardless of the input size
