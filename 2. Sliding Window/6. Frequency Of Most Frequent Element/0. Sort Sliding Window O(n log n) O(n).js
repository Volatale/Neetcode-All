//* Sort the values
//* K is "decreased" less if values are closer to each other
//* [1, 1, 3], k = 2, it is easier to turn both 1s into 2s, than into 3s

//* windowSize * nums[end] is the sum of the window WITH the increments
//* sum + k is the maxValue + the extra increments
//* [1, 1, 1, 2], end = 3 would mean we are turning all of the 1s into 2s
//* Which would give us "8", but if k = 2...
//* 5 + 2 = 7
//* 8 > 7 so window is invalid; decrease the window size until it is valid
function maxFrequency(nums, k) {
  nums.sort((a, b) => a - b);

  //* Sliding Window
  let start = 0;
  let end = 0;

  let maxLength = 0;
  let sum = 0;

  while (end < nums.length) {
    sum += nums[end];

    //* windowSize * nums[end] is the sum of the window WITH the increments
    //* sum + k is the maxValue + the extra increments
    while ((end - start + 1) * nums[end] > sum + k) {
      sum -= nums[start++];
    }

    maxLength = Math.max(maxLength, end - start + 1);
    end++;
  }

  return maxLength;
}

console.log(maxFrequency([1, 2, 4], 5)); //* 3
console.log(maxFrequency([1, 4, 8, 13], 5)); //* 2
console.log(maxFrequency([3, 9, 6], 2)); //* 1

//* Time: O(n log n) - We have to sort the array to ensure that closer values can be transformed easily
//* Then we have an O(n) while loop, but that is dominated by the n log n

//* Space: O(n) - If we are using merge sort, then we are using O(n) space
//* If it is quick sort, then we are using O(log n) space, and O(1) for heap
