//* Instead of trying every possible triplet
//* We can track the two smallest numbers we have found thus far
//* Then, simply try to find a value that is larger than the second largest
//* if nums[i] < nums[j] < nums[k]
//*     - Then the relationship is transitive
//*     - If nums[k] > nums[j], then it is ALSO greater than nums[i]. nums[i] is already < nums[j]
function increasingTriplet(nums) {
  //* There cannot possibly be a triplet
  if (nums.length < 3) return false;

  let smallest = Infinity;
  let secondSmallest = Infinity;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] <= smallest) {
      smallest = nums[i];
    } else if (nums[i] <= secondSmallest) {
      secondSmallest = nums[i];
    } else {
      //* smallest < secondSmallest < nums[i]
      return true;
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

//* Time: O(n) - We iterate through the entire array, so the time taken scales with the input size

//* Space: O(1) - The memory usage remains constant regardless of input size
