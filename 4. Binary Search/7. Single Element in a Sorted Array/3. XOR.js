//* Use Bitwise XOR
//* 0 ^ 5 = 5
//* 5 ^ 5 = 0
//* So we can toggle the same bits on and off
//* In other words, we can "cancel" the duplicates
//* That would then leave the remaining bits
function singleElementInSortedArray(nums) {
  let xor = 0;

  //* XOR every element
  for (let i = 0; i < nums.length; i++) {
    xor ^= nums[i];
  }

  //* The remainder is element that occurred once
  return xor;
}

console.log(singleElementInSortedArray([1, 1, 2, 3, 3, 4, 4, 8, 8])); //* 2
console.log(singleElementInSortedArray([3, 3, 7, 7, 10, 11, 11])); //* 10
console.log(singleElementInSortedArray([1])); //* 1
console.log(singleElementInSortedArray([0])); //* 0
console.log(singleElementInSortedArray([100, 101, 101])); //* 100
console.log(singleElementInSortedArray([1, 1, 2, 3, 3, 4, 4])); //* 2

//* Time: O(n) - The time taken scales with the input size (n)
//* XOR operations take O(1) and we do this "n" times

//* Space: O(1) - The space usage remains constant regardless of input size
//* The only memory being used is a "number" (double double)
