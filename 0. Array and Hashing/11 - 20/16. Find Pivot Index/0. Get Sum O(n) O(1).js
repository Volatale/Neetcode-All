//* Get the sum of the array
//* Track the sum of the values on the left as we traverse
//* For each element in nums, subtract the current element, and the left sum
//* If leftSum === rightSum, that means that we found an index that has the same sum on both sides
function findPivot(nums) {
  //* Get the sum of nums
  let total = 0;
  for (let i = 0; i < nums.length; i++) {
    total += nums[i];
  }

  let leftSum = 0;

  //* Iterate through all positions in the array
  for (let i = 0; i < nums.length; i++) {
    let rightSum = total - nums[i] - leftSum;

    if (leftSum === rightSum) return i;

    leftSum += nums[i];
  }

  return -1;
}

console.log(findPivot([1, 7, 3, 6, 5, 6])); // 3
console.log(findPivot([1, 2, 3])); // -1
console.log(findPivot([2, 1, -1])); // 0

//* Time: O(n) - The time taken by the function scales with the size of nums
//* It takes O(n) time to get the sum of the array
//* Then it takes O(n) time  to iterate through the array one more time to get the left/right sums

//* Space: O(1) - The space usage remains constant regardless of the size of the input
