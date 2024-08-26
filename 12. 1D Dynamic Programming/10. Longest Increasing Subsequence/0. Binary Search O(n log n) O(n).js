//* There are portions of the array that are monotonically increasing
//*     - Binary Search relies on monotonicity
//* For every element in the input array
//*     - Find the FIRST (leftmost) index in the SUBSEQUENCE that the element should go
//*     - In other words, find its SUPPOSED position
//* If an element already exists at that position, replace it with the "new" element
//* Else, the element is greater than everything in the subsequence
//*     - So push it to the back
function lengthOfLIS(nums) {
  const subsequence = [];

  //* Find index where current element can be placed (in subsequence)
  for (let i = 0; i < nums.length; i++) {
    const index = lowerBound(subsequence, nums[i]);

    if (index < subsequence.length) {
      //* Replace the element at "index"
      subsequence[index] = nums[i];
    } else {
      //* Append the element; it can't be placed at anywhere else
      subsequence.push(nums[i]);
    }
  }

  return subsequence.length;
}

//* Finds the FIRST index of target in nums, or where target WOULD be placed
function lowerBound(nums, target) {
  let left = 0;
  let right = nums.length;

  while (left < right) {
    let mid = left + ((right - left) >> 1);

    if (nums[mid] >= target) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  //* Left-most position where "target" can be placed
  return left;
}

console.log(lengthOfLIS([1, 2, 3, -4, -1, 5]));
console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])); //* 4
console.log(lengthOfLIS([0, 1, 0, 3, 2, 3])); //* 4
console.log(lengthOfLIS([1, 3, -2, -1, 4])); //* 3
console.log(lengthOfLIS([7, 7, 7, 7, 7, 7, 7])); //* 1
console.log(lengthOfLIS([1, 2, -1, -3, 3, 2])); //* 3
console.log(lengthOfLIS([1, 2, 3, 4])); //* 4
console.log(lengthOfLIS([1])); //* 1

//* Time: O(n log n) - Binary search takes O(log n) and we do this "n" times in the worst case

//* Space: O(n) - The subsequence's size scales with the length of the input
//* If the entire input is an increasing subsequence, the subsequence is the entire input array
