//* Use a two pointer approach
//* "positive" marks the index of the next POSITIVE element
//* "negative" marks the index of the next NEGATIVE element
//* If nums[i] > 0, then we know it is a POSITIVE element
//*     - So we set result[positive] = nums[i]
//! Then, we increment positive by 2, because we know the NEXT positive is 2 indices ahead
//* Why is positive = 0 and negative = 1?
//*     - Because the resulting array must BEGIN with a positive
function rearrangeArray(nums) {
  const result = new Array(nums.length).fill(0);

  //* Two Pointers to indicate index of next pos/neg
  let positive = 0;
  let negative = 1;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      result[positive] = nums[i];
      positive += 2; //* Skip 2 ahead
    } else if (nums[i] < 0) {
      result[negative] = nums[i];
      negative += 2;
    }
  }

  return result;
}

console.log(rearrangeArray([3, 1, -2, -5, 2, -4])); //* [3, -2, 1, -5, 2, -4]
console.log(rearrangeArray([-1, 1])); //* [1, -1]
console.log(rearrangeArray([10, -4, 10, -4])); //* [10, -4, 10, -4]
console.log(rearrangeArray([-2, 1, 3, -5, 2, -4])); //* [1, -2, 3, -5, 2, -4]

//* Time: O(n) - We iterate over the entire array once, and then O(n / 2) times the second
//* So the time taken scales with "n"

//* Space: O(1) - We aren't counting the result array's memory usage, so the memory usage is O(1)
