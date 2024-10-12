//* Essentially, our aim is to "move" values from the current index to the left
//*     - This won't work at index 0 because nums[0 - 1] would take us out of bounds
//*     - Hence we can only choose indices in the range 1 >= i < n: [1 : n - 1]
//! Take the MAXIMUM in the array and distribute a value of ONE to the left
//*     - [3, 7, 1, 6] -> [4, 6, 1, 6] -> [5, 5, 1, 6] -> [5, 5, 2, 5]
//*         - There are times we have MULTIPLE maximums
//*         - This does not affect the outcome at all
//*     - The last is as evenly distributed as we are going to get
//*         - So 5 (our leftmost) value is the return result
//! The leftmost value will never get smaller than what it is originally
//*     - We can't ever choose nums[0], so this value can only ever INCREASE
//*     - Based on this observation, we can initialize the result to nums[0]
//* Instead of distributing values one by one
//!     - We can instead just distribute among subarrays
//* [3, 4, 5]
//*     - [3, 4, 5] -> [3, 5, 4] -> [4, 4, 4]
//*     - The result will be 4 in this case (that is the best we can do)
//!     - If nums[0] >= everything else, we know we have the optimal result
//* Take a prefix sum of the array as we move to each element
//*     - Then find the average among that subarray
//*         - This is the "maximum" value we can get in this subarray
//* [3, 7, 1, 6]
//*     - Considering just [3, 7] would mean 7 can give the 3 (2)
//*     - That gives us [5, 5]
//*         - Conviniently, 3 + 7 = 10, then divide by 2 (subarray size) = 5
function minimizeMaximumofArray(nums) {
  //* Tracks the array total
  let total = nums[0];

  //* Value on the left cannot get smaller
  let minMax = nums[0];
  let subarraySize = 2;

  //* We are trying to EVENLY distribute among each subarray size
  //* If we have [3, 6], we can move a value (1) over from 6 to 3 twice ([3, 6] -> [4, 5] -> [5, 4])
  //* Start with single element, then increase subarray size by 1 (then take the AVERAGE of each)
  for (let i = 1; i < nums.length; i++) {
    total += nums[i];

    //* Ceil because we are working with INTEGERS
    minMax = Math.max(minMax, Math.ceil(total / subarraySize));
    subarraySize++; //* Add next element to subarray
  }

  return minMax;
}

console.log(minimizeMaximumofArray([3, 7, 1, 6])); //* 5
console.log(minimizeMaximumofArray([10, 1])); //* 10
console.log(minimizeMaximumofArray([4, 5, 6, 7])); //* 6
console.log(minimizeMaximumofArray([3, 6])); //* 5

//* Time: O(n) - We iterate through the array once, so the time taken scales with input size

//* Space: O(1) - The only variables used are constant size; they don't scale with input size
