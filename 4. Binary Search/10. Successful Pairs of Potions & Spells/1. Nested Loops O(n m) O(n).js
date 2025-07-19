//* We are given two (positive) integer arrays spells[] and potions[]
//*     - spells[i] = strength of ith spell
//*     - potions[i] = strength of ith potion
//* We are also given the integer `success`
//* A spell and potion pair is "successful" if the PRODUCT is AT LEAST success
//* Product implies we multiply both numbers
//* In a brute force manner, we iterate through both arrays and try every possible pairing
//* There are `n` spells and `m` potions, so there are n * m iterations in the worst case
function successfulPairs(spells, potions, success) {
  //* pairs[i] = no. of potions that form with a spell such that the product >= success
  const pairs = new Array(spells.length).fill(0);

  //* Form every possible pairing (multiplication is commutative/associative, order doesn't matter)
  for (let i = 0; i < potions.length; i++) {
    let successful = 0;

    //* For each spell, try a potion
    for (let j = 0; j < spells.length; j++) {
      if (potions[i] * spells[j] >= success) {
        successful++;
      }
    }

    pairs[i] = successful;
  }

  return pairs;
}

console.log(successfulPairs([1], [1], 1)); //* [1]
console.log(successfulPairs([1], [1], 5)); //* [0]
console.log(successfulPairs([5, 1, 3], [1, 2, 3, 4, 5], 7)); //* [4, 0, 3]
console.log(successfulPairs([3, 1, 2], [8, 5, 8], 16)); //* [2, 0, 2]

//* Time: O(n * m) - The time taken scales with the maximum number of pairings (n * m)

//* Space: O(1) - The memory usage remains constant regardless of input size
