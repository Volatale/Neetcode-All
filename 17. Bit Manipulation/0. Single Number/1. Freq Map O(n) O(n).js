//* Track the frequency of each number
//* Iterate over the array again and find the element that only occurred onec
function singleNumber(nums) {
  //* There is only one number, so that is the single number
  if (nums.length === 1) return nums[0];

  const freq = {};

  //* Increment the frequency of each number
  for (let i = 0; i < nums.length; i++) {
    freq[nums[i]] = (freq[nums[i]] || 0) + 1;
  }

  //* Find the number that only occurs a single time
  for (let i = 0; i < nums.length; i++) {
    if (freq[nums[i]] === 1) return nums[i];
  }
}

console.log(singleNumber([2, 2, 1])); //* 1
console.log(singleNumber([4, 1, 2, 1, 2])); //* 4
console.log(singleNumber([1])); //* 1
console.log(singleNumber([-1])); //* -1
console.log(singleNumber([5, 3, -2, 3, 5, -2, -4])); //* -4

//* Time: O(n) - Iterating through the input takes O(n), and we do this twice

//* Space: O(n) - There will always be an odd number of elements in the input array
//* All of them except one has a duplicate, so the number of keys / values is n / 2 + 1
