//* Use a Monotonically Increasing Stack to find values that work
//* The moment you find an element < top of stack, pop
//* You can't extend the area in an example like [5, 4]
//* The calculation j - i gives us the number of bars to include (width)
//* But we have to subtract 1 because we don't want to include THIS bar in the calculation

//* Sentinel Value:
//* This will FORCE the while loop to activate if it hasn't already
//* [1, 2, 3, 4, 5], here, no smaller element is added, so we would return 0
//* Instead, by pushing a 0, we get a result of 5: 1 (height) * (5 - 0) = 5
function largestRectangleInHistogram(heights) {
  let maxArea = 0;

  //* -1 so that the stack is not empty for width calculations
  const stack = [-1];

  //* Sentinel Value so that in cases like [1, 2, 3] we can still calculate the width
  heights.push(0);

  for (let i = 0; i < heights.length; i++) {
    //* If you find a value < top of the stack, you can't extend the width any more, so pop
    while (stack.length > 0 && heights[i] < heights[stack[stack.length - 1]]) {
      const height = heights[stack.pop()];

      //* Its like j - i, but exclude the CURRENT element (-1)
      //* [4, 1] would result in 1 - (-1) - 1. So we are saying there is ONE bar of width
      const width = i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, height * width);
    }

    //* Push the index because we can still access the height
    stack.push(i);
  }

  return maxArea;
}

console.log(largestRectangleInHistogram([2, 1, 2])); //* 3
console.log(largestRectangleInHistogram([2, 1, 5, 6, 2, 3])); //* 10
console.log(largestRectangleInHistogram([2, 4])); //* 4
console.log(largestRectangleInHistogram([1, 1, 1])); //* 3
console.log(largestRectangleInHistogram([3, 6, 2, 1])); //* 6
console.log(largestRectangleInHistogram([10, 10])); //* 20
console.log(largestRectangleInHistogram([8, 5, 6, 7, 8, 9])); //* 30

//* Time: O(n) - At worst, we push and pop each element twice
//* So that ends up being O(2n), but we drop constants in Big O, so O(n)
//* By accumulating "bars", we avoid having to redo work

//* Space: O(n) - In the worst case, you have an input like [1, 2, 3]
//* This would mean the stack IS monotonically decreasing the whole way through
//* Which means that the while loop is never processed (thus, we have a sentinel value)
//* The input would be [1, 2, 3], and then stack is [1, 2, 3], both have a length of 3
