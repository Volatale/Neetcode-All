//* Same as regular Binary Search, except you keep decrementing mid
function binarySearch(nums, target) {
  //* Array is SORTED, so this is our search space
  let left = 0;
  let right = nums.length - 1;

  //* In cases of only 1 element we still want to search
  while (left <= right) {
    //* Divides by 2, truncates decimal, rounds down
    let mid = left + ((right - left) >> 1);

    if (nums[mid] === target) {
      //* Move to the first duplicate
      while (mid > 0 && nums[mid - 1] === target) {
        mid--;
      }

      return mid;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return -1;
}

console.log(binarySearch([1, 2, 2, 3, 4, 5], 2)); //* 1
console.log(binarySearch([0, 0, 0, 1, 2, 2, 3, 4, 5], 0)); //* 0
console.log(binarySearch([1, 2, 3], 3)); //* 2
console.log(binarySearch([1, 1, 1, 1, 1], 1)); //* 0
console.log(binarySearch([4], 4)); //* 0
console.log(binarySearch([4, 10], 3)); //* -1
console.log(binarySearch([10, 11, 12, 13, 90], 99)); //* -1

//* Time: O(log n) - We halve the search space each iteration of the outer while loop
//* In cases where the entire array is the same ([1, 1, 1, 1, 1]), it is STILL O(log n)
//* Mid would be 2, then we'll decrement twice
//* So the time complexity technically degrades to O(n) levels, but we still halve at each step
