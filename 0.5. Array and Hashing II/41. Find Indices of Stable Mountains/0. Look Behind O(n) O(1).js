//* We know mountain 0 is not stable
//* So start checking if mountain 1 and beyond are stable
//* Simply check if height[i - 1] > threshold
//*     - If this is true, add "i" to the results array
//*     - Mountain "i" is stable
function stableMountains(height, threshold) {
  const results = [];

  //* Mountain 0 is not stable, check every other mountain (index)
  for (let i = 1; i < height.length; i++) {
    if (height[i - 1] > threshold) {
      results.push(i);
    }
  }

  return results;
}

console.log(stableMountains([1, 2, 3, 4, 5], 2)); //* [3, 4]
console.log(stableMountains([10, 1, 10, 1, 10], 3)); //* [1, 3]
console.log(stableMountains([10, 1, 10, 1, 10], 10)); //* []
console.log(stableMountains([5, 4], 4)); //* [1]

//* Time: O(n) - We iterate over every element in the array

//* Space: O(n) - In the worst case, the results array could contain n - 1 elements
