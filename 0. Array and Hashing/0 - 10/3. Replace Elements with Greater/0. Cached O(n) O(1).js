//* Initial max = -1, because it eliminates edge cases
//* Reverse iteration
//* new max = max(oldMax, arr[i])

function replaceElements(arr) {
  let rightmax = -1;

  for (let i = arr.length - 1; i >= 0; i--) {
    let newMax = Math.max(rightmax, arr[i]);
    arr[i] = rightmax;
    rightmax = newMax;
  }

  return arr;
}

console.log(replaceElements([17, 18, 5, 4, 6, 1]));
console.log(replaceElements([400]));

//* Time: O(n) - We only do one pass through the array, so the time taken scales linearly with the input length

//* Space: O(1) - We don't use any extra auxillary space at all; the space remains constant
