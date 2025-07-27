//* We have an int[] sorted in non-decreasing order
//*     - The array is not necessarily distinct (can contain duplicates)
//* The array is rotated at some index k (0 <= k < nums.length)
//* Our goal is to determine if `target` exists in the array post-rotation
//* Since the array exhibits monotonicity, and we are searching the array itself...
//! We can apply a binary search approach
//* ONE of the partitions of the array will contain a monotonically non-decreasing subarray
//* Thus, we just need to determine which side our "mid" value is
//*     - Mid represents the index we are checking
//* Essentially, we want to be able to check whether the value could "possibly" exist in a partition
//* Once we do that, we can decide which side to eliminate from the search space
//* if nums[mid] <= target AND target <= nums[right]
//!     - Then the target COULD exist on the right subarray
//*     - The same cannot be said for the left, so eliminate it
//* else if nums[left] <= target AND target <= nums[mid]
//!     - Then the target COULD exist on the left subarray
//*     - The same cannot be said for the right, so eliminate it
//! There is an edge case wherein all three pointers (left, mid, right) hold the same value
//*     - As in, [5, 5, 5]. To alieviate this, increment left and decrement right
//*     - Either way, both values are useless since they prevent us from being able to binary search
//*         - If not, we lose the heuristic that binary search relies on
function search(nums, target) {
  //* Our search space is the array itself
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    //* `mid` represents the index we are checking
    const mid = left + ((right - left) >> 1);

    if (nums[left] === nums[mid] && nums[mid] === nums[right]) {
      left++;
      right--;
    } else if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target <= nums[mid]) {
        right = mid; //* Eliminate the right (target COULD exist on the left)
      } else {
        left = mid + 1; //* Target definetely does not exist on the left
      }
    } else if (nums[mid] <= nums[right]) {
      if (nums[mid] <= target && target <= nums[right]) {
        left = mid; //* Eliminate the left (target COULD exist on the right)
      } else {
        right = mid - 1; //* Target definetely does not exist on the right
      }
    }
  }

  return nums[left] === target ? true : false;
}

console.log(search([2, 5, 6, 0, 0, 1, 2], 0)); //* True
console.log(search([2, 5, 6, 0, 0, 1, 2], 3)); //* False
console.log(search([0, 0, 0, 3], 1)); //* False
console.log(search([0, 0, 0, 3], 3)); //* True
console.log(search([4, 5, 1, 2, 3], 3)); //* True
console.log(search([4, 5, 1, 2, 3, 4], 4)); //* True
console.log(search([1], 1)); //* True
console.log(search([1, 0], 0)); //* True
console.log(search([1, 0, 1, 1, 1], 0)); //* True
console.log(search([5, 5, 5], 2)); //* False

//* Time: O(log n) - The search space is halved each iteration, so the algorithm scales logarithmically (base 2)

//* Space: O(1) - The memory usage remains constant regardless of input size
