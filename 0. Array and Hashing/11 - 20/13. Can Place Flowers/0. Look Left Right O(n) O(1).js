//* If "n" === 0, return true. We can ALWAYS plant 0 trees regardless of board state
//* If the length of flowerbed is 1, return true if [0] === 0 (which means we can plant), and false otherwise
//* Iterate through the whole flowerbed
//* If the current index === 0
//*     - If i - 1 or i + 1 would result in out of bounds, assume 1
//*     - If the above doesn't apply, if flowerbed[i-1] or flowerbed[i+1] === 0
//*         - Then those sides are "free", and we can plant in this position
//* Set flowerbed[i] = i, and decrement n
//* If n <= 0, that means we were successfully able to plant "n" plants without breaking the adjacency rule

function canPlaceFlowers(flowerbed, n) {
  if (n === 0) return true; //* Always possible

  if (flowerbed.length === 1) {
    return flowerbed[0] === 0 ? true : false; //* You can't plant if its already a 1
  }

  //* Assume that out of bounds means a 1
  for (let i = 0; i < flowerbed.length; i++) {
    if (flowerbed[i] === 0) {
      const leftFree = i - 1 < 0 || flowerbed[i - 1] !== 1 ? 1 : 0;
      const rightFree =
        i + 1 >= flowerbed.length || flowerbed[i + 1] !== 1 ? 1 : 0;

      if (leftFree === 1 && rightFree === 1) {
        flowerbed[i] = 1;
        n--;
      }
    }
  }

  return n <= 0;
}

console.log(canPlaceFlowers([1], 1)); // False (it is already occupied)
console.log(canPlaceFlowers([0], 1)); // True (x)
console.log(canPlaceFlowers([0, 0], 1)); // True (x -) or (- x)
console.log(canPlaceFlowers([0, 1], 1)); // False (already occupied)
console.log(canPlaceFlowers([0, 0, 0], 2)); // True (x - x)
console.log(canPlaceFlowers([1, 0, 0, 0, 1], 1)); // True (x - x - x)
console.log(canPlaceFlowers([1, 0, 0, 0, 1], 2)); // False (x - x - x) is only 1 plant
console.log(canPlaceFlowers([1, 0, 1, 0, 1], 1)); // False
console.log(canPlaceFlowers([1, 0, 0, 1], 1)); // False
console.log(canPlaceFlowers([1, 0, 0, 1], 1)); // False
console.log(canPlaceFlowers([0, 0, 0, 0], 0)); // False
console.log(canPlaceFlowers([0, 0, 1, 0, 0], 1)); // False

//* Time: O(n) - We have to iterate through the whole input once
//* So the time taken scales with the size of flowerbed

//* Space: O(1) - We don't use any extra auxilary data structures at all, so the space remains constant
