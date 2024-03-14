function majorityElement(nums) {
  if (nums.length === 1) return nums[0];

  let majorityElement = nums[0];
  let count = 1; // The number of occurrences of majority element

  for (let i = 1; i < nums.length; i++) {
    //* If the current element is an occurrence, add 1, else subtract 1
    if (nums[i] === majorityElement) {
      count++;
    } else {
      count--;
    }

    //* If count < 0, majorityElement becomes the current element
    //* Reset count to 1 (because we want to count THIS element)
    if (count === 0) {
      majorityElement = nums[i];
      count++;
    }
  }

  return majorityElement;
}

console.log(majorityElement([1])); // 1
console.log(majorityElement([4, 3, 4, 1, 4])); // 4
console.log(majorityElement([3, 2, 3])); // 3
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2, 2])); // 2

//* Time: O(n) - The time taken scales with the length of the input
//* We iterate through the whole array once

//* Space: O(1) - We only use constant space variables, so no extra auxillary space is used
