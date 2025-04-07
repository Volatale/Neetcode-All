//* We always want to smash the two HEAVIEST stones together
//* So one thing we can do is sort the array, which puts the heaviest at the END of the array
//* That way, whenever we need to smash two stones together, we can just pop() twice
//! One of the other benefits of sorting is that the stone weights are monotonically non-decreasing
//*     - Thus, we can say the array exhibits a monotonic property
//*     - stones[i] <= stones[i + 1] <= stones[i + 2] <= ... stones[n]
//* Only ONE (at most) will need to be pushed back into the array each iteration
//* Why? Because there are only two cases that can occur:
//*     - x === y, which means neither stone exists (both are destroyed)
//*     - x !== y, which means a new stone of weight (x - y) is created
//* If we have a stone that needs to be placed back into the array, then we should do that
//! But remember that the array is monotonically non-decreasing
//*     - So we use binary search to find the (rightmost) insertion position
//*         - We want the rightmost insertion index because if the array has duplicates, we shift less
//*         - Imagine we have [1, 1, 1], and we want to insert 1, inserting at the end is better than any earlier index
//*             - Inserting at the END ensures we get the least number of shifts (so it is more efficient) in cases of duplicates
//*     - Then, we splice the stone (weight) into the array
//* This ensures the array remains sorted in a monotonically non-decreasing manner
function lastStoneWeight(stones) {
  //* There is only one stone, so just return that
  if (stones.length === 1) return stones[0];

  //* Sort the array so the weights are monotonically non-decreasing
  stones.sort((a, b) => a - b);

  while (stones.length > 1) {
    //* Get the two heaviest stones (length > 1, so there are at least 2)
    const x = stones.pop();
    const y = stones.pop();

    //* Then we need to insert the resulting stone (but retain monotonicity)
    if (x - y > 0) {
      //* Rightmost insertion index (skips some shifts with duplicates that bisectLeft would do)
      const index = bisectRight(stones, x - y);
      stones.splice(index, 0, x - y);
    }
  }

  //* Return the weight of the final stone (if it exists) and 0 otherwise
  return stones.length === 1 ? stones[0] : 0;
}

function bisectRight(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + ((right - left + 1) >> 1);

    if (nums[mid] <= target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  //* Rightmost Insertion index of target
  return left;
}

console.log(lastStoneWeight([2, 7, 4, 1, 8, 1])); //* 1
console.log(lastStoneWeight([1])); //* 1
console.log(lastStoneWeight([4, 4, 4, 4])); //* 0
console.log(lastStoneWeight([4, 4, 4, 4, 5])); //* 3
console.log(lastStoneWeight([1, 1])); //* 0
console.log(lastStoneWeight([5])); //* 5
console.log(lastStoneWeight([100, 100, 100])); //* 100

//* Time: O(n^2) - Sorting the stones array takes O(n log n)
//* Within each while loop iteration, we may have to binary search (O(log n))
//* And we may also have to splice the array - in the worst case we insert into index 0
//* If this happens every iteration, then we shift all "n" elements n times (O(n^2))

//* Space: O(sort) - The maximum size of the stones array never exceeds "n" itself
//* However, depending on the sorting algorithm used, some memory is necessary (merge sort uses O(n) memeory)
