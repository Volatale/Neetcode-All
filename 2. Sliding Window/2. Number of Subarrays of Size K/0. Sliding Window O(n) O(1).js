//* We are given an int[] and integers `k` and `threshold`
//* The goal is to count the number of subarrays of size k whose average is >= threshold
//* To compute the average, we simply sum the elements within each subarray and then divide by the no. of elements
//* Note that division is the inverse of multiplication, so we can use multiplication instead of division
//* Valid subarrays must have a size of exactly "k", so we can use a sliding window approach
//* If there are "k" elements within the window, we can validate whether the average is >= threshold
//* Remove all elements that exist outside of the window size (i - k + 1)
//*     - We add one because arrays are 0-indexed
function numOfSubarrays(arr, k, threshold) {
  //* Use multiplication instead of division (it is faster)
  const valToBeat = k * threshold;

  let subarrays = 0;
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i]; //* Add the current element to the window

    //* There are "k" elements within the window
    if (i - k + 1 >= 0) {
      if (sum >= valToBeat) {
        subarrays++;
      }

      sum -= arr[i - k + 1]; //* Remove the leftmost element from the window
    }
  }

  return subarrays;
}

console.log(numOfSubarrays([2, 2, 2, 2, 5, 5, 5, 8], 3, 4)); //* 3
console.log(numOfSubarrays([11, 13, 17, 23, 29, 31, 7, 5, 2, 3], 3, 5)); //* 6
console.log(numOfSubarrays([1, 2, 3, 4, 5], 2, 3)); //* 2

//* Time: O(n * k) - For every outer loop iteration (n), there are "k" inner iterations

//* Space: O(1) - The memory usage remains constant regardless of input size
