//* Simply apply the function to each value in the original array
//* Add the result of the transformation to the new array
function map(arr, fn) {
  const results = new Array(arr.length).fill(0);

  //* Modify each value in place
  for (let i = 0; i < arr.length; i++) {
    results[i] = fn(arr[i], i);
  }

  return results;
}

console.log(map([1, 2, 3], (n) => n + 1));
console.log(map([1, 2, 3], (n, i) => n + i));
console.log(map([10, 20, 30], () => 42));

//* Time: O(n) - It takes O(n) to create the new array (where n = arr.length)
//* Then we also have to iterate "n" times

//* Space: O(n) - The new array's size scales proportionally with size of the input array
