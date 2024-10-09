//* The maximum sum subarray either travels entirely through the MIDDLE of the array
//* Or, it wraps around the edges
//* To calculate the "forward" maximum sum subarray
//*     - Use Kadane's Algorithm
//* Now we need to apply some thought
//*     - When we want to MAXIMIZE something, we implicitly minimize something else
//* Lets say the array is [1, 2, 3, -2, 4]
//*     - The maximum sum subarray is (1 + 2 + 3 + 4) = 10
//*     - Adding the -2 will reduce the total to 8, so we LEAVE THE -2 OUT
//* Since maximizing something automatically gives us the minimum
//*     - We can say that the stuff we leave out can be considered the minimum
//*     - i.e: in our above example, the [-2] can be considered the MINIMUM SUM SUBARRAY
//! So we should find both
//*     - The MAXIMUM sum subarray (what we include) AND
//*     - The MINIMUM sum subarray (what we leave out)
//* To find the sum WITHOUT what we should leave out
//*     - Total - min sum subarray
//*     - So our above example would be:
//*         - total = 8
//*         - globalMax = 6 (doesn't wrap around)
//*         - globalMin = -2 (element on its own)
//*             8 - (-2) = 10
//*             10 is conviniently the sum of [1, 2, 3, 4]
//* We need to handle the case where EVERY element is negative
//*     - [-1, -2, -3] = -6 as a sum
//*     - In this case, we need to return the LARGEST element
function maxSubarraySumCircular(nums) {
  //* Tracks maximum sum subarray
  let currMax = 0;
  let globalMax = nums[0];

  //* Tracks minimum sum subarray
  let currMin = 0;
  let globalMin = nums[0];

  //* Tracks sum of the entire array (to see if all are negative)
  let total = 0;

  for (const num of nums) {
    //* Find the maximum subarray sum
    currMax = Math.max(currMax + num, num);
    globalMax = Math.max(globalMax, currMax);

    //* Find the minimum subarray sum
    currMin = Math.min(currMin + num, num);
    globalMin = Math.min(globalMin, currMin);

    //* Find the sum of the entire aray
    total += num;
  }

  //* Edge Case: All elements are negative; return largest element (globalMax)
  if (globalMin === total) {
    return globalMax;
  }

  //* Maximum sum subarray vs (entire array - minimum sum subarray)
  return Math.max(globalMax, total - globalMin);
}

console.log(maxSubarraySumCircular([1, -2, 3, -2])); //* 3
console.log(maxSubarraySumCircular([5, -3, 5])); //* 10
console.log(maxSubarraySumCircular([-3, -2, -3])); //* -2 (all elements are negative, return largest)
console.log(maxSubarraySumCircular([1, -6, -7, 4])); //* 5

//* Time: O(n) - We iterate through the entire array once
//* So the time taken scales with the number of elements

//* Space: O(1) - There are 5 individual variables (technically 6 including "num")
//* But none of them scale with the size of the input
