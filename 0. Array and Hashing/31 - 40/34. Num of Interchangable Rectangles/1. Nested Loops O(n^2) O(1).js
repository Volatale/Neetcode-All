//* If the rectangle length <= 1, we have nothing to compare with, thus no potential pairs
//* We need to compare each "base" with the other rectangles that come after the base
//* Take the ratio of the base and compare it to the ratio of each succeeding rectangle
//* If they are proportional ratios, we found a matching (interchangable) pair
function interchangableRectangles(rectangles) {
  if (rectangles.length <= 1) return 0; //* Nothing to compare to

  let pairs = 0;

  for (let i = 0; i < rectangles.length; i++) {
    const [baseWidth, baseHeight] = rectangles[i];
    const baseRatio = baseWidth / baseHeight;

    for (let j = i + 1; j < rectangles.length; j++) {
      const [newWidth, newHeight] = rectangles[j];
      const newRatio = newWidth / newHeight;

      if (baseRatio === newRatio) pairs++;
    }
  }

  return pairs;
}

console.log(
  interchangableRectangles([
    [4, 8],
    [3, 6],
    [10, 20],
    [15, 30],
  ])
); //* 6

console.log(
  interchangableRectangles([
    [4, 5],
    [7, 8],
  ])
); //* 0

//* Time: O(n^2) - We compare each rectangles with everything after it, similarly to subarrays
//* We have two nested for loops that both depend on the length of the input

//* Space: O(1) - We only use constant space, so the space complexity does not scale proportionally with the input size
