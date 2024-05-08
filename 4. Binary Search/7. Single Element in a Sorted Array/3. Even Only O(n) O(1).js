//* Mathematically, the element HAS to exist at an even index
//* Array is always odd length (2 * n + 1)
//* "n" = no. of elements with a pair, + 1 for the singular element
//* So [1, 1, 2, 2, 3], n = 2. (2 * 2 = 4) + 1 for the solo = length of 5

//* [1, 2, 2] or [1, 1, 2] are the valid arrays for length = 3
//* Singular element HAS to be surrounded by the array bounds + a pair, or a pair on both sides to be valid
//* [2, 1, 2] is not a valid array, neither is [1, 2, 1]. They aren't sorted
//* It HAS to be [1, 2, 2], or [1, 1, 2], these are in sorted order (index 0, or index 2 are valid)
//* Otherwise we can't guarantee that ONE element has a singular, and the others are pairs
//* Check each even index and see if there is a duplicate
function singleNonDuplicate(nums) {
  //* Element has to exist at an even index, so skip the odds
  for (let i = 0; i < nums.length; i += 2) {
    //* If at the boundaries of the array, there is no number on that side
    //* So only check the other side
    if (
      (i - 1 < 0 || nums[i] !== nums[i - 1]) &&
      (i + 1 === nums.length || nums[i] !== nums[i + 1])
    ) {
      return nums[i];
    }
  }
}

console.log(singleNonDuplicate([1, 2, 2])); //* 1
console.log(singleNonDuplicate([1, 1, 2, 3, 3])); //* 2
console.log(singleNonDuplicate([1, 1, 2, 3, 3, 4, 4, 8, 8])); //* 2
console.log(singleNonDuplicate([3, 3, 7, 7, 10, 11, 11])); //* 10
console.log(singleNonDuplicate([50, 51, 51, 52, 52])); //* 50
console.log(singleNonDuplicate([0, 0, 1, 2, 2])); //* 1

//* Time: O(n) - Technically the time complexity is O(n / 2), but we drop constants
//* We skip every odd index, so we only really process half of the elements in total

//* Space: O(1) - The space usage remains the same regardless of input size
