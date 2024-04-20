//* We are essentially keeping a k-sized window worth of elements within the set
//* The set allows us to have Θ(1) lookup time - the input size is not constrained, so using an array is worse
//* If there are more than "k" elements within the set at the end of each iteration, we drop the i-kth element
function containsDuplicateII(nums, k) {
  const set = new Set(); //* Θ(1) lookup

  for (let i = 0; i < nums.length; i++) {
    if (set.has(nums[i])) return true;

    set.add(nums[i]);

    //* Delete the i-kth element from the set so we can retain O(k) space
    if (set.size > k) set.delete(nums[i - k]);
  }

  return false;
}

console.log(containsDuplicateII([1, 2, 3, 1], 3)); //* True
console.log(containsDuplicateII([1, 0, 1, 1], 1)); //* True
console.log(containsDuplicateII([1, 2, 3, 1, 2, 3], 2)); //* False

//* Time: O(n) - The time taken by the loop scales with the size of the input

//* Space: O(k) - There will be, at most, "k + 1" elements within the set at once
//* If > k elements exist within the set at once, we delete the i-kth element
