//* Use an object/map to store the indices of each number in arr
//* Key = arr[i], value = i (the current index)
//* Get the complement of the target vs the current element (arr[i])
//* If complement exists (as a key) in the obj
//* Then we have found our pair: get the position from the obj by accessing the cache, then also insert the current index
function twoSum(arr, target) {
  const obj = {};

  for (let i = 0; i < arr.length; i++) {
    const need = target - arr[i];

    if (need in obj) return [obj[need], i];

    obj[arr[i]] = i; //* "arr[i] is stored at current index"
  }
}

console.log(twoSum([2, 7, 11, 15], 9));
console.log(twoSum([0, 5, 7, 15], 7));

//* Time: O(n) - The time taken in the worst case scales with the size of the input
//* The indices we need could be at the very end of the array, which means we have to iterate through the whole array

//* Space: O(n) - The number of keys we store in the obj scales with the size of the input
//* If the keys we need exist at the very end of the array, we need to store all of the prior keys within the obj
