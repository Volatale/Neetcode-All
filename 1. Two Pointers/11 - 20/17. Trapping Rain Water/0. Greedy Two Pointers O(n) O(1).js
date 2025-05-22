//* The input array is an elevation map, where height[i] = height of i-th bar
//* We need to compute how much water can be trapped within the given geometry
//* Fundamentally, we need two bars to be able to trap water
//*     - Which means we can immediately eliminate the 0th and n-1th bars (no water can be trapped there)
//*     - We CAN, however, use those bars for OTHER checks
//* The most important of the two bars is the smaller (we can call that the bottleneck)
//* If one bar is of height 3 and the other is of height 8, then, at most, we can trap "3" blocks of water
//*     - The exact number depends on the terrain and whether it contains divets or not
//! We cannot sort the input itself, because that changes the problem
//* Instead, we can apply a two pointer approach where we (greedily) try to improve the bottleneck
//* The key thing to note is that we are looking for LOCAL contributins to the trapped water
//* If the maxLeft is higher than height[i], we know for sure that there WILL be water trapped here`
//! We do not need to guarantee the existence of a taller wall than height[i]
//* Why? Because we are trapping a volume of water wherever possible
//*     - So if there are gaps, then we know water can exist there
//* Take this example: [3, 0, 1, 2, 3]
//*     - The maxLeft is 3, and the first index we can calculate the trapped water for is index 1
//*     - (3 - 0) === 3, so we know we can trap 3 units of water here
//!         - Whether or not there is a wall to the right is irrelevant, we already know the next is NOT out of bounds, so there will be one
//*         - It also doesn't matter whether it is taller than height[i]; we are looking at LOCAL contributions only
//* Why does greedily updating the bottleneck work?
//*     - Because we can never end up with a SMALLER maxLeft or maxRight
//*         - We always take the MAXIMUM of either of them and height[left] or height[right] respectively
//*     -
function trap(height) {
  //* Two Pointers used to calculate trapped water
  let left = 0;
  let right = height.length - 1;

  //* Track the max height surface we have seen on either side
  let maxLeft = height[left];
  let maxRight = height[right];

  let trappedWater = 0;

  //* Continually try to update the bottleneck between maxLeft and maxRight
  while (left < right) {
    if (maxLeft <= maxRight) {
      left++; //* Try improving left bottleneck
      maxLeft = Math.max(maxLeft, height[left]); //* Potentially update new max
      trappedWater += maxLeft - height[left]; //* Calculate trapped water
    } else {
      right--;
      maxRight = Math.max(maxRight, height[right]);
      trappedWater += maxRight - height[right];
    }
  }

  return trappedWater;
}

console.log(trap([0, 2, 1, 2, 1, 2])); //* 2
console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); //* 6
console.log(trap([4, 2, 0, 3, 2, 5])); //* 9
console.log(trap([5, 0, 0, 0, 5])); //* 15

//* Time: O(n) - We iterate through the entire array once, so the time taken scales with the input size

//* Space: O(1) - The memory usage remains constant regardless of input size
