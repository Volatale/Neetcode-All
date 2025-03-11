//! Sorted Array
//*     - Consists of integers
//*     - Every element appears TWICE, except for ONE that appears once
//* There are (n - 1) elements with duplicates
//* And there is only 1 extra
//* For example: [1, 1, 2, 2, 3]
//*     - The length of the array is 5
//*     - (5 - 4) = 1 singular element
//* Determine what side the singular element is on
//*     - Case 1: The "mid" element is the singular
//*     - Case 2: The singular element is on the left
//*     - Case 3: The singular element is on the right
//* If nums[mid] === nums[mid - 1]
//*     - Then count how many elements exists on the left BEFORE mid - 1
//* For example: [1, 2, 2, 3, 3]
//*     - Mid would be 2 initially
//*     - nums[mid] === nums[mid - 1]
//*         - So excluding mid and mid - 1, there is 1 element on the left
//! The number of elements on the left would THEREFORE BE ODD
//* Thus, we know the number of elements on the RIGHT has to be EVEN
//* Since there is only ONE element with a singular occurrences, it has to be on the ODD side
//! We can use Binary Search since the array is sorted
//*     - The search space is the array itself (since we are looking for an array element)
function singleNonDuplicate(nums) {
  //* The array itself is the search space
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    //* The index we are searching to find the single element
    const mid = left + ((right - left) >> 1);

    //* If it !== the previous OR the next element, we found the single element
    if (
      (mid - 1 < 0 || nums[mid - 1] !== nums[mid]) &&
      (mid + 1 === nums.length || nums[mid] !== nums[mid + 1])
    ) {
      return nums[mid];
    }

    //* Determine how many elements exist on the left side of the array
    const countOnLeft =
      mid - 1 >= 0 && nums[mid - 1] === nums[mid] ? mid - 1 : mid;

    //* Search the side with the odd number of elements
    if (countOnLeft & 1) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
}

console.log(singleNonDuplicate([1, 2, 2])); //* 1
console.log(singleNonDuplicate([1, 1, 2, 3, 3])); //* 2
console.log(singleNonDuplicate([1, 1, 2, 3, 3, 4, 4, 8, 8])); //* 2
console.log(singleNonDuplicate([3, 3, 7, 7, 10, 11, 11])); //* 10
console.log(singleNonDuplicate([50, 51, 51, 52, 52])); //* 50
console.log(singleNonDuplicate([0, 0, 1, 2, 2])); //* 1

//* Time: O(log n) - We eliminate half of the search space every iteration

//* Space: O(1) - The memory usage remains constant regardless of the input size
