//* Sort the array so we can use Two Pointers later on
//* If you have an array like [3, 4, 5], target = 8
//* The subsequences are: [3], [4], [3, 4], [3, 5], [3, 4, 5], which is 5 subsequences
//* The number of subsequences within a given group is always going to be a power of 2
//* So we use two pointers to find the "bounds" of the group so to speak
//* If sum > target, then the group is too wide (so we decrement right to find a smaller number)
//* The above is only possible because we sorted originally
function numOfSubsequences(nums, target) {
  //* Sort the array so we can use two pointers
  nums.sort((a, b) => a - b);

  let subsequences = 0;
  const mod = 10 ** 9 + 7;

  //* Two Pointers
  let left = 0;
  let right = nums.length - 1;

  const powers = new Array(nums.length).fill(0); //* Precompute the powers of 2
  powers[0] = 1; //* Seed Value: 2 ** 0 = 1

  //* Generate all of the powers of 2 up to n (no. of subsequenences is guaranteed to be < n)
  for (let i = 1; i < nums.length; i++) {
    powers[i] = (powers[i - 1] * 2) % mod;
  }

  while (left <= right) {
    //* Sum is too large and doesn't meet the condition
    if (nums[left] + nums[right] > target) {
      right--;
    } else {
      //* All of the results are powers of 2
      subsequences = (subsequences + powers[right - left]) % mod;
      left++;
    }
  }

  return subsequences;
}

console.log(numOfSubsequences([3, 5, 6, 7], 9)); //* 4
console.log(numOfSubsequences([3, 3, 6, 8], 10)); //* 6
console.log(numOfSubsequences([2, 3, 3, 4, 6, 7], 12)); //* 61
console.log(numOfSubsequences([5], 10)); //* 1
console.log(numOfSubsequences([3, 4, 5], 8)); //* 1

//* Time: O(n) - It takes O(n) time to generate all of the powers of 2 up to "n"
//* Then, the while loop also scales linearly with the size of the input

//* Space: O(n) - The space complexity is dominated by the size of the powers array
//* The powers array itself scales in size with "n", since we generate all powers of 2 up to "n"
//* "n" in this case is nums.length
