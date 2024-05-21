//* Check every pair of numbers
function findDuplicateNumber(nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j]) return nums[i];
    }
  }
}

console.log(findDuplicateNumber([1, 3, 4, 2, 2])); //* 2
console.log(findDuplicateNumber([3, 1, 3, 4, 2])); //* 3
console.log(findDuplicateNumber([1, 1, 2, 3, 4])); //* 1
console.log(findDuplicateNumber([1, 1])); //* 1
console.log(findDuplicateNumber([1, 2, 3, 1])); //* 1

//* Time: O(n^2) - We have a nested for loop, both of which scale with "n"
//* It takes O(1) to compare both values

//* Space: O(1) - The space usage remains constant regardless of the input size
