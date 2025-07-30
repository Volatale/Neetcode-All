//* We are given an int[] sorted in NON-DECREASING order
//* The goal is to find the start and end position of a given `target` value
//*     - If target is NOT found in the array, return [-1, -1]
//* We could use a two pointers approach where we close in on the start/end positions
//! However, since the array is sorted, we can apply binary search
//* Our goal simply to use binary search to locate the FIRST and LAST indices of target
//* `mid` represents the current index we are trying
//* To find the FIRST `target`:
//*     - if nums[mid] >= target, right = mid - 1
//*     - else nums[mid] < target, left = mid + 1
//* To find the LAST `target`
//*     - if nums[mid] <= target, left = mid + 1
//*     - else nums[mid] > target, right = mid - 1
//! We could also do modified binary searches
//*     - while (left < right) instead of while (left <= right)
//*     - Except we need to ensure we handle the right biased mid
//*         - left + ((right - left + 1) >> 1)
function searchRange(nums, target) {
  const left = leftBisect(nums, target);
  const right = rightBisect(nums, target);

  return [left, right];
}

function leftBisect(nums, target) {
  //* The search space is the array itself
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    //* `mid` represents the index of the element we are checking
    const mid = left + ((right - left) >> 1);

    if (nums[mid] >= target) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  //* Return left if we found the target
  return nums[left] === target ? left : -1;
}

function rightBisect(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = left + ((right - left + 1) >> 1);

    if (nums[mid] <= target) {
      left = mid;
    } else {
      right = mid - 1;
    }
  }

  //* Return right if we found the target
  return nums[right] === target ? right : -1;
}

console.log(searchRange([5, 7, 7, 8, 8, 10], 8)); //* [3, 4]
console.log(searchRange([1, 2, 3, 4, 5], 6)); //* [-1, -1]
console.log(searchRange([1, 2, 3, 3], 2)); //* [1, 1]
console.log(searchRange([4, 5, 5, 6], 5)); //* [1, 2]
console.log(searchRange([10], 10)); //* [0, 0]
console.log(searchRange([3, 4, 5, 5, 7, 8], 5)); //* [2, 3]
console.log(searchRange([1, 1, 1, 1, 1], 1)); //* [0, 4]

//* Time: O(log n) - It takes O(log n) to perform ONE binary search, and we perform two
//* Within each iteration, the search space is halved

//* Space: O(1) - The memory usage remains constant regardless of input size
