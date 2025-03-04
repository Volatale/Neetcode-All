//* We don't actually need to remove ANY elements
//* The main idea is to find the MAXIMUM element in nums
//* Then apply the formula:
//*     - Result = m + (m + 1) + (m + 2) + ... + (m + k - 1)
function maximizeSum(nums, k) {
  const max = Math.max(...nums);
  let score = 0;

  //* Add up all of the elements that are added
  for (let i = max; i < max + k; i++) {
    score += i;
  }

  return score;
}

console.log(maximizeSum([1, 2, 3, 4, 5], 3)); //* 18
console.log(maximizeSum([5, 5, 5], 2)); //* 11
console.log(maximizeSum([1], 5)); //* 15

//* Time: O(n + k) - It takes O(n) to get the maximum element
//* Then, it takes O(k) to add all of the elements that are added to the array

//* Space: O(1) - The memory usage remains constant regardless of the input size
