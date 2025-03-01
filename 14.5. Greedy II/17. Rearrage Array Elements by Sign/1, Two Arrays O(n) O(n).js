//* We know we have an equal amount of positives and negatives
//* So we can simply break the array up into two based on those properties
//* THen, we can iterate over both arrays and simply ensure positives come first, then negatives
function rearrangeArray(nums) {
  const result = [];

  const positives = [];
  const negatives = [];

  //* Categorize all of the elements based on parity
  for (let i = 0; i < nums.length; i++) {
    nums[i] > 0 ? positives.push(nums[i]) : negatives.push(nums[i]);
  }

  //* Add all of the elements and maintain relative ordering
  for (let i = 0; i < nums.length / 2; i++) {
    result.push(positives[i], negatives[i]);
  }

  return result;
}

console.log(rearrangeArray([3, 1, -2, -5, 2, -4])); //* [3, -2, 1, -5, 2, -4]
console.log(rearrangeArray([-1, 1])); //* [1, -1]
console.log(rearrangeArray([10, -4, 10, -4])); //* [10, -4, 10, -4]

//* Time: O(n) - We iterate over the entire array once, and then O(n / 2) times the second
//* So the time taken scales with "n"

//* Space: O(n) - positives.length + negatives.length === n overall
