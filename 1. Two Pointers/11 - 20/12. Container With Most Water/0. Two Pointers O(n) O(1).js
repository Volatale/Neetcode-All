//* Use Two Pointers
//* Area of Rectangle = W*L
//* W = Difference between right and left
//* L = Minimum of the two values, the smaller will bottleneck the other
function containerMostWater(height) {
  let maxWater = 0;

  //* Two Pointers
  let left = 0;
  let right = height.length - 1;

  while (left < right) {
    //* Area of Rectangle = Width * Length
    //* Width = Difference between right and left
    //* Height = The smaller between the two lines
    let area = (right - left) * Math.min(height[left], height[right]);

    //* Try to adjust the bottleneck (the smaller of both values needs to be increased)
    if (height[left] < height[right]) {
      left++;
    } else if (height[left] > height[right]) {
      right--;
    } else {
      //* They are equal, so check left + 1, right - 1
      if (height[left + 1] < height[right - 1]) {
        left++;
      } else {
        right--; //* Just default to right-- if both are STILL equal
      }
    }

    maxWater = Math.max(area, maxWater);
  }

  return maxWater;
}

console.log(containerMostWater([1, 8, 6, 2, 5, 4, 8, 3, 7])); //* 49
console.log(containerMostWater([1, 1])); //* 1

//* Time: O(n) - The time taken scales with the input size
//* Both pointers start at opposing sides of the array
//* After each iteration, decrement right or increment left depending on the bottleneck side

//* Space: O(1) - We only use constant space
