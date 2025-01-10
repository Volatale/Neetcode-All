//* Create a variable to hold the "ultimate" value as we go
//* The logic works similarly to how a prefix sum works
//* "Result" will be updated as we process the array elements
function reduce(nums, fn, init) {
  if (nums.length === 0) return init;

  let result = init;

  //* Apply the reducer function to every
  for (let val of nums) {
    result = fn(result, val);
  }

  return result;
}

console.log(reduce([1, 2, 3, 4], (acc, curr) => acc + curr, 0)); //* 10
console.log(reduce([1, 2, 3, 4], (acc, curr) => acc + curr * curr, 100)); //* 130
console.log(reduce([], (acc, curr) => 0, 25)); //* 25

//* Time: O(n) - We have to iterate over the input array, whose size varies

//* Space: O(1) - We are not using any additional space that will scale with the input size
