//* Use a sliding window, this tells us the number of "1s" we have with swaps
//* Track the number of 0s encountered thusfar
//* If you encounter a zero, increment "zeroes"; a new zero entered the window
//* While that number > k, remove the leftmost element from the window
//* If this number is a 0, decrement "zeroes", since a zero is leaving the window
function maxConsecutiveOnesIII(nums, k) {
  let maxOnes = 0;
  let zeroes = 0;

  //* Sliding Window
  let start = 0;
  let end = 0;

  while (end < nums.length) {
    if (nums[end] === 0) zeroes++;

    //* Cannot have more than k zeroes in the subarray
    while (zeroes > k) {
      if (nums[start] === 0) zeroes--;
      start++;
    }

    //* end - start + 1 gives us the length of the subarray
    maxOnes = Math.max(maxOnes, end - start + 1);
    end++;
  }

  return maxOnes;
}

console.log(maxConsecutiveOnesIII([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2)); //* 6
console.log(
  maxConsecutiveOnesIII(
    [0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1],
    3
  )
); //* 10
console.log(maxConsecutiveOnesIII([0, 0, 0, 1, 0, 0, 0], 0)); //* 1
console.log(maxConsecutiveOnesIII([0, 0], 0)); //* 0

//* Time: O(n) - The time taken scales linearly with the size of the input

//* Space: O(1) - We only use constant space; we don't use any data structures that scale with input size
