//* The Area of a Rectangle = H * W
//* To get the width, we take j - i, similar to Container with Most Water
//* But if both pointers are at index 0, 0 - 0 would mean the width is 0
//* We know that each bar is worth ONE, not zero, so we need to include THIS bar
//* Thus we end up at j - i + 1 (0 - 0 + 1) = 1 bar width
//* (1 - 0 + 1) = 2 bar width etc

//* The height of the rectangle has to be CAPPED at the minimum of the heights you consider
//* If you find a new minimum, height has to be set to that value
//* A rectangle's width is a straight line, it does not go up or down
function largestRectangleInHistogram(heights) {
  let maxArea = 0;

  for (let i = 0; i < heights.length; i++) {
    let height = heights[i]; //* Track the height we are considering
    let currArea = 0;

    for (let j = i; j < heights.length; j++) {
      //* Check if we have a new bottleneck; height cannot increase
      height = Math.min(height, heights[j]);

      currArea = Math.max(currArea, height * (j - i + 1));
    }

    maxArea = Math.max(maxArea, currArea);
  }

  return maxArea;
}

console.log(largestRectangleInHistogram([2, 1, 5, 6, 2, 3])); //* 10
console.log(largestRectangleInHistogram([2, 4])); //* 4
console.log(largestRectangleInHistogram([1, 1, 1])); //* 3

//* Time: O(n^2) - We have a nested for loop, both of which scale with the input size
//* It takes O(1) to check for the new minimum and maximum

//* Space: O(1) - We don't use any extra space at all, so the space usage remains constant
