function getConcetenation(nums) {
  return nums.concat(nums);
}

console.log(getConcetenation([1, 2, 1])); // [1, 2, 1, 1, 2, 1]
console.log(getConcetenation([1, 3, 2, 1])); // [1, 3, 2, 1, 1, 3, 2, 1]

//* Time: O(n) - It takes O(n) time to build the array
//* It also takes O(n) time to complete the for loop
//* Space: O(n) - The output array scales at a rate of 2n (so it scales with n itself)
