//* Add every element to a set for fast lookup
//* Track the length of the longest sequence
//* Iterate through each element in set (removes duplicates) to check for sequences
//* For each number, check if it is the start of a sequence by subtracting 1 from it and checking the set
//*     - If num - 1 does NOT exist in the set, it is the start of a sequence
//* While the next number exists in the set, keep looping (increment length)
//*     - If num + length exists in the set, it is part of the sequence
function longestConsecutiveSequence(nums) {
  const set = new Set(nums);

  let longest = 0;

  for (let num of set) {
    //* Check if this number is the start of a sequence (no left neighbor)
    if (!set.has(num - 1)) {
      let length = 0;

      //* Check is the next number in the sequence exists in the set (otherwise the sequence breaks)
      while (set.has(num + length)) {
        length++;
      }

      longest = Math.max(longest, length);
    }
  }

  return longest;
}

console.log(longestConsecutiveSequence([1, 2, 3, 4, 5])); // 5
console.log(longestConsecutiveSequence([100, 4, 200, 1, 3, 2])); //* 4
console.log(longestConsecutiveSequence([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])); //* 9
console.log(longestConsecutiveSequence([13, 10, 14, 5, 15, 4, 3, 11, 12])); //* 6

//* Time: O(n) - The time taken scales linearly with the size of the input
//* It takes O(n) time to initialize the set
//* Then it takes O(n) time to iterate through every element in nums
//* There is a nested while loop, but at worst, each element will be processed twice, so its O(2n) -> O(n)

//* Space: O(n) - We create a set that scales proportionally with the length of our input
