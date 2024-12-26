//* We can use a set to track what numbers exist in the set
//* Every time we find a number that exists in the set
//*     - We can increment a variable to track which number is missing
function missingNumber(nums) {
  const uniques = new Set(nums);
  let missing = 0;

  //* Try removing every individual number
  for (let i = 0; i < nums.length; i++) {
    if (uniques.has(i)) {
      missing++;
    }
  }

  return missing;
}

console.log(missingNumber([3, 0, 1])); //* 2
console.log(missingNumber([0, 1])); //* 2
console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1])); //* 8
console.log(missingNumber([0])); //* 1

//* Time: O(n) - It takes O(n) to create the set, and O(n) to find the missing number

//* Space: O(n) - The set's size scales with the number of elements in the input
