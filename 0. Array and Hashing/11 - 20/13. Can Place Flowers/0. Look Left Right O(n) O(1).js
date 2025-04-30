//* Array contains 0 or 1, with 0 indicating empty and 1 indicating not empty
//* We need to check if we can plant "n" flowers without breaking the following rule:
//*     - Flowers cannot be planted in ADJACENT plots
//* Being able to successfully plant depends on the neighbours
//* If either the previous spot (i - 1) , or the next spot (i + 1) are occupied, we cannot plant
//! Out of bounds does NOT prevent us from being able to plant
//*     - i.e., we can plant in a situation like: [0]
function canPlaceFlowers(flowerbed, n) {
  //* There is nothing to plant
  if (n === 0) return true;

  for (let i = 0; i < flowerbed.length; i++) {
    //* We can't plant here
    if (flowerbed[i] === 1) continue;

    //* Check if both sides are either empty, or are out of bounds
    const leftEmpty = i - 1 < 0 || flowerbed[i - 1] === 0;
    const rightEmpty = i + 1 >= flowerbed.length || flowerbed[i + 1] === 0;

    //* We can successfully plant here
    if (leftEmpty && rightEmpty) {
      flowerbed[i] = 1;
      n--;
    }
  }

  //* If n === 0, we planted "n" flowers. If n < 0, we planted more than necessary
  return n <= 0;
}

console.log(canPlaceFlowers([1], 1)); //* False
console.log(canPlaceFlowers([0], 1)); //* True
console.log(canPlaceFlowers([0, 0], 1)); //* True
console.log(canPlaceFlowers([0, 1], 1)); //* False
console.log(canPlaceFlowers([0, 0, 0], 2)); //* True
console.log(canPlaceFlowers([1, 0, 0, 0, 1], 1)); //* True
console.log(canPlaceFlowers([1, 0, 0, 0, 1], 2)); //* False
console.log(canPlaceFlowers([1, 0, 1, 0, 1], 1)); //* False
console.log(canPlaceFlowers([1, 0, 0, 1], 1)); //* False
console.log(canPlaceFlowers([0, 0, 0, 0], 0)); //* True
console.log(canPlaceFlowers([0, 0, 1, 0, 0], 1)); //* True

//* Time: O(n) - We have to iterate through the entire array, so the time taken scales with the input size

//* Space: O(1) - The memory usage remains constant regardless of input size
