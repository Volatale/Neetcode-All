//* At each step, we can include or exclude the current element
//* We need to track what index we are currently trying to make that decision for
//* We can ONLY include an element if it is GREATER than the previously selected element

//* Apply tabulation to avoid recursion overhead
function lengthOfLIS(nums) {
  const n = nums.length;

  //* dp[i] = Length of LIS ending at index 0
  const dp = new Array(n + 1).fill(1);
  let max = 1;

  //* i represents index of current element
  //* j elements BEFORE i
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        //* Extend previous LIS by adding 1
        dp[i] = Math.max(dp[i], dp[j] + 1);
        max = Math.max(max, dp[i]);
      }
    }
  }

  return max;
}

console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])); //* 4
console.log(lengthOfLIS([0, 1, 0, 3, 2, 3])); //* 4
console.log(lengthOfLIS([7, 7, 7, 7, 7, 7, 7])); //* 1
console.log(lengthOfLIS([1, 3, -2, -1, 4])); //* 3
console.log(lengthOfLIS([1, 2, -1, -3, 3, 2])); //* 3
console.log(lengthOfLIS([1, 2, 3, 4])); //* 4
console.log(lengthOfLIS([1])); //* 1

//* Time: O(n^2) - There are "n" elements to consider
//* And there are "n" possible previous indices
//* (n + 1) index states * (n + 1) prev indices = n^2 + 2 possible states

//* Space: O(n) - The DP array's size scales with the input's size
