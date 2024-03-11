function getConcetenation(nums) {
  const n = nums.length;

  const ans = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    ans[i] = nums[i];
    ans[i + n] = nums[i];
  }

  return ans;
}

console.log(getConcetenation([1, 2, 1])); // [1, 2, 1, 1, 2, 1]
console.log(getConcetenation([1, 3, 2, 1])); // [1, 3, 2, 1, 1, 3, 2, 1]

//* Time: O(n) - It takes O(n) time to build the array
//* It also takes O(n) time to complete the for loop

//* Space: O(n) - The output array scales at a rate of 2n (so it scales with n itself)
