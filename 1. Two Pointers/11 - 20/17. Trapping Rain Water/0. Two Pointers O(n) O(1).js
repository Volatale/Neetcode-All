//* Use Two Pointers - we can't sort the input itself
//* Start on the left and right
//* Similar to Container with Most Water, we want to adjust the bottleneck
//* Subtract from the maxLeft or maxRight (depending on if or else), the height[left] or height[right]
//* If we have [5, 2, 4] then you know you can
function trappingRainwater(height) {
  //* Two Pointers
  let left = 0;
  let right = height.length - 1;

  //* The max height surface we have found on either side
  let maxLeft = height[left];
  let maxRight = height[right];

  let waterTrapped = 0;

  //* In each iteration, try to adjust the bottleneck (increase the smaller of the two)
  while (left < right) {
    if (maxLeft <= maxRight) {
      left++;
      maxLeft = Math.max(maxLeft, height[left]); //* Check if we have a new leftMax
      waterTrapped += maxLeft - height[left]; //* [5, 2, 5] means we can trap 3 blocks of water
    } else {
      right--;
      maxRight = Math.max(maxRight, height[right]);
      waterTrapped += maxRight - height[right];
    }
  }

  return waterTrapped;
}

console.log(trappingRainwater([0, 2, 1, 2, 1, 2])); //* 2
console.log(trappingRainwater([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); //* 6
console.log(trappingRainwater([4, 2, 0, 3, 2, 5])); //* 9
console.log(trappingRainwater([5, 0, 0, 0, 5])); //* 15

//* Time: O(n) - We have to process every element in the array once
//* So the time taken scales with the size of the input

//* Space: O(1) - The space we use is constant, so no space scales with the input size
