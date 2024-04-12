//* If you encounter a negative, swap the sign to negative
function arraySign(nums) {
  let sign = 1;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) return 0;

    if (nums[i] < 0) {
      sign = -sign; //* -sign = -sign = (positive) sign
    }
  }

  return sign;
}

console.log(arraySign([-1, -2, -3, -4])); //* 1
console.log(arraySign([-1, -2, -3, -4, -4])); //* -1
console.log(arraySign([-1, -2, -3, -4, 0])); //* 0
console.log(arraySign([1])); //* 1
console.log(arraySign([0])); //* 0
console.log(arraySign([-1, -2, -3, -4, 1, 2, 3, 4])); //* 1
console.log(arraySign([-1, -2, -3, -4, -5, 1, 2, 3, 4])); //* -1

//* Time: O(n) - It takes O(n) in the worst case to iterate through the whole array

//* Space: O(1) - We use constant extra space
