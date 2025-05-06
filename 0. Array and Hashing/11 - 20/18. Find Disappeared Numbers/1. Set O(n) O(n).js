//* We are given an array of (n) integers whose values are between [1, n]
//* And we need to return an array of all of the integers that do not appear in the array
//* If "n" = 3, for example, any of the following arrays are valid:
//*     - [1, 2, 3]
//*     - [3, 3, 3]
//*     - [1, 1, 2]
//*     - etc.
//* The array may also contain duplicates
//* We can iterate through the array and store the unique values in a set
//* Then, we can iterate through the range [1, n] (inclusive) and check if the set contains the value
//* If it does not, then the current value is missing
function findDisappearedNumbers(nums) {
  //* There are no missing numbers
  if (nums.length === 0) return [];

  const missingNumbers = [];
  const uniqueNumbers = new Set(nums);

  //* Find all of the missing numbers (numbers that do not exist in the set)
  for (let i = 1; i <= nums.length; i++) {
    if (!uniqueNumbers.has(i)) {
      missingNumbers.push(i);
    }
  }

  return missingNumbers;
}

console.log(findDisappearedNumbers([1, 4, 4, 2])); //* [3]
console.log(findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1])); //* [5, 6]
console.log(findDisappearedNumbers([1, 1])); //* [2]
console.log(findDisappearedNumbers([1, 2, 3])); //* []

//* Time: O(n) - We iterate through the input array, and create the set

//* Space: O(n) - In the worst case, the set's size is equal to the input array
//* This occurs when all of the elements in the input array are unique
