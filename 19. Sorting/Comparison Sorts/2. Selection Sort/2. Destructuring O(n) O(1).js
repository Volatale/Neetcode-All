//* Find the minimum element
//* Swap it with nums[i] to put it into order
function selectionSort(nums) {
  for (let i = 0; i < nums.length - 1; i++) {
    let min = i; //* Track the index of the minimum element found

    //* Find the minimum element
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] < nums[min]) {
        min = j; //* Index of the current minimum
      }
    }

    //* Swap nums[i] with nums[min]
    if (i !== min) {
      [nums[i], nums[min]] = [nums[min], nums[i]];
    }
  }

  return nums;
}

console.log(selectionSort([2, 8, 3, 1]));
console.log(selectionSort([10, 2, 3, 5, 4, 6, 7, 9, 8, 1]));
console.log(selectionSort([1, 2, 3]));
console.log(selectionSort([3, 2, 1]));
console.log(selectionSort([5]));

//* Time: O(n^2) - We have a nested for loop, both of which scale with "n"
//* It takes O(1) to swap the elements

//* Space: O(1) - The space usage remains constant regardless of the input size
