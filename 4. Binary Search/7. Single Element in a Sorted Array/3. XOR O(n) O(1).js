//* We are given a SORTED array consisting of only integers that appear exactly twice
//* Except ONE integer appears once
//* The goal is to return the single element that appears once
//* Ultimately, this problem involves tracking frequencies
//! However, instead of tracking frequencies, we can simply take advantage of XOR
//*     - 0 ^ 5 = 5
//*     - 5 ^ 5 = 0
//*         - Which leaves 0
//* In other words, two XORs of the same number will cancel out the input
//*     - 7 ^ 1 ^ 7 = 1
//* Additionally, XOR is commutative and associative
function singleNonDuplicate(nums) {
  let XOR = 0;

  //* (a ^ b ^ a) = b
  for (let i = 0; i < nums.length; i++) {
    XOR ^= nums[i];
  }

  return XOR;
}

console.log(singleNonDuplicate([1, 2, 2])); //* 1
console.log(singleNonDuplicate([1, 1, 2, 3, 3])); //* 2
console.log(singleNonDuplicate([1, 1, 2, 3, 3, 4, 4, 8, 8])); //* 2
console.log(singleNonDuplicate([3, 3, 7, 7, 10, 11, 11])); //* 10
console.log(singleNonDuplicate([50, 51, 51, 52, 52])); //* 50
console.log(singleNonDuplicate([0, 0, 1, 2, 2])); //* 1

//* Time: O(n) - The time taken scales with the size of the input array

//* Space: O(1) - The memory usage remains constant regardless of input size
