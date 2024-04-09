//* We need to compare [0] with [1] concatenated using strings
//* [3, 34] -> ["3", "34"]
//* a + b = 334
//* b + a = 343
//* 334 > 343 ? false, so return 1, swap
//* Keep doing this until completion
function largestNumber(nums) {
  const comparison = (a, b) => {
    a = String(a);
    b = String(b);
    if (a + b > b + a) {
      return -1;
    } else if (a + b < b + a) {
      return 1;
    }

    return 0;
  };

  nums = nums.sort(comparison);
  if (nums[0] === 0) return "0";

  return nums.join("");
}

console.log(largestNumber([0, 0, 0])); // "0"
console.log(largestNumber([3, 34])); // "343"
console.log(largestNumber([10, 2])); // "210"
console.log(largestNumber([3, 30, 34, 5, 9])); // "9534330"

//* Time: O(n log n) - The average (good) sorting algorithms run in n log n time
//* If we used merge sort it'd be O(n log n), but quick sort is O(n^2), and not stable

//* Space: O(n) - It depends on the sorting algorithm used, in this case I think we use merge sort
