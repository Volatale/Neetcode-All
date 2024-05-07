//* Negative * Negative = Positive
//* -a * -b = c
function sortedSquares(nums) {
  const squares = [];

  //* Square each element
  for (let i = 0; i < nums.length; i++) {
    squares.push(nums[i] * nums[i]);
  }

  //* Return the sorted array
  return squares.sort((a, b) => a - b);
}

console.log(sortedSquares([-4, -1, 0, 3, 10])); //* [0, 1, 9, 16, 100]
console.log(sortedSquares([-7, -3, 2, 3, 11])); //* [4, 9, 9, 49, 121]

//* Time: O(n log n) - It takes O(n) time to iterate through the array
//* It takes O(1) time to square an element
//* At the end, we return a sorted array, which takes O(n log n)

//* Space: O(n) - We return an array whose size scales proportionally with the input size
