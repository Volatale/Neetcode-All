//* Try every pair that exists
//* However, this requires nested for loops, so it isn't very efficient
//* The absolute distance is calculated via: Math.abs(nums[i] - nums[j])
//* i and j cannot be the same index
//* After all the pairs have been calculated, sort the array
//* This puts them into order so we can retrieve the kth
//* K is not 0 indexed, so we need to subtract one
function findKthSmallestPairDistance(nums, k) {
  const distances = [];

  //* Generate every pair
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      distances.push(Math.abs(nums[i] - nums[j]));
    }
  }

  //* Order the distances so we can grab the kth
  distances.sort((a, b) => a - b);
  return distances[k - 1];
}

console.log(findKthSmallestPairDistance([1, 3, 1], 1)); //* 0
console.log(findKthSmallestPairDistance([1, 1, 1], 2)); //* 0
console.log(findKthSmallestPairDistance([1, 6, 1], 2)); //* 5

//* Time: O(n^2) - We have a nested for loop, both of which scale with "n"
//* The absolute distance calculation takes constant time

//* Space: O(n) - The number of pairs we can have is at max n * (n-1) / 2
//* So if the input has 4 elements, there will be 6 pairs
//* Whereas if the input had 6 elements, 6 * (5) / 2 = 15 pairs
//* Therefore the space usage of the input scales with "n"
//* The sorting algorithm is probably also Merge Sort, so that means O(n) space usage there too
