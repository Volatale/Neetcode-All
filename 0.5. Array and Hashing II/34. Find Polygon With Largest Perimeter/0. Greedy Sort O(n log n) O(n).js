//* We simply want to find 3 numbers where the last element is < the sum of the others
//* Ultimately, the easiest thing to do is sort the numbers in ascending order
//* Then, we could technically try every possibility
//!     - But this would take O(n^2) since it'd use nested for loops
//* Instead, we can simply track the prefix sum up until the current element
//* If the prefix sum (sum of lengths of elements) PRIOR to nums[i] is > nums[i]
//*     - Then we know we successfully fulfilled the invariant
//*     - In other words, as long as we have 3 elements (3 sides), we can form a polygon
//* The elements are in monotonically non-decreasing order (we may have duplicates)
//*     - Thus, if we find a new polygon, we'll ALWAYS end up with a larger result overall
//* And there is no need for an "i >= 2" check when checking for polygons either
//*     - The elements are sorted, so it is not possible to consider a polygon that is NOT valid
//*     - The elements would have to be out of order for that to be possible
function largestPerimeter(nums) {
  //* Not possible to create a polygon
  if (nums.length < 3) return -1;

  //* Sort the elements in ascending order
  nums.sort((a, b) => a - b);

  let largest = -1; //* Assume we can't create a polygon
  let prefixSum = 0; //* Track the prefix sum

  for (let i = 0; i < nums.length; i++) {
    //* This is a polygon candidate
    if (prefixSum > nums[i]) {
      //* No need for max; elements -> are larger: result always increases
      largest = prefixSum + nums[i];
    }

    prefixSum += nums[i];
  }

  return largest;
}

console.log(largestPerimeter([5, 5, 5])); //* 15
console.log(largestPerimeter([1, 12, 1, 2, 5, 50, 3])); //* 12
console.log(largestPerimeter([5, 5, 50])); //* -1
console.log(largestPerimeter([1, 2, 3, 4])); //* 10

//* Time: O(n log n) - We
