//* Ultimately, we need to find the maximum amount of water we can store
//*     - In our case, "water" is analogous to area, so we are finding the maximum area
//* The area of a rectangle is calculated via the following formula:
//*     - A = wl, or, Area = Width * Length
//* How do we actually calculate the formula?
//*     - "width" here means j - i (the distance between the lines)
//*         - Where j > i, which means the result of this expression will never be negative
//*     - "length" here means min(height[i], height[j])
//*         - "length" and "height" are analogous in this case; they mean the same thing
//* The maximum area we can find is inhibited by the minimum of the two "lines"
//*     - Even if one line has height 8, if the OTHER line has height 2, then the water above 2 will "spill out"
//* So, in order to maximize the area, we should also maximize the minimum
//* Instead of a brute force approach, we can use a two pointer approach
//* The goal is simply to MAXIMIZE the bottleneck between the two lines
//*     - Immediately get the area of the current rectangle
//*     - Then, increment left or right in an attempt to maximize the minimum line
//* Why does this work? Because we have already considered the current two lines
//* We know that increasing the value of the bottleneck can't reduce the area
//*     - It can only remain the same (in the case of duplicates), or, increase
//* We want to "keep" the larger of the two lines at any given point
//*     - So we only increment the pointer that points to the SMALLER of the lines
//! Greedy intuition
//*     - The area is limited by the shorter line (since water would spill over that)
//*     - Moving the LONGER line inward won't INCREASE the height
//*         - The smaller of the two still acts as a bottleneck; it doesn't matter how tall the other is
//*     - Therefore, the ONLY way we can possibly find a better area is by finding a taller shorter line
//*         - i.e., we increase the minimum
//*     - This comes at the cost of decreasing the overall width (since the pointers will get closer together)
//! Essentially, we eliminate pairs that cannot possibly beat the best case so far
//*     - If (i, j) are the pair that give the highest area, we are guaranteed to compute that pair
//*     - However, the majority of the "useless" or "worse" pairs will be skipped
function maxArea(height) {
  let maxWater = 0;

  //* Two pointers that mark the left and right endpoint of the rectangle
  let left = 0;
  let right = height.length - 1;

  while (left < right) {
    const width = right - left;
    const length = Math.min(height[left], height[right]);

    //* Try to optimize the bottleneck (try to move the smaller of the two)
    if (height[left] < height[right]) {
      left++;
    } else if (height[left] > height[right]) {
      right--;
    } else {
      //* They are equal, so check the adjacent values
      if (height[left + 1] < height[right - 1]) {
        left++;
      } else {
        right--;
      }
    }

    const trappedWater = width * length;
    maxWater = Math.max(maxWater, trappedWater);
  }

  return maxWater;
}

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); //* 49
console.log(maxArea([1, 1])); //* 1
console.log(maxArea([1, 2, 3, 3, 3, 3, 2, 1])); //* 10

//* Time: O(n^2) - We have two nested for loops, both of which depend on nums.length

//* Space: O(1) - The memory usage remains constant regardless of input size
