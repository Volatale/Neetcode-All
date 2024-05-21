//* The range of values is [1, n]
//* And there are "n + 1" elements
//* ONE element will be the duplicate
//* We can model this as a Linked List problem
//* "index i points to index nums[i]"
//* index 0 points to index 1
//* None of the values point back to index 0
//* And at some point there will be a cycle
//* For example [1, 2, 1]
//* Index 0 points to index 1
//* Index 1 points to index 2
//* Index 2 points to index 1
//* So 1 -> 2 -> 1 -> 2 etc
//* We want to find the START of the cycle
function findDuplicateNumber(nums) {
  //* 1. Fast and Slow Pointers
  let slow = nums[0];
  let fast = nums[nums[0]];

  //* 2. Find the intersection node / index
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[nums[fast]];
  }

  //* Reset fast
  fast = 0;

  //* 3. Find the duplicate number
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }

  return slow;
}

console.log(findDuplicateNumber([1, 3, 4, 2, 2])); //* 2
console.log(findDuplicateNumber([3, 1, 3, 4, 2])); //* 3
console.log(findDuplicateNumber([1, 1, 2, 3, 4])); //* 1
console.log(findDuplicateNumber([1, 1])); //* 1
console.log(findDuplicateNumber([1, 2, 3, 1])); //* 1

//* Time: O(n) - The time taken scales with the number of elements
//* Essentially, we can model this as a linked list problem
//* There exists a cycle in the list somewhere

//* Space: O(1) - The space usage remains constant regardless of input size
