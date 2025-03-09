//* The product will always fit within a 32-bit integer, so there are no overflows
//*     - max element is 1000 and nums' max length is 30000
//*     - So (30000 * 1000) = 300000000
//*         - -2^31 <= 300000000 <= 2^31 - 1
//* The MINIMUM element in the nums array is 1
//* So EXTENDING the subarray will:
//*     - Either leave the subarray's product as is (1 * n = n)
//*     - Or, it will INCREASE the product
//* Conversely, SHRINKING the subarray will:
//*     - Either leave the subarray's product as is (1 * n = n)
//*     - Or, it will DECREASE the product
//! In other words, the product never DECREASES when EXTENDING
//! And the product never INCREASES when SHRINKING
//* Apply a sliding window approach
//* Track the cumulative product of elements within the window
//* If the product is ever >= k, shrink the window
//*     - We know that shrinking the window won't INCREASE the product
//! To remove elemens from the window, we can DIVIDE by nums[start]
//* Why does this work?
//*     - Multiplication and division are INVERSES of each other
//*         - For cumulative sums we extend via addition, and remove elements via subraction
//*         - That works because addition and subtraction are inverses
//*     - But more importantly, ALL OF THE ELEMENTS ARE POSITIVE
//*         - Division by a negative number creates a negative result
//*     - Since our elements are all positive, the division "reverses" the multiplication
//* Otherwise, extend the window
//*     - We know that exending the window won't DECREASE the product
//* Once the window has been validated, we know that:
//*     - There are (end - start + 1) valid subarrays ENDING at index "end"
function numSubarrayProductLessThanK(nums, k) {
  //* The minimum element is 1, so no subarrays have a product of 0
  if (k === 0) return 0;

  let subarrays = 0;

  //* Marks the start and end of the current window
  let start = 0;
  let end = 0;

  //* Tracks the product of elements within the window
  let product = 1;

  while (end < nums.length) {
    //* Add the current element to the window
    product *= nums[end];

    //* Maintain the sliding window invariant (decrease the product)
    while (start <= end && product >= k) {
      product /= nums[start++];
    }

    //* There are (end - start + 1) subarrays ENDING at index "end"
    subarrays += end - start + 1;
    end++;
  }

  return subarrays;
}

console.log(numSubarrayProductLessThanK([10, 5, 2, 6], 100)); //* 8
console.log(numSubarrayProductLessThanK([1, 1, 1], 5)); //* 6
console.log(numSubarrayProductLessThanK([1, 2, 3], 0)); //* 0
console.log(numSubarrayProductLessThanK([5, 6, 9, 2], 70)); //* 7
console.log(numSubarrayProductLessThanK([3, 3, 3], 4)); //* 3
console.log(numSubarrayProductLessThanK([2, 3, 3], 4)); //* 3

//* Time: O(n) - Each element in nums is processed at most twice
//* So the time taken scales with the input size (nums.length === n)

//* Space: O(1) - The memory usage remains constant regardless of input size
