//* Generate every possible subarray
//* Calculate the product of all of them and take the best
function maxProduct(nums) {
  //* Start from the first element
  let globalMax = nums[0];

  //* Generate every subarray
  for (let i = 0; i < nums.length; i++) {
    let currMax = nums[i];

    for (let j = i + 1; j < nums.length; j++) {
      currMax *= nums[j];
      globalMax = Math.max(globalMax, currMax);
    }
  }

  return globalMax;
}

console.log(maxProduct([2, 3, -2, 4])); //* 6
console.log(maxProduct([-2, 0, 1])); //* 0
console.log(maxProduct([5])); //* 5

//* Time: O(n^2) - Generate every subarray and calculate its product
//* There are (n * (n + 1) / 2) total subarrays

//* Space: O(1) - We only use constant space
