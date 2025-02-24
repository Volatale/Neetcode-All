//* Separate all of the elements in nums into even and odd arrays
//* Then, simply spread all of the even elements into a new result array
//* And lastly spread the remaining odd elements into the result
function sortArrayByParity(nums) {
  //* There is nothing to sort
  if (nums.length <= 1) return nums;

  const even = [];
  const odd = [];

  //* Separate the elements that are even and odd
  for (let i = 0; i < nums.length; i++) {
    nums[i] & 1 ? odd.push(nums[i]) : even.push(nums[i]);
  }

  //* Return an array with all the evens first
  return [...even, ...odd];
}

console.log(sortArrayByParity([3, 1, 2, 4])); //* [2, 4, 3, 1]
console.log(sortArrayByParity([0])); //* [0]
console.log(sortArrayByParity([5, 1, 2, 5, 9, 2, 4, 8, 1]));

//* Time: O(n) - It takes O(n) to separate the elements
//* Then O(n) to create the result array

//* Space: O(n) - The result array is an entirely new array of the same length as nums
