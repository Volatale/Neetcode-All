//* Starting from each "i", track the number of occurrences
//* If the frequency is 0, this is the missing number
//* Whereas if the frequency is 2, we found number with a duplicate
function findErrorNums(nums) {
  let duplicate = -1;
  let missing = -1;

  //* Try every possible number in range [1, n)
  for (let i = 1; i <= nums.length; i++) {
    let count = 0;

    //* Count occurrences of "i"
    for (let j = 0; j < nums.length; j++) {
      if (nums[i] === i) {
        count++;
      }
    }

    if (count === 2) {
      duplicate = i;
    } else if (count === 0) {
      missing = i;
    }
  }

  return [duplicate, missing];
}

console.log(findErrorNums([1, 2, 2, 4])); //* [2, 3]
console.log(findErrorNums([1, 1])); //* [1, 2]
console.log(findErrorNums([1, 2, 3, 4, 5, 6, 4])); //* [4, 7]

//* Time: O(n^2) - We are using a nested for loop to count the occurrences of each number

//* Space: O(1) - The memory used does not scale with the input size
//* We always use the same amount of memory
