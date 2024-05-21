//* Nums.length minimum is n + 1
//* There HAS to be a duplicate in the array
//* Use a set to track what we have already found
//* That gives us Θ(1) lookup
//* If you already found that number, return nums[i]
function findDuplicateNumber(nums) {
  const numbers = new Set();

  for (let i = 0; i < nums.length; i++) {
    if (numbers.has(nums[i])) {
      return nums[i]; //* This is the duplicate
    }

    numbers.add(nums[i]);
  }
}

console.log(findDuplicateNumber([1, 3, 4, 2, 2])); //* 2
console.log(findDuplicateNumber([3, 1, 3, 4, 2])); //* 3
console.log(findDuplicateNumber([1, 1, 2, 3, 4])); //* 1
console.log(findDuplicateNumber([1, 1])); //* 5

//* Time: O(n) - We iterate through the entire array
//* So the time taken scales linearly with the input size

//* Space: O(n) - The duplicate may exist at the very end of the array
//* So the array may contain "n" elements in the worst case
