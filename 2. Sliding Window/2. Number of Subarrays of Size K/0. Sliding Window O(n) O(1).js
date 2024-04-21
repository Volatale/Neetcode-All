//* We are told to find subarrays of size k, so means a sliding window of size k
//* The "sum" represents the window of values
//* We have the option of doing sum / k for each window, but division is slow
//* Instead, we can do the reverse of division (multiplication)
//* If the sum >= valToBeat, then sum / k >= threshold also holds true
//* Within each iteration, add nums[i] to the window (the sum)
//* If there are "k" elements within the window, check if the condition holds
//* Then remove the i-kth element from the window (subtract the value)
function numberOfSubarraysSizeK(nums, k, threshold) {
  //* Multiplication is faster than division
  const valToBeat = k * threshold;

  let sum = 0;
  let subarrays = 0;

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i]; //* Add current element to window

    //* If there are "k" elements within the window
    if (i - k + 1 >= 0) {
      if (sum >= valToBeat) {
        subarrays++;
      }

      sum -= nums[i - k + 1]; //* Remove i-k-th element from window
    }
  }

  return subarrays;
}

console.log(numberOfSubarraysSizeK([2, 2, 2, 2, 5, 5, 5, 8], 3, 4)); //* 3
console.log(numberOfSubarraysSizeK([11, 13, 17, 23, 29, 31, 7, 5, 2, 3], 3, 5)); //* 6
console.log(numberOfSubarraysSizeK([1, 2, 3, 4, 5], 2, 3)); //* 2

//* Time: O(n) - We have to process every element within the input
//* So the time taken scales with the size of the array

//* Space: O(1) - The space usage does not scale with the input size
