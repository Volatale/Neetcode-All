function kthLargestNumber(nums, k) {
  //* 5th smallest element === 1st largest element
  return quickSelect(nums, 0, nums.length - 1, nums.length - k);
}

function quickSelect(nums, left, right, k) {
  const pivot = partition(nums, left, right);

  if (k < pivot) {
    //* Search left partition
    return quickSelect(nums, left, pivot - 1, k);
  } else if (k > pivot) {
    //* Search right partition
    return quickSelect(nums, pivot + 1, right, k);
  } else {
    //* This IS the kth largest element
    return nums[pivot];
  }
}

function partition(nums, left, right) {
  //* Random index between the given range
  const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
  const pivot = BigInt(nums[pivotIndex]); //* Convert to strings

  //* Dutch National Flag algorithm
  let smaller = left;
  let i = left;
  let larger = right;

  while (i <= larger) {
    if (BigInt(nums[i]) < pivot) {
      //* Put elements smaller than pivot on left
      [nums[smaller], nums[i]] = [nums[i], nums[smaller]];
      smaller++;
      i++;
    } else if (BigInt(nums[i]) > pivot) {
      //* Put elements larger than pivot on left
      [nums[larger], nums[i]] = [nums[i], nums[larger]];
      larger--;
    } else {
      i++;
    }
  }

  //* Return the middle element
  return smaller + ((larger - smaller) >> 1);
}

console.log(kthLargestNumber(["3", "6", "7", "10"], 4)); //* "3"
console.log(kthLargestNumber(["2", "21", "12", "1"], 3)); //* "2"
console.log(kthLargestNumber(["0", "0"], 2)); //* "0"
console.log(kthLargestNumber(["1"], 1)); //* "1"
console.log(kthLargestNumber(["99999", "99998", "99997", "9998"], 4)); //* "9998"

//* Time: O(n) to O(n^2) - Quick Select on average halves the array each recursive call
//* n + n/2 + n/4 + n/8 ... + 2n + 1 = O(n)

//* Space: O(log n) - Quick select uses O(log n) space since we swap in place
