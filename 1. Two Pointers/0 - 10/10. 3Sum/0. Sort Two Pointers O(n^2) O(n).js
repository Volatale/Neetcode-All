//* We need to return all of the triplets of nums
//*     - Specifically, triplets whose elements sum to exactly 0
//*       i !== j, j !== k and nums[i] + nums[j] + nums[k] === 0
//* We also cannot include DUPLICATE triplets, so this is an edge case
//* For example, take [-1, -1, 0, 1]
//*     - [-1, 0, 1] = 0
//!     - [-1, 0, 1] = 0
//*         - This is invalid because this triplet has already been counted
//* We can sort the array to ensure the array exhibits monotonicity
//* Then, apply a two pointer approach to find triplets
//* Sum = nums[i] + nums[j] + nums[k]
//*     - If sum > 0, right--
//*     - If sum < 0, left++
//* Otherwise, we found a triplet, because sum == 0
//* To handle the duplicate triplets case, we can simply check for equal adjacent elements
//*     - Simply move the pointers to the LAST duplicate in each duplicate block
function threeSum(nums) {
  //* Sort the array to ensure the array exhibits monotonicity
  nums.sort((a, b) => a - b);

  const triplets = [];

  for (let i = 0; i < nums.length - 2; i++) {
    //* Skip the duplicate i-th element
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    //* Two Pointers used to find the triplets
    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum < 0) {
        left++;
      } else if (sum > 0) {
        right--;
      } else {
        //* Found a valid triplet
        triplets.push([nums[i], nums[left], nums[right]]);

        //* Handle the duplicates case (move to the final duplicate for each element)
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;

        //* Move away from the last duplicate
        left++;
        right--;
      }
    }
  }

  return triplets;
}

console.log(threeSum([-1, 0, 1, 2, -1, -4])); //* [[-1,-1,2],[-1,0,1]]
console.log(threeSum([0, 1, 1])); //* []
console.log(threeSum([0, 0, 0])); //* [[0, 0, 0]]

//* Time: O(n log n) - The time taken scales with the time needed to sort the arrays
//* Then, for each element "i", it takes O(n) to find a triplet

//* Space: O(n) - On average, the results array's size scales with the input size
//* Additionally sorting the array uses O(sort) memory
