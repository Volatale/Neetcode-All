//* We need to find two numbers that sum up to "target"
//* Specifically, we need to return the indices of both elements +1
//*     - So if index 0 and 1 are the indices, we return [1, 2]
//* The array is already sorted in non-decreasing order
//*     - Thus, we can say the array exhibits monotonicity
//*     - numbers[i] <= numbers[i + 1] <= ... <= numbers[n - 1]
//* We can use a two pointer approach, with both pointers initialized to opposite sides
//* If numbers[left] + numbers[right] > target, right--
//*     - This will either decrease the sum or leave it the same (in the case of duplicates)
//* If numbers[left] + numbers[right] < target, left++
//*     - This will either increase the sum or leave it the same (in the case of duplicates)
//* If numbers[left] + numbers[right] === target
//*     - return [left + 1, right + 1]
function twoSum(numbers, target) {
  //* Two pointer approach to find the correct indices
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    //* Store the result of the sum so we don't have to recompute it
    const sum = numbers[left] + numbers[right];

    if (sum > target) {
      right--;
    } else if (sum < target) {
      left++;
    } else {
      return [left + 1, right + 1];
    }
  }

  //* A solution is guaranteed, so this is not necessary
  return -1;
}

console.log(twoSum([2, 7, 11, 15], 9)); //* [1, 2]
console.log(twoSum([2, 3, 4], 6)); //* [1, 3]
console.log(twoSum([-1, 0], -1)); //* [1, 2]

//* Time: O(n) - In the worst case, there are "n" iterations in total, so the time taken scales with "n"

//* Space: O(1) - The memory usage remains constant regardless of input size
