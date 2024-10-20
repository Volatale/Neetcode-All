//* Sort the array since we need to ensure the numbers are monotonically increasing
//* Index 0 MUST be 1
//* To ensure an absolute difference of 1, the NEXT element must be no more than 1 greater
//*     - [5, 7]
//*         - abs(5, 7) = 2
//!         - Thus, we know the difference between them is too large, so DECREASE 7
//*     - [5, 6]
//*         - abs(5, 6) = 1
//*     - [10, 11, 12]:
//*         - abs(10, 11) = 1
//*         - abs(11, 12) = 1
//* So essentially, make sure each element is no more than one more than the last
//*     - This also has the side effect of guaranteeing the LAST element is the largest
function maximumElementAfterOperations(arr) {
  //* The only valid element would be [n] reduced to [1]
  if (arr.length === 1) return 1;

  //* Sort in ASCENDING order so we can compare i - 1
  arr.sort((a, b) => a - b);

  //* First element must always be 1
  arr[0] = 1;

  //* Start at i = 1 since we know [0] = 1
  for (let i = 1; i < arr.length; i++) {
    //* Current element should be 1 more than previous
    if (arr[i] - arr[i - 1] > 1) {
      arr[i] = arr[i - 1] + 1;
    }
  }

  //* Last element will always be the largest
  return arr[arr.length - 1];
}

console.log(maximumElementAfterOperations([2, 2, 1, 2, 1])); //* 2
console.log(maximumElementAfterOperations([100, 1, 1000])); //* 3
console.log(maximumElementAfterOperations([1, 2, 5])); //* 3
console.log(maximumElementAfterOperations([50])); //* 1
console.log(maximumElementAfterOperations([2, 3, 9, 8, 3, 4])); //* 6
console.log(maximumElementAfterOperations([4, 7])); //* 2

//* Time: O(n log n) - We need to sort the array, so this takes O(n log n) time
//* Then we iterate through the entire array (O(n) time)

//* Space: O(n) - Sorting generally uses O(n) space due to merge sort
