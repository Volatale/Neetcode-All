//* We use the Boyer-Moore Majority Vote Algorithm
//* There is no need to validate whether our candidate is "actually" the majority element
//* Mathematically, the majority element only appears > (n / 2) times
function majorityElement(nums) {
  //* There is only one element
  if (nums.length === 1) return nums[0];

  //* Start with the first element
  let majority = nums[0];
  let count = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === majority) {
      count++; //* Continue the consecutive count
    } else {
      majority = nums[i]; //* Now we track consecutives for this element
      count = 1; //* Reset the consecutive count
    }
  }

  return majority;
}

console.log(majorityElement([3, 2, 3])); //* 3
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2])); //* 2
console.log(majorityElement([-4, -4, 1, 2, 3, -4, -4])); //* -4
console.log(majorityElement([5, 5, 1, 2, -5, 5, 5])); //* 5

//* Time: O(n) - The time taken scales with the input size

//* Space: O(1) - The memory usage remains constant regardless of input size
