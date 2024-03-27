//* Just soprt the array
function sortColors(nums) {
  return nums.sort((a, b) => a - b);
}

console.log(sortColors([2, 0, 2, 1, 1, 0, 1]));
console.log(sortColors([2, 1, 0]));
console.log(sortColors([1, 1, 2, 0, 0, 2]));

//* Time: O(n log n) - It takes O(n log n) time to sort the array using something like merge sort or heap sort

//* Space: O(n) or O(1) - If the .sort algorithm uses merge sort, its O(n) space, and O(1) if it uses heap sort
