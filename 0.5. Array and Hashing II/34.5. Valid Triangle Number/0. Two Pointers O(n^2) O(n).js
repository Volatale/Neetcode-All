//* Sort the array to make it easy to form triplets
//* "i" represents the largest side, the side that we are trying to beat
//* We need to find triplets such that:
//*     - left < right < i
//*         - AND
//*     - nums[left] + nums[right] < nums[i]
//* The array is sorted in a monotonically non-decreasing order
//* If we can form a valid triplet
//*     - We can form triplets with EVERY element between left and right
//* The number of elements between right and left is (right - left)
//* If the current triplet is NOT valid, the sum of nums[left] and nums[right] <= nums[i]
//*     - Which means left should be increased
//*     - Increasing left means the sum will increase
function triangleNumber(nums) {
  //* We need three sides to make a triangle
  if (nums.length < 3) return 0;

  //* Sort the elements to make it easier to form triangles
  nums.sort((a, b) => a - b);

  let triplets = 0;

  //* "i" is the largest side - the side we are trying to beat
  for (let i = 2; i < nums.length; i++) {
    //* Two Pointers to test every element in the range [0, i - 1)
    let left = 0;
    let right = i - 1;

    while (left < right) {
      //* We can form a triplet with every element between right and nums
      if (nums[left] + nums[right] > nums[i]) {
        triplets += right - left;
        right--; //* We used this element already
      } else {
        left++; //* Sum is not large enough
      }
    }
  }

  return triplets;
}

console.log(triangleNumber([2, 2, 3, 4])); //* 3
console.log(triangleNumber([4, 2, 3, 4])); //* 4
console.log(triangleNumber([5, 5, 5])); //* 1

//* Time: O(n^2) - It takes O(n log n) to sort the array
//* Then, it takes O(n^2) to form every valid triplet

//* Space: O(n) - The memory used by the sorting algorithm scales with "n"
