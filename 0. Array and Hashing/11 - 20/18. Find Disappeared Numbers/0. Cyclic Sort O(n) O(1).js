//* Each value should be stored at index "value - 1"
//* So if the value is 1, it should be stored at [1 - 1], which is index 0
//* Then, just iterate through the array again
//* If "i" !== nums[i - 1], that means it is out of place; add it to to results
function findDisappearedNumbers(nums) {
  const result = [];

  //* Put each element in the correct index
  for (let i = 0; i < nums.length; i++) {
    let num = nums[i];

    //* While index num-1 does not store the correct value
    while (nums[num - 1] !== num) {
      [nums[num - 1], num] = [num, nums[num - 1]]; //* Swap
    }
  }

  //* Find the values that are NOT in place
  for (let i = 1; i <= nums.length; i++) {
    if (nums[i - 1] !== i) result.push(i);
  }

  return result;
}

console.log(findDisappearedNumbers([1, 4, 4, 2])); // [3]
console.log(findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1])); // [5, 6]
console.log(findDisappearedNumbers([1, 1])); // [2]

//* Time: O(n) - The outer loop takes O(n) time since we iterate through the whole array
//* The while loop scales with "n" too, but it only processes each element once in total
//* Then we have another for loop that once again scales with n
//* So O(3n) simplifies to O(n)

//* Space: O(1) - We don't use any extra space, as the result array is said to be constant in this question
