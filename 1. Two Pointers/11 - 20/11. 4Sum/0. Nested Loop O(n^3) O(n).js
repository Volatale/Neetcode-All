//* We need to return an array of all of the UNIQUE quadruplets such that:
//*     - 0 <= a, b, c, d < n
//*     - a, b, c and d are all distinct
//!         - In other words, we can't reuse the same index for the same quadruplet
//*     - nums[a] + nums[b] + nums[c] + nums[d] == target
//* If we sort the array, we can eventually apply a two pointer approach to find quadruplets
//* Since the array is in monotonically decreasing order
//*     - Incrementing left will increase the sum
//*     - While decrementing right will decrease the sum
//* Naturally, to find quadruplets, we need to use three nested loops
//*     - One for nums[a], one for nums[b] and the last for both c and d
//! Sum = nums[a] + nums[b] + nums[c] + nums[d]
//*     - If sum > target, decrement the right pointer to reduce the sum
//*     - If sum < target, increment the left pointer to increase the sum
//*     - Otherwise, we found a valid quadruplet
//* In order to handle duplicate quadruplets, do the following after finding a valid quadruplet
//*     - While nums[left] === nums[left + 1], left++ (to move to the final duplicate for nums[left])
//*         - Do the same for nums[right], but the condition becomes nums[right] === nums[right - 1]
//*     - Then, simply increment left and decrement right to move away from the duplicates
//!         - This ensures we only ever count unique quadruplets
function fourSum(nums, target) {
  //* There are no valid quadruplets
  if (nums.length < 4) return [];

  //* Ensure the array exhibits monotonic property so we can use two pointers
  nums.sort((a, b) => a - b);

  const quadruplets = [];

  for (let a = 0; a < nums.length - 3; a++) {
    //* Skip any adjacent identical "a" that was just used
    if (a > 0 && nums[a] === nums[a - 1]) continue;

    for (let b = a + 1; b < nums.length - 2; b++) {
      //* Skip any adjacent identical "b" that was just used
      if (b > a + 1 && nums[b] === nums[b - 1]) continue;

      //* Two pointers used to find the values for `c` and `d`
      let c = b + 1;
      let d = nums.length - 1;

      while (c < d) {
        //* "a" + "b" + "c" + "d"
        const sum = nums[a] + nums[b] + nums[c] + nums[d];

        if (sum < target) {
          c++;
        } else if (sum > target) {
          d--;
        } else {
          quadruplets.push([nums[a], nums[b], nums[c], nums[d]]);

          //* Handle the duplicates case (move to the final duplicate for each element)
          while (c < d && nums[c] === nums[c + 1]) c++;
          while (c < d && nums[d] === nums[d - 1]) d--;

          //* Move away from the last duplicate
          c++;
          d--;
        }
      }
    }
  }

  return quadruplets;
}

console.log(fourSum([1, 0, -1, 0, -2, 2], 0)); //* [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
console.log(fourSum([2, 2, 2, 2, 2], 8)); //* [[2, 2, 2, 2]]
console.log(fourSum([1])); //* []

//* Time: O(n^3) - We have three nested loops that all scale with the input size (n)
//* It also takes O(n log n) to sort the input on average

//* Space: O(n) - The quadruplet's size scales with the size of the input on average
