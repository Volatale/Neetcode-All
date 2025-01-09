//* Push arr[i] to the return array if the predicate returns true
function filter(arr, fn) {
  const filteredArray = [];

  //* We need to apply the predicate to every element in the array
  for (let i = 0; i < arr.length; i++) {
    //* Elements that fail the predicate (falsy) are excluded from the new array
    if (fn(arr[i], i)) {
      filteredArray.push(arr[i]);
    }
  }

  return filteredArray;
}

console.log(filter([0, 10, 20, 30], (n) => n > 10)); //* [20, 30]
console.log(filter([1, 2, 3], (n, i) => i === 0)); //* [1]
console.log(filter([-2, -1, 0, 1, 2], (n) => n + 1)); //* [-2, 0, 1, 2]

//* Time: O(n) - We have to iterate through every element in arr
//* "fn" takes O(1) per call

//* Space: O(k) - The returned array's size scales with the number of elements that pass the predicate
//* In the "best" case, none of the elements pass, thus the returned array has 0 length
//* Whereas in the worst case, every element passes, so the returned array has a length of "n"
