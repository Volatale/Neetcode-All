//* We are given an array of integers and we need to find 3 numbers that fit the "132 pattern"
//*     - The "132 pattern" is a SUBSEQUENCE of three integers where i < j < k (the indices) AND
//*     - nums[i] < nums[k] < nums[j]
//* So in other words, three distinct indices must be used, and we need to find a smaller number than nums[k]
//* Mathematically speaking, we want to minimize nums[i] if it is at all possible
//! We can use a monotonic stack and aim to find the Next Greater Element at each possible index
//* By doing so, we effectively minimize the value of nums[i]
//* The goal is to minimize nums[i], but we also want to maximize nums[k]
//* By minimizing nums[i], the value of nums[k] can be smaller
//* And by maximizing nums[k], we have a higher chance of finding a value < nums[k]
//* By iterating backwards, we can find the Next Greater Element of the "2" in "132"
//* Essentially, we find the "2" first, then we attempt to maximize the "3"
//*     - By maximizing the 3, we have the highest chance of finding the "1"
//* Once we find the NGE of "2", we know for sure that there is a number smaller than nums[j]
//* Thus, all we have do is keep maximizing nums[k] and find a nums[i] < nums[k]
function find132Pattern(nums) {
  //* Monotonically decreasing stack to find NSE (used to find nums[j])
  const stack = [];

  let second = -Infinity;

  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] < second) return true; //* Found nums[j]

    //* Find the NGE of "2" (maximizing "3" gives us a better chance of finding "1")
    while (stack.length > 0 && nums[i] > stack[stack.length - 1]) {
      second = stack.pop();
    }

    stack.push(nums[i]);
  }

  return false;
}

console.log(find132Pattern([1, 2, 3, 4])); //* False
console.log(find132Pattern([3, 1, 4, 2])); //* True
console.log(find132Pattern([-1, 3, 2, 0])); //* True
console.log(find132Pattern([1, 4, 5])); //* False
console.log(find132Pattern([1, 3, 2])); //* True

//* Time: O(n) - The time taken scales with the number of elements in the input array

//* Space: O(n) - In the worst case, there is no "132" pattern, so the stack holds every element (n)
