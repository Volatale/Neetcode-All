//* XOR Swaps won't work for floats, so be careful
//* Left partition is "sorted", right is "unsorted"
//* Set "j" = i, and look "back" 1
//* If nums[j] < nums[j - 1], we need to swap the adjacent elements
//* Keep doing that until this is true, or j = 0 (because j - 1 puts you out of bounds)
//* After each inner iteration, decrement j (to follow the element to completion)
function insertionSort(nums) {
  for (let i = 0; i < nums.length - 1; i++) {
    let j = i + 1;

    //* Drag the element to the left
    while (j > 0 && nums[j] < nums[j - 1]) {
      nums[j] ^= nums[j - 1];
      nums[j - 1] ^= nums[j];
      nums[j] ^= nums[j - 1];
      j--;
    }
  }

  return nums;
}

console.log(insertionSort([2, 8, 3, 1]));
console.log(insertionSort([10, 2, 3, 5, 4, 6, 7, 9, 8, 1]));
console.log(insertionSort([1, 2, 3]));
console.log(insertionSort([3, 2, 1]));
console.log(insertionSort([5]));

//* Time: O(n^2) - In the worst case, the array is sorted in descending order
//* So we have to iterate through the entire array back to front each inner iteration

//* Space: O(1) - The space usage remains constant regardless of input size
