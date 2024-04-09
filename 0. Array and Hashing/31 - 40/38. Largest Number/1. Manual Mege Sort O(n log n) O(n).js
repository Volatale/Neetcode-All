function largestNumber(nums) {
  nums = mergeSort(nums);

  if (nums[0] === 0) return "0";
  return nums.join("");
}

function mergeSort(nums) {
  if (nums.length <= 1) return nums;

  let left = 0;
  let right = nums.length - 1;
  let mid = left + Math.floor((right - left) / 2);

  const leftArr = [];
  const rightArr = [];

  for (let i = 0; i <= mid; i++) {
    leftArr.push(nums[i]);
  }

  for (let i = mid + 1; i < nums.length; i++) {
    rightArr.push(nums[i]);
  }

  const sortedLeft = mergeSort(leftArr);
  const sortedRight = mergeSort(rightArr);

  return merge(sortedLeft, sortedRight);
}

function merge(left, right) {
  const results = [];

  let i1 = 0;
  let i2 = 0;

  while (i1 < left.length && i2 < right.length) {
    const leftChar = String(left[i1]);
    const rightChar = String(right[i2]);

    if (leftChar + rightChar > rightChar + leftChar) {
      results.push(left[i1++]);
    } else {
      results.push(right[i2++]);
    }
  }

  while (i1 < left.length) {
    results.push(left[i1++]);
  }

  while (i2 < right.length) {
    results.push(right[i2++]);
  }

  return results;
}

console.log(largestNumber([3, 34])); //* "343"
console.log(largestNumber([10, 2])); //* "210"
console.log(largestNumber([3, 30, 34, 5, 9])); //* "9534303"
console.log(largestNumber([0, 0])); //* "0"
