//* Sort the array to make it easy for the sliding window
//* Take a sliding window of size "k"
//* Then take the right value and subtract from it the left value
//* If the diff < min, min = diff
function minDiffHighLowScores(nums, k) {
  if (k === 1) return 0;

  nums.sort((a, b) => a - b); //* Sort so we can do a sliding window later on

  let min = Infinity; //* Assume the worst

  let start = 0;
  let end = k - 1;

  while (end < nums.length) {
    let diff = nums[end] - nums[start];

    min = Math.min(diff, min);

    start++;
    end++;
  }

  return min;
}

console.log(minDiffHighLowScores([90], 1)); //* 0
console.log(minDiffHighLowScores([9, 4, 1, 7], 2)); //* 2
console.log(minDiffHighLowScores([7, 3, 4, 1, 2], 3)); //* 2
console.log(minDiffHighLowScores([1, 2, 3, 4, 5], 3)); //* 2
console.log(minDiffHighLowScores([100, 200, 500, 300], 2)); //* 100

//* Time: O(n log n) - It takes O(n log n) to sort the array using the inbuilt function
//* Then it takes O(n) to iterate through the entire array for the sliding window

//* Space: O(n) - It takes O(n) space for the merge sort
