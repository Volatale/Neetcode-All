//* XOR is the reverse operation of itself
//* pref[i] = arr[0] + arr[1] + ... + arr[i]
//* Then we can also look at it as
//*     - pref[i] = pref[i-1] ^ arr[i]
//! So then we reverse the formula to get this formula:
//*     - arr[i] = pref[i-1] ^ pref[i]
//* Why does that formula work?
//*     - To calculate a prefix array, we use the following formula:
//*         - pref[i] = pref[i-1] + nums[i]
//!     - The inverse operation of ADDITION happens to be SUBTRACTION
//*     - So we can reverse the operations to derive the ORIGINAL array using subtraction
//*         - arr[i] = pref[i] - pref[i-1]
//* For example:
//*     - Original Array "nums" = [1, 2, 3, 4]
//*     - Prefix Sum Array "pref" = [1, 3, 6, 10]
//*         - pref[i] = pref[i-1] + nums[i]
//!         - Now reverse the operation (use subtraction instead of addition)
//*     - Pref to Original Array:
//*         - nums[i] = nums[i] - nums[i-1]:
//*             - 10 - 6 = 4 (so arr[3] = 4)
//*             - 6 - 3 = 3 (so arr[2] = 3)
//*             - 3 - 1 = 2 (so arr[1] = 2)
//*             - arr[0] is always equal to pref[0]
//! Remember, the inverse operation of bitwise XOR is bitwise XOR itself
function findArray(pref) {
  //* Just return the input - we have nothing to XOR
  if (pref.length <= 1) return pref;

  //* ^ is an inverse operation of itself, so we can reverse the XOR
  //* pref[n-1] = pref[0] + pref[1] + ... pref[n-1]
  for (let i = pref.length - 1; i > 0; i--) {
    pref[i] = pref[i] ^ pref[i - 1];
  }

  return pref;
}

console.log(findArray([5, 2, 0, 3, 1])); //* [5, 7, 2, 3, 2]
console.log(findArray([13])); //* [13]
console.log(findArray([1, 5, 6])); //* [1, 4, 3]

//* Time: O(n) - We iterate through the entire array (minus 1 element)
//* The work done within each iteration takes a constant amount of time

//* Space: O(1) - No extra space is being used that will scale with the input size
