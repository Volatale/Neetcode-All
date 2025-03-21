//* We want to use a SMALL (width, height) envelope as a BASE
//* Then, we want to find LARGER envelopes to put the previous envelope(s) into
//* The goal is to find the maximum number of nestings we can do
//! So one way to view the problem is to find the LONGEST INCREASIG SUBSEQUENCE
//*     - The main difference is that we have two dimensions to work with instead of just one
//* Similarly to the regular LIS problem, we can binary search
//*     - But since the array is not inherently monotonically increasing OR decreasing
//!     - We need to SORT the array somehow before doing anything
//* If two envelopes have the same width, sort them by height in DESCENDING order
//*     - Why? Because otherwise we may count multiple envelopes with the same width as part of the same subsequence
//* Take this example: [[2, 3], [3, 7], [4, 6], [4, 8]]
//!     - We are not allowed to add multiple envelopes with the SAME WIDTH within the SAME SUBSEQUENCE
//*         - So by sorting the HEIGHTS in descending order, we eliminate that possibility
//*     - We'd end up with the incorrect result if we proceeded with the current envelope ordering
//* Sorting properly would give us: [[2, 3], [3, 7], [4, 8], [4, 6]]
//*     - Now we know the latter elements are larger in some way (either by width or height)
//*         - So the envelopes are sorted in a monotonically increasing order
//*     - AND we also know that we won't accidently add an envelope with the same with to the current subsequence
//* After sorting, we can simply focus on find the HEIGHTS
//*     - This reduces the dimensionality to only 1, which makes binary searching easier
//* Now the problem is essentially the same as the regular LIS
//! Use Binary Search to find the leftmost insertion position for each envelope
//*     - We don't care what the combination is specifically, and we don't have to return it
//*     - All we care about is the maximum number of nested envelopes
//* If we find an envelope whose insertion position is the length of the subsequence itself
//*     - Then push the current envelope to the subsequence
//* Otherwise, overwrite the element at the insertion index
//*     - We need to ensure the subsequence remains monotonically increasing
//*     - Otherwise we lose the ability to employ binary search
function maxEnvelopes(envelopes) {
  //* Sort by height in DESC if the widths are the same, prevents adding multiple same widths
  envelopes.sort((a, b) => {
    if (a[0] === b[0]) return b[1] - a[1]; //* Sort by height in descending order
    return a[0] - b[0]; //* Sort by width in ascending order
  });

  const nestedEnvelopes = [];

  //* Find the LIS based on the heights
  for (let i = 0; i < envelopes.length; i++) {
    const height = envelopes[i][1];

    //* Binary Search to find the earliest insertion position for the height
    const index = leftBisect(nestedEnvelopes, height);

    if (index === nestedEnvelopes.length) {
      //* We found an envelope that can fit all of the previously chosen envelopes
      nestedEnvelopes.push(height);
    } else {
      //* Overwrite a previous envelope with the current (maintain monotonicity)
      nestedEnvelopes[index] = height;
    }
  }

  return nestedEnvelopes.length;
}

function leftBisect(nums, target) {
  let left = 0;
  let right = nums.length;

  while (left < right) {
    const mid = left + ((right - left) >> 1);

    if (nums[mid] >= target) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

console.log(
  maxEnvelopes([
    [5, 4],
    [6, 4],
    [6, 7],
    [2, 3],
  ])
); //* 3

console.log(
  maxEnvelopes([
    [1, 1],
    [1, 1],
    [1, 1],
  ])
); //* 1

console.log(
  maxEnvelopes([
    [1, 3],
    [4, 5],
  ])
); //* 2

console.log(maxEnvelopes([[6, 6]])); //* 1

console.log(
  maxEnvelopes([
    [1, 3],
    [2, 4],
    [3, 6],
    [1, 4],
    [2, 5],
    [10, 12],
  ])
); //* 4

console.log(
  maxEnvelopes([
    [1, 3],
    [3, 5],
    [6, 7],
    [6, 8],
    [8, 4],
    [9, 5],
  ])
); //* 3

console.log(
  maxEnvelopes([
    [2, 3],
    [4, 8],
    [4, 6],
    [3, 7],
  ])
); //* 3

//* Time: O(n log n) - It takes O(n log n) to sort the envelopes
//* Then, for each envelope (n), perform a binary search to find the insertion position

//* Space: O(n) - The memory for sorting scales with the sorting algorithm used
//* In the worst case, the subsequence's length is equal to the input size (if we can include EVERY envelope)
