//* For every spell, try pairing with every potion
function successfulPotionsAndSpells(spells, potions, success) {
  const pairsOfSpells = [];

  //* For every spell
  for (let i = 0; i < spells.length; i++) {
    let pairs = 0;

    //* Try pairing with every potion
    for (let j = 0; j < potions.length; j++) {
      if (spells[i] * potions[j] >= success) {
        pairs++; //* Product is >= success, so this is a successful pair
      }
    }

    pairsOfSpells.push(pairs);
  }

  return pairsOfSpells;
}

console.log(successfulPotionsAndSpells([1], [1], 1)); //* [1]
console.log(successfulPotionsAndSpells([1], [1], 5)); //* [0]
console.log(successfulPotionsAndSpells([5, 1, 3], [1, 2, 3, 4, 5], 7)); //* [4, 0, 3]
console.log(successfulPotionsAndSpells([3, 1, 2], [8, 5, 8], 16)); //* [2, 0, 2]

//* Time: O(n * m) - Both arrays can have different lengths
//* For every outer iteration (n), there are "m" inner iterations
//* It takes α(1) to push to an array

//* Space: O(n) - The output array's size scales linearly with the spell array's length
