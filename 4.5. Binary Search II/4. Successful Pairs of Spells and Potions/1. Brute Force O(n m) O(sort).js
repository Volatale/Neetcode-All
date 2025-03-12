//! We cannot sort the spells array
//*     - pairs[i] depends on the value that is currently there
//* But we CAN sort the potions array
//*     - If the product of spells[i] and the CURRENT potion is too low
//*     - Then we need to INCREASE the product
//* So sorting the potions array ensures the potions are monotonically non-decreasing
//! Since the potions array is sorted, we technically have a SORTED search space
//* For each spell, binary search and find the FIRST potion that results in a successful pair
//* Example: [5, 1, 3], [1, 2, 3, 4, 5], success = 7
//*     - (5 * 1) = 5. 5 < 7, so we need a LARGER potion
//*     - (5 * 2) = 10. 10 >= 7, so we know we can form a valid pair
//!     - Since the potions array is monotonically increasing, we can ALSO form pairs with every succeeding element
//*         - Hence, we can immediately get the number of pairs without calculating the products using this spell
//*     - pairs[i] = potions.length - j
//*         - "j" = 1, and n = 5
//*         - (5 - 1) = 4, so we can form 4 successful pairs using the ith spell
function successfulPairs(spells, potions, success) {
  //* pairs[i] = No. of Successful pairs we can make using ith spell
  const pairs = new Array(spells.length).fill(0);

  //* Ensures we have monotonically non-decreasing potion values
  potions.sort((a, b) => a - b);

  for (let i = 0; i < spells.length; i++) {
    //* For every spell, find the first (leftmost) potion such that s[i] * p[j] >= success
    for (let j = 0; j < potions.length; j++) {
      if (spells[i] * potions[j] >= success) {
        //* We can form valid pairs using every potion starting at "j" and beyond
        pairs[i] = potions.length - j;
        break;
      }
    }
  }

  return pairs;
}

console.log(successfulPairs([5, 1, 3], [1, 2, 3, 4, 5], 7)); //* [4, 0, 3]
console.log(successfulPairs([3, 1, 2], [8, 5, 8], 16)); //* [2, 0, 2]
console.log(successfulPairs([5], [5, 2], 25)); //* [1]

//* Time: O(n * m) - Sorting the potions array takes O(m log m), but this is domiated by the O(n * m)
//* For every outer iteration, there are "m" inner iterations

//* Space: O(sort) - The memory usage scales with the sorting algorithm used
