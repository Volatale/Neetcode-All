//* We want to find the FIRST and LAST indices of target
//* So iterate FORWARD for the first
//* Iterate BACKWARD for the last
function findFirstAndLastElement(nums, target) {
  //* Be pessimistic and assume we don't find the elements
  let left = -1;
  let right = -1;

  //* Iterate forward to find the first occurrence of target
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) {
      left = i;
      break;
    }
  }

  //* Iterate backwards to find the last occurrence of target
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] === target) {
      right = i;
      break;
    }
  }

  return [left, right];
}

console.log(findFirstAndLastElement([5, 7, 7, 8, 8, 10], 8)); //* [3, 4]
console.log(findFirstAndLastElement([1, 2, 3, 4, 5], 6)); //* [-1, -1]
console.log(findFirstAndLastElement([1, 2, 3, 3], 2)); //* [1, 1]
console.log(findFirstAndLastElement([4, 5, 5, 6], 5)); //* [1, 2]
console.log(findFirstAndLastElement([10], 10)); //* [0, 0]
console.log(findFirstAndLastElement([3, 4, 5, 5, 7, 8], 5)); //* [2, 3]

//* Time: O(n) - In the worst case, it takes O(n) time to iterate over the entire array
//* If target does NOT exist in the array at all, we have to process every element

//* Space: O(1) - We use constant space variables; the space usage remains constant
//* Regardless of the input size
