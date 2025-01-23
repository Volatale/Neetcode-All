//* Use a hashtable to track the number of occurrences of each number
//*     - There is no need to perform a nested for loop
//* Lets say we have an array like [1, 1, 1, 1]
//* At i = 0, we have found 0 occurrences of 1, so we can't pair this
//*     - Increment the frequency of 1 (we can pair this 1 with every other subsequent 1)
//* At i = 1, we have yet another 1, so we can pair this 1 with the 1 we already found
//*     - Now, increment the frequency of 1 again (we now have 2)
//* At i = 2, we can pair this 1 with the other 2 occurrences of 1 we found thus far
//* Essentially, we can make "freq[nums[i]]" pairs in every iteration
//*     - If nums[i] does not exist in freq, then we make "0" pairs instead
//* The logic is similar to Two Sum (track what we have seen thus far) and Prefix Sums
function numIdenticalPairs(nums) {
  //* There aren't enough elements to create pairs with`
  if (nums.length <= 1) return 0;

  let goodPairs = 0;
  const freq = {}; //* Tracks the frequency of each element

  //* For each duplicate number we find, pair it with the ones we've seen
  for (let num of nums) {
    goodPairs += freq[num] || 0; //* Pair nums[i] with every other occurrence of nums[i]
    freq[num] = (freq[num] || 0) + 1; //* Found another occurrence of nums[i]
  }

  return goodPairs;
}

console.log(numIdenticalPairs([1, 2, 3, 1, 1, 3])); //* 4
console.log(numIdenticalPairs([1, 1, 1, 1])); //* 6
console.log(numIdenticalPairs([1, 2, 3])); //* 0
console.log(numIdenticalPairs([5, 5])); //* 1

//* Time: O(n) - We only have to iterate through the entire array once
//* So the time taken scales with the size of the input

//* Space: O(n) - In the worst case, every number is unique
//* Which means there will be "n" keys and values stored within the hashtable
