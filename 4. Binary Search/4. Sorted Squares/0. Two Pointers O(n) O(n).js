//* Negative * Negative = Positive
//* -a * -b = c

//* The left and right portions of the array result in larger squares than the middle
//* [-4, 5], -4 * -4 = 16, 5 * 5 = 25. So 16 is a smaller square, which means that 25 would go first in the array
function sortedSquares(nums) {
  const squares = [];

  //* Two Pointers - Sstart on both sides
  let left = 0;
  let right = nums.length - 1;

  //* Iterate backwards so we start with the LARGER values
  for (let i = nums.length - 1; i >= 0; i--)
    //* Test the absolute value because that is faster than squaring for tests
    if (Math.abs(nums[left]) > Math.abs(nums[right])) {
      squares[i] = nums[left] * nums[left];
      left++;
    } else {
      squares[i] = nums[right] * nums[right];
      right--;
    }

  return squares;
}

console.log(sortedSquares([-4, -1, 0, 3, 10])); //* [0, 1, 9, 16, 100]
console.log(sortedSquares([-7, -3, 2, 3, 11])); //* [4, 9, 9, 49, 121]

//* Time: O(n) - It takes O(n) time to iterate through the entire array

//*Space: O(n) - The squares array scales in size proportionally with the input size
