//* Example: [1, 1, 4, 2, 3], x = 5
//*     - Total Sum = 11
//*     - X = 5
//* Total Sum - X = 6
//* Total Sum - 6 = 5
//* Find a subarray that sums to (sum(nums) - x)
//*     - 11 - 5 = 6
//* We have a subarray that sums to 6: [1, 1, 4]
//*     - The length of the entire array is 5
//*     - The length of our found subarray is 3
//* (5 - 3 = 2), which is the length of the LEFTOVER subarray
//*     - Which is coincidentally the subarray WE NEED TO REMOVE
//! Instead of removing elements:
//*     - Find the longest subarray that sums to (sum(nums) - x)
//* Maintain a sliding window / Prefix Sum
//*     - Add elements to the window
//*         - Add nums[i] to sum
//*     - If sum > target (sum(nums) - x)
//!         - Shrink the window; it is invalid
//*     - Otherwise, it is a valid window
//* Track the maximum length VALID window
//*     - (end - start + 1) to get the length
//* Then, we can simply return (nums.length - maLength)
//*     - Because that gives us the number of elements that need REMOVING
//! Why does Sliding Window work?
//* nums[i] is positive
//*     - Removing an element ALWAYS decreases "x"
//*     - This is why Sliding Window works
//* If target (sum(nums) - x) is NEGATIVE, we immediately return -1
//*     - Removing elements from the array would create a SMALLER number
//*     - We'd need to remove NEGATIVE elements to increase x, but we have none
//! Reverse Thinking
//*     - Essentially, instead of actually removing any elements
//*         - We are finding the elements we DON'T have to remove
//*     - Any elements OUTSIDE of the sliding window are removed
//*     - Any elements WITHIN the sliding window are kept
//* nums = [1, 1, 4, 2, 3], x = 5
//*     - Sum(nums) = 11
//*     - Target = (11 - 5 = 6)
//*         - So we need to find the longest subarray that sums to 6
//*         - Specifically, these are the elements we'll KEEP
//*     - By maximizing the length of the KEPT subarray, we MINIMIZE the no. of elements REMOVED
function minOperations(nums, x) {
  //* The window of elements that REMAIN in the array sums to target
  const target = -x + nums.reduce((acc, curr) => acc + curr, 0);

  //* We have no negative values, so we can't get to a negative value
  if (target < 0) return -1;

  //* Marks start and end of sliding window
  let start = 0;
  let end = 0;

  let maxLength = -1; //* Assume we find no longest valid subarray
  let sum = 0; //* Sum of elements within window

  while (end < nums.length) {
    //* Add the current element to the window
    sum += nums[end];

    //* Maintain the sliding window invariant
    while (sum > target) {
      sum -= nums[start++]; //* Remove leftmost element
    }

    //* Found a valid window
    if (sum === target) {
      maxLength = Math.max(maxLength, end - start + 1);
    }

    end++;
  }

  //* No. of elements NOT in max length window = no. of elements removed
  return maxLength !== -1 ? nums.length - maxLength : -1;
}

console.log(minOperations([1, 1, 4, 2, 3], 5)); //* 2
console.log(minOperations([5, 6, 7, 8, 9], 4)); //* -1
console.log(minOperations([3, 2, 20, 1, 1, 3], 10)); //* 5
console.log(minOperations([1, 1, 3, 6, 3, 3], 6)); //* 2
console.log(minOperations([100], 200)); //* -1

//* Time: O(n) - At most, we process each element in nums twice

//* Space: O(1) - The memory usage remains constant regardless of input size
