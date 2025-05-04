//* The goal is to find the "pivot" index in the array
//*     - In other words, we have an array nums
//*     - And we want to find two subarrays [0:i], [i+1:n] such that they have the same sum
//* The key here is that the current element nums[i] is NOT included in either subarray sum
//*     - So we can "globally" track "leftSum" ([0:i])
//*     - And "locally" track "rightSum" ([i+1:n])
//* Iterate from left to right, and within each iteration, calculate the right sum
//*     - Use a nested loop that starts at i + 1 and get the cumulative sum of all those elements
//* Then, check if leftSum === rightSum, if that IS the case, return "i" (the pivot index)
//* Otherwise, add nums[i] to "leftSum" (because this element is now a part of [0:i])
function pivotIndex(nums) {
  //* There are no elements to the left of index 0
  let leftSum = 0;

  for (let i = 0; i < nums.length; i++) {
    let rightSum = 0;

    //* Calculate the sum of the subarray [j:n]
    for (let j = i + 1; j < nums.length; j++) {
      rightSum += nums[j];
    }

    //* We have found the pivot index
    if (leftSum === rightSum) {
      return i;
    }

    //* The subarray [0:i] now includes the current value
    leftSum += nums[i];
  }

  //* There is no pivot index
  return -1;
}

console.log(pivotIndex([1, 7, 3, 6, 5, 6])); //* 3
console.log(pivotIndex([1, 2, 3])); //* -1
console.log(pivotIndex([-1])); //* 0
console.log(pivotIndex([2, 1, -1])); //* 0

//* Time: O(n^2) - In the worst case, there are (n * (n + 1) / 2) loop iterations

//* Space: O(1) - The memory usage remains constant since we are simply tracking prefix sums
