//* Use an object/map to store the indices of each number in arr
//* Key = arr[i], value = i (the current index)
//* Get the complement of the target vs the current element (arr[i])
//* If complement exists (as a key) in the obj
//* Then we have found our pair: get the position from the obj by accessing the cache, then also insert the current index
function twoSum(arr, target) {
  for (let i = 0; i < arr.length - 1; i++) {
    const complement = arr[i];

    for (let j = i + 1; j < arr.length; j++) {
      if (complement + arr[j] === target) return [i, j];
    }
  }
}

console.log(twoSum([2, 7, 11, 15], 9));
console.log(twoSum([0, 5, 7, 15], 7));

//* Time: O(n^2) - We have two nested for loops that both depend on the size of the input

//* Space: O(1) - We don't use any extra auxilary space
