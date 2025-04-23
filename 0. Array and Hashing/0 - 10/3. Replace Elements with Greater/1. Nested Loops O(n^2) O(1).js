//* The goal is to replace every element of the array with the greatest element to its right
//* So in the most brute force manner, for every element, find the largest element to the right
//*     - Replace the current element with that value
function replaceElements(arr) {
  //* For each element arr[i]
  for (let i = 0; i < arr.length - 1; i++) {
    let max = -1;

    //* Find the largest element to the right of "i"
    for (let j = i + 1; j < arr.length; j++) {
      max = Math.max(max, arr[j]);
    }

    arr[i] = max;
  }

  //* The last element becomes -1
  arr[arr.length - 1] = -1;

  return arr;
}

console.log(replaceElements([17, 18, 5, 4, 6, 1]));
console.log(replaceElements([400]));

//* Time: O(n^2) - We have a pair of nested for loops, both of which scale with the input size (n)

//* Space: O(1) - The memory usage remains constant regardless of input size
