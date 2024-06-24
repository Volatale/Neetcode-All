function quickSort(nums, left = 0, right = nums.length - 1) {
  if (left < right) {
    const pivot = partition(nums, left, right);

    quickSort(nums, left, pivot - 1);
    quickSort(nums, pivot + 1, right);
  }

  return nums;
}

function partition(nums, left, right) {
  //* Low marks the position of the next element
  let low = left;

  //* Place elements LESS than pivot (nums[right]) on the left
  while (left < right) {
    if (nums[left] <= nums[right]) {
      //* The "left" element should exist on the LEFT of the array
      [nums[left], nums[low]] = [nums[low], nums[left]];
      low++;
    }
    left++;
  }

  [nums[low], nums[right]] = [nums[right], nums[low]];
  return low;
}

console.log(quickSort([4, 3, 9, 5]));
console.log(quickSort([2, 8, 3, 1]));
console.log(quickSort([10, 2, 3, 5, 4, 6, 7, 9, 8, 1]));
console.log(quickSort([1, 2, 3]));
console.log(quickSort([3, 2, 1]));
console.log(quickSort([5]));

//* Time: O(n log n) or O(n^2)

//* Space: O(log n)
