//* Even elements are partitioned on the left
//* Odd elements are partitioned on the right
function partitionEvenAndOdds(nums) {
  let left = 0; //* Left searches for ODDS
  let right = nums.length - 1; //* Right searches for EVENS

  while (left < right) {
    while (left < right && nums[left] % 2 === 0) left++;
    while (left < right && nums[right] % 2 === 1) right--;

    if (left < right) {
      [nums[left], nums[right]] = [nums[right], nums[left]];

      left++;
      right--;
    }
  }

  return nums;
}

console.log(partitionEvenAndOdds([2, 5, 10, 7, 8, 9, 4, 5]));
console.log(partitionEvenAndOdds([1, 2]));
console.log(partitionEvenAndOdds([10, 3, 3, 10]));

//* Time: O(n)

//* Space: O(1)
