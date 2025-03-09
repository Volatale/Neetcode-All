//* int[] nums
//* int k

//* Return number of subarrays whose PRODUCT < k

//* 1 <= nums.length <= 3 * 10^4
//* 1 <= nums[i] <= 1000
//* 0 <= k <= 10^6

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
//* In a brute force manner, get the cumulative product of every subarray
//* If the current subarray's product < k, then it is a valid subarray
//* Since the product never decreases, if the product >= k
//*     - We can't extend the subarray, so we should end it at the current index

function numSubarrayProductLessThanK(nums, k) {
  let subarrays = 0;

  for (let i = 0; i < nums.length; i++) {
    //* Tracks the product of the current subarray
    let product = 1;

    for (let j = i; j < nums.length; j++) {
      //* Add the current product to the subarray
      product *= nums[j];

      if (product < k) {
        subarrays++;
      } else if (product >= k) {
        //* Product can't decrease, so end the subarray here
        break;
      }
    }
  }

  return subarrays;
}

console.log(numSubarrayProductLessThanK([10, 5, 2, 6], 100)); //* 8
console.log(numSubarrayProductLessThanK([1, 1, 1], 5)); //* 6
console.log(numSubarrayProductLessThanK([1, 2, 3], 0)); //* 0
console.log(numSubarrayProductLessThanK([5, 6, 9, 2], 70)); //* 7
