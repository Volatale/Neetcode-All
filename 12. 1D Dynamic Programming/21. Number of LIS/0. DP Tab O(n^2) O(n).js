//* Find the LENGTH of the Longest Increasing Subsequence
//* Then, find the NUMBER of longest increasing subsequences with the same length
//*     - Accumulate them
//* We need to track the length AND the number of LIS ending at each index
//*     - Use two different DP arrays to track each respective property (length vs count)
//*
function findNumberOfLIS(nums) {
  if (nums.length === 0) return 0;

  const n = nums.length;

  //* lengthDP[i] = Longest Increasing Subsequence ending at index i
  //* countDP[i] = Number of Longest Increasing Subsequences ending at index i
  const lengthDP = new Array(n).fill(1);
  const countDP = new Array(n).fill(1);

  let maxLength = 0;
  let LISCount = 0;

  //* "i" represents the index the subsequence will END at
  //* "j" represents the values we will are trying to include in the subsequence
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        if (lengthDP[i] < lengthDP[j] + 1) {
          lengthDP[i] = lengthDP[j] + 1;
          countDP[i] = countDP[j]; //* Retain the previous count (countDP[i] = LIS count UP TO current index)
        } else if (lengthDP[i] === lengthDP[j] + 1) {
          countDP[i] += countDP[j]; //* Accumlate the number of LIS
        }
      }
    }

    maxLength = Math.max(maxLength, lengthDP[i]);
  }

  //* Sum the number of LIS (they must equal maxLength)
  for (let i = 0; i < n; i++) {
    if (lengthDP[i] === maxLength) {
      LISCount += countDP[i];
    }
  }

  return LISCount;
}

console.log(findNumberOfLIS([1, 3, 5, 4, 7])); //* 2
console.log(findNumberOfLIS([2, 2, 2, 2, 2])); //* 5

//* Time: O(n^2) - We have two nested for loops that both depend on "n"
//* Then we have an O(n) for loop, but that is dominated by the n^2

//* Space: O(n) - We have two DP arrays that both scale in size with "n"
