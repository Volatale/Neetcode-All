//* The majority element appears more than n / 2 times
//* Thus, we immediately calculate what that would be
//*     - half = Math.floor(nums.length / 2)
//* Then, for each element in nums, find the element that appears > "half" times
function majorityElement(nums) {
  //* There is only one element
  if (nums.length === 1) return nums[0];

  const half = Math.floor(nums.length / 2);

  //* For each element in nums, try to find max frequency
  for (let i = 0; i < nums.length; i++) {
    let count = 0;

    for (let j = 0; j < nums.length; j++) {
      if (nums[i] === nums[j]) {
        count++;
      }
    }

    //* Found majority element
    if (count > half) {
      return nums[i];
    }
  }
}

console.log(majorityElement([3, 2, 3])); //* 3
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2])); //* 2
console.log(majorityElement([-4, -4, 1, 2, 3, -4, -4])); //* -4
console.log(majorityElement([5, 5, 1, 2, -5, 5, 5])); //* 5

//* Time: O(n^2) - We have two nested for loops, both of which scale with the input size

//* Space: O(1) - The memory used does not scale with the input size
