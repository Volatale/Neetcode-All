//* Sort the array so the closest to x elements are on the left
//* Then take only the first "k" elements
//* Sort again to ensure the the elements are in order (that is what the question wants)
function findKClosestElements(arr, k, x) {
  //* Sort based on the distance from x
  arr.sort((a, b) => Math.abs(a - x) - Math.abs(b - x));

  //* Grab only the first k elements (excluding k itself)
  arr = arr.splice(0, k);

  //* Now sort again
  return arr.sort((a, b) => a - b);
}

console.log(findKClosestElements([1, 2, 3, 4, 5], 4, 3)); //* [1, 2, 3, 4]
console.log(findKClosestElements([1, 2, 3, 4, 5], 4, -1)); //* [1, 2, 3, 4]
console.log(findKClosestElements([2, 4, 6], 2, 4)); //* [2, 4]

//* Time: O(n log n + k log k) - It takes O(n log n) to sort the first time
//* We sort all "n" elements, then it takes O(k) time to splice the array
//* Finally, it takes O(k log k) time to sort the remaining elements

//* Space: O(k) - If we ignore the space used by the inbuilt sorting methods, the space is O(k)
