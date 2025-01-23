//* Try every possible pair
function numIdenticalPairs(nums) {
  //* There aren't enough elements to create pairs with`
  if (nums.length <= 1) return 0;

  let goodPairs = 0;

  //* Try every possible pair
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      //* Found a good pair
      if (nums[i] === nums[j]) {
        goodPairs++;
      }
    }
  }

  return goodPairs;
}

console.log(numIdenticalPairs([1, 2, 3, 1, 1, 3])); //* 4
console.log(numIdenticalPairs([1, 1, 1, 1])); //* 6
console.log(numIdenticalPairs([1, 2, 3])); //* 0
console.log(numIdenticalPairs([5, 5])); //* 1

//* Time: O(n^2) - We have to try every possible pair, which entails a nested for loop
//* Both of which individually scale with the size of the input (n)

//* Space: O(1) - The space usage remains constant regardless of input size
