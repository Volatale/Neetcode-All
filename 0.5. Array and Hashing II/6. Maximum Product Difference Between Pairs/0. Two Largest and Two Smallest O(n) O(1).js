//* There is no need to check each possible product difference
//* Instead, we simply need to make some observations
//* A product is the result of A * B
//* A product DIFFERENCE is (A * B) - (C * D)
//* To maximize a product difference, we need to:
//*     - Maximize (A * B)
//*     - Minimize (C * D)
//* So we simply pair the two largest numbers with the two smallest numbers
//! Instead of sorting, we can track the two largest and two smallest numbers
//*     - Then, we can directly calculate the maximum product difference
function maxProductDifference(nums) {
  //* There aren't 4 elements
  if (nums.length < 4) return 0;

  //* Track the two largest and two smallest numbers
  let largest = -Infinity;
  let largestII = -Infinity;
  let smallest = Infinity;
  let smallestII = Infinity;

  for (let i = 0; i < nums.length; i++) {
    //* Handle the "largest" case (A * B)
    if (nums[i] > largest || nums[i] > largestII) {
      largestII = Math.max(largestII, largest);
      largest = nums[i];
    }

    //* Handle the "smallest" case (C * D)
    if (nums[i] < smallest || nums[i] < smallestII) {
      smallestII = Math.min(smallestII, smallest);
      smallest = nums[i];
    }
  }

  //* This gives us the overall maximum product difference
  return largest * largestII - smallest * smallestII;
}

console.log(maxProductDifference([5, 6, 2, 7, 4])); //* (42 - 8) = 34
console.log(maxProductDifference([4, 2, 5, 9, 7, 4, 8])); //* (72 - 8) = 64
console.log(maxProductDifference([1, 2, 3, 4])); //* (12 - 2) = 10
console.log(maxProductDifference([6, 2, 3, 6, 2, 6, 8, 2, 1])); //* 46

//* Time: O(n) - We iterate through the entire array, so the time taken scales with the input size
//* Calculating the product difference takes O(1)

//* Space: O(1) - The space used does not scale with the input size
//* Regardless of "n" (nums.length), we have 4 variables that track numbers
