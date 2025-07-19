//* We are given two (positive) integer arrays spells[] and potions[]
//*     - spells[i] = strength of ith spell
//*     - potions[i] = strength of ith potion
//* We are also given the integer `success`
//* A spell and potion pair is "successful" if the PRODUCT is AT LEAST success
//* Product implies we multiply both numbers
//! We can observe that the ordering of the spells and potions is irrelevant
//*     - Thus, sorting the potions array can help immensely
//* Essentially, for each spell (i), we can perform a binary search on the potions array
//* We are looking for the "optimal" potion (index) such that we can eliminate the rest of the (invalid) pairs
//* The "fail" case is if the product is LOWER than success (which is our boundary)
//* So we are trying to find the "minimum" (optimal) index such that the pairing meets the constraints
//* Thus, "left" represents the FIRST index that creates successful pairings
//*     - So we subtract left from n (potions.length)
//* Both the arrays are monotonically increasing, so if the "leftmost" (minimum) potion works
//*     - Then we know for sure that every potion pairing AFTER "left" will work too
//*     - Which enables us to avoid computing their products
function successfulPairs(spells, potions, success) {
  //* pairs[i] = no. of potions that form with a spell such that the product >= success
  const pairs = new Array(spells.length).fill(0);

  //* Sort the potion array to ensure monotonicity
  potions.sort((a, b) => a - b);

  //* Form every possible pairing (multiplication is commutative/associative, order doesn't matter)
  for (let i = 0; i < spells.length; i++) {
    //* The search space is the potions array
    let left = 0;
    let right = potions.length - 1;

    while (left <= right) {
      //* Mid represents the index of the potion we are trying
      const mid = left + ((right - left) >> 1);

      if (spells[i] * potions[mid] >= success) {
        right = mid - 1; //* We were successful (don't eliminate the current potion)
      } else {
        left = mid + 1; //* The pair is too weak; eliminate the left portion
      }
    }

    //* Potions are monotonically increasing, so everything AFTER (and including) left will work
    pairs[i] = potions.length - left;
  }

  return pairs;
}

console.log(successfulPairs([1], [1], 1)); //* [1]
console.log(successfulPairs([1], [1], 5)); //* [0]
console.log(successfulPairs([5, 1, 3], [1, 2, 3, 4, 5], 7)); //* [4, 0, 3]
console.log(successfulPairs([3, 1, 2], [8, 5, 8], 16)); //* [2, 0, 2]

//* Time: O(n log m) - There are `n` spells, and there are `m` potions
//* For each potion, we perform a binary search on the potions array

//* Space: O(m) - Assuming merge sort is used, it takes O(m) space to sort the potions array
