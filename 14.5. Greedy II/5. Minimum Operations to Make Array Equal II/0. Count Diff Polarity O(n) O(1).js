//* We need to balance the number of positive and negative differences
//*     - nums1[i] - nums2[j] gives us the difference in value
//* The difference must be divisible by "k", otherwise it is not possible to make nums2[i]
//* The formula "diff / k" gives us the number of operations it'll take to have nums1[i] be equal to nums2[j]
//*     - If diff is negative, we force it to be positive
//*         - Otherwise we will be decrementing from the count of negative difference
//! The main goal is to:
//*     - Count the number of increments we have to do
//*     - Count the number of decrements we have to do
//*         - If these numbers are not balanced, it is not possible to make nums1 equal nums2
function minOperations(nums1, nums2, k) {
  //* K === 0, we can't make any increments or decrements
  if (k === 0) return nums1.every((num, i) => num === nums2[i]) ? 0 : -1;

  //* Try to balance the number of positive and negative differences
  let posDiff = 0;
  let negDiff = 0;

  for (let i = 0; i < nums1.length; i++) {
    const diff = nums1[i] - nums2[i];

    //* The difference must be divisible by "k"
    if (diff % k !== 0) {
      return -1;
    }

    if (diff > 0) {
      posDiff += diff / k;
    } else if (diff < 0) {
      negDiff += -diff / k; //* Make the diff positive again
    }
  }

  //* We need to balance the number of positive and negative differences
  return posDiff === negDiff ? posDiff : -1;
}

console.log(minOperations([1, 2, 3, 4], [1, 2, 3, 4], 0)); //* 0
console.log(minOperations([4, 3, 1, 4], [1, 3, 7, 1], 3)); //* 2
console.log(minOperations([1, 2, 7, 4], [1, 4, 3, 4], 2)); //* //* -1

//* Time: O(n) - Regardless of whether "k" is 0 or not, we have to iterate through the entire array
//* So the time taken scales proportionally with the input size

//* Space: O(1) - We use a constant amount of space; every() just iterates through the array
