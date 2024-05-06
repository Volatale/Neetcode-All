//* Sentinel Value:
//* This will FORCE the while loop to activate if it hasn't already
//* [1, 2, 3, 4, 5], here, no smaller element is added, so we would return 0
//* Instead, by pushing a 0, we get a result of 5: 1 (height) * (5 - 0) = 5

//* Use a Monotonically Increasing Stack to find values that work
//* The moment you find an element < top of stack, pop
//* You can't extend the area in an example like [5, 4]
//* We need to track the number of bars that were already popped in situations like [2, 1, 2]
//* The returned value is supposed to be 3, so we need a way to get to 1 * 3 (H * W)
//* Each bar is worth 1, so track the number of previously popped bars by accumulating
//* So the actual calculation ends up being: number of bars * height[i]
//* Each consecutive pop, number of bars increases, but height stays the same
//* So we test all the possibilities
function largestRectangleInHistogram(heights) {
  let maxArea = 0;

  //* Holds tuples of [index, height]
  const stack = [];

  //* Sentinel Value to force while loop activation in cases like [1, 2, 3] (nothing is ever less than op)
  heights.push(-1);

  for (let i = 0; i < heights.length; i++) {
    //* Each bar is worth 1, so this is our "width"
    let bars = 0;

    //* If you encounter a height < top, you can't extend, so just compute the area BEFORE this index
    //* Every pop, you know the height will either stay the same or decrease
    while (stack.length > 0 && heights[i] < stack[stack.length - 1][1]) {
      const [width, height] = stack.pop();
      bars += width; //* Include these bars for the NEXT calculation
      maxArea = Math.max(maxArea, bars * height); //* Number of Pops * Height = Area
    }

    //* "bars" is how many PREVIOUS bars there were before this
    stack.push([bars + 1, heights[i]]);
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
