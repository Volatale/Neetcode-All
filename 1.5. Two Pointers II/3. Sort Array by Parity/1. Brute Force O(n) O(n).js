//* We are given an int[] and we need to move all of the EVEN integers to the start
//* Inadvertently, this also has a side effect of moving all of the ODD integers to the end
//* We can simply create two arrays (odd and even) and group all of the respective elements
//* Then, we can create a new array using the contents of `even`, followed by the contents of `odd`
function sortArrayByParity(nums) {
  //* There is nothing to sort
  if (nums.length <= 1) return nums;

  const even = [];
  const odd = [];

  //* Group up the elements based on parity
  for (let i = 0; i < nums.length; i++) {
    nums[i] & 1 ? odd.push(nums[i]) : even.push(nums[i]);
  }

  return [...even, ...odd];
}

console.log(sortArrayByParity([3, 1, 2, 4])); //* [2, 4, 3, 1]
console.log(sortArrayByParity([0])); //* [0]
console.log(sortArrayByParity([5, 1, 2, 5, 9, 2, 4, 8, 1])); //* [2, 2, 4, 8, 5, 1, 5, 9, 1]

//* Time: O(n) - Iterating through the input takes O(n), as does creating the returned array

//* Space: O(n) - The total memory used scales with the input
