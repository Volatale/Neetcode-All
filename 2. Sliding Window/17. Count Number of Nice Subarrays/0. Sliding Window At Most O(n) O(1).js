//* The first call gives us the number of subarrays with at MOST "k" odd elements
//* So we are essentially overestimating how many subarrays we will have
//* Then we subtract the result of atMost(k-1) which gives us atMost(k-1) odd elements
//* [2, 2, 2, 1], k = 2 would give us:
//* atMost(2) = 10
//* atMost(1) = 6
//* 10 - 6 = 4
function countNumberOfNiceSubarrays(nums, k) {
  //* Exactly(k) = atMost(k) - atMost(k-1)
  return atMost(nums, k) - atMost(nums, k - 1);
}

function atMost(nums, k) {
  let odds = 0;
  let subarrays = 0;

  //* Sliding Window
  let start = 0;
  let end = 0;

  while (end < nums.length) {
    //* Check if the LSB is set, if so, it is an odd number
    if (nums[end] & 1) odds++;

    while (odds > k) {
      //* Remove the leftmost element
      //* If it is an odd, it'll be 1, otherwise 0
      odds -= nums[start++] & 1;
    }

    //* Every valid subarray within this range
    subarrays += end - start + 1;
    end++;
  }

  return subarrays;
}

console.log(countNumberOfNiceSubarrays([2, 2, 2, 1], 1)); //* 4
console.log(countNumberOfNiceSubarrays([1, 1, 2, 1, 1], 3)); //* 2
console.log(countNumberOfNiceSubarrays([2, 4, 6], 1)); //* 0
console.log(countNumberOfNiceSubarrays([2, 2, 2, 1, 2, 2, 1, 2, 2, 2], 2)); //* 16
console.log(countNumberOfNiceSubarrays([1, 1, 1, 1, 1], 4)); //* 2
console.log(countNumberOfNiceSubarrays([1, 1, 2, 3], 2)); //* 3
console.log(countNumberOfNiceSubarrays([1], 1)); //* 1

//* Time: O(n) - It takes O(n) to complete "atMost"
//* We call atMost twice, so O(2n) simplifies to O(n)

//* Space: O(1) - We only use constant space variables, so the space usage does not scale with input size
