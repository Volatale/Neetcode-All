//* We need to move all of the elements that equal "val" to the END of the array
//* There are "k" elements that are NOT equal to val
//! Another way to think about this is that we need to move all elements NOT equal to val to the start
//* Moving all of the elements !== val to the left IS EQUAL to moving elements equal to val to the right
//*     - So we can use a two pointer approach
//* Left indicates the index where the next element that is NOT equal to val should go
//* Right travels forward (right) in the array and searches for elements that are not equal to val
//* If nums[right] !== val, swap(left, right)
//*     - Then increment left (it is already in the correct position)
//* We need to count the number of elements that are not equal to val
//*     - The number of swaps performed = the number of elements !== val
function removeElement(nums, val) {
  //* There are no elements, thus k = 0
  if (nums.length === 0) return 0;

  //* Equivalent to the number of swaps
  let k = 0;

  let left = 0; //* Index of next element !== val
  let right = 0; //* Travels right searching for elements !== val

  //* Move all the elements not equal to val to the left
  while (right < nums.length) {
    if (nums[right] !== val) {
      swap(nums, left, right);
      k++;
      left++;
    }

    right++;
  }

  return k;
}

function swap(nums, a, b) {
  const temp = nums[a];
  nums[a] = nums[b];
  nums[b] = temp;
}

//* Time: O(n) - We have to iterate through the entire input regardless

//* Space: O(1) - The memory usage remains constant regardless of the input size
