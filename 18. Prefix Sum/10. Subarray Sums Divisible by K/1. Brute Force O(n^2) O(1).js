//* Try every possible subarray
//* Track the cumulative sum of the entire subarray
//*     - Then check if that sum is divisible by k
function subarraysDivByK(nums, k) {
  let subarrays = 0;

  //* Try every possible subarray
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;

    for (let j = i; j < nums.length; j++) {
      sum += nums[j];

      //* Found a subarray that is divisible by k
      if (sum % k === 0) {
        subarrays++;
      }
    }
  }

  return subarrays;
}

console.log(subarraysDivByK([4, 5, 0, -2, -3, 1], 5)); //* 7
console.log(subarraysDivByK([5], 9)); //* 0
console.log(subarraysDivByK([2, 4, 6, 8], 2)); //* 10

//* Time: O(n^2) - We have a nested for loop, both of which scale with the input size

//* Space: O(1) - We are not using any extra space that will scale with the input size
