//* We are given an integer array sorted in NON-DECREASING order
//* The goal is to return an array of the squares of each number sorted in non-decreasing order
//* We can simply apply .map to the input array and square each number
//*     - This will give us a new array
//* Then, we can sort the new array
function sortedSquares(nums) {
  return nums.map((num) => num * num).sort((a, b) => a - b);
}

//* Time: O(n log n) - The .map method takes O(n) since it does "n" iterations (where n is the input size)
//* Then, we sort the array, which will likely use an algorithm in the range of O(n log n) a (merge, quick, heap) sort

//* Space: O(n) - The map method returns a new array of `n` size
//* Additionally, if merge sort is used under the hood, that also uses O(n) memory
