//* By sorting, we have every value in order
//* So we iterate from the left, and try to find the first out of place value
//* We know it is out of place if nums[i] !== i + 1
//* [1, 2, 3] means nums[0] = 1, and i = 0, so (i + 1) === nums[0]
//* Test this condition for every [i]
function firstMissingPositive(nums) {
  nums.sort((a, b) => a - b);

  //* Find the first out of place value
  for (let i = 0; i <= nums.length; i++) {
    if (nums[i] !== i + 1 && nums[i] > 0) return i + 1;
  }
}

console.log(firstMissingPositive([6, 4, 5, 1, 2])); //* 3
console.log(firstMissingPositive([4, 3, 2])); //* 1
console.log(firstMissingPositive([1, 2, 3, 4])); //* 5
console.log(firstMissingPositive([3, 2, 1])); //* 4
console.log(firstMissingPositive([-1])); //* 1
console.log(firstMissingPositive([3, 4, 5, 1, 2])); //* 6
console.log(firstMissingPositive([3, 4, 5, 1, 2])); //* 6
console.log(firstMissingPositive([5, 4, 7, 9, 3])); //* 1
console.log(firstMissingPositive([-1, -1, -1])); //* 1

//* Time: O(n log n) - We used merge/quick sort on the array to sort it
//* Then, we perform another loop that scales with "n" to find the first missing positive

//* Space: O(n) - The space complexity depends on the sorting algorithm used
//* If it was Merge Sort, it would be O(n), if it is Quick Sort it is O(log n)
//* Heap Sort would be O(1), but we can assume Merge Sort is the most common
