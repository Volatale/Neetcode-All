//* We have an int[] that is sorted and distinct
//* The array was sorted some number of times and our goal is to find the index of `target`
//* If it doesn't exist, we return -1
//* Since the array is sorted, we can say the array exhibits monotonicity
//* The only issue is, we don't know what the pivot index was
//* Our goal is to find some target in the array, so the search space is the array itself/
//*     - Namely, the indices (0 to n - 1)
//* If we have an array like [3, 4, 5, 1, 2] and target = 1
//* Then if we were to apply binary search, our `mid` would be 2
//*     - We can simply check if nums[mid] > nums[right]
//*         - After, we can see if `target` could exist within this range (based on the value range)
//*         - If so, we search the right
//*         - Else, search the left
//*     - Do the same for nums[mid] < nums[left]
//*         - And perform the opposite checks
//! Essentially, we are trying to find the monotonically increasing subarray
//* Once we find it, we can check if the target exists within it, or not
//* If it does, then we search WITHIN that subarray, and if not, we go the opposite way
function search(nums, target) {
  //* The search space is the array itself
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    //* `mid` represents the index we are checking for the target
    const mid = left + ((right - left) >> 1);

    if (nums[mid] >= nums[left]) {
      if (nums[left] <= target && target <= nums[mid]) {
        right = mid; //* We either found the target, or it may exist on the left
      } else {
        left = mid + 1; //* The target likely exists on the right somewhere
      }
    } else if (nums[mid] <= nums[right]) {
      if (nums[mid] <= target && target <= nums[right]) {
        left = mid; //* We either found the target, or it may exist on the right
      } else {
        right = mid - 1; //* The target likely exists on the left
      }
    }
  }

  //* Return the index of target if it exists and -1 if not
  return nums[left] === target ? left : -1;
}

console.log(search([4, 5, 6, 7, 0, 1, 2], 0)); //* 4
console.log(search([4, 5, 6, 7, 0, 1, 2], 3)); //* -1
console.log(search([1], 0)); //* -1
console.log(search([3, 1, 2], 2)); //* 2
console.log(search([55, 50, 51, 52, 53, 54], 50)); //* 1

//* Time: O(log n) - The search space is halved every iteration

//* Space: O(1) - The memory usage remains constant regardless of input size
