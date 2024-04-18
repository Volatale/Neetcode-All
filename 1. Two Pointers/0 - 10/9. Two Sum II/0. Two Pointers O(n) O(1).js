//* Two Pointers, left and right
//* We start at both ends of the array
//* Then in each iteration, we sum the values at the two pointers
//* If sum > target, then decrement right because we need a SMALLER sum
//* If sum < target, increment left, because we need a LARGER sum
//* If sum === target, then return [left + 1, right + 1] since it is 1-indexed
function twoSumII(arr, target) {
  //* Two Pointers
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const sum = arr[left] + arr[right];

    if (sum > target) {
      right--;
    } else if (sum < target) {
      left++;
    } else {
      return [left + 1, right + 1]; //* It is a 1-indexed array
    }
  }

  return -1;
}

console.log(twoSumII([2, 7, 11, 15], 9)); //* [1, 2]
console.log(twoSumII([2, 3, 4], 6)); //* [1, 3]
console.log(twoSumII([-1, 0], -1)); //* [1, 2]

//* Time: O(n) - The time taken to iterate through the array scales with the size of the input
//* In the worst case you process every element in the array

//* Space: O(1) - We only use constant space; any space used does not scale with the size of the input
