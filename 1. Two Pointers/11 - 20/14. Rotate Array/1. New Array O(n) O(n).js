//* Given an int[] and an integer "k", we need to rotate the array by "k" steps
//*     - If "k = 3", we move every element over by 3 spaces
//* Firstly, if we take "n" to be nums.length, then k could be GREATER than "n"
//*     - So we perform k = k % n to remove all of the redundant rotations
//* In a brute force manner, we could simply generate a brand new array
//* The formula (n - k - 1) gives us the new index of the current 0th element
//* Every other element is placed after this one; use % n to avoid going out of bounds
//* To get the "new" index of each element, ((n - k) + i + 1)
function rotate(nums, k) {
  const n = nums.length;
  const newArray = new Array(n).fill(0);

  //* Remove the redundant rotations
  k = k % n;

  //* NEW index of the current 0th element (post-rotate)
  const startIndex = n - k - 1;

  for (let i = 0; i < n; i++) {
    const index = (startIndex + i + 1) % n;
    newArray[i] = nums[index];
  }

  return newArray;
}

console.log(rotate([1, 2, 3, 4, 5, 6, 7], 3)); //* [5, 6, 7, 1, 2, 3, 4]
console.log(rotate([-1, -100, 3, 99], 2)); //* [3, 99, -1, 100]
console.log(rotate([5], 1)); //* []
console.log(rotate([1, 2], 1)); //* [2, 1]

//* Time: O(n) - It takes O(n) to iterate through every element in nums

//* Space: O(n) - The memory usage scales with the input size
