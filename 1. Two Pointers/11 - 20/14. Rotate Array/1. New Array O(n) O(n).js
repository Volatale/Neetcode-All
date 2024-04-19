//* Find the starting element for the new array
//* Iterate through the array and add "i"
//* Make sure you mod by "n" to ensure we don't go out of bounds
function rotateArray(nums, k) {
  const n = nums.length;

  const result = [];

  const startIdx = n - k; //* The element index will be the the k-th from the end

  for (let i = 0; i < n; i++) {
    const index = (startIdx + i) % n; //* Ensure we don't go out of bounds
    result.push(nums[index]);
  }

  return result;
}

console.log(rotateArray([1, 2, 3, 4, 5, 6, 7], 3)); //* [5, 6, 7, 1, 2, 3, 4]
console.log(rotateArray([-1, -100, 3, 99], 2)); //* [3, 99, -1, 100]
console.log(rotateArray([5], 1)); //* []
console.log(rotateArray([1, 2], 1)); //* [2, 1]

//* Time: O(n) - The time taken scales with the size of the input

//* Space: O(n) - We create a new array that scales linearly in size proportional to "n"
