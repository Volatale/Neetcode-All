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
//* It is possible to solve this using a nested for loop, however, this is inefficient
//* Instead, since we are repeating work, we can use a monotonic stack
//* The stack will track indices we can use as valid "start" points
//*     - Then we can pop the stack to get the "i", and use the current index as the "j" (j - stack.pop()) to get the width
//! Specifically, we are using a Next Smaller Element approach
//*     - The moment we find a value < top of stack, pop the stack and process the element(s)
//* Essentially, we want to extend the width as much as possible, and
//* Since we're only going to be calculating results within the inner while loop, we need sentinel values
//*     - The sentinel values will ensure that the edge cases are handled (not popping means no calculation)
//*         - Push a 0 to the heights array
//*         - And initialize the stack with -1 (there are no negative values in heights)
function largestRectangle(heights) {
  let maxArea = 0;

  const stack = [-1]; //* Monotonically Increasing Stack (stores indices)
  heights.push(0); //* Sentinel value to ensure that the while loop is triggered at least once

  for (let i = 0; i < heights.length; i++) {
    //* Find the next smaller element for each index
    while (stack.length > 0 && heights[i] < heights[stack[stack.length - 1]]) {
      const height = heights[stack.pop()];
      const width = i - stack[stack.length - 1] - 1; //* -1 because we don't want to include the current element

      maxArea = Math.max(maxArea, height * width);
    }

    //* Push indices, not the values themselves
    stack.push(i);
  }

  return maxArea;
}

debugger;
console.log(largestRectangle([2, 1, 5, 6, 2, 3])); //* 10
console.log(largestRectangle([2, 4])); //* 4
console.log(largestRectangle([1, 1, 1])); //* 3

//* Time: O(n) - In the worst case, each element is processed twice, so the time taken scales linearly

//* Space: O(n) - The memory usage scales with the size of the input
