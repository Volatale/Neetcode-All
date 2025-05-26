//* We are given an int[] and we need to move all of the EVEN integers to the start
//* Inadvertently, this also has a side effect of moving all of the ODD integers to the end
//* Since we need to move all the even elements to the front of the array
//* We can apply a two pointer approach, where we specifically search for even elements
//* One of the pointers can be used to denote where the next "even" element goes
//* And the other pointer is used to search for elements
function sortArrayByParity(nums) {
  //* There is nothing to sort
  if (nums.length <= 1) return nums;

  let left = 0; //* Marks the index of the next even element
  let right = 0; //* Travels through the array searching for even elements

  while (right < nums.length) {
    //* Check if the current element is even
    if (!(nums[right] & 1)) {
      swap(nums, left, right);
      left++;
    }

    right++;
  }

  return nums;
}

function swap(nums, left, right) {
  const temp = nums[left];
  nums[left] = nums[right];
  nums[right] = temp;
}

console.log(sortArrayByParity([3, 1, 2, 4])); //* [2, 4, 3, 1]
console.log(sortArrayByParity([0])); //* [0]
console.log(sortArrayByParity([5, 1, 2, 5, 9, 2, 4, 8, 1])); //* [2, 2, 4, 8, 9, 1, 5, 5, 1]

//* Time: O(n) - It takes O(n) to iterate through the entire array

//* Space: O(1) - The memory usage remains constant regardless of input size
