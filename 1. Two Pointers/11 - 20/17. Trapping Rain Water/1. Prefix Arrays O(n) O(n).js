//* Use two prefix arrays to track the maximum wall going left and right
//* We need to do this so we can PREDICT ahead of time what the opposing wall will be at this index
//* This allows us to find the BOTTLENECK (which is the smaller of the two walls)
//* If we have [5, 2, 3], we know that the "3" limits the amount of water that the walls can hold together (spills out)
//* We only know the opposite side of the array's wall for this index because we precomputed it
//* [5, 2, 5] means [5, 5, 5], [5, 5, 5] for both arrays - so Math.min(5, 5) = 5
function trappingRainwater(height) {
  let waterLevel = 0;

  //* Prefix arrays to track the maximum wall found going left or right
  const maxLeft = new Array(height.length).fill(0);
  const maxRight = new Array(height.length).fill(0);

  //* Precompute the maximum walls on both sides
  for (let i = 1, j = height.length - 2; i < height.length, j >= 0; i++, j--) {
    maxLeft[i] = Math.max(maxLeft[i - 1], height[i - 1]);
    maxRight[j] = Math.max(maxRight[j + 1], height[j + 1]);
  }

  //* Calculate the amount of water we can trap
  for (let i = 0; i < height.length; i++) {
    const trappableWater = Math.min(maxLeft[i], maxRight[i]); //* The smaller is the bottleneck
    if (trappableWater > height[i]) waterLevel += trappableWater - height[i]; //* A negative amount of trappable water would result in LOWERING what we already have
  }

  return waterLevel;
}

console.log(trappingRainwater([0, 2, 1, 2, 1, 2])); //* 2
console.log(trappingRainwater([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); //* 6
console.log(trappingRainwater([4, 2, 0, 3, 2, 5])); //* 9
console.log(trappingRainwater([5, 0, 0, 0, 5])); //* 15

//* Time: O(n) - It takes O(n) time to generate the prefix arrays since we iterate through the whole array
//* Then, we do another O(n) loop bringing us to O(n) + O(n) = O(2n) but that simplifies to O(n)

//* Space: O(n) - We have two prefix arrays that both scale in size proportionally with the input size
//* So O(n) + O(n) = O(2n), but again, we simplify by dropping constants -> O(n)
