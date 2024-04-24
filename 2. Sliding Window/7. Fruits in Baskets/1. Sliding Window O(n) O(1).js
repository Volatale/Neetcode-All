//* We can only hold 2 types of fruit in a basket
//* In a brute force manner, we can check every subarray
//* If basket.size === k, we can only add a fruit type that already exists in the basket
function fruitIntoBaskets(fruits) {
  const basket = new Set();
  let maxFruits = 0;

  for (let i = 0; i < fruits.length; i++) {
    let currFruits = 0;
    basket.clear();

    for (let j = i; j < fruits.length; j++) {
      if (basket.has(fruits[j])) {
        currFruits++;
      } else if (basket.size < 2) {
        basket.add(fruits[j]);
        currFruits++;
      } else {
        break;
      }
    }

    maxFruits = Math.max(maxFruits, currFruits);
  }

  return maxFruits;
}

console.log(fruitIntoBaskets([1, 2, 1])); //* 3
console.log(fruitIntoBaskets([0, 1, 2, 2])); //* 3
console.log(fruitIntoBaskets([0, 0, 1, 1, 1, 2, 2, 2])); //* 6
console.log(fruitIntoBaskets([1, 2, 3, 2, 2])); //* 4
console.log(fruitIntoBaskets([1])); //* 1
console.log(fruitIntoBaskets([1, 1, 1, 1, 1])); //* 5

//* Time: O(n^2) - We have two nested loops that both depend on "n" (nums.length)

//* Space: O(1) - We can only hold TWO elements within the set at once
//* So the space is technically O(2), but constants simplify to O(1) in Big O Notation
