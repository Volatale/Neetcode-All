//* Area of Rectangle = W * L
//* W = j - i because that gives us the difference
//* if j = 8, i = 1, 8 - 1 = 7
//* H = Math.min(height[i], height[j]) because the SMALLER represents a bottleneck
//* Water will spill out of the smaller if we choose the heigher option
function containerMostWater(height) {
  let maxWater = 0;

  for (let i = 0; i < height.length; i++) {
    //* J should not be the same as "i"
    for (let j = i + 1; j < height.length; j++) {
      let area = (j - i) * Math.min(height[i], height[j]);

      maxWater = Math.max(area, maxWater);
    }
  }

  return maxWater;
}

console.log(containerMostWater([1, 8, 6, 2, 5, 4, 8, 3, 7])); //* 49
console.log(containerMostWater([1, 1])); //* 1

//* Time: O(n^2) - We have two nested for loops, that both depend on the length of the input

//* Space: O(1) - We only use constant space variables
