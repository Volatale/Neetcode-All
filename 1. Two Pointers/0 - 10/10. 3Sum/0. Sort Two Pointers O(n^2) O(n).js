//* Sort the input so we can use the Two Sum II Logic
//* We technically need 3 pointers, but the 2nd and 3rd will change
//* We have "left" and "right"
//* We know nums[left] < nums[right], so if sum < 0 increment left
//* Else if sum > 0, decrement right
//* Otherwise, the numbers sum to 0, so we found a new match
//* After the match, we need to ensure that we avoid duplicates
//* So increment left and decrement right until both are "safe"
function threeSum(nums) {
  //* If the array is sorted, we can use two pointers
  nums.sort((a, b) => a - b);

  const results = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    //* Two Pointers
    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum < 0) {
        left++;
      } else if (sum > 0) {
        right--;
      } else {
        results.push([nums[i], nums[left], nums[right]]); //* Found a match

        //* Move to the last duplicate in both duplicates
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (right > left && nums[right] === nums[right - 1]) right--;

        //* Then move OFF the last duplicate
        left++;
        right--;
      }
    }
  }

  return results;
}

console.log(threeSum([-1, 0, 1, 2, -1, -4])); //* [[-1,-1,2],[-1,0,1]]
console.log(threeSum([0, 1, 1])); //* []
console.log(threeSum([0, 0, 0])); //* [[0, 0, 0]]

//* Time: O(n^2) - We have to sort the input array, so that is O(n log n) already
//* Then we have nested loops. Both loops scale with "n" (nums.length)

//* Space: O(n) - The results array will scale in size depending on the number of elements that add up to 0
//* Then, we have the sorting, which can be O(n) space if it is merge sort
