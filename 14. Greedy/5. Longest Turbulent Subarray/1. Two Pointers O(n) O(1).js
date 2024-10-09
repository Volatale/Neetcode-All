//* Use a sliding window to track the number of elements in our subarray
//* Why does Sliding Window work?
//*     - Because recomputing the same subarray wastes time
//*     - right - left + 1 gives us the number of elements in the subarray
//* We cannot have CONSECUTIVE signs
//*     - If prev was GREATER, and current is also greater, we can't extend
//*     - The same holds true if the prev was SMALLER; we can't extend if current is ALSO smaller
//* We also need to avoid equivalent elements
//*     - Just increment right by one
//*     - Then set left = right - 1
//*         - This is because any subarray of a turbulent subarray is ALSO going to be turbulent
//*         - So why bother checking it?
function maxTurbulenceSize(arr) {
  if (arr.length === 1) return 1;

  let left = 0;
  let right = 1;
  let maxLength = 1; //* Single value is always turbulent
  let prev = ""; //* "<" means prev was SMALLER, ">" means it was LARGER

  while (right < arr.length) {
    if (arr[right - 1] > arr[right] && prev !== ">") {
      maxLength = Math.max(maxLength, right - left + 1);
      right++;
      prev = ">";
    } else if (arr[right - 1] < arr[right] && prev !== "<") {
      maxLength = Math.max(maxLength, right - left + 1);
      right++;
      prev = "<";
    } else {
      if (arr[right] === arr[right - 1]) right++; //* Skip equivalent elements
      left = right - 1; //* Skip left ahead (subarray of turb will also be turb)
      prev = "";
    }
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
