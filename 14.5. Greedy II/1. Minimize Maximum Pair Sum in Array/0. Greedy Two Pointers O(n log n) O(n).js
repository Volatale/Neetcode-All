//* We want to MINIMIZE the MAXIMUM pair sum in the array
//* Essentially, we want to find pairs with the MAXIMUM possible difference
//* So logically speaking, we should repeatedly pair the SMALLEST element with the LARGEST
//*     - This gives us the pairs with the largest possible difference
//* Lets say we had this array [3, 5, 2, 3]
//*     - (2, 5) = 7
//*         - These are the largest and smallest elements
//*     - (3, 3) = 6
//*         - Now we are only left with these two
//*     - max(7,6) = 7
function minPairSum(nums) {
  //* Sort the array to ensure we can pair the largest with the smallest
  nums.sort((a, b) => a - b);

  let maxPairSum = 0;

  let left = 0; //* Tracks next smallest
  let right = nums.length - 1; //* Tracks next largest

  while (left < right) {
    const pairSum = nums[left++] + nums[right--];
    maxPairSum = Math.max(maxPairSum, pairSum);
  }

  return maxPairSum;
}

console.log(minPairSum([3, 5, 2, 3])); //* 7
console.log(minPairSum([10, 20, 30, 40])); //* 50
console.log(minPairSum([3, 5, 4, 2, 4, 6])); //* 8
console.log(minPairSum([1, 2])); //* 2

//* Time: O(n log n) - Initially, we have to sort the array to ensure the smallest pairs with the largest
//* Then, we iterate through (half) the array which takes O(n) time

//* Space: O(n) - The sorting step technically uses space depending on the algorithm used (probably merge sort)
