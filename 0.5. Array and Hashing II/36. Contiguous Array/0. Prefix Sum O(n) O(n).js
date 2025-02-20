//* Instead of trying every possible subarray
//* We can employ a prefix sum approach
//* Track the cumulative number of zeroes and ones up to the current index
//* Then, we can determine whether we have an equal amount using math
//*     - If ones - zeroes === 0, then we know we have an equal amount
//*     - Otherwise, there is a mismatch somewhere
//* Ultimately, we want to find a prefix we can cut off such that we get a balanced count
//* Since we want to MAXIMIZE the length of the resulting subarray
//*     - We should MINIMIZE the prefixes we decide to cut
//*     - Thus, it is a good idea to only record the FIRST occurrence of each difference
//* If the number of zeroes and ones is the same, then just take the sum of both
//*     - Since we essentially take the entire block of elements at that point
//* Otherwise, we take the maximum between the current maximum, and the distance betwen i and the current diff
//* A prefix sum is calculated via:
//*     - pref_i - pref_j - 1 = k
//* So in our case, we are using the index stored at diffIndex[diff] as the "j-1"
//*     - Anything prior to and including this index is cut off
//* And "i" is the current index
function findMaxLength(nums) {
  //* Impossible to have an equal amount AND length > 0
  if (nums.length <= 1) return 0;

  let maxLength = 0;

  //* First Found difference of "diff" at "index"
  const diffIndex = {};
  let zeroes = 0;
  let ones = 0;

  for (let i = 0; i < nums.length; i++) {
    nums[i] === 0 ? zeroes++ : ones++;

    //* If "diff" === 0, then the counts are balanced
    const diff = Math.abs(ones - zeroes);

    //* Found a unique difference (we ONLY want the first occurrence)
    if (diffIndex[diff] === undefined) {
      diffIndex[diff] = i;
    }

    if (zeroes === ones) {
      maxLength = zeroes + ones;
    } else {
      //* pref_i - pref_j - 1 gives us the length of the subarray
      maxLength = Math.max(maxLength, i - diffIndex[diff]);
    }
  }

  return maxLength;
}

console.log(findMaxLength([0, 1])); //* 2
console.log(findMaxLength([0, 1, 1, 0])); //* 4
console.log(findMaxLength([1, 1, 1])); //* 0
console.log(findMaxLength([0])); //* 0
console.log(findMaxLength([0, 1, 0])); //* 2
console.log(findMaxLength([0, 1, 1, 0, 1, 1, 1, 0])); //* 4
console.log(findMaxLength([1, 1, 0, 0, 0, 1, 1, 1])); //* 6
console.log(findMaxLength([0, 0, 1, 0, 0, 0, 1, 1])); //* 6

//* Time: O(n) - It takes O(n) to iterate through the input

//* Space: O(n) - The memory used by the hashtable scales with the input size
