//* We are given a SORTED array consisting of only integers that appear exactly twice
//* Except ONE integer appears once
//* The goal is to return the single element that appears once
//! We know the array is sorted, and we need to search for an element within the array
//* Thus, our search space is sorted (exhibits non-decreasing monotonicity)
//* Therefore, binary search is a possible solution
//* The array ALWAYS has an odd length
//*     - 2n + 1, where `n` is the number of pairs and 1 represents the singular element
//*     - If there are 3 pairs, then the length is 7 (3 * 2 + 1 = 7)
//! If the PREVIOUS (i - 1) element and the NEXT (i + 1) element do not match mid
//*     - Then we know the current element is the singular element
//* Otherwise, the singular element exists on the side with the ODD amount of elements
//*     - If we have [1, 1, 2, 2, 3, 4, 4]
//*       Imagine mid = index 3 (the previous element also === 2, so we know this isn't the result)
//*       If we take a subarray of [1, 1, 2, 2] and we remove the 2s, that gives us [1, 1]
//*       [1, 1] has an EVEN length, which means the single element doesn't exist on the left
//*       Which means it has to exist on the right (so search on the right)
//* Mathematically, the singular element must exist at an EVEN index
function singleNonDuplicate(nums) {
  //* The search space is the array itself
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + ((right - left) >> 1);

    //* If both left/right don't match nums[mid], nums[mid] is the singular element
    if (
      (mid - 1 < 0 || nums[mid - 1] !== nums[mid]) &&
      (mid + 1 === nums.length || nums[mid + 1] !== nums[mid])
    ) {
      return nums[mid];
    }

    //* Check how many elements exist on the left side (excluding the duplicate)
    const elementsOnLeft =
      mid - 1 >= 0 && nums[mid - 1] === nums[mid] ? mid - 1 : mid;

    if (elementsOnLeft & 1) {
      right = mid - 1; //* Search right
    } else {
      left = mid + 1; //* Search left
    }
  }

  //* Execeptional circumstances
  return undefined;
}

console.log(singleNonDuplicate([1, 2, 2])); //* 1
console.log(singleNonDuplicate([1, 1, 2, 3, 3])); //* 2
console.log(singleNonDuplicate([1, 1, 2, 3, 3, 4, 4, 8, 8])); //* 2
console.log(singleNonDuplicate([3, 3, 7, 7, 10, 11, 11])); //* 10
console.log(singleNonDuplicate([50, 51, 51, 52, 52])); //* 50
console.log(singleNonDuplicate([0, 0, 1, 2, 2])); //* 1

//* Time: O(log n) - The search space is halved every iteration, so the time taken is logarithmic

//* Space: O(1) - The memory usage remains constant regardless of input size
