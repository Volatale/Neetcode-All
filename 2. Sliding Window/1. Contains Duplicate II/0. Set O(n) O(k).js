//* Given an int[] `nums`, and an int `k`, we need to find a duplicate such that:
//*     - i !== j
//*     - nums[i] === nums[j]
//*     - abs(i - j) <= k
//* Essentially, there cannot be more than `k` elements between the two indices
//*     - `j` is guaranteed to be larger than `i`, so we can do something like "arr[n - k] <= k"
//* Since the elements that are outside of this range cannot be considered, we can "eliminate" them from consideration
//* Naturally, maps/sets are applicable to problems that involve detecting duplicates
//* All we have to do is track "current" elements (that are within the valid range) and perform membership tests
//* Elements that are no longer within the range can be removed from the set
//! In other words, we maintain a sliding window of elements, and remove the invalid elements
function containsNearbyDuplicate(nums, k) {
  const set = new Set();

  for (let i = 0; i < nums.length; i++) {
    //* The array contains a nearby duplicate
    if (set.has(nums[i])) return true;

    set.add(nums[i]);

    //* Delete the elements that will fall out of the valid range
    if (set.size > k) set.delete(nums[i - k]);
  }

  //* There are no nearby duplicates
  return false;
}

console.log(containsDuplicateII([1, 2, 3, 1], 3)); //* True
console.log(containsDuplicateII([1, 0, 1, 1], 1)); //* True
console.log(containsDuplicateII([1, 2, 3, 1, 2, 3], 2)); //* False

//* Time: O(n) - The time taken scales with the input size

//* Space: O(k) - The memory usage scales with `k` (the set's size never exceeds k)
