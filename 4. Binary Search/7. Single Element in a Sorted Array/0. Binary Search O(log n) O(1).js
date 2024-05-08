//* The array ALWAYS has an odd amount of elmeents
//* 2 * n + 1, where "n" is the number of pairs, and the 1 represents the singular element
//* So if there are 3 pairs, 2 * 3 = 6 + 1 = 7 length etc etc...

//* The element is GUARANTEED to exist within the array
//* So we do while(left <= right) just in case we are left with only 1 element to check
//* If the mid element has no duplicates on the left AND the right, THAT is the singular element
//* Otherwise, check which side the duplicate exists on
//* If it is on the left, the "left" side of the array has mid - 1 elements (excluding the duplicate on the left)
//* The singular element exists on the side that has an ODD number of elements
function singleNonDuplicate(nums) {
  //* Search space exists within the array itself
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    //* Divides by 2, truncates decimals, rounds down
    let mid = left + ((right - left) >> 1);

    //* Both left & right don't match nums[mid], so THIS is the singular element
    if (
      (mid - 1 < 0 || nums[mid] !== nums[mid - 1]) &&
      (mid + 1 === nums.length || nums[mid] !== nums[mid + 1])
    ) {
      return nums[mid];
    }

    //* Check how many elements the left side has (excluding the duplicate if it exists)
    const leftSide =
      nums[mid] === nums[mid - 1] && mid - 1 >= 0 //* Duplicate on left AND within bounds
        ? mid - 1
        : mid;

    //* If leftside has an ODD number of elements, the singular exists over there
    //* In that case, we KNOW the right side has an even amount, thus the singular cannot exist in that side
    if (leftSide & 1) {
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

//* Time: O(log n) - We halve the search space each iteration of the loop

//* Space: O(1) - The space usage remains the same regardless of input size
