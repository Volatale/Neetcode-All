//* We can't add any values to the array, so it should be capped at "n" length
//* We also don't care about any negative values, so we should set them to "0" for simplicity
//* Use cyclic sort to sort the smaller values to partition the smaller values (that are NOT 0) to the left
//* Then, iterate one more time to find the first [i] that is not in order
//* nums[0] should = i + 1 (0 + 1) = 1
//* nums[1] should = i + 1 (1 + 1) = 2
//* In cases where we have every value, like: [1, 2, 3, 4]
//* We need to return 5, so that is why we have the condition i <= n
function firstMissingPositive(nums) {
  const n = nums.length;

  //* Perform Cyclic Sort
  for (let i = 0; i < n; i++) {
    if (nums[i] < 0) nums[i] = 0; //* We don't care about nums < 0

    let num = nums[i];

    //* Ignore 0s, ignore [i] > n. Loop while out of place
    while (num > 0 && num <= n && nums[num - 1] !== num) {
      [nums[num - 1], nums[i]] = [nums[i], nums[num - 1]];
      num = nums[i]; //* In case this value is still out of place
    }
  }

  //* Find first missing positive
  for (let i = 0; i <= n; i++) {
    if (nums[i] !== i + 1) return i + 1;
  }
}

console.log(firstMissingPositive([6, 4, 5, 1, 2])); //* 3
console.log(firstMissingPositive([4, 3, 2])); //* 1
console.log(firstMissingPositive([1, 2, 3, 4])); //* 5
console.log(firstMissingPositive([3, 2, 1])); //* 4
console.log(firstMissingPositive([-1])); //* 1
console.log(firstMissingPositive([3, 4, 5, 1, 2])); //* 6
console.log(firstMissingPositive([3, 4, 5, 1, 2])); //* 6
console.log(firstMissingPositive([5, 4, 7, 9, 3])); //* 1
console.log(firstMissingPositive([-1, -1, -1])); //* 1

//* Time: O(n) - We have three loops and a nested while loop
//* For loop 1 scales based on n (nums.length)
//* The nested while loop does not scale with the size of the input
//* The 3rd for loop scales up to "n"

//* Space: O(1) - We overwrite values in the input array, so no additional space is used
