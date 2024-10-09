//* The "difference" logic is another way to say "alternating between larger and smaller values"
//* The logic is essentially the same as Longest Turbulent Subarray
//*     - Except we care about SUBSEQUENCES not SUBARRAYS
//*         - So we RETAIN previous values instead of starting over again from length 1
//* We only care about POSITIVE and NEGATIVE values
//*     - So there are only 2 states to consider
//* [1, 4, 3]
//*     - Here, 4 > 1
//*         - In other words nums[i] > nums[i-1]
//*     - So since nums[i-1] is SMALLER, we take from DEC, then add 1
//*         - Because DEC represents the maximum we could get up to the current index
//*     - Then, dec[i] = dec[i-1]
//*         - Like I said, we retain the best value we had since we don't start the count from 1 element again
//* Basically we go
//*     - Inc > Dec > Inc > Dec, or
//*     - Dec > Inc > Dec > Inc
//* That is what is meant by ALTERNATING
//*     - This element > previous? Take the best from the DECREASING and add 1
//*         - That becomes our new best INCREASING length
//*     - Why? Because [1, 2, 3] is not alternating
//*         - 2 > 1, which is fine, so inc will be 2
//*         - But we can't include 3 to [1, 2] because 3 > 2, so the best will still be 2

//* Optimize for space
//*     - We only rely on the PREVIOUS value
//*     - So eliminate the rest of the states completely once we no longer need them
//*         -
function wiggleMaxLength(nums) {
  if (nums.length === 0) return 0;

  const n = nums.length;

  //* They represent length of longest increasing/decreasing alternating subsequences respectively
  //* 1 Element is always considered a valid subsequence
  let inc = 1;
  let dec = 1;

  for (let i = 1; i < n; i++) {
    if (nums[i] > nums[i - 1]) {
      //* New increasing best = best decreasing + 1
      inc = dec + 1;
    } else if (nums[i] < nums[i - 1]) {
      //* New decreasing best = best increasing + 1
      dec = inc + 1;
    }
  }

  return Math.max(inc, dec);
}

console.log(wiggleMaxLength([1, 7])); //* 2
console.log(wiggleMaxLength([1, 7, 4, 9, 2, 5])); //* 6
console.log(wiggleMaxLength([1, 17, 5, 10, 13, 15, 10, 5, 16, 8])); //* 7
console.log(wiggleMaxLength([1, 2, 3, 4, 5, 6, 7, 8, 9])); //* 2

//* Time: O(n) - We iterate through the entire array once, so the time taken scales with "n"

//* Space: O(1) - We are only using constant space variables
