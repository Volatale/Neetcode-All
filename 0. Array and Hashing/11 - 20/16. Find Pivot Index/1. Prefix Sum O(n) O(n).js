//* Calculate a prefix sum array of nums, and get the sum of the entire array
//* Iterate through the whole array, and get the left and right sums at each index
//* If i === 0, then the leftSum is 0
//* Else, prefixSum[i - 1]
//* rightSum is total - prefixSum[i]
//* If leftSum ever === rightSum, return i
function findPivotIndex(nums) {
  const prefixSum = [];
  let sum = 0;

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    prefixSum.push(sum);
  }

  for (let i = 0; i < nums.length; i++) {
    let leftSum = i > 0 ? prefixSum[i - 1] : 0;
    let rightSum = sum - prefixSum[i];

    if (leftSum === rightSum) return i;
  }

  return -1;
}

console.log(findPivotIndex([1, 7, 3, 6, 5, 6])); // 3
console.log(findPivotIndex([1, 2, 3])); // -1
console.log(findPivotIndex([-1])); // 0
console.log(findPivotIndex([2, 1, -1])); // 0

//* Time: O(n) - We iterate over the entire array twice; each loop takes O(n) time
//* So it ends up being O(2n), but we simplify to O(n)

//* Space: O(n) - We create a prefix sum array that has an equal length to the input
//* So the space usage scales proportionally with the input array
