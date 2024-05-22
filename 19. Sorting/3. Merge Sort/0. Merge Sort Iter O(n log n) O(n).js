function iterativeMergeSort(arr) {
  let width = 1; //* Represents the size of each partition

  while (width < arr.length) {
    //* Holds the sorted values for THIS width size
    let results = [];

    for (let i = 0; i < arr.length; i += 2 * width) {
      //* Split the array into two halves
      const left = arr.slice(i, i + width);
      const right = arr.slice(i + width, i + 2 * width);

      //* Merge the "results" array with the merged left and right
      results = results.concat(merge(left, right));
    }

    arr = results; //* Overwrite the input array
    width *= 2; //* The size of the partitions doubles each iteration
  }

  return arr;
}

//* Sorts the array values into 1
function merge(left, right) {
  const results = [];

  let i = 0;
  let j = 0;

  //* Push the smaller values to the array first
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      results.push(left[i++]);
    } else {
      results.push(right[j++]);
    }
  }

  //* Pick up any remaining elements in either array
  while (i < left.length) {
    results.push(left[i++]);
  }

  while (j < right.length) {
    results.push(right[j++]);
  }

  return results;
}

console.log(iterativeMergeSort([10, 3, 19, 7, 18, 4, 15, 5, 12, 1, 16, 2]));
console.log(iterativeMergeSort([5, 2, 3]));
console.log(iterativeMergeSort([1]));
console.log(iterativeMergeSort([5, 2, 10, 1]));

//* Time: O(n log n) - We loop while width < nums.length
//* Within each iteration, we do a for loop that also scales with "n"
//* Width doubles each outer iteration, so the inner loop takes half the time
//* Lets say the length is 8. We start at 1, and double width each iteration
//* Exponent: 2 * 2 * 2 = 8, 2^3 = 8
//* Logarithm:
//* 8 / 2 = 4
//* 4 / 2 = 2
//* 2 / 2 = 1
//* Log2(8) = 3

//* Space: O(n) - The merge portion holds every element in both inputs
