//* In a greedy manner, whenever we encounter a 0
//*     - Flip the current triplet
//* Ultimately, we have to flip each group as they come
//* Use the Bitwise XOR operator to handle that for us
//*     - nums[i] ^= 1
//*     - nums[i + 1] ^= 1
//*     - nums[i + 2] ^= 1
//! The array consists of all 1s if:
//*     - nums[n-1] and nums[n-2] are both 1
//* Once we have flipped everything, validate that every element === 1
function minOperations(nums) {
  const n = nums.length;
  let flips = 0;

  //* If we encounter a 0, flip the current triplet
  for (let i = 0; i < n - 2; i++) {
    if (nums[i] === 0) {
      nums[i] ^= 1;
      nums[i + 1] ^= 1;
      nums[i + 2] ^= 1;
      flips++;
    }
  }

  //* Validate that every element is 1
  return nums.every((val) => val === 1) ? flips : -1;
}

console.log(minOperations([0, 0, 0])); //* 1
console.log(minOperations([1, 1, 1])); //* 0
console.log(minOperations([1, 1, 1, 0, 0, 0])); //* 1
console.log(minOperations([0, 1, 0])); //* -1
console.log(minOperations([0, 1, 1, 1])); //* -1
console.log(minOperations([0, 1, 1, 1, 0, 0])); //* -1

//* Time: O(n) - The time taken scales with the size of the input

//* Space: O(1) - The memory usage remains constant regardless of input size
