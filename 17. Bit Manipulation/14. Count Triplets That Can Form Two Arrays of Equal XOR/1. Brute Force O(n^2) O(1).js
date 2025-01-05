//* We need to try all possible combinations of (i, j and k)
//*     - Then, we can check if a === b
//* a = The XOR of elements from index i to j - 1
//* b = The XOR of elements from index j to k
//! If a = b, then a ^ b = 0
//*     - Lets say a = 4 and b = 4
//*     - Then a ^ b = 4 ^ 4 = 0
//* Why is that?
//*     - Because n ^ n = 0
//* In a brute force manner, we have a nested loop
//*     - for i = 0; i < arr.length
//*     - for k = i; k < arr.length
//* "i" represents the start of the triplet
//* "k" represents the end of the triplet
//! Now how do we get "j"?
//*     - i < j <= k
//* The above equation gives us the number of valid "j" values
//*     - Thus we can do "triplets += (k - i)"
//* If "k" = 2 and "i" = 0
//*     - Then we get (2 - 0) = 2
//!     - Thus does NOT include the element at index i (which is correct)
function countTriplets(arr) {
  //* There are no possible triplets
  if (arr.length === 0) return 0;

  let triplets = 0;

  //* Iterate over all possible "i"
  for (let i = 0; i < arr.length; i++) {
    let prefixXOR = 0; //* Tracks cumulative XOR of all elements from "i" to "k"

    //* Iterate over all possible "k"
    for (let k = i; k < arr.length; k++) {
      prefixXOR ^= arr[k];

      //* Check if XOR from i to k is 0
      if (prefixXOR === 0) {
        //* Count number of valid "j" values (i < j <= k)
        triplets += k - i;
      }
    }
  }

  return triplets;
}

console.log(countTriplets([2, 3, 1, 6, 7])); //* 4
console.log(countTriplets([1, 1, 1, 1, 1])); //* 10

//* Time: O(n^2) - We have a nested for loop, both of which scale with arr.length (n)
//* So the time taken is quadratic

//* Space: O(1) - We are not using any additional space that scales with input size
