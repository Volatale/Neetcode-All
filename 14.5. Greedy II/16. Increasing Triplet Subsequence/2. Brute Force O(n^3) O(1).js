//* Try every possible triplet
//* We need to use a triple nested for loop
function increasingTriplet(nums) {
  //* There cannot possibly be a triplet
  if (nums.length < 3) return false;

  for (let i = 0; i < nums.length - 2; i++) {
    for (let j = i + 1; j < nums.length - 1; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        //* Found a valid triplet
        if (nums[i] < nums[j] && nums[j] < nums[k]) return true;
      }
    }
  }

  //* We didn't find a valid triplet
  return false;
}

console.log(increasingTriplet([1, 2, 3, 4, 5])); //* True (any indices)
console.log(increasingTriplet([-1, 5, 10])); //* True (0, 1, 2)
console.log(increasingTriplet([5, 4, 3, 2, 1])); //* False
console.log(increasingTriplet([2, 1, 5, 0, 4, 7])); //* True (1, 2, 5)
console.log(increasingTriplet([1, 0, 2, 1, 3, 0])); //* True (0, 2, 4)

//* Time: O(n^3) - We have three nested for loops that all depend on the input size
//* Checking for triplets takes O(1)

//* Space: O(1) - The memory usage remains constant regardless of input size
