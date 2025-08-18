//* We have an array of pairs envelopes where [i] = [w_i, h_i]
//*     - Where `w_i` represents the WIDTH
//*     - And Where `h_i` represents the HEIGHT
//* An envelope can fit into another if BOTH the width and height of one is > the other
//!     - Or alternatively, if one envelope's width and height are less than the other
//* Our goal is to return the MAXIMUM number of envelopes we can stack
//* Logically speaking, the problem devolves into Longest Increasing Subsequence
//* It is fundamentally a dynamic programming problem
//*     - However, the Longest Increasing Subsequence problem can also be solved using Binary Search
//! Sort the pairs based on their width (in ascending order), and then their height as a fallback
//*     - Specifically, the heights should be sorted in DESCENDING order
//*     - Sorting the heights into descending order eliminates the following possibility
//*         - [[6, 4], [6, 7]] -> 2
//*     - It should in fact be:
//*         - [[6, 7], [6, 4]] -> 1
//!         - We are ASSUMING the width is fine, but 6 === 6
//*         - Therefore, we need a "defence mechanism" to prevent the above situation
//* After sorting, we can avoid focusing on the width and solely focus on the heights
//*         - Thus, the dimensionality of the problem reduces to 1
//! Why does binary search work?
//*     - The pairs are sorted in ascending order based on `width` followed by `height`
//*         - Thus we can say there is an element on monotonicity
//*         - Since the pairs are (at the very least) sorted based on their width
//*           we can focus SOLELY on the height values
//*     - The number of possible nestings is in the range [1, n]
//*         - The minimum number of nestings is 1
//*         - The maximum number of nesttings is n (nesting EVERY envelope)
//*             - [1, 2] -> [2, 3] -> [3, 4] = 3 nestings
//* Our goal is to find the (leftmost) insertion position of each envelope
//*     - We don't care what the combination is specifically, only that it exists in general
//*     - All we care about is the maximum number of nested envelopes
//* If we find an envelope whose insertion position === the length of the array
//*     - Then we can simpy push the current evenlope to the aray
//* Otherwise, overwrite the element at the current insertion index
//*     - This ensures that the subsequence remains MONOTONICALLY INCREASING
//*     - If this is not handled, we lose the ability to employ binary search
//! This optimization is known as "patience sorting"
//*     - The goal is to maintain the SMALLEST possible "tail" for all increasing subsequences
//*         - Hence the need to overwrite larger values with smaller values
//*     - We use binary search to reduce the time needed to find the expected insertion position
//* This is also possible via Segment Trees / Fenwick Trees (as alternatives to Binary Search)
//*     - Patience sort essentially relies on the retained monotonicity
//*     - Specifically, a range maximum query over a monotone condition (here, it is an increasing subsequence)
function maxEnvelopes(envelopes) {
  //* The max no.of stacked envelopes in an array of one is 1
  if (envelopes.length === 1) return 1;

  //* Sort based on width in ASC, then height in DESC in the case of ties
  envelopes.sort((a, b) => {
    if (a[0] === b[0]) return b[1] - a[1];
    return a[0] - b[0];
  });

  const subsequence = [];

  //* Find the LIS based on height values
  for (let i = 0; i < envelopes.length; i++) {
    const height = envelopes[i][1];

    //* Left Bisect to find the earliest insertion position for `height` (in SUBSEQUENCE)
    const index = leftBisect(subsequence, height);

    if (index === subsequence.length) {
      //* This envelope can fit all of the previous envelopes
      subsequence.push(height);
    } else {
      //* Overwrite a previous envelope's height (maintain monotonicity)
      subsequence[index] = height;
    }
  }

  return subsequence.length;
}

function leftBisect(nums, target) {
  //* The insertion position is in the range [0, n] inclusive
  let left = 0;
  let right = nums.length;

  while (left < right) {
    //* `mid` represents the index of the "current" insertion positio
    const mid = left + ((right - left) >> 1);

    if (nums[mid] >= target) {
      right = mid; //* Found the candidate or it exists in the left partition
    } else {
      left = mid + 1; //* The insertion position exists in the right partition
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

//* Time: O(n log n) - For each envelope (n), we perform a binary search (O(log n))

//* Space: O(n) - In the worst case, we create a subsequence of `n` length (equal to envelopes.length)
