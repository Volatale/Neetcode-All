//* The logic is the exact same as 3Sum, but with another loop
//* Its a + b + c + d instead of a + b + c
function fourSums(nums, target) {
  //* Sort so we can use two pointers logic
  nums.sort((a, b) => a - b);

  const results = [];

  //* For value "a"
  for (let i = 0; i < nums.length - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    //* For value "b"
    for (let j = i + 1; j < nums.length - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;

      //* Two Pointers for value "c" & "d"
      let left = j + 1;
      let right = nums.length - 1;

      while (left < right) {
        //* a + b + c + d
        const sum = nums[i] + nums[j] + nums[left] + nums[right];

        if (sum < target) {
          left++;
        } else if (sum > target) {
          right--;
        } else {
          //* Found a match
          results.push([nums[i], nums[j], nums[left], nums[right]]);

          //* Move to the last duplicate in both duplicates
          while (left < right && nums[left] === nums[left + 1]) left++;
          while (right > left && nums[right] === nums[right - 1]) right--;

          //* Then move OFF the last duplicate
          left++;
          right--;
        }
      }
    }
  }

  return results;
}

console.log(fourSums([1, 0, -1, 0, -2, 2], 0));
console.log(fourSums([2, 2, 2, 2, 2], 8));

//* Time: O(n^3) - We have three nested loops, all of which scale with "n"
//* It takes O(n log n) to sort the input, but that is dominated by the O(n^2)

//* Space: O(n) - The results array scales with the number of elements on average
