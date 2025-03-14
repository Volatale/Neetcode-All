//* A mountain array only has a SINGLE peak element
//* And it must have no valley elements
function validMountainArray(arr) {
  //* A mountain array must contain at least 3 elements
  if (arr.length < 3) return false;

  let peak = 0;

  for (let i = 1; i < arr.length - 1; i++) {
    //* [4, 5, 2] is a peak, because 5 is greater than both neighbors
    if (arr[i - 1] < arr[i] && arr[i] > arr[i + 1]) {
      peak++;
    }

    //* [4, 3, 4] is a valley, because 3 is <= than both neighbors
    if (arr[i - 1] >= arr[i] && arr[i] <= arr[i + 1]) {
      return false;
    }
  }

  //* The array has a SINGLE peak and no valleys
  return peak === 1;
}

console.log(validMountainArray([2, 1])); //* False
console.log(validMountainArray([3, 5, 5])); //* False
console.log(validMountainArray([1, 2, 3, 4, 5, 4, 3, 2, 4])); //* True
console.log(validMountainArray([0, 3, 2, 1])); //* True
console.log(validMountainArray([1, 4, 7, 4, 4, 8, 5])); //* False
console.log(validMountainArray([1, 5, 1])); //* True
console.log(validMountainArray([1, 2, 3, 4, 5, 4, 3, 2, 1])); //* True
console.log(validMountainArray([1, 4, 7, 4, 4, 1])); //* False

//* Time: O(n) - In the worst case, we iterate over every element in the array

//* Space: O(1) - The memory usage remains constant regardless of input size
