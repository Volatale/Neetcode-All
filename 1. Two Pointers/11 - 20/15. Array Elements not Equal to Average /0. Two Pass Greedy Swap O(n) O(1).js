//* The input array contains distinct integers
//* We need to rearrange the elements such that no element is equal to the average of its neighbors
//* For example, if we have [1, 2, 3], the sum of ((1 + 3) / 2) == 2, so one of those elements needs to be moved
//* Any element to the left of "i" we can leave in its current position
//! Additionally, we only ever need to perform a swap if the array invariant is not upheld
//*     - There is no point in moving any elements that are already in position
//*     - If we do, we'd have to go back and verify the left and right of that index once again
//* Essentially, we are employing a greedy approach where we only swap when we need to
//! Why does swapping nums[i] and nums[i + 1] work?
//*     - Because the elements are all distinct, which means the swap is guaranteed to NOT destroy any prior success
//*         - We know for sure that a swap will fix the invariant from the perspective of that swap
//*     - If we have [1, 2, 3], then we have to swap the 2 and the 3, but that gives us [1, 3, 2]
//*         - And ((1 + 2) / 2) === 1.5, not 3, so we know this swap is fine
//! Why do we need to perform both a forward and backward pass?
//*     - If the input was [1, 2, 3, 4, 5, 6], it becomes [1, 3, 2, 4, 6, 5] AFTER the forward pass
//*         - But if we look closer, ((2 + 6) / 2) === 4 (index 3), so this is not yet a correct value
//*     - When we perform the forward pass, we ONLY swap with the NEXT (i + 1) element, and never the PREVIOUS (i - 1) element
//*         - So by performing the backward pass, we ensure that BOTH adjacent neighbors are covered
//* Mathematically, one of the neighbors must be smaller than nums[i], and the other greater than nums[i] to have an average equal to nums[i]
function rearrangeArray(nums) {
  //* Fix Triplets going forward
  for (let i = 1; i < nums.length - 1; i++) {
    if ((nums[i - 1] + nums[i + 1]) / 2 === nums[i]) {
      swap(nums, i, i + 1);
    }
  }

  //* Fix Triplets going backwards
  for (let i = nums.length - 2; i >= 0; i--) {
    if ((nums[i - 1] + nums[i + 1]) / 2 === nums[i]) {
      swap(nums, i, i - 1);
    }
  }

  return nums;
}

function swap(nums, x, y) {
  const temp = nums[x];
  nums[x] = nums[y];
  nums[y] = temp;
}

console.log(rearrangeArray([1, 2, 3, 4, 5])); //* [1, 3, 2, 4, 5]
console.log(rearrangeArray([1, 2, 3, 4, 5, 6])); //* [1, 3, 4, 2, 6, 5]
console.log(rearrangeArray([6, 2, 0, 9, 7])); //* [6, 2, 0, 9, 7]

//* Time: O(n) - We iterate through the entire array twice, so the time taken scales linearly with the input size

//* Space: O(1) - The memory usage remains constant regardless of input size
