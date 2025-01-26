//* There is no need to check each possible product difference
//* Instead, we simply need to make some observations
//* A product is the result of A * B
//* A product DIFFERENCE is (A * B) - (C * D)
//* To maximize a product difference, we need to:
//*     - Maximize (A * B)
//*     - Minimize (C * D)
//* So we simply pair the two largest numbers with the two smallest numbers
//! We can sort the numbers then take the first two and last two
function maxProductDifference(nums) {
  //* There aren't 4 elements
  if (nums.length < 4) return 0;

  const n = nums.length;

  //* Sort the array in descending order (pair two largest with two smallest)
  nums.sort((a, b) => b - a);

  //* The maximum product difference is the two largest - the two smallest
  return nums[0] * nums[1] - nums[n - 1] * nums[n - 2];
}

console.log(maxProductDifference([5, 6, 2, 7, 4])); //* (42 - 8) = 34
console.log(maxProductDifference([4, 2, 5, 9, 7, 4, 8])); //* (72 - 8) = 64
console.log(maxProductDifference([1, 2, 3, 4])); //* (12 - 2) = 10
console.log(maxProductDifference([6, 2, 3, 6, 2, 6, 8, 2, 1])); //* 46

//* Time: O(n log n) - Sorting takes O(n log n) assuming we use merge or quick sort
//* But it only takes O(1) to calculate the product difference

//* Space: O(n) - Assuming merge sort is used, we use O(n) auxillary space
