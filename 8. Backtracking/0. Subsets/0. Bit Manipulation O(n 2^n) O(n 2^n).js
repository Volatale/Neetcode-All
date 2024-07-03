//* For every number "i"
//* Check if the "jth" bit is set
//* If it is, add it to the subset
function subsets(nums) {
  const results = [];

  //* There are 2^n subsets in total
  for (let i = 0; i < 1 << nums.length; i++) {
    const subset = [];

    for (let j = 0; j < nums.length; j++) {
      //* Check if the "jth" bit of "i" is set
      if (i & (1 << j)) {
        subset.push(nums[j]);
      }
    }

    results.push(subset);
  }

  return results;
}

console.log(subsets([1, 2, 3]));
console.log(subsets([1]));
console.log(subsets([1, 2, 3, 4, 5]));

//* Time: O(n * 2^n)
//* There are 2^n outer loop iterations
//* Within each iteration, we do an O(n) loop

//* Space: O(n * 2^n) - Each subset created has an average length of n / 2
//* The number of subsets created scales at a rate of 2^n
