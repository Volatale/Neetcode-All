//* In a brute force manner, check every possible pair
//* This is the simplest way to solve the problem
function numIdenticalPairs(nums) {
  //* Can't make a pair with 0 or 1 elements (indices)
  if (nums.length <= 1) return 0;

  let goodPairs = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j]) {
        goodPairs++;
      }
    }
  }

  return goodPairs;
}

console.log(numIdenticalPairs([1, 2, 3, 1, 1, 3])); //* 4
console.log(numIdenticalPairs([1, 2, 3, 1, 2, 3])); //* 3
console.log(numIdenticalPairs([5, 1, 2, 3])); //* 0
console.log(numIdenticalPairs([10])); //* 0
console.log(numIdenticalPairs([4, 4, 3])); //* 1

//* Time: O(n^2) - We have a nested for loop, so the time taken is quadratic
//* The outer for loop runs "n" times and so does the inner for loop (n * n === n^2)

//* Space: O(1) - We only use constant space; the memory usage does not scale with the input size
