//! TLE - Don't run it
//* A continuous array can be thought of as:
//*     - An array where (when nums is sorted) each successive element is 1 greater than the previous
//* So for example, [1, 2, 3] is continuous
//*     - As is [4, 6, 7, 5], because sorted, we get [4, 5, 6, 7]
//* We have a RANGE of elements that start at the MINIMUM and end at the MAXIMUM
//*     - The range in question is: [x...x + n - 1]
//* If "x" = 4, and the array length is 4
//*     - Then we get a continous array of [4...7]
//* This checks our with the official definition of a continuous array
//*     - Every element in unique (frequency of 1)
//*     - The difference between the max and min is equal to nums.length - 1
//* [4, 5, 6, 7]:
//*     - Has all unique elements
//*     - (7 - 4 = 3) === (4 - 1) === 3
//* So in a brute force manner, we can try "starting" with EVERY distinct value in nums (x)
//* Then, for each "x", we count how many elements in the range [x...x + n - 1] DON'T exist in nums
//*     - The count tells us how many element we'd need to to change if we STARTED with "x"
//* So we take the MINIMUM of all possible starting points of "x"
function minOperations(nums) {
  //* An array with 1 element is continuous ([x...x + n - 1])
  if (nums.length === 1) return 0;

  const n = nums.length;
  const distinct = new Set(nums); //* For fast lookups to determine if "x" exists in the array
  let operations = Infinity;

  //* Use every distinct element in nums to start the sequence [x...x + n - 1]
  for (let x of distinct) {
    //* No. of elements we have to CHANGE to make nums continous if we start with "x"
    let missing = 0;

    //* Count how many elements in the range [x, x + n - 1] DON'T exist in nums
    for (let num = x; num <= x + n - 1; num++) {
      if (!distinct.has(num)) {
        missing++;
      }
    }

    //* Min no. of operations needed to make nums continuous
    operations = Math.min(operations, missing);
  }

  return operations;
}

console.log(minOperations([4, 2, 5, 3])); //* 0
console.log(minOperations([1, 2, 3, 5, 6])); //* 1
console.log(minOperations([1, 10, 100, 1000])); //* 3
console.log(minOperations([1, 1, 1])); //* 2
console.log(minOperations([1, 1, 3])); //* 1
console.log(minOperations([1, 5, 3, 2])); //* 1

//* Time: O(n^2) - In the worst case, every element in nums is unique
//* So for each outer iterations (n), there are n inner iterations

//* Space: O(n) - If every element in nums is unique, the set contains "n" elements
