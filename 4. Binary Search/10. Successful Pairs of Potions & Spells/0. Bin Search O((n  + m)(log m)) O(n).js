//* If we sort the potions array, we can binary search into potions
//* All we have to do is find the FIRST element that satisfies the condition
//* And then check how many elements (including this one), and AFTER it exist
//* Since the array is sorted now, any value AFTER this one will ALSO work
//* potions.length - left gives us this number
//* So we introduce monotonicity by sorting the potions array
//* Essentially, for every potion, we binary search to find pairs
//* And we don't have to check any elements AFTER finding the minimum
function successfulPotionsAndSpells(spells, potions, success) {
  const pairsOfSpells = new Array(spells.length).fill(0);

  //* Sort so we can use binary search and find the FIRST minimum "valid" value
  potions.sort((a, b) => a - b);

  //* For every spell, binary search potions
  for (let i = 0; i < spells.length; i++) {
    let left = 0;
    let right = potions.length - 1;

    //* Try to find the MINIMUM valid value, anything AFTER that is ALSO valid
    while (left <= right) {
      //* Mid is the element we are testing
      let mid = left + ((right - left) >> 1);

      //* If true, anything BEYOND this is valid (monotonicity since we sorted "potions")
      if (spells[i] * potions[mid] >= success) {
        right = mid - 1; //* Mid element is valid, don't eliminate it
      } else {
        left = mid + 1; //* Mid element failed, remove from search space
      }
    }

    //* "left" is now supposed to be the FIRST index that pairs with spells
    //* Take the WHOLE array, then subtract the "failed" elements (left)
    pairsOfSpells[i] = potions.length - left;
  }

  return pairsOfSpells;
}

console.log(successfulPotionsAndSpells([1], [1], 1)); //* [1]
console.log(successfulPotionsAndSpells([1], [1], 5)); //* [0]
console.log(successfulPotionsAndSpells([5, 1, 3], [1, 2, 3, 4, 5], 7)); //* [4, 0, 3]
console.log(successfulPotionsAndSpells([3, 1, 2], [8, 5, 8], 16)); //* [2, 0, 2]

//* Time: O(n log m) + (m log m), or, O((n + m)(log m))
//* We sort the potions array, which has "m" length, so O(m log m)
//* Then, for every element in spells (n length), we binary search within potions so O(n log m)

//* Space: O(n) - The output result scales linearly with the spells array's length
