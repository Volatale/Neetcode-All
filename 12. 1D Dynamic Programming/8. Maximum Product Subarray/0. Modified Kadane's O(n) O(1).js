//! a * -b = Negative
//! -b * -b = Positive
//* If the entire array is positive
//*     - The maximum product is the product of the entire array
//* If the entire array is negative
//*     - If the subarray has an EVEN number of negatives, we get a positive
//*     - If the subarray has an ODD number of negatives, we get a negative
//! The array can contain negatives, so sliding window won't work
//* The sliding window invariant cannot be upheld
//*     - Ideally, we track the MAXIMUM product subarray within the window
//*     - However, expanding the current window may only be "temporarily" beneficial
//*         - Expanding even further (or not) could lower the product
//*     - Expanding could result in a smaller OR a larger window
//*         - So based on that logic, when WOULD we expand or shrink?
//*         - We can't predict the future values, so we have no heuristics
//*     - So even WITH sliding window, we still have to explore every subarray (n^2)
//! Utilize Kadane's Algorithm
//* currMax = Math.max(nums[i], currMax * nums[i])
//*     - Either start a NEW subarray
//*     - Or, extend the previous
//* We know that extending the subarray could either be GOOD or BAD
//*     - And the goodness/badness could change with further extensions
//* So the easiest thing to do is to just track BOTH possibilities at once
//* Track the MINIMUM AND the MAXIMUM values thus far
//*     - This lets us handle both cases at once
//* Maintain the min and max product up to the current index "i"
//! The MIN could become the MAX and vice versa (when multiplying by negatives)
//*     - Thus, we shouldn't ignore the smallest value JUST because it is the minimum
//*     - If we find another negative to multiply with, this could become the maximum (and vice versa)
function maxProduct(nums) {
  if (nums.length === 0) return 0;

  //* The min could become our max when multiplying via negatives (and vice versa)
  let currMin = nums[0];
  let currMax = nums[0];
  let globalMax = nums[0];

  //* Use modified Kadane's Algorithm to find both the min and max subarrays
  for (let i = 1; i < nums.length; i++) {
    //* The smaller number may become the larger number and vice versa
    if (nums[i] < 0) {
      [currMin, currMax] = [currMax, currMin];
    }

    //* Either create new subarrays or extend the old ones
    currMax = Math.max(nums[i], currMax * nums[i]);
    currMin = Math.min(nums[i], currMin * nums[i]);

    globalMax = Math.max(globalMax, currMax);
  }

  return globalMax;
}

console.log(maxProduct([-4, -3, -2]));
console.log(maxProduct([2, 3, -2, 4])); //* 6
console.log(maxProduct([-2, 0, -1])); //* 0
console.log(maxProduct([5])); //* 5
console.log(maxProduct([3, 3, -3, 10])); //* 10
console.log(maxProduct([9, 0, -4])); //* 9
console.log(maxProduct([9, 8, 7])); //* 504
console.log(maxProduct([-2, -5, -3])); //* 15

//* Time: O(n) - We iterate through the entire array once
//* So the time taken scales with the input size

//* Space: O(1) - The memory usage remains constant regardless of input size
