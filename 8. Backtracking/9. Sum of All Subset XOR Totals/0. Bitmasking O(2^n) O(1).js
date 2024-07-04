//* Find every subset
//* Add the XOR result of each subset to the total
function subsetXORSum(nums) {
  let totalXORSum = 0;

  //* There are 2^n subsets given "n" elements
  for (let i = 0; i < 1 << nums.length; i++) {
    let xorSum = 0; //* XOR sum for THIS subset

    //* For every "i", check if the "jth" bit is set
    for (let j = 0; j < nums.length; j++) {
      //* If the jth bit is set, add this element to the subset
      if (i & (1 << j)) {
        xorSum ^= nums[j];
      }
    }

    totalXORSum += xorSum;
  }

  return totalXORSum;
}

console.log(subsetXORSum([1, 3]));
console.log(subsetXORSum([1, 2, 3]));
console.log(subsetXORSum([5, 1, 6]));
console.log(subsetXORSum([3, 4, 5, 6, 7, 8]));

//* Time: O(2^n) - The number of subsets is O(2^n)
//* It takes O(1) to check if a bit is set

//* Spae: O(1) - The space usage remains constant regardless of the input size
