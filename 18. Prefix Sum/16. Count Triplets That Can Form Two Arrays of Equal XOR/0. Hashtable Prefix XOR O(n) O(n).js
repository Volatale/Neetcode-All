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

//* Count all triplets such that:
//*     - XOR(i -> j - 1) = XOR(j -> k)
//* Rewrite it as:
//*     - prefixXOR[j-1] ^ prefixXOR[i - 1] = prefixXOR[k] ^ prefixXOR[j-1]
//* Simplify the equation:
//*     - prefixXOR[i-1] = prefixXOR[k]
//!     - Why? Because prefixXOR[j-1] ^ prefixXOR[j-1] cancels out, which just leaves the other two terms
function countTriplets(arr) {
  //* There are no possible triplets
  if (arr.length === 0) return 0;

  //* 0 : 1 handles case where the XOR from the beginning (index 0) is used
  const countXOR = { 0: 1 }; //* Tracks the FREQUENCY of prefix XOR values
  const totalXORs = {}; //* Tracks the cumulative sum of indices for each prefix XOR

  let triplets = 0;
  let prefixXOR = 0;

  for (let i = 0; i < arr.length; i++) {
    prefixXOR ^= arr[i];

    //* If prefix has been seen before, there are valid triplets ending at "i"
    //* triplets = count[prefix] * i - total[prefix]
    //* total[prefix] subtracts EXCESS contributions that have already been processed
    triplets += (countXOR[prefixXOR] || 0) * i - (totalXORs[prefixXOR] || 0);

    countXOR[prefixXOR] = (countXOR[prefixXOR] || 0) + 1;
    totalXORs[prefixXOR] = (totalXORs[prefixXOR] || 0) + i + 1;
  }

  return triplets;
}

console.log(countTriplets([2, 3, 1, 6, 7])); //* 4
console.log(countTriplets([1, 1, 1, 1, 1])); //* 10

//* Time: O(n) - We iterate through the entire array once

//* Space: O(n) - In the worst case, every XOR is unique, which gives us "n" keys/values
