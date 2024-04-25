function binarySubarraysWithSum(nums, goal) {
  //* Exactly K times = atMost(k) times - atMost(k - 1) times
  return atMost(nums, goal) - atMost(nums, goal - 1);
}

function atMost(nums, goal) {
  if (goal < 0) return 0;

  let subarrays = 0;
  let sum = 0;

  //* Sliding Window
  let start = 0;
  let end = 0;

  while (end < nums.length) {
    sum += nums[end];

    //* Sum should not the greater than goal
    while (sum > goal) {
      sum -= nums[start++];
    }

    //* [1, 1, 1] start = 0, end = 0 means there is 1 subarray
    //* [1, 1, 1] start = 0, end = 1 means there are 2 subarrays
    //* [1, 1, 1] start = 0, end  = 2 means there are 3 subarrays
    //* So total, there are 6 subarrays
    subarrays += end - start + 1;
    end++;
  }

  return subarrays;
}

console.log(binarySubarraysWithSum([1, 1, 0], 1)); //* 3
console.log(binarySubarraysWithSum([1, 0, 1, 0, 1], 2)); //* 4
console.log(binarySubarraysWithSum([0, 0, 0, 0, 0], 0)); //* 15
console.log(binarySubarraysWithSum([0, 0, 1], 0)); //* 3

//* Time: O(n) - The time taken scales with "n" since we iterate through the entire array
//* We call the function twice, so it is technically O(2n), but that simplifies to O(n)

//* Space: O(1) - We only use constant space; no variables use space that scales with the input size
