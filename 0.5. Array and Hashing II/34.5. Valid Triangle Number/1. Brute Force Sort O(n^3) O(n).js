//* Try every possible triplet
//* Sort the array to ensure the elements are monotonically non-decreasing
//*     - This makes it easy to form triplets
function triangleNumber(nums) {
  //* We need three sides to make a triangle
  if (nums.length < 3) return 0;

  //* Sort the elements to make it easier to form triangles
  nums.sort((a, b) => a - b);

  let triplets = 0;

  //* Try every potential triplet (triple nested for loops)
  for (let i = 0; i < nums.length - 2; i++) {
    for (let j = i + 1; j < nums.length - 1; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        //* Found a valid triangle
        if (nums[i] + nums[j] > nums[k]) {
          triplets++;
        }
      }
    }
  }

  return triplets;
}

console.log(triangleNumber([2, 2, 3, 4])); //* 3
console.log(triangleNumber([4, 2, 3, 4])); //* 4
console.log(triangleNumber([5, 5, 5])); //* 1

//* Time: O(n^3) - In a brute force manner, we can try EVERY possible triplet

//* Space: O(n) - The memory used by the sorting algorithm scales with "n"
