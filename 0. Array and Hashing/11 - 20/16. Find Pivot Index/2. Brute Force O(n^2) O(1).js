//* Track the leftSum
//* Do not include the current ith element in the leftSum
//* Sum the values on the RIGHT of the ith element
//* Within each inner loop, check if leftSum === rightSum
//* If it does, return "i"
//* Else, just keep iterating; add the ith element to leftSum
//* Return -1 if we never find the pivot index
function findPivotIndex(nums) {
  let leftSum = 0;

  for (let i = 0; i < nums.length; i++) {
    let rightSum = 0;

    for (let j = i + 1; j < nums.length; j++) {
      rightSum += nums[j];
    }

    if (leftSum === rightSum) return i; //* The pivot index

    leftSum += nums[i];
  }

  return -1;
}

console.log(findPivotIndex([1, 7, 3, 6, 5, 6])); // 3
console.log(findPivotIndex([1, 2, 3])); // -1
console.log(findPivotIndex([-1])); // 0
console.log(findPivotIndex([2, 1, -1])); // 0

//* Time: O(n^2) - We have a for loop and a nested for loop; both loops scale with "n"
//* Therefore the time taken by the function is exponential in the worst case

//* Space: O(1) - The space usage remains constant regardless of the input size
