//* We can't change the order of the numbers
//* So the only information we can use is what we have already seen thus far
//*     - Use a hashtable to track the frequency of numbers seen before
//* One observation is that if we have seen a number before, we know we can make a pair
//*     - For example: [1, 1, 1], at index 1, we know we've already seen 1 (once)
//*     - Thus, at index 1, we have 1 good pair
//*         - At index 2, we've seen TWO of them, so THIS 1 can pair with BOTH previous 1s
//*         - So at index 3, we have 3 good pairs (0, 1) (0, 2) (1, 2)
function numIdenticalPairs(nums) {
  //* Can't make a pair with 0 or 1 elements (indices)
  if (nums.length <= 1) return 0;

  let goodPairs = 0;
  const freq = {}; //* Tracks the count of numbers we've seen thus far

  for (let num of nums) {
    goodPairs += freq[num] || 0; //* This number pairs with every equal number found
    freq[num] = (freq[num] || 0) + 1; //* Found another occurrence of it
  }

  return goodPairs;
}

console.log(numIdenticalPairs([1, 1, 1, 1])); //* 6
console.log(numIdenticalPairs([1, 2, 3, 1, 1, 3])); //* 4
console.log(numIdenticalPairs([1, 2, 3, 1, 2, 3])); //* 3
console.log(numIdenticalPairs([5, 1, 2, 3])); //* 0
console.log(numIdenticalPairs([10])); //* 0
console.log(numIdenticalPairs([4, 4, 3])); //* 1

//* Time: O(n) - We iterate through the array once, which takes O(n) time

//* Space: O(n) - In the worst case, every number is unique, so the frequency map stores "n" keys/values
