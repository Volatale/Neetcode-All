//* We need to find two numbers that sum up to "target"
//* Specifically, we need to return the indices of both elements +1
//*     - So if index 0 and 1 are the indices, we return [1, 2]
//* The array is already sorted in non-decreasing order
//* Thus, we can say the array exhibits monotonicity
//* If we forgo the fact that the array is sorted, we can simply use two nested loops
function twoSum(numbers, target) {
  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === target) {
        return [i + 1, j + 1];
      }
    }
  }
}

console.log(twoSum([2, 7, 11, 15], 9)); //* [1, 2]
console.log(twoSum([2, 3, 4], 6)); //* [1, 3]
console.log(twoSum([-1, 0], -1)); //* [1, 2]

//* Time: O(n^2) - The nested loops both scale with the size of the input (numbers.length)
//* So the time taken scales quadratically

//* Space: O(1) - The memory usage remains constant regardless of input size
