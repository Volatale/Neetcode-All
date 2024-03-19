//* Split the array in half recursively (divide and conquer) - O(log n)
//* Find the midpoint in each call
//* If the array length is ever <= 1, return nums (because all the recursive calls are done)
function mergeSort(nums) {
  if (nums.length <= 1) return nums;

  const leftArray = [];
  const rightArray = [];

  let left = 0;
  let right = nums.length - 1;

  let mid = left + Math.floor((right - left) / 2);

  for (let i = 0; i <= mid; i++) {
    leftArray.push(nums[i]);
  }

  for (let i = mid + 1; i < nums.length; i++) {
    rightArray.push(nums[i]);
  }

  const sortedLeft = mergeSort(leftArray);
  const sortedRight = mergeSort(rightArray);

  return merge(sortedLeft, sortedRight);
}

//* Merge the arrays - O(n)
//* Push the elements to a new array with the smaller values being first
function merge(left, right) {
  const result = [];

  let i1 = 0;
  let i2 = 0;

  while (i1 < left.length && i2 < right.length) {
    if (left[i1] < right[i2]) {
      result.push(left[i1++]);
    } else {
      result.push(right[i2++]);
    }
  }

  while (i1 < left.length) {
    result.push(left[i1++]);
  }

  while (i2 < right.length) {
    result.push(right[i2++]);
  }

  return result;
}

console.log(mergeSort([1, 0])); // [0, 1]
console.log(mergeSort([2, 7, 3, 4, 0, 9])); // [0, 2, 3, 4, 7, 9]
console.log(mergeSort([5, 3, 2, 1, 4, 6, 7, 8])); // [1, 2, 3, 4, 5, 6, 7, 8]

//* Time: O(n log n) - Splitting the array up into halves until a length of 1 per array takes O(log n) time
//* The merging process itself takes O(n) time

//* Space: O(n) - We create a new array "results" that will ultimately have the same size as the original input
//* The depth of the recursion scales with the size of the input, because there will be more "halvings" as "n" increases
