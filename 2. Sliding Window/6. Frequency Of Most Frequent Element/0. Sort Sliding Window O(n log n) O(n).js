//* We can choose any index and increment the element that exists there by 1
//* The goal is to return the maximum possible frequency of an element after performing AT MOST k operations
//! Immediately, we can observe that the elements will never decrease
//*     - They either stay the same, or they increase (monotonically non-increasing)
//! Another observation we can make is that the order of the elements does not matter
//* Ideally, we want elements that are similar in value to be close together
//* This allows us to have a better chance of minimizing the amount of operations done
//* This would give us the highest chance of maximizing the frequency of any element
//* Then, we can apply a sliding window approach and expand/shrink the window as needed
//* Track the sum of elements within the window
//* To check if a window is valid, multiply the window size by nums[end], then subtract the sum from it
//* If the result is greater than K, then we need to decrease the window size
//*     - Why? Because we need to do more "increment operations" than is possible (k is too small)
function maxFrequency(nums, k) {
  //* Sort the array to ensure monotonicity
  nums.sort((a, b) => a - b);

  let sum = 0;
  let maxFreq = 0;

  //* Pointers for the sliding window start/end
  let start = 0;
  let end = 0;

  while (end < nums.length) {
    //* Add the current value to the window
    sum += nums[end];

    //* window size * nums[end] = current cost to turn entire window into nums[end]
    //* Subtract from that, the sum (because we don't need to do every operation)
    while ((end - start + 1) * nums[end] - sum > k) {
      sum -= nums[start++];
    }

    //* Find a new max frequency
    maxFreq = Math.max(maxFreq, end - start + 1);
    end++;
  }

  return maxFreq;
}

console.log(maxFrequency([1, 2, 4], 5)); //* 3
console.log(maxFrequency([1, 4, 8, 13], 5)); //* 2
console.log(maxFrequency([3, 9, 6], 2)); //* 1

//* Time: O(sort) - The time taken scales with the time needed to sort the array
//* Otherwise, the actual algorithm takes O(n)

//* Space: O(sort) - The memory usage scales with the sorting algorithm used
