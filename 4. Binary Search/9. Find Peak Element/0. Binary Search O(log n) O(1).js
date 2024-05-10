//* The intuition to use Binary Search comes from multiple factors
//* We are given the constraint "nums[i] != nums[i + 1] for all valid i."
//* This means you don't end up in a situation like [1, 1, 1]
//* One crucial element of binary search is to ALWAYS have a direction to search in
//* In THIS problem, we don't have a "general" monotonic element, but we have a "local" one
//* At each index, since we KNOW the left and right are NOT equal to the current element
//* They have to be different, so we should favor the direction of the LARGER element (than nums[i])
//* The problem states that index 0 and index n - 1 are strictly greater than the side with no neighbors
//* So even in a situation like: [5, 4, 3, 2, 1], we can travel to any corner and find a peak
//* 5 > 4 (on the right side), 5 > out of bounds (on the left side), so we found a peak element
//* We are allowed to return ANY peak element, and the array can have multiple
//* Even if the array was [1, 2, 3, 4, 5], the same applies (keep travelling right, which is the larger element)
//* [1, 2, 3, 4, 2], here, the peak element is "4" (index 3), we traveled right, and converged on index 3
function findPeakElement(nums) {
  //* The search space is the array itself
  let left = 0;
  let right = nums.length - 1;

  //* Both left and right converge on a peak element
  while (left < right) {
    //* Mid is the element we are testing for peak
    let mid = left + ((right - left) >> 1);

    //* Travel in the direction of the side with the larger element
    if (nums[mid] > nums[mid + 1]) {
      right = mid; //* Mid element could be a potential peak
    } else {
      left = mid + 1; //* Larger value is on the left
    }
  }

  //* Index of a peak element
  return left;
}

console.log(findPeakElement([10])); //* 0 (10)
console.log(findPeakElement([1, 5, 2])); //* 1 (5)
console.log(findPeakElement([1, 2, 5, 1])); //* 2 (5)
console.log(findPeakElement([1, 2, 3, 7])); //* 3 (7)
console.log(findPeakElement([1, 2, 3, 7])); //* 3 (7)
console.log(findPeakElement([55, 66, 67, 68, 69])); //* 4 (69)
console.log(findPeakElement([1, 2, 1, 3, 5, 6, 4])); //* 5 (6)

//* Time: O(log n) - We halve the search space each iteration of the loop

//* Space: O(1) - The space usage does not scale with the input size
