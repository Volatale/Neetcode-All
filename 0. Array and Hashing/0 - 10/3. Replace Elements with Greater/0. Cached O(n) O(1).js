//* The goal is to replace every element of the array with the greatest element to its right
//* Ultimately, we need to iterate from right to left
//* Once the algorithm is (correctly) performed, we end up with a monotonically non-increasing array
//* So that indicates that from left to right, the values are as follows:
//*     - For all i in the range 0 <= i < n, nums[i] >= nums[i + 1]
//* So simply track the maximum value going from right to left
//* Then set nums[i] equal to that value

//* For each element, record the current value (arr[i]), and overwrite it (arr[i]) using the last maximum
//* Then, potentially update the maximum using the new value
function replaceElements(arr) {
  //* The final element should be -1
  let max = -1;

  for (let i = arr.length - 1; i >= 0; i--) {
    const curr = arr[i];
    arr[i] = max;
    max = Math.max(max, curr);
  }

  return arr;
}

console.log(replaceElements([17, 18, 5, 4, 6, 1]));
console.log(replaceElements([400]));
console.log(replaceElements([1, 3, 2, 5, 6, 1, 4, 6, 7, 1, 9]));

//* Time: O(n) - The time taken scales with the input size since we iterate through every element

//* Space: O(1) - The memory usage remains constant regardless of input size
