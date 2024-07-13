//* Square each element
//* Sort the element before returning
function squaresOfSortedArray(nums) {
  return nums.map((val) => val * val).sort((a, b) => a - b);
}

console.log(squaresOfSortedArray([-4, -1, 0, 3, 10]));
console.log(squaresOfSortedArray([-7, -3, 2, 3, 11]));

//* Time: O(n log n)
//* It takes O(n) time to iterate over the entire input squaring everything
//* Then it takes O(n log n) to sort the array (depends on the sorting algorithm used)

//* Space: O(n) - We ultimately create a new array of "n" length (to avoid modifying the input)
//* Then, depending on the sorting algorithm used, merge sort uses O(n) space, or quick sort is O(log n) space
