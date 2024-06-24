//* Use three variables to partition the array
//* Anything to the left of Red should be a 0
//* Anything to the right of Blue should be a 2
//* Therefore anything in the middle should be a 1
//* If white finds a 0, we swap with "red"
//*     - This places the 0s on the left
//*     - Then increment red and white because that element is sorted
//* If white finds a 1, we just increment white
//*     - White exists to find out of place elements; a 1 is not necessarily out of place
//* Else, white found a 2, so we swap with "blue"
//*     - This places the 2s on the right
//*     - Then decrement blue because this element is sorted
function sortColors(nums) {
  let red = 0; //* Left of "red" should be 0s
  let white = 0; //* Searches for numbers
  let blue = nums.length - 1; //* Right of "blue" should be 2s

  while (white <= blue) {
    if (nums[white] === 0) {
      swap(nums, red++, white++); //* Puts the 0s on the left
    } else if (nums[white] === 1) {
      white++; //* Don't swap; 1s should be in the middle
    } else {
      swap(nums, white, blue--); //* Puts the 2s on the right
    }
  }

  return nums;
}

function swap(nums, x, y) {
  const temp = nums[x];
  nums[x] = nums[y];
  nums[y] = temp;
}

console.log(sortColors([1, 2, 0])); //* [0, 1, 2]
console.log(sortColors([1, 2, 0, 2, 1, 0])); //* [0, 0, 1, 1, 2, 2]
console.log(sortColors([1, 2, 0, 2, 1, 0])); //* [0, 0, 1, 1, 2, 2]

//* Time: O(n) - It takes O(n) to iterate through the entire array once
//* Some elements are processed more than once, but ultimately the time taken scales with the size of the array
//* blue's value initializes based on the length of the array

//* Space: O(1) - We don't use any extra auxillary space or data structures
