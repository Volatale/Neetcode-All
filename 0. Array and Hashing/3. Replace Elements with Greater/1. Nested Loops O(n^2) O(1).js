//* The "largest" checks should only start at i + 1 (it doesn't have to be > arr[i])
function replaceElements(arr) {
  for (let i = 0; i < arr.length; i++) {
    let largest = arr[i + 1]; // 17

    for (let j = i + 1; j < arr.length; j++) {
      largest = Math.max(largest, arr[j]);
    }

    arr[i] = largest;
  }

  arr[arr.length - 1] = -1;
  return arr;
}

console.log(replaceElements([17, 18, 5, 4, 6, 1]));
console.log(replaceElements([400]));

//* Time: O(n^2) - We have two nested for loops that both scale with the length of the input array

//* Space: O(1) - We don't use any extra auxillary space at all; the space remains constant
