//* The input array is an elevation map, where height[i] = height of i-th bar
//* We need to compute how much water can be trapped within the given geometry
//* Fundamentally, we need two bars to be able to trap water
//*     - Which means we can immediately eliminate the 0th and n-1th bars (no water can be trapped there)
//*     - We CAN, however, use those bars for OTHER checks
//* The most important of the two bars is the smaller (we can call that the bottleneck)
//* If one bar is of height 3 and the other is of height 8, then, at most, we can trap "3" blocks of water
//*     - The exact number depends on the terrain and whether it contains divets or not
//! From each position, we need to be able to predict what is AHEAD of the current bar
//*     - If we have the left bar, we still need to know where the right bar is
//* We also need to be able to predict what is BEHIND the current bar
//* For this reason, we can use two prefix arrays and compute the maximum bars relative to either side
//* Then, we can calculate how much water can be trapped for each index based on these values
//! The amount of water that can be trapped depends on the current bottleneck
//*     - The bottleneck is the minimum of the left and right bars
function trap(height) {
  let trappedWater = 0;

  //* The maximum height of bars relative to each index on both sides
  const maxLeft = new Array(height.length).fill(0);
  const maxRight = new Array(height.length).fill(0);

  //* Precompute the maximum bars for each index on both sides
  for (let i = 1, j = height.length - 2; i < height.length, j >= 0; i++, j--) {
    maxLeft[i] = Math.max(maxLeft[i - 1], height[i - 1]);
    maxRight[j] = Math.max(maxRight[j + 1], height[j + 1]);
  }

  //* Calculate the amount of water we can trap within each index
  for (let i = 0; i < height.length; i++) {
    const trappableWater = Math.min(maxLeft[i], maxRight[i]);
    if (trappableWater > height[i]) trappedWater += trappableWater - height[i];
  }

  return trappedWater;
}

console.log(trappingRainwater([0, 2, 1, 2, 1, 2])); //* 2
console.log(trappingRainwater([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); //* 6
console.log(trappingRainwater([4, 2, 0, 3, 2, 5])); //* 9
console.log(trappingRainwater([5, 0, 0, 0, 5])); //* 15

//* Time: O(n) - It takes O(n) to compute both the prefix/postfix arrays
//* And then a further O(n) to calculate the trapped water

//* Space: O(n) - The memory usage scales with the size of the input
