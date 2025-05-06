//* We are given an array of (n) integers whose values are between [1, n]
//* And we need to return an array of all of the integers that do not appear in the array
//* If "n" = 3, for example, any of the following arrays are valid:
//*     - [1, 2, 3]
//*     - [3, 3, 3]
//*     - [1, 1, 2]
//*     - etc.
//* The array may also contain duplicates
//* Since we know all of the elements inn the array are in the range [1, n]
//*     - This implicitly means that the array contains no negative numbers
//*     - And it also means the array doesn't contain numbers > n, nor does it contain 0
//* Thus, we can use Cyclic Sort to rearrange the elements in the array
//* After doing so, all of the non-duplicate elements will be in the first "k" indices
//*    - Where "k" is the number of unique elements in the array
//* Then, we can simply iterate through and check if the value at index "i" = i + 1
//*     - If it is not, then we know the value "i + 1" is missing
function findDisappearedNumbers(nums) {
  //* There are no missing numbers
  if (nums.length === 0) return [];

  const missingNumbers = [];
  let i = 0;

  //* Perform Cyclic Sort
  while (i < nums.length) {
    const correctIndex = nums[i] - 1; //* Elements are in the range [1, n]; subtract 1

    if (nums[i] !== nums[correctIndex]) {
      [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
    } else {
      i++;
    }
  }

  //* Find all of the missing numbers (numbers that do not exist in the set)
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) {
      missingNumbers.push(i + 1);
    }
  }

  return missingNumbers;
}

console.log(findDisappearedNumbers([1, 4, 4, 2])); //* [3]
console.log(findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1])); //* [5, 6]
console.log(findDisappearedNumbers([1, 1])); //* [2]
console.log(findDisappearedNumbers([1, 2, 3])); //* []

//* Time: O(n) - We iterate through the input array, and create the set

//* Space: O(1) - Cyclic sort allows us to sort the array in place
//* Thus, the memory usage remains constant regardless of input size
