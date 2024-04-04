//* Use a hashmap to store the "remainder" that occurred at an index
//* Start with {0 : -1} because if nums[0] is a multiple of k, we would immediately return true which shouldn't happen
//* Track the prefix sum up to the current index
//* For each index, check if "sum" is a multiple of "k"
//* If "map" has an occurrence, check if the subarray is of length 2
//* i (current index) - last occurrence > 1? Then it is a subarray of length 2 or more
//* If we have no occurrence, set remainder as the key, and i as the value
function continuousSubarray(nums, k) {
  const map = new Map([[0, -1]]);

  let sum = 0;

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];

    const remainder = sum % k;

    if (!map.has(remainder)) {
      map.set(remainder, i);
    } else if (i - map.get(remainder) > 1) {
      return true; //* Subarray is a multiple of k, and is at least 2 length
    }
  }

  return false;
}

console.log(continuousSubarray([3, 4, 5, 21], 5)); //* True
console.log(continuousSubarray([23, 2, 4, 6, 7], 6)); //* True
console.log(continuousSubarray([23, 2, 6, 4, 7], 6)); //* True
console.log(continuousSubarray([23, 2, 6, 4, 7], 13)); //* False
console.log(continuousSubarray([24, 2, 6, 4, 7], 13)); //* True. 24 should not return true immediately, subarray of length 1
