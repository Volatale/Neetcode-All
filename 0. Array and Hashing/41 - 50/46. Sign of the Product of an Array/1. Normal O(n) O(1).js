//* The main realisation is that x * 0 = 0
//* 1 * 2 * 3 = 6
//* 1 * 2 * 3 * 0 = 0
//* So once we hit 0, we will never get out of that
function arraySign(nums) {
  let product = 1;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) return 0;
    product *= nums[i];
  }

  if (product === 0) return 0;

  return product > 0 ? 1 : -1;
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
