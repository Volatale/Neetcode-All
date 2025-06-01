//* We need to return the number of pairs such that:
//*     - 0 <= i < j < n
//*     - nums[i] + nums[j] < target
//* In other words, the two indices must be different, and the sum of their values must be < target
//* This is possible using a brute force approach, but we can be more efficient through the use of sorting
//! Sorting would introduce an element of monotonicity to the array, which makes it easier to find pairs
//* Ultimately, if we have an array like [1, 2, 3, 4] and nums[1] + nums[2] < target
//! Then we know that every pair of elements in the range [nums[0], nums[2]] should ALSO form a valid pair
//* Why? Because the sum of the "extremes" of the subarray are valid, which means any pair to the left will also be valid
//*     - Any element to the left of the boundary element is <= nums[right], so any pair in the range [nums[left], nums[right]] is also valid
//* Since we need to determine the boundaries of the subarray, we can use a two pointer approach
//*     - Anything to the right of `right` will have already been processed (so we don't count any pairs twice)
//*     - Anything to the left of `left` will also have already been processed for the same reason
//* We can use the equation (pairs += right - left) to get the total number of pairs given the current boundaries of the subarray
//*     - Avoid adding 1 to the above result because a pair requires 2 elements
//*     - In a valid subarray of length 3, there are 3 pairs [0, 1, 2], target = 3: (0 + 2), (0 + 1), (1 + 2)
//! Essentially, we are finding the maximum subarray such that nums[left] + nums[right] < target
//*     - Then, we can compute all of the pairs within this range
function countPairs(nums, target) {
  let pairs = 0;

  //* Sorting the array introduces monotonicity, which makes it easier to find pairs efficiently
  nums.sort((a, b) => a - b);

  //* Two pointers used to find the extremes of the array
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    //* Eliminate all of the invalid pairs
    while (left < right && nums[left] + nums[right] >= target) {
      right--; //* We need to decrease the sum
    }

    pairs += right - left; //* A pair takes 2 elements, and left != right, so don't add one
    left++; //* We are not allowed to reuse elements, so increment to move onto the next
  }

  return pairs;
}

//*   0  1  2  3  4
//* [-1, 1, 2, 3, 1], target = 2
//* [-1, 1, 1, 2, 3], target = 2
//*   L        R

//* -1 + 3 = 2. 2 >= target. Invalid
//* -1 + 2 = 1. 1 < target. valid
//*     - Since all elements <
