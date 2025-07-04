//* We are given an int[] heights representing a histogram's bar height
//*     - The width of each bar is 1
//* The goal is to return the area of the LARGEST rectangle in the histogram
//*     - The area of a rectangle is L * W
//*     - In our case, the bar height === length, so simply replace the value in the equation
//* We need to handle bottlenecks in our choices
//* If we have [5, 6], then we can take 5 on its own, 6 on its own, or both 5 and 6
//*     - 5 * 1 = 5
//*     - 6 * 1 = 6
//*     - 5 * 2 = 10
//! Why is it 10? Because the MINIMUM between our choices is 5
//* We want to maximize the width while keeping the height as high as possible
//* Since bottlenecks are a thing, if we DO extend the subarray, then we need to check if the new value is < the previous value
//* There may be times where we have to sacrifice height for the sake of maximizing width (like above)
//*     - If we greedily focus on height, we'd keep 6 on top, but we know (1 * 6) < (2 * 5)
//* Since this problem inherently involves subarrays, we can simply try every possible subarray
function largestRectangle(heights) {
  let maxArea = 0;

  for (let i = 0; i < heights.length; i++) {
    let height = heights[i];
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

console.log(largestRectangle([2, 1, 5, 6, 2, 3])); //* 10
console.log(largestRectangle([2, 4])); //* 4
console.log(largestRectangle([1, 1, 1])); //* 3

//* Time: O(n^2) - The time taken scales quadratically since we have a nested for loop

//* Space: O(1) - The memory usage remains constant regardless of input size
