//* In a greedy manner, whenever we encounter a 0
//*     - Flip the current triplet
//* Ultimately, we have to flip each group as they come
//* Use the Bitwise XOR operator to handle that for us
//*     - nums[i] ^= 1
//*     - nums[i + 1] ^= 1
//*     - nums[i + 2] ^= 1
//! Why does the greedy approach work?
//* If we have an array like: [0, 0, 0, 1]
//*     - Then the ONLY way to get index 0 to be 1 is to FLIP index 0
//*     - We CAN flip index 1, but that still doesn't handle the index 0 case
//* So naturally, it is evident that once we process an INDEX
//*     - We never flip from that that index again
//! The array consists of all 1s if:
//*     - nums[n-1] and nums[n-2] are both 1
//* Why? Any valid solution leaves the last two elements as 1
//*         - If they are NOT both 1, then non solution exists
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

  //* If the last two elements are 1, we have a valid solution
  return nums[n - 1] === 1 && nums[n - 2] === 1 ? flips : -1;
}

console.log(minOperations([0, 0, 0])); //* 1
console.log(minOperations([1, 1, 1])); //* 0
console.log(minOperations([1, 1, 1, 0, 0, 0])); //* 1
console.log(minOperations([0, 1, 0])); //* -1
console.log(minOperations([0, 1, 1, 1])); //* -1
console.log(minOperations([0, 1, 1, 1, 0, 0])); //* -1

//* Time: O(n) - The time taken scales with the size of the input

//* Space: O(1) - The memory usage remains constant regardless of input size
