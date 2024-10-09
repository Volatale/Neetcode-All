//* Try making every possible jump from every position
//* nums[i] gives us the MAXIMUM jump we can make
//*     - But we can make anywhere from [1, nums[i]] jumps from each position
//* We have no idea which number is best at each index
//*     - Thus there is no heuristic we can apply
//* Using a brute force approach, we can just try every possible move
//*     - And then take the "minimum" (optimal) choice

//* Apply caching to avoid redundant work
//*     - We have 1D state (i)
function jump(nums) {
  if (nums.length === 1) return 0;

  const n = nums.length;

  //* dp[i] = Minimum number of jumps to get from i to n - 1
  const dp = new Array(n).fill(Infinity);

  //* It takes 0 moves to get to n - 1 from n - 1 (we are already there)
  dp[n - 1] = 0;

  for (let i = n - 2; i >= 0; i--) {
    //* Can't move from here anyway
    if (nums[i] === 0) continue;

    //* Make any number of moves in range [1, nums[i]]
    for (let j = 1; j <= nums[i]; j++) {
      if (i + j < n && dp[i + j] !== Infinity) {
        //* Infinity means we haven't reached it yet (and 1 + inf = overflow)
        dp[i] = Math.min(dp[i], dp[i + j] + 1);
      }
    }
  }

  //* Min no. of jumps to get from 0 to n - 1
  return dp[0];
}

console.log(jump([2, 3, 1, 1, 4])); //* 2
console.log(jump([0])); //* 0
console.log(jump([3, 2, 0, 0])); //* 1
console.log(jump([1, 1, 1])); //* 2
console.log(jump([7, 0, 9, 6, 9, 6, 1, 7, 9, 0, 1, 2, 9, 0, 3])); //* 2

//* Time: O(n * max(nums)) - There are only "n" unique subproblems
//* But we do an O(max(nums)) loop within each outer loop

//* Space: O(n) - We have to cache the results of all "n" subproblems
