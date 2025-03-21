//! If the array is monotonically increasing, ANY triplet works
//! Thus the reverse is also true: if the array is monotonically DECREASING, no triplet works
//* A triplet does not necessarily have to be contiguous
//* So essentially, we are trying to find a SUBSEQUENCE
//*     - Specifically, we want ANY INCREASING SUBSEQUENCE of length 3
//*     - Thus, we can use the same solution as the LIS problem (binary search variation)
//* There is no need to actually return the triplet itself
//*     - We only care about whether or not we can FORM the triplet, not the contents of it
//* Thus, we can use Binary Search to determine the insertion position of each element
//* If we find an element that should go WITHIN the lower and upper bounds of the subsequence (min, max)
//*     - Then we simply overwrite one of the values that already exists
//*     - We didn't really make any progress toward the goal
//* If we find an element whose insertion position is the length of the subsequence array/
//*     - Then we know we found one of the three (i, j, k)
//* And since we are binary searching for the insertion position, we are guaranteed to have a monotonically increasing array
function increasingTriplet(nums) {
  if (nums.length < 3) return false;

  const subsequence = [];

  //* For each index, find the leftmost insertion position
  for (let i = 0; i < nums.length; i++) {
    const index = leftBisect(subsequence, nums[i]);

    if (index === subsequence.length) {
      //* nums[i] is larger than every element in the subsequence
      subsequence.push(nums[i]);
    } else {
      //* Overwrite an element that already exists (ensures monotonicity)
      subsequence[index] = nums[i];
    }

    //* Found a valid subsequence
    if (subsequence.length === 3) return true;
  }

  return false;
}

function leftBisect(nums, target) {
  let left = 0;
  let right = nums.length;

  while (left < right) {
    const mid = left + ((right - left) >> 1);

    if (nums[mid] >= target) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

console.log(increasingTriplet([1, 2, 3, 4, 5])); //* True
console.log(increasingTriplet([5, 4, 3, 2, 1])); //* False
console.log(increasingTriplet([2, 1, 5, 0, 4, 6])); //* True
console.log(increasingTriplet([5, 2, 1, 4, 0, 0, 9])); //* True

//* Time: O(n log n) - For each element in nums (n), we perform a binary search O(log n)

//* Space: O(1) - The memory usage remains constant regardless of input size
