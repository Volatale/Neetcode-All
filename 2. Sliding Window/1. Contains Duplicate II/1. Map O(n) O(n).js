//* Track the last occurrence of nums[i]
//* Check if it occurred <= k indexes away from the last
function containsDuplicateII(nums, k) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i])) {
      const lastIndex = map.get(nums[i]);

      if (Math.abs(lastIndex - i) <= k) return true;
    }

    //* Add an occurrence to the map
    map.set(nums[i], i);
  }

  return false;
}

console.log(containsDuplicateII([1, 2, 3, 1], 3)); //* True
console.log(containsDuplicateII([1, 0, 1, 1], 1)); //* True
console.log(containsDuplicateII([1, 2, 3, 1, 2, 3], 2)); //* False

//* Time: O(n) - The time taken by the loop scales with the size of the input

//* Space: O(n) - In the worst case, we add every element to the map
