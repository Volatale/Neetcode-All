function longestConsecutiveSequence(nums) {
  nums.sort((a, b) => a - b);

  let longest = 0;
  let length = 1;

  for (let i = 1; i < nums.length; i++) {
    //* Check if the current element is 1 greater than the previous (if it is, it is in sequence)
    if (nums[i] === nums[i - 1] + 1) {
      length++;
    } else if (nums[i] !== nums[i - 1]) {
      longest = Math.max(longest, length);
      length = 1;
    }
  }

  longest = Math.max(longest, length);

  return longest;
}

console.log(longestConsecutiveSequence([1, 2, 3, 4, 5])); // 5
console.log(longestConsecutiveSequence([100, 4, 200, 1, 3, 2])); //* 4
console.log(longestConsecutiveSequence([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])); //* 9
console.log(longestConsecutiveSequence([13, 10, 14, 5, 15, 4, 3, 11, 12])); //* 6

//* Time: O(n log n) - It takes O(n log n) time to sort, assuming the inbuilt function uses merge sort etc
//* Then it takes O(n) to iterate over the entire list

//* Space: O(n) - If we use merge sort, the space usage is O(n)
//* If we assume that it is using Heap Sort, then it'd be O(1)
