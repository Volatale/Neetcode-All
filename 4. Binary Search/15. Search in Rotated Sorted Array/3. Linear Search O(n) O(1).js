//* We have an int[] that is sorted and distinct
//* The array was sorted some number of times and our goal is to find the index of `target`
//* If it doesn't exist, we return -1
//* In a brute force manner, we can simply perform a linear search and scan for the element in question
function search(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) {
      return i;
    }
  }

  //* Target does not exist
  return -1;
}

console.log(search([4, 5, 6, 7, 0, 1, 2], 0)); //* 4
console.log(search([4, 5, 6, 7, 0, 1, 2], 3)); //* -1
console.log(search([1], 0)); //* -1
console.log(search([3, 1, 2], 2)); //* 2
console.log(search([55, 50, 51, 52, 53, 54], 50)); //* 1

//* Time: O(n) - We simply perform a linear (n) search on the array

//* Space: O(1) - The memory usage remains constant regardless of input size
