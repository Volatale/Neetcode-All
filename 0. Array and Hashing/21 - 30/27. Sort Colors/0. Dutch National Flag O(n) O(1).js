//* Red represents the "0" anchor, white the "1" and blue the "2"
//* Red and White start at 0 - Blue starts at the end of the array
//* If nums[white] === 0, we swap red and white because the left side should be 0
//* If nums[white] === 1, we leave the number where it is; its either in the correct position, or will be later
//* Else, you found a 2, so it should be at the end; swap with blue. White does NOT decrement here
//* If white decremented after swapping with blue, you are assuming you swapped with a 1 (which would result in white++)
function sortColors(nums) {
  let red = 0; //* Leftmost Pointer
  let white = 0;
  let blue = nums.length - 1; //* Rightmost Pointer

  while (white <= blue) {
    if (nums[white] === 0) {
      swap(nums, red++, white++);
    } else if (nums[white] === 1) {
      white++;
    } else {
      swap(nums, white, blue--);
    }
  }

  return nums;
}

function swap(nums, left, right) {
  const temp = nums[left];
  nums[left] = nums[right];
  nums[right] = temp;

  return nums;
}

console.log(sortColors([2, 0, 2, 1, 1, 0]));
console.log(sortColors([2, 1, 0]));
console.log(sortColors([1, 1, 2, 0, 0, 2]));

//* Time: O(n) - It takes O(n) to iterate through the entire array once
//* Some elements are processed more than once, but ultimately the time taken scales with the size of the array
//* blue's value initializes based on the length of the array

//* Space: O(1) - We don't use any extra auxillary space or data structures
