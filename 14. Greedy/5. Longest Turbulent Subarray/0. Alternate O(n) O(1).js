//* inc: The length of the current valid sequence ends with two INCREASING numbers
//* dec: The length of the current valid sequence ends with two DECREASING numbers
//* If arr[i] > arr[i-1]
//*     - Then we found an INCREASING element
//*     - Which means the DECREASING subarray ends here
//* Else if arr[i] < arr[i-1]
//*     - We found a DECREASING element
//*     - Thus the INCREASING subarray ends here
//* Else, we either found CONSECTIVE sign elements, or an equal element
//*     - In which case we break both sequences
//! We are basically alternating between increasing and decreasing
//*     - So we "pass on" the value of the opposite
//*     - And then we reset the opposite, because that subarray ended
//*         - In other words, if increasing is 3, then decreasing has to be 1
//*         - And vice versa
function maxTurbulenceSize(arr) {
  if (arr.length === 1) return 1;

  //* Start at one because we HAVE to include the first element
  let inc = 1;
  let dec = 1;
  let maxLength = 1;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      //* Extend prev decreasing
      dec = inc + 1;
      inc = 1;
    } else if (arr[i] > arr[i - 1]) {
      //* Extend prev increasing
      inc = dec + 1;
      dec = 1;
    } else {
      //* Break BOTH subarrays
      inc = 1;
      dec = 1;
    }

    maxLength = Math.max(maxLength, Math.max(inc, dec));
  }

  return maxLength;
}

console.log(maxTurbulenceSize([4, 8, 12, 16])); //* 2
console.log(maxTurbulenceSize([9, 4, 2, 10, 7, 8, 8, 1, 9])); //* 5
console.log(maxTurbulenceSize([10])); //* 1
console.log(maxTurbulenceSize([5, 5, 5])); //* 1
console.log(maxTurbulenceSize([5, 10])); //* 2
console.log(maxTurbulenceSize([4, 8, 3, 12])); //* 4

//* Time: O(n) - We iterate through the entire array once
//* So the time taken scales with the number of elements in the input

//* Space: O(1) - We only use constant space variables
