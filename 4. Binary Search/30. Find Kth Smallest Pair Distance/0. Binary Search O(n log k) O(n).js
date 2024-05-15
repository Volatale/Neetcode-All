//* We want to find the kth smallest distance (difference)
//* We are given an array to find distances with
//* In order to MINIMIZE the distance between each element, we sort
//* Since we have a sorted array now, the minimum distance we can have is 0
//* The maximum is the difference between the largest and smallest elements
//* We can do a binary search on the range of differences we can have
//* Take "mid" to represent the maxDistance that a pair can have
//* Then we can use a sliding window to count the number of pairs we can create
function findKthSmallestPairDistance(nums, k) {
  function canMakeKPairs(maxDistance) {
    //* Sliding Window
    let start = 0;
    let end = 0;

    let pairs = 0;

    while (end < nums.length) {
      //* The distance is too large, breaks the constraint
      //* We know numbers -> are GREATER, so the distance will decrease monotonically
      while (nums[end] - nums[start] > maxDistance) {
        start++;
      }

      //* 1 - 0 = 1, so 1 pair etc, 2 - 0 = 2, so 2 pairs
      pairs += end - start;
      end++;
    }

    //* Whether or not we could make at least "k" pairs with this constraint
    return pairs >= k;
  }

  //* Sort so the distance between each element is MINIMIZED
  nums.sort((a, b) => a - b);

  //* The search space is the MINIMUM and MAXIMUM difference between elements
  //* Take [4, 7, 9], the minimum would be 4 - 4, and the maximum is 9 - 4
  let left = 0;
  let right = nums[nums.length - 1] - nums[0];

  while (left < right) {
    //* Mid represents the maxDistance allowed per pair
    let mid = left + ((right - left) >> 1);

    //* Whether or not we can make "k" pairs with this maxDistance
    if (canMakeKPairs(mid)) {
      right = mid; //* We want the kth SMALLEST, so we want to NARROW the values on the right
    } else {
      left = mid + 1; //* Unable to make >= k pairs using this constraint
    }
  }

  //* The kth smallest
  return left;
}

console.log(findKthSmallestPairDistance([1, 3, 1], 1)); //* 0
console.log(findKthSmallestPairDistance([10, 5], 0)); //* 0
console.log(findKthSmallestPairDistance([1, 1, 1], 2)); //* 0
console.log(findKthSmallestPairDistance([1, 6, 1], 2)); //* 5
console.log(findKthSmallestPairDistance([1, 8, 2, 4], 3)); //* 3

//* Time: O(n log k) - Where "k" is the difference between the max and min element in the array
//* We do a binary search O(log k), then within each iteration, we call a function
//* That function does an O(n) iteration through the nums array

//* Space: O(n) or O(1) - If we count the space usage from the sort (probably merge sort)
//* The space usage is O(n), but if not, then we use no extra space that scales with "n"
