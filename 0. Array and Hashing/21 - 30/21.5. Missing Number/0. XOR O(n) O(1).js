//* Use the Associative Property & the Commutive Property
//* (a ^ b) ^ a = b. b ^ (a ^ a) = b etc
//* Start with "n"
//* [3, 0, 1] is our array, and [0, 1, 2, 3] is the full array
//* Now we know XOR with "self" = 0 so that cancels the number out from both arrays
//* Whatever is left over is the missing number
function missingNumber(nums) {
  let n = nums.length; //* Max possible value of the missing numberSo,

  for (let i = 0; i < nums.length; i++) {
    n = n ^ i ^ nums[i];
  }

  return n;
}

console.log(missingNumber([3, 0, 1])); // 2
console.log(missingNumber([0, 1])); // 2
console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1])); // 8

//* Time: O(n) - We iterate through the entire array once, XORing by "i" and the current element as we go

//* Space: O(1) - The space usage remains constant; we only ever use constant space variables
