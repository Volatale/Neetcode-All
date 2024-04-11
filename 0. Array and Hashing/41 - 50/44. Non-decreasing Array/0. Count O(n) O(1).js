//* Track the number of changes we need to make
//* If that number is ever 2 or greater, we failed
//* If i - 2 < 0, you would go out of bounds, so you CANNOT have [i - 2], so we are safe
//* The nums[i - 2] check is to guarantee that setting the prev to curr won't hurt the -> chances
//* Otherwise, just set the current element to the previous

//* [3, 4, 2, 3]
//* If we get to 2, we can either change "4" to "2"
//* Or "2" to "4"
//* If we do the former, we get [3, 2, 2, 3] which does not help
//* So if we choose the latter, we end up with [3, 4, 4, 3]
//* Then, we can hope that NEXT element is in order
//* Whereas the other choice would have a higher chance of failure
function nonDecreasingArray(nums) {
  let invalidCount = 0;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < nums[i - 1]) {
      invalidCount++;

      if (invalidCount > 1) return false;

      //* Adjust current element to make it non-decreasing
      if (i - 2 < 0 || nums[i] >= nums[i - 2]) {
        nums[i - 1] = nums[i]; //*
      } else {
        nums[i] = nums[i - 1];
      }
    }
  }

  return true;
}

console.log(nonDecreasingArray([4, 2, 3])); //* True
console.log(nonDecreasingArray([3, 4, 2, 3])); //* False (changing 2 means the last 3 is still smaller)
console.log(nonDecreasingArray([4, 2, 1])); //* False
console.log(nonDecreasingArray([4])); //* True
console.log(nonDecreasingArray([7, 7, 7])); //* True (can be equal)
console.log(nonDecreasingArray([9, 8, 7])); //* False
console.log(nonDecreasingArray([1, 1, -1])); //* True
console.log(nonDecreasingArray([-1, -5, -1])); //* True

//* Time: O(n) - It takes O(n) time to iterate through the whole array
//* Any operations done within the loop are constant time

//* Space: O(1) - We use no extra space that scales with the input size
