function mergeSort(nums) {
  if (nums.length <= 1) return nums;

  //* Find the mid point in the array
  const mid = Math.floor(nums.length / 2);

  //* Split the array into two halves
  const left = nums.slice(0, mid);
  const right = nums.slice(mid);

  //* Recursively divide and conquer
  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);

  //* Merge the two arrays
  return merge(sortedLeft, sortedRight);
}

function merge(left, right) {
  const result = [];

  let i = 0;
  let j = 0;

  //* Push the smaller element to the result array
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  //* Pick up the remaining elements
  while (i < left.length) {
    result.push(left[i++]);
  }

  while (j < right.length) {
    result.push(right[j++]);
  }

  return result;
}

console.log(mergeSort([10, 3, 19, 7, 18, 4, 15, 5, 12, 1, 16, 2]));
console.log(mergeSort([5, 2, 3]));
console.log(mergeSort([1]));
console.log(mergeSort([5, 2, 10, 1]));

//* Time: O(n log n)

//* Space: O(n)
