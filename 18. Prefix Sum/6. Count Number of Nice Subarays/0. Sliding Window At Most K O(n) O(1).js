//* The question is asking for the number of subarrays with "exactly k" odd numbers
//* Whenever we have a subarray question that involves "exactly k" of something
//* We can utilize a variation of sliding window
//*     - end - start + 1 gives us the number of elements in the current sliding window
//* Lets say there are 16 subarrays in total
//*     - If only 9 of them are valid, 16 - 9 = 7
//* Essentially, "atMost(k)" is an OVERESTIMATION
//*     - We REMOVE the invalid subarrays from the overestimation
//*     - And then we are left with only the valid subarrays

//* atMost(k) gives the count of subarrays that contain AT MOST "k" odd numbers
//* By definition, it includes subarrays with 0, 1, 2, ..., k odd numbers
//* It is an overestimation of subarrays because it includes those with FEWER THAN "K" odds

//* To ISOLATE the subarrays with EXACTLY "k" odd numbers
//*     - exactly(k) = atMost(k) - atMost(k - 1)
//* atMost(k) includes all subarrays with up to "k" odds
//* atMost(k - 1) includes all subarrays with up to "k-1" odds
//* Subtracting the latter removes all subarrays with FEWER than "k" odds
//*     - Thus, we are left with ONLY those with EXACTLY "k" odds
//* The intuition works similarly to how 5! / 4! would work
//*     - Since 4, 3, 2, 1 factorial all exist on the numerator AND the denominator
//*     - We can "cancel" them out, which leaves us with JUST the 5 on its own
function numberOfSubarrays(nums, k) {
  //* Exactly(k) = atMost(k) - atMost(k - 1)
  return atMost(nums, k) - atMost(nums, k - 1);
}

function atMost(nums, k) {
  //* Sliding Window
  let start = 0;
  let end = 0;

  let subarrays = 0;
  let odds = 0;

  while (end < nums.length) {
    //* Found an odd number
    if (nums[end] & 1) {
      odds++;
    }

    //* Keep shrinking the window while odds > k
    while (odds > k) {
      //* If nums[start] is odd, subtract 1, otherwise subtract 0
      odds -= nums[start++] & 1;
    }

    //* Take every valid subarray within this range
    subarrays += end - start + 1;
    end++;
  }

  return subarrays;
}

console.log(numberOfSubarrays([1, 1, 2, 1, 1], 3)); //* 2
console.log(numberOfSubarrays([2, 4, 6], 1)); //* 0
console.log(numberOfSubarrays([2, 2, 2, 1, 2, 2, 1, 2, 2, 2], 2)); //* 16
console.log(numberOfSubarrays([1, 2, 1, 2], 1)); //* 6

//* Time: O(n) - We iterate through the entire input twice at most, so the time taken is linear

//* Space: O(1) - No additional space that will scale with the input size is used
