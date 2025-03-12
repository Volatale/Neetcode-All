//! We cannot sort the spells array
//*     - pairs[i] depends on the value that is currently there
//* But we CAN sort the potions array
//*     - If the product of spells[i] and the CURRENT potion is too low
//*     - Then we need to INCREASE the product
//* So sorting the potions array ensures the potions are monotonically non-decreasing
//* Since the potions array is sorted, we technically have a SORTED search space
//! Thus, we can employ Binary Search instead of using a brute force approach
//*     - For each spell, binary search and find the FIRST potion that results in a successful pair
//* Example: [5, 1, 3], [1, 2, 3, 4, 5], success = 7
//*     - (5 * 1) = 5. 5 < 7, so we need a LARGER potion
//*     - (5 * 2) = 10. 10 >= 7, so we know we can form a valid pair
//!     - Since the potions array is monotonically increasing, we can ALSO form pairs with every succeeding element
//*         - Hence, we can immediately get the number of pairs without calculating the products using this spell
//*     - pairs[i] = potions.length - j
//*         - "j" = 1, and n = 5
//*         - (5 - 1) = 4, so we can form 4 successful pairs using the ith spell
//* If we can't form a valid pair with the current potion, then we need a stronger (higher valued) potion
//* Else, we CAN form a valid pair, so we should try to find the MINIMUM strength potion that lets us form a valid pair
function successfulPairs(spells, potions, success) {
  //* pairs[i] = No. of Successful pairs we can make using ith spell
  const pairs = new Array(spells.length).fill(0);

  //* Ensures we have monotonically non-decreasing potion values
  potions.sort((a, b) => a - b);

  for (let i = 0; i < spells.length; i++) {
    //* The minimum and max number of pairs we can form using the current spell
    let left = 0;
    let right = potions.length - 1;

    while (left <= right) {
      //* "Mid" represents the current potion we are trying to use to form a pair
      const mid = left + ((right - left) >> 1);

      if (spells[i] * potions[mid] >= success) {
        right = mid - 1; //* Potion formed a valid pair, so try minimizing the strength
      } else {
        left = mid + 1; //* We need need a stronger potion
      }
    }

    //* We can form a valid pair using this potion and every potion after it
    pairs[i] = potions.length - left;
  }

  return pairs;
}

console.log(successfulPairs([5, 1, 3], [1, 2, 3, 4, 5], 7)); //* [4, 0, 3]
console.log(successfulPairs([3, 1, 2], [8, 5, 8], 16)); //* [2, 0, 2]
console.log(successfulPairs([5], [5, 2], 25)); //* [1]

//* Time: O(m log m + n log m) - Sorting the potions array takes O(m log m)
//* Then, for every spell, we need to binary search to find the first valid potion

//* Space: O(sort) - The memory used scales with the sorting algorithm used
