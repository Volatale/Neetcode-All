//* We are given an int[], and there is a sliding window of size `k` moving from left to right
//* Since the window size is `k`, we can only see `k` numbers in the window
//* "Max sliding window" really means "return an array of the maximum value in each window of size k"
//* Since we potentially require a range of values, we can't just use a regular sliding window
//! The same `max` value in a window could potentially be used over a range of indices
//* So it is not as simple as just tracking the current max
//* If the current max is leaving the window, then we need to use a previous max, or the current value
//* Instead of a sliding window, we could simply brute force the answer
//* Use nested for loops and simply iterate over a window of size "k" from each index
//* Take the maximum within the window, and that is our maximum value for the current window
function maxSlidingWindow(nums, k) {
  const result = [];

  for (let i = 0; i <= nums.length - k; i++) {
    let maxInWindow = nums[i];

    //* Find the maximum within the current window
    for (let j = i; j < i + k; j++) {
      maxInWindow = Math.max(maxInWindow, nums[j]);
    }

    result.push(maxInWindow);
  }

  return result;
}

console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)); //* [3, 3, 5, 5, 6, 7]
console.log(maxSlidingWindow([1, 2, 3], 1)); //* [1, 2, 3]
console.log(maxSlidingWindow([1, 3, -1], 3)); //* [3]

//* Time: O(n * k) - There are "n" elements, and we are doing "k" iterations within each outer loop iteration

//* Space: O(n) - The memory usage scales with the input size
//* However, if we do not consider the output memory usage to be part of the space complexity, then it is O(1) space
