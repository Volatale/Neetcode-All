//* To uphold the sliding window invariant, we need a valid window
//*     - A valid window has a cumulative sum >= target
//* nums[i] >= 1, so in other words, there are NO NEGATIVE VALUES
//*     - Thus, one observation we can make is that ADDING a value ALWAYS adds to the sum
//*     - So progress cannot be lost via an element's addition to the window
//* We want the MINIMUM valid window, so if we already have a valid window
//*     - Ideally, we want to try shrinking on the left (greedily)
//* If the window REMAINS valid, then the resulting subarray has a length < best so far
//* If window [i..j] is valid
//*     - Then window [i..j + 1] is ALSO valid
//*         - But it has an extra element, so it doesn't change our result
//*     - So instead, we check if [i + 1..j] is still valid
//*         - Because this window, if valid, would change our result
//! To clarify, Sliding Window works here because of two reasons:
//*     - nums[i] >= 1, so ADDING elements to the window ALWAYS increases the subarray sum
//*     - Thus, we can also say that REMOVING elements from the window ALWAYS decreases the sum
//* If nums[i] could be negative, expanding the subarray could have multiple effects:
//*     - It could increase the subarray sum if nums[i] is positive
//*     - It could have no effect if nums[i] === 0 (n + 0 = 0)
//*     - It could decrease the subarray sum if nums[i] is negative
//* Essentially, we wouldn't be able to easy tell whether we need to expand/shrink after adding an element
//*     - Only ONE of the above cases is relevant to this question since nums[i] >= 1
//*         - If sum < target, we know we need to expand until the subarray is valid
//*         - If sum >= target, then we can shrink until the subarray is invalid
function minSubArrayLen(target, nums) {
  let minLength = Infinity; //* Assume we don't find a valid subarray

  //* Tracks the cumulative sum of elements within the window
  let sum = 0;

  //* Marks the start and end of the current window
  let start = 0;
  let end = 0;

  while (end < nums.length) {
    //*  Add the current element to the window
    sum += nums[end];

    //* We have a valid subarray, so try shrinking the window to improve the result
    while (sum >= target) {
      minLength = Math.min(minLength, end - start + 1);
      sum -= nums[start++];
    }

    end++;
  }

  //* If minLength < Infinity, we found a valid subarray
  return minLength < Infinity ? minLength : 0;
}

console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3])); //* 2
console.log(minSubArrayLen(4, [1, 4, 4])); //* 1
console.log(minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1])); //* 0
console.log(minSubArrayLen(4, [2, 2, 4])); //* 1

//* Time: O(n) - Ultimately, each element is processed twice at most

//* Space: O(1) - The memory usage does not scale with the input size
