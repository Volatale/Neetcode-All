function majorityElementII(nums) {
  const result = [];

  let count1 = 0;
  let count2 = 0;
  let candidate = nums[0];
  let candidateII = nums[1];

  let freqToBeat = nums.length / 3;

  //* Phase 1: Find the candidates
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === candidate) {
      count1++;
    } else if (nums[i] === candidateII) {
      count2++;
    } else if (count1 === 0) {
      candidate = nums[i];
      count1++;
    } else if (count2 === 0) {
      candidateII = nums[i];
      count2++;
    } else {
      count1--;
      count2--;
    }
  }

  //* Phase 2: Verify choices

  //* Reset both counts
  count1 = 0;
  count2 = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === candidate) {
      count1++;
    } else if (nums[i] === candidateII) {
      count2++;
    }
  }

  if (count1 > freqToBeat) result.push(candidate);
  if (count2 > freqToBeat) result.push(candidateII);

  return result;
}

console.log(majorityElementII([5, 5, 5, 4])); // [5]
console.log(majorityElementII([3, 2, 3])); // [3]
console.log(majorityElementII([1])); // [1]
console.log(majorityElementII([1, 2, 1])); // [1]
console.log(majorityElementII([1, 2, 3])); // []
console.log(majorityElementII([1, 2, 3, 1, 2, 3, 3, 2])); // [2, 3]
console.log(majorityElementII([1, 2, 1, 1, 2, 5])); // [1]
console.log(
  majorityElementII([
    1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7,
  ])
);
//* Time: O(n) - The time taken scales with the number of elements in nums
//* We iterate once through the whole array
//* And then we iterate one more time for each unique number that exists in nums
//* In the worst case, every number is unique, so it ends up being O(n + n), which simplifies to O(n)

//* Space: O(1) - The space usage remains constant, we only really use constant space variables
//* The result array will always contain 2 or less elements
